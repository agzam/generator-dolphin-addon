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
        name: 'actionDisplayName',
        message: 'What is your action\'s name (format: verb noun [eg. create case])?'
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.actionName = props.actionDisplayName;
      this.props.actionCamelName = _.camelCase(props.actionDisplayName);
      this.props.actionUpperCamelName = _.capitalize(_.camelCase(props.actionDisplayName));
      this.props.addonFileName = _.kebabCase(props.actionDisplayName);

      done();
    }.bind(this));
  },

  writing: function () {
    mkdirp.sync('src/actions');

    this.template('_action.js', 'src/actions/' + this.props.addonFileName + '-action.js');
  }
});
