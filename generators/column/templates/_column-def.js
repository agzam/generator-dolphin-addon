angular.module('<%= appname%>').config(configure<%= props.columnUpperCamelName %>ColumnDef);

configure<%= props.columnUpperCamelName %>ColumnDef.$inject = ['columnDefProvider'];

function configure<%= props.columnUpperCamelName %>ColumnDef(columnDefProvider) {
  let config = {
    matchWhen: (schema)=> {
      // TODO: Add your condition here.
      return false;
    },
    $get: <%= props.columnCamelName %>ColDef
  };

  columnDefProvider.register(config);

  <%= props.columnCamelName %>ColDef.$inject = ['field', 'schema'];

  function <%= props.columnCamelName %>ColDef(field, schema) {
    return {
      field: field,
      displayName: _.get(schema, 'title', '<%= props.columnName %>'),
      type: _.get(schema, 'type', 'string')
    };
  }
}
