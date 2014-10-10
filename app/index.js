'use strict';

var path = require('path'),
    yo = require('yeoman-generator');


module.exports = yo.generators.Base.extend({
    constructor: function(arg, options) {
        yo.generators.Base.apply(this, arguments);

        this.on('end', function() {
            this.installDependencies({
                skipInstall: options['skip-install']
            });
        });

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    },

//Example how to get data from a user
/*    askFor: function() {
        var cb = this.async();


      var prompts = [
            {
                name: 'projectName',
                message: 'Project Name',
                default: path.basename(process.cwd())
            }
        ];

        this.prompt(prompts, function(props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }

            cb();
        }.bind(this));

    },*/

    scaffold: function() {
        this.directory('js/', 'static/js/');
        this.directory('blocks/', 'static/blocks/');
        this.directory('less/', 'static/less/');
        this.directory('img/', 'static/img/');

        /*this.mkdir('static/fonts');*/

        this.copy('_gitignore', '.gitignore');

        this.template('_bower.json', 'bower.json');
        this.template('_package.json', 'package.json');
        this.template('_Gruntfile.js', 'Gruntfile.js');
        this.template('_index.ejs', 'static/index.ejs');
    }
});
