Ext.define('Admin.store.Payments', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Payment',
    storeId: 'Payments',
    proxy: {
        type: 'rest',
        url : '/api/payment',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'payments',
            totalProperty: 'total'
        }
    }
});