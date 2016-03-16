Ext.define('Admin.model.Payment', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        { name: '_id', type: 'auto' },
        { name: '_quantity', type: 'int' },
        { name: '_requests', type: 'int' },
        { name: 'datetime', convert: function (value) {
            return Ext.Date.format(new Date(value), 'Y-m-d H:i:s');
        }},
        { name: 'withdraw_amount', type: 'auto' }
    ]
});