Ext.define('Admin.view.referrals.ReferralsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.referrals-referrals',

    init: function(view) {
        var referralsStore  = Ext.data.StoreManager.lookup('Referrals');

        referralsStore.load();
    }
});