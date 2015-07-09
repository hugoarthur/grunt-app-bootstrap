module.exports = function(grunt) {
	// Project configuration. 
	grunt.initConfig({
	  concat: {
	    js: {
	      src: ['js/*.js'],
	      dest: 'dist/js/built.js',
	    },
	    css: {
	      src: ['css/*.css'],
	      dest: 'dist/css/styles.css',
	    }
	  },
	  jshint: {
	    beforeconcat: ['js/**/*.js', 'Gruntfile.js'],
	    afterconcat: ['dist/js/built.js']
	  },
	  copy: {
		  main: {
		    files: [
		      // includes html files and img folder in the root path
		      {expand: true, src: ['*.html'], dest: 'dist/', filter: 'isFile'},
		      {expand: true, src: ['img/**'], dest: 'dist/'}
		    ],
		  },
		  bower: {
		    files: [
		      // includes files within path and its sub-directories 
		      {expand: true, src: ['bower_components/**'], dest: 'dist/'}
		    ],
		  },
		},
		watch: {
			configFiles: {
				files: [ 'Gruntfile.js'],
				options: {
					livereload: true
				}
			},
		  	scripts: {
			    files: ['js/*.js'],
			    tasks: ['concat:js', 'jshint'],
				options: {
					livereload: true
				}
			},
			styles: {
			  	files: ['**/*.css'],
			  	tasks: ['concat:css'],
				options: {
					livereload: true
				}
			},
			view: {
			  	files: ['**/*.html', 'img/*', '!dist/**'],
			  	tasks: ['copy:main'],
				options: {
					livereload: true
				}
			}
		},
	  connect: {
	    server: {
	      options: {
	        port: 9000,
	        base: 'dist',
	        livereload: true,
	        open: true
	      }
	    }
	  }
	});

	grunt.registerTask('serve', function() {
		grunt.task.run([
			'concat',
			'jshint',
			'copy',
			'connect:server',
	    	'watch'
	    ]);
	});

	grunt.registerTask('build', function() {
		grunt.task.run([
			'concat',
			'jshint',
			'copy'
	    ]);
	});

	grunt.registerTask('default', function() {
		console.log('CRUZEIRO!!!');
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
};