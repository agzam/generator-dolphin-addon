angular.module('<%= appname%>').config(configure<%= props.validationUpperCamelName %>Validation);

configure<%= props.validationUpperCamelName %>Validation.$inject = ['actionProvider'];

function configure<%= props.validationUpperCamelName %>Validation(actionProvider) {
  let config = {
    entity: '<%= props.validationEntity %>',
    $fn: <%= props.validationCamelName %>Validation
  };

  actionProvider.validation(config);

  <%= props.validationCamelName %>Validation.$inject = ['$event'];

  function <%= props.validationCamelName %>Validation($event) {
    // Your code here...
  }
}
