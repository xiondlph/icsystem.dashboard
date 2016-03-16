Ext.define('Admin.view.pages.Error404Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.pageserror404window',

    requires: [
        'Ext.container.Container',
        'Ext.toolbar.Spacer',
        'Ext.form.Label'
    ],

    autoShow: true,
    cls: 'error-page-container',
    closable: false,
    title: 'ISMAX icsystem',
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items: [{
        xtype: 'container',
        width: 400,
        cls:'error-page-inner-container',
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [{
            xtype: 'label',
            cls: 'error-page-top-text',
            text: '404'
        }, {
            xtype: 'label',
            cls: 'error-page-desc',
            html: '<div>Запрашиваемая Вами страница не найдена!</div><div>Попробуйте перейти на<a href="#profile"> главную страницу </a></div>'
        }, {
            xtype: 'tbspacer',
            flex: 1
        }]
    }]
});