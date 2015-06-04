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
        name: 'columnDisplayName',
        message: 'What is your column\'s title?'
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.columnName = props.columnDisplayName;
      this.props.columnCamelName = _.camelCase(props.columnDisplayName);
      this.props.columnUpperCamelName = _.capitalize(_.camelCase(props.columnDisplayName));
      this.props.columnFileName = _.kebabCase(props.columnDisplayName);

      done();
    }.bind(this));
  },

  writing: function () {
    mkdirp.sync('src/column-defs');

    this.template('_column-def.js', 'src/column-defs/' + this.props.columnFileName + '-column-def.js');
  }
});
