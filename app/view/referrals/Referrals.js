
Ext.define("Admin.view.referrals.Referrals",{
    extend: "Ext.panel.Panel",

    requires: [
        "Admin.view.referrals.ReferralsController",
        "Admin.view.referrals.ReferralsModel"
    ],

    controller: "referrals-referrals",
    viewModel: {
        type: "referrals-referrals"
    },

    layout: "responsivecolumn",
    items: [{
        title: 'Список рефералов',
        items: [{
            xtype: 'gridpanel',
            store: 'Referrals',
            columns: [
                { text: 'Дата регистрации', dataIndex: 'createAt', flex: 1},
                { text: 'Email', dataIndex: 'email', flex: 1}
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'Referrals',
                dock: 'bottom',
                displayInfo: true
            }],
            height: 250
        }]
    }]
});
