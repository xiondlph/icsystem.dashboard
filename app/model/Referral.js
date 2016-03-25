Ext.define('Admin.model.Referral', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        { name: '_id', type: 'auto' },
        { name: 'createAt', convert: function (value) {
            return Ext.Date.format(new Date(value), 'Y-m-d H:i:s');
        }},
        { name: 'email', type: 'auto' }
    ]
});