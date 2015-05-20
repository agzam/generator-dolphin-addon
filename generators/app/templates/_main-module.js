angular.module('<%= props.addonName %>', [
  'ui.router',
  '<%= props.addonName %>Templates'
]);

angular.module('<%= props.addonName %>')
  .config(function ($stateProvider) {
    var home = {
      name: '<%= props.addonDisplayName %>',
      url: '/<%= props.addonName %>',
      templateUrl: '<%= props.addonName %>/welcome.html',
      controller: '<%= props.addonCamelName %>Controller'
    };

    $stateProvider.state(home);
  });
