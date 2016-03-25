Ext.define('Admin.model.Profile', {
    extend: 'Ext.data.Model',
    idProperty: 'key',
    fields: [
        { name: 'id', type: 'auto' },
        { name: 'email', type: 'auto' },
        { name: 'requests', type: 'int' },
        { name: 'bonus', type: 'int' },
        { name: 'address', type: 'auto' },
        { name: 'key', type: 'auto' },
        { name: 'ref',type: 'auto', convert: function (val){
            return 'https://www.icsystem.ru?ref=' + val;
        }}

    ],
    proxy: {
        type: 'rest',
        url : '/api/profile',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'profile'
        }
    }
});