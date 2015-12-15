module.exports = (config) ->
  config.set
    basePath: ''
    browsers: ['Chrome']
    captureTimeout: 60000
    colors: true
    frameworks: ['mocha', 'chai', 'sinon']
    logLevel: config.LOG_INFO
    port: 9876
    reporters: ['dots']

    preprocessors:
      '**/*.coffee': 'coffee'
      '**/*.html': 'ng-html2js'

    coffeePreprocessor:
      options:
        sourceMap: true

    ngHtml2JsPreprocessor:
      moduleName: 'templates'
      stripPrefix: 'templates/'

    files: [

      # Third party dependencies
      'bower_components/jquery/dist/jquery.min.js'
      'bower_components/angular/angular.js'
      'bower_components/angular-sanitize/angular-sanitize.js'
      'bower_components/angular-mocks/angular-mocks.js'

      # Testing dependencies
      'node_modules/sinon-chai/lib/sinon-chai.js'

      # Partials
      'templates/*.html'

      # Source
      'src/*.coffee'

      # Spec files
      'spec/*spec.coffee'
    ]
