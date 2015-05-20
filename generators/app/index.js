'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ' + chalk.red('Dolphin Addon') + ' generator'
      ));
    }

    var prompts = [{
        name: 'addonDisplayName',
        message: 'What is your addon\'s name?'
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.addonName = _.snakeCase(props.addonDisplayName);
      this.props.addonFileName = _.kebabCase(props.addonDisplayName);
      this.props.addonCamelName = _.camelCase(props.addonDisplayName);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_bower.json', 'bower.json');
      this.template('_package.json', 'package.json');

      if (!this.options['skip-data']) {
        mkdirp.sync('data');
        mkdirp.sync('data/entity');
        mkdirp.sync('data/entity-patches');
        mkdirp.sync('data/views');
      }

      mkdirp.sync('src');
      mkdirp.sync('public');

      this.template('_main-module.js', 'src/' + this.props.addonFileName + '-module.js');
      this.template('_main-controller.js', 'src/' + this.props.addonFileName + '-controller.js');

      this.template('_Gulpfile.coffee', 'Gulpfile.coffee');

      this.copy('jscsrc', '.jscsrc');
      this.copy('editorconfig', '.editorconfig');
    }
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  }
});
