module.exports = function(grunt) {
  // Do grunt-related things in here

   // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
        dist: {
            //files to concatenate
            src: ['js/*.js'],
            //destination file
            dest: 'app.js'
        },
        test: {
            //files to concatenate
            src: ['js/app.js', 'test-js/css-include.js'],
            //destination file
            dest: 'app.js'
        }
    },
    uglify: {
        options: {
            // the banner is inserted at the top of the output
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
            files: {
                'app.min.js': ['<%= concat.dist.dest %>']
            }
        } 
    },
    injection: {
        files: {
          src: ['css/styles.css'],
          dest: 'js/injection.js'  
        }
    }
  });

  //concat
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat:dist', 'uglify']);

  //testing task
  grunt.registerTask('testing', ['concat:test', 'uglify']);


  grunt.registerMultiTask('injection', 'Injecting', function(){ 
    var src = this.data.src; 
    var dest = this.data.dest;
    var css = grunt.file.read(src);
    var js = grunt.file.read(dest);
    
    var jsContent = "var styles = document.createElement('style');";    
       jsContent += "$('head').append(styles);";
       jsContent += "$('style').append(\""+ css +"\");"
       //jsContent += "styles.append('"+css+"');";
    //var jsContent = "$('head').append(\"<style>"+css+"</style>\");"
    
    grunt.file.write(dest, jsContent);
    grunt.log.writeln(src + ' : '+ dest); 
    grunt.log.writeln(css); 
    grunt.log.writeln(js); 
    
  });


};