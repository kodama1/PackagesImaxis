module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
	  	exec: {
			list_files: {
			  cmd: 'bower init'
			}
		},
		mkdir: {
			all: {
				options: {
					create: ['less', 'css', 'js']
				},
			},
		},
		less:{
			compile:{
				files:{
					'css/style.css' : 'less/style.less'
				},
				options:{
					compress: true
				}
			}
		},
		cmq: {
			options: {
			  log: false
			},
			your_target: {
			  files: {
			    'css/style.css': ['css/style.css']
			  }
			}
		},
		cssmin: {
		  minify: {
		    expand: true,
		    cwd: 'css/',
		    src: ['*.css', '!*.min.css'],
		    dest: 'css/',
		    ext: '.min.css'
		  }
		},
		browserSync: {
	     	default_options: {
		       bsFiles: {
		         src: [
		           "css/*.css",
		           "js/*.js",
		           "*.html"
		         ]
	       		},
		       options: {
		         watchTask: true,
		         server:{
		         	baseDir: "./"
		         }
		       }
	     	}
   		},
   		watch: {
			less: {
				files: "less/*.less",
				tasks: [
				 "less",
				 "cssmin"
				]
			}
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-exec');
	grunt.registerTask('default', ['mkdir', 'exec']);
	grunt.registerTask('run', ['less', 'cmq', 'cssmin', 'browserSync', 'watch']);


}