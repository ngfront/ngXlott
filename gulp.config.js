module.exports = function() {
    var source = './src/';
    var sourceApp = source + 'app/';
    // var root = './';
    var temp = './temp/';

    var config = {
        root: root,
        /**
         * Files paths
         */
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/',
        source: source,
        sourceApp: sourceApp,
        css: temp + 'app.css',
        htmltemplates: sourceApp + '**/*.html',
        templateCache : {
            file :'templates.js',
            options: {
                module: 'app.templates',
                standAlone: false,
                root : 'src/app/'
            }
        },
        fonts:'bower_components/font-awesome/fonts/**/*.*',
        images: source + 'images/**/*.*',
        index: source + 'index.html',
        js: [
            sourceApp + '**/*.module.js',
            sourceApp + '**/*.js',
            '!' + sourceApp + '**/*.spec.js'
        ],
        sass: source + 'styles/**/*.scss',
        temp: temp,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        packages : [
            './package.json',
            './bower.json'
        ]

    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
