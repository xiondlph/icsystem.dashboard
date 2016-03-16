
Ext.apply(Ext.form.field.VTypes, {
    password: function (val, field) {
        if (field.initialPassField) {
            var pwd = field.up().getComponent(field.initialPassField).getValue();
            return (val === pwd);
        }
        return true;
    },
    passwordText: 'Пароли не совпадают'
});

Ext.define("Admin.view.profile.Profile",{
    extend: "Ext.container.Container",

    requires: [
        "Admin.view.profile.ProfileController",
        "Admin.view.profile.ProfileModel"
    ],

    controller: "profile-profile",
    viewModel: {
        type: "profile-profile"
    },

    layout: "responsivecolumn",
    items: [{
        xtype: 'form',
        itemId: 'settingForm',
        defaultType: 'textfield',
        responsiveCls: 'big-50 small-100',
        cls: 'shadow-panel',
        title: 'Настройки',
        bodyPadding: 10,
        defaults: {
            submitEmptyText: false,
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 120,
            anchor: '100%'
        },
        items: [{
            blankText: 'Следует указать Email',
            fieldLabel: 'Email',
            name: 'email',
            vtype: 'email'
        }, {
            blankText: 'Необходимо привязать IP адрес',
            fieldLabel: 'IP адрес',
            name: 'address',
            triggers: {
                hint: {
                    cls: 'trigger-question'
                }
            }
        }],
        buttons: [{
            text: 'Сохранить',
            formBind: true,
            listeners: {
                click: 'saveSettings'
            }
        }]
    }, {
        xtype: 'form',
        itemId: 'passwordForm',
        url: '/api/password',
        defaultType: 'textfield',
        responsiveCls: 'big-50 small-100',
        cls: 'shadow-panel',
        title: 'Смена пароля',
        bodyPadding: 10,
        defaults: {
            submitEmptyText: false,
            validateOnBlur: false,
            inputType: 'password',
            labelWidth: 120,
            allowBlank: false,
            msgTarget: 'side',
            anchor: '100%'
        },
        items: [{
            blankText: 'Следует указать новый пароль',
            fieldLabel: 'Новый пароль',
            itemId: 'password',
            name: 'password'
        }, {
            blankText: 'Необходимо подтвердить новый пароль',
            initialPassField: 'password',
            fieldLabel: 'Подтверждение',
            name: 'confirm',
            vtype: 'password'
        }],
        buttons: [{
            text: 'Сохранить',
            formBind: true,
            listeners: {
                click: 'savePassword'
            }
        }]
    }, {
        xtype: 'form',
        itemId: 'infoForm',
        defaultType: 'textfield',
        responsiveCls: 'big-50 small-100',
        cls: 'shadow-panel',
        title: 'Информация',
        bodyPadding: 10,
        defaults: {
            labelWidth: 120,
            // readOnly: true,
            editable: false,
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'Запросов',
            dataIndex: 'requests',
            triggers: {
                payment: {
                    cls: 'trigger-payment',
                    hideOnReadOnly: false,
                    handler: 'goPayment'
                },
                hint: {
                    cls: 'trigger-question',
                    hideOnReadOnly: false
                }
            }
        }, {
            fieldLabel: 'Ключ',
            dataIndex: 'key',
            triggers: {
                clipboard: {
                    cls: 'trigger-clipboard',
                    hideOnReadOnly: false,
                    handler: 'copyKey'
                },
                hint: {
                    cls: 'trigger-question',
                    hideOnReadOnly: false
                }
            }
        }]
    }],
    listeners: {
        boxready: 'boxready'
    }
});
