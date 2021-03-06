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

  configuring: function() {
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_karma.conf.coffee', 'karma.conf.coffee');
  },

  writing: {
    app: function () {
      if (!this.options['skip-data']) {
        mkdirp.sync('data');
        mkdirp.sync('data/entity');
        mkdirp.sync('data/entity-patches');
        mkdirp.sync('data/views');
      }

      mkdirp.sync('src');
      mkdirp.sync('public');

      this.template('_main-module.js', 'src/' + this.props.addonFileName + '-module.js');
      this.template('_main-module-spec.coffee', 'src/' + this.props.addonFileName + '-module-spec.coffee');
      this.template('_main-controller.js', 'src/' + this.props.addonFileName + '-controller.js');

      this.template('_Gulpfile.coffee', 'Gulpfile.coffee');

      this.copy('jscsrc', '.jscsrc');
      this.copy('npmrc', '.npmrc');
      this.copy('editorconfig', '.editorconfig');
      this.copy('_.gitignore', '.gitignore');
      this.copy('local.karma.conf.coffee', 'local.karma.conf.coffee');

    }
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  }
});
