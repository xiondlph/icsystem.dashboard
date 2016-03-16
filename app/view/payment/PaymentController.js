Ext.define('Admin.view.payment.PaymentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.payment-payment',

    init: function(view) {
        var paymentStore  = Ext.data.StoreManager.lookup('Payments'),
            profileStore  = Ext.data.StoreManager.lookup('Profile');

        paymentStore.load();
        profileStore.on('load', this.profileLoad, this);
    },

    boxready: function (view) {
        var profileStore = Ext.data.StoreManager.lookup('Profile');
        if (profileStore.isLoaded()) {
            view.getComponent('payForm').getForm().baseParams.label = profileStore.getAt(0).get('email');
            return;
        }

        view.getComponent('payForm').setLoading('Загрузка');
    },

    profileLoad: function (store, records, successful, operation) {
        this.getView().getComponent('payForm').setLoading(false);
        this.getView().getComponent('payForm').getForm().baseParams.label = store.getAt(0).get('email');
    },

    payFormSubmit: function (btn) {
        var form    = btn.up('form');
        form.submit();
    }
});
