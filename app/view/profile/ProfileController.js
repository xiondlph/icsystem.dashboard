Ext.define('Admin.view.profile.ProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile-profile',

	init: function(view) {
        var me              = this,
            profileStore    = Ext.data.StoreManager.lookup('Profile');

        profileStore.on('load', this.profileLoad, this);
        if (profileStore.isLoaded()) {
            this.profileLoad(profileStore);
        }
    },

    boxready: function (view) {
        var profileStore = Ext.data.StoreManager.lookup('Profile');

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('settingForm').items.getAt(1).getTrigger('hint').getEl(),
            html: 'В целях безопасности, доступ к API осуществляться исключительно с IP адреса привязанного к Вашему аккаунту.'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('infoForm').items.getAt(0).getTrigger('payment').getEl(),
            html: 'Пополнить запросы'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('infoForm').items.getAt(0).getTrigger('hint').getEl(),
            html: 'Количество доступных запросов к ресурсам API, для Вашего аккаутна.'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('infoForm').items.getAt(1).getTrigger('clipboard').getEl(),
            hideDelay: 500,
            id: 'clipboard',
            listeners: {
                beforeshow: function updateTip(tip) {
                    tip.update('Копировать в буфер.');
                }
            }
        });

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('infoForm').items.getAt(1).getTrigger('hint').getEl(),
            html: [
                'Ключ используется для осуществлении доступа без привязки к IP.',
                'Для использования ключа,',
                'его следует передавать во всех запросах в HTTP-заголовке X-Ismax-key.',
                'При использовании ключа, проверка по IP не производиться.'
            ].join(' '),
            hideDelay: 500
        });

        if (profileStore.isLoaded()) {
            return;
        }

        view.getComponent('infoForm').setLoading('Загрузка');
        view.getComponent('settingForm').setLoading('Загрузка');
    },

    profileLoad: function (store, records, successful, operation) {
        this.getViewModel().setData({User: store.getAt(0)});

        this.getView().getComponent('infoForm').loadRecord(store.getAt(0));
        this.getView().getComponent('settingForm').loadRecord(store.getAt(0));

        this.getView().getComponent('infoForm').setLoading(false);
        this.getView().getComponent('settingForm').setLoading(false);
    },

    saveSettings: function (btn) {
        var form    = btn.up('form'),
            record  = form.getRecord();

        record.set(form.getValues(), {silent: true});
        if (!record.isModified('email') && !record.isModified('address')) {
            return;
        }

        form.setLoading('Сохранение');
        btn.up('form').getRecord().save({
            success: function(record, operation) {
                btn.up('form').getRecord().commit();
                Ext.toast({
                    html: 'Новые настройки сохранены',
                    closeToolText: 'Закрыть',
                    iconCls: 'x-fa fa-comments',
                    closable: true
                });
            },
            callback: function(record, operation, success) {
                form.setLoading(false);
            }
        });
    },

    savePassword: function (btn) {
        var form    = btn.up('form');

        form.setLoading('Сохранение');
        form.submit({
            failure: function(record, operation) {
                form.setLoading(false);
            },
            success: function(record, operation) {
                form.reset();
                form.setLoading(false);
                Ext.toast({
                    html: 'Новый пароль сохранен',
                    closeToolText: 'Закрыть',
                    iconCls: 'x-fa fa-comments',
                    closable: true
                });
            }
        })
    },

    goPayment: function () {
        this.redirectTo('payment');
    },

    copyKey: function (field) {
        field.focus().selectText();
        try {
            var successful  = document.execCommand('copy'),
                tips        = Ext.getCmp('clipboard');

            if (successful) {
                tips.show(10, 10);
                tips.update('Скопировано!');
            }
        } catch (err) {
            console.info('Cope failed');
        }
    }
});
