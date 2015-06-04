'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var bowerJson = {};

    try {
      bowerJson = require(path.join(process.cwd(), 'bower.json'));
    } catch (e) {}

    if (bowerJson.name) {
      this.appname = bowerJson.name;
    } else {
      this.appname = path.basename(process.cwd());
    }
  },

  prompting: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ' + chalk.red('Dolphin Addon') + ' generator'
      ));
    }

    var prompts = [{
        name: 'validationDisplayName',
        message: 'What is your validation\'s name?'
      },
      {
        name: 'validationEntity',
        message: 'Which entity are you validating?'
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.validationEntity = props.validationEntity;
      this.props.validationName = props.validationDisplayName;
      this.props.validationCamelName = _.camelCase(props.validationDisplayName);
      this.props.validationUpperCamelName = _.capitalize(_.camelCase(props.validationDisplayName));
      this.props.addonFileName = _.kebabCase(props.validationDisplayName);

      done();
    }.bind(this));
  },

  writing: function () {
    mkdirp.sync('src/validations');

    this.template('_validation.js', 'src/validations/' + this.props.addonFileName + '-validation.js');
  }
});
