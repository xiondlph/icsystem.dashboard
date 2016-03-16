Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',
    root: {
        expanded: true,
        children: [{
            text:   'Профиль',
            view:   'profile.Profile',
            leaf:   true,
            iconCls: 'x-fa fa-user',
            routeId:'profile'
        }, {
            text:   'Оплата',
            view:   'payment.Payment',
            leaf:   true,
            iconCls: 'x-fa fa-credit-card',
            routeId: 'payment'
        }, {
            text:   'Помощь',
            view:   'pages.BlankPage',
            leaf:   true,
            iconCls: 'x-fa fa-question',
            routeId: 'dashboard'
        }, {
            text:   'Выход',
            leaf:   true,
            iconCls: 'x-fa fa-sign-out',
            routeId: 'signout'
        }]
    },
    fields: [{
        name: 'text'
    }]
});
