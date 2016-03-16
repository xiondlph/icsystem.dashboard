/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    models: [
        'Profile',
        'Payment'
    ],

    stores: [
        'NavigationTree',
        'Profile',
        'Payments'
    ],
    
    launch: function () {
        // Перехват ошибок аякс запросов
        Ext.Ajax.on('requestexception',function(connection, response, options){
            if (response.status === 403) {
                Ext.MessageBox.show({
                    title: 'Ошибка',
                    msg: 'Время сессии истекло!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn: function(){
                        window.location.href="/admin/";
                    }
                });
            } else {
                Ext.MessageBox.show({
                    title: 'Ошибка',
                    msg: 'Действие временно недоступно.<br />Попробуйте повторить позже!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        }, this);
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Обновление приложения', 'Приложение обновилось, перезагрузить?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
