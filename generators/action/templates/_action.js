angular.module('<%= appname%>').config(configure<%= props.actionUpperCamelName %>Action);

configure<%= props.actionUpperCamelName %>Action.$inject = ['actionProvider'];

function configure<%= props.actionUpperCamelName %>Action(actionProvider) {
  let config = {
    id: '<%= props.actionCamelName %>',
    $fn: <%= props.actionCamelName %>Action

    // OPTIONAL SETTINGS:
    // display: '<%= props.actionDisplayName %>',
    // accepts: [],
    // group: 0
  };

  actionProvider.action(config);

  <%= props.actionCamelName %>Action.$inject = ['$event'];

  function <%= props.actionCamelName %>Action($event) {
      // Your Code Here
  }
}
