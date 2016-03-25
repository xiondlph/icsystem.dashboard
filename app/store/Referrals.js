Ext.define('Admin.store.Referrals', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Referral',
    storeId: 'Referrals',
    proxy: {
        type: 'rest',
        url : '/api/referrals',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'referrals',
            totalProperty: 'total'
        }
    }
});