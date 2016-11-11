module.exports = function(grunt) {
	// Project configuration.
	var mozjpeg = require('imagemin-mozjpeg');

	grunt
		.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			repos: grunt.file.readJSON('wowact.json'),
			wowact: {
				options: {
					basePath: '../../../repos/'
				},
				main: grunt.file.readJSON('wowact.json')
			},
			//目标文件的拷贝
			copy: {
				build: {
					files: [{ //target
						expand: true,
						cwd: '<%= repos.developDir.srcPath%>',
						src: '<%= repos.taskConfig.copy.files%>',
						dest: '<%= repos.developDir.destPath%>/'
					}]
				},
				develop: {
					files: [{ //dev
						expand: true,
						cwd: 'src/',
						src: '**',
						dest: '<%= repos.developDir.devPath%>'
					}]
				},
			},
			//less编译
			less: {
				compile: {
					files: [{
						expand: true,
						cwd: '<%= repos.developDir.srcPath%>',
						src: '<%= repos.taskConfig.less.files %>',
						ext: '.css',
						dest: '<%= repos.developDir.devPath%>'
					}]
				},
				make: {
					options: {
						compress: true
					},
					files: [{
						expand: true,
						cwd: '<%= repos.developDir.srcPath%>',
						src: '<%= repos.taskConfig.less.files %>',
						ext: '.css',
						dest: '<%= repos.developDir.destPath%>'
					}]
				},
			},
			//压缩js
			uglify: {
				options: {
					mangle: true,
					debug: true
				},
				my_target: {
					files: [{
						expand: true,
						cwd: '<%= repos.developDir.destPath%>',
						src: '<%= repos.taskConfig.uglifyjs.files%>',
						dest: '<%= repos.developDir.destPath %>'
					}]
				}
			},
			//生成MD5文件名
			md5: {
				main: {
					files: [{
						expand: true,
						cwd: 'src/',
						src: '',
						dest: '<%= repos.developDir.destPath%>'
					}],
					options: {
						encoding: null,
						keepBasename: true,
						keepExtension: true,
						afterEach: function(fileChange, options) {},
						after: function(fileChanges, options) {

						}
					}
				}
			},
			/**
			 * 图片压缩,压缩JPG
			 * @type {Object}
			 */
			imagemin: {
				dynamic: {
					options: {
						use: [mozjpeg()]
					},
					files: [{
						expand: true,
						cwd: '<%= repos.developDir.srcPath %>',
						src: '<%= repos.taskConfig.imagemin.jpg %>',
						dest: '<%= repos.developDir.srcPath %>'
					}]

				}

			},
			pngmin: { //压缩PNG
				compile: {
					options: {
						ext: '.png',
						force: true //强制覆盖
					},
					files: [{
						expand: true,
						cwd: '<%= repos.developDir.srcPath %>',
						src: '<%= repos.taskConfig.imagemin.png %>',
						dest: '<%= repos.developDir.srcPath %>'
					}]
				}
			},
			watch: {
				sync: {
					files: ['<%= repos.developDir.srcPath%>/**', '!<%= repos.developDir.srcPath%>/**/**.less'],
					tasks: ['sync:main'],
					options: {
						nospawn: true,
						livereload: true
					}
				},
				sync_src_less: {
					files: ['<%= repos.developDir.srcPath%>/**/*.less'],
					tasks: ['sync:main', 'less:compile'],
					options: {
						nospawn: true,
						livereload: true
					}
				},
				scripts: {
					files: ['<%= repos.developDir.srcPath%>/**/*.js'],
					tasks: ['jshint:dynamic'],
					options: {
						spawn: false
					}
				}
			},
			connect: {
				dev_tpl_src_server: {
					options: {
						port: 9000,
						livereload: true,
						// hostname: '',
						// debug:true,
						base: ['<%= repos.developDir.devPath%>']
					}
				}
			},
			sync: {
				main: {
					files: [{
						cwd: './src/',
						src: ['**'],
						dest: '<%= repos.developDir.devPath%>',
					}],
					pretend: false, //Don't do any IO  ?
					verbose: true //显示LOG
				},
			},
			autoprefixer: {
				options: {
					// Task-specific options go here. 
				},
				targets: {
					expand: true,
					cwd: '<%= repos.developDir.destPath%>',
					src: '**/*.css',
					dest: '<%= repos.developDir.destPath%>'
				},
			},
			dom_munger: {
				make: {
					options: {
						callback: function($) {
							$('script').remove();
							$('html').append('<script src="app.js"></script>');
						}
					},
					src: '<%= repos.developDir.srcPath%><%= repos.taskConfig.html%>',
					dest: '<%= repos.developDir.destPath%><%= repos.taskConfig.html %>'
				},
			},
			jshint: {
				options: {
					esversion: 6, //使用ES6
					boss: true, //查找类似与if(a = 0)这样的代码
					undef: true, //查找未定义变量
					browser: true, //浏览器环境
					devel: true, //定义用于调试的全局变量： console ， alert
					eqeqeq: false, //强制使用===而不是==
					sub: false, //person['name'] vs. person.name
					globalstrict: true, //全局的'use strict'
					nonstandard: true, //Widely adopted globals (escape, unescape, etc)
					globals: { //全局变量
						require: false,
						Q: true,
						angular: false,
						_: false,
					},
				},
				all: ['<%= repos.developDir.srcPath%>/**/*.js', '!<%= repos.developDir.srcPath%>/libs/*.js'],
				dynamic: {
					src: [],
				}
			},
			concat: {
				dist: {
					src: ['<%= repos.developDir.srcPath%>/libs/angular*.js',
					'<%= repos.developDir.srcPath%>/libs/jquery*.js',
					'<%= repos.developDir.srcPath%>/libs/bootstrap*.js',
					'<%= repos.developDir.srcPath%>/libs/underscore*.js',
					'<%= repos.developDir.srcPath%>/app/**/*.js'],
					dest: '<%= repos.developDir.destPath%>/<%= repos.taskConfig.concat.dist %>',
				},
			},
			clean: ['<%= repos.developDir.devPath%>/**', '<%= repos.developDir.destPath%>/**']

		});

	//只对改变了的JS做jshint
	grunt.event.on('watch', function(action, filepath) {
		grunt.config('jshint.dynamic.src', filepath);
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-md5');
	grunt.loadNpmTasks('grunt-dom-munger');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	//for make dist
	grunt.registerTask('make', ['clean', 'copy', 'less:make', 'autoprefixer', 'concat','uglify','dom_munger']);
	grunt.registerTask('m', ['make']);
	//for tiny image
	grunt.registerTask('img', ['imagemin', 'pngmin']);
	//for developDir
	grunt.registerTask('default', ['copy:develop', 'less:compile', 'connect', 'watch']);
};