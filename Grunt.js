grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    build: {
      src: 'src/app.js',
      dest: 'dist/app.min.js'
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('default', ['uglify']);
