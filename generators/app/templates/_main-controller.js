angular
  .module('<%= props.addonName %>')
  .controller('<%= props.addonCamelName %>Controller', <%= props.addonCamelName %>Controller);

<%= props.addonCamelName %>Controller.$inject = [];

function <%= props.addonCamelName %>Controller() {
  // Code goes here.
}
