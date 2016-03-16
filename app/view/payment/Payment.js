
Ext.define("Admin.view.payment.Payment",{
    extend: "Ext.container.Container",

    requires: [
        "Admin.view.payment.PaymentController",
        "Admin.view.payment.PaymentModel"
    ],

    controller: "payment-payment",
    viewModel: {
        type: "payment-payment"
    },

    layout: "responsivecolumn",
    items: [{
        title: 'История платежных операций',
        items: [{
            xtype: 'gridpanel',
            store: 'Payments',
            columns: [
                { text: 'Дата', dataIndex: 'datetime', flex: 1},
                { text: 'Сумма (руб.)', dataIndex: 'withdraw_amount', flex: 1},
                { text: 'Запросы', dataIndex: '_quantity', flex: 1},
                { text: 'Итого', dataIndex: '_requests', flex: 1}
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'Payments',
                dock: 'bottom',
                displayInfo: true
            }],
            height: 250
        }]
    }, {
        xtype: 'form',
        url: 'https://money.yandex.ru/quickpay/confirm.xml',
        standardSubmit: true,
        itemId: 'payForm',
        defaultType: 'numberfield',
        responsiveCls: 'big-50 small-100',
        flex: 1,
        title: 'Оплатить',
        bodyPadding: 10,
        defaults: {
            submitEmptyText: false,
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 120,
            anchor: '100%'
        },
        baseParams: {
            'receiver': '410011237083903',
            'formcomment': 'ICSYSTEM - Оплата запросов',
            'short-dest': 'ICSYSTEM - Оплата запросов',
            'quickpay-form': 'shop',
            'targets': 'ICSYSTEM - Оплата запросов',
            'paymentType': 'PC'
        },
        items: [{
            xtype: 'displayfield',
            fieldLabel: 'Способ оплаты',
            value: 'Яндекс.Деньги',
            cls: 'y-money-field'
        }, {
            blankText: 'Следует указать сумму',
            fieldLabel: 'Сумма (руб.)',
            validateOnBlur: false,
            maxValue: 10000,
            minValue: 10,
            value: 1000,
            name: 'sum'
        }],
        buttons: [{
            text: 'Оплатить',
            formBind: true,
            listeners: {
                click: 'payFormSubmit'
            }
        }]
    }],
    listeners: {
        boxready: 'boxready'
    }
});
