Ext.define('Admin.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-viewport',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    init: function(view) {
        var me              = this,
            profileStore    = Ext.data.StoreManager.lookup('Profile');

        profileStore.on('load', this.profileLoad, this);
        profileStore.load();
    },

    profileLoad: function (store, records, successful, operation) {
        this.getViewModel().setData({Profile: store.getAt(0)});
    },

    setCurrentView: function(hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            viewModel = me.getViewModel(),
            vmData = viewModel.getData(),
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag),
            view = node ? node.get('view') : null,
            lastView = vmData.currentView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        // Удаление предыдущего представления если оно окно
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            newView = Ext.create('Admin.view.' + (view || 'pages.Error404Window'), {
                hideMode: 'offsets',
                routeId: hashTag
            });
        }

        if (!newView || !newView.isWindow) {
            if (existingItem) {
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        vmData.currentView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        if (node && node.get('view')) {
            this.redirectTo(node.get("routeId"));
        } else if(node.get("routeId") === 'signout') {
            this.signOut();
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            mainContainer = refs.mainContainer,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.ismaxLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts();


            mainContainer.layout.animatePolicy = mainContainer.layout.animate = null;
            mainContainer.updateLayout();
        } else {
            if (!collapsing) {
                navigationList.setMicro(false);
            }

            refs.ismaxLogo.animate({dynamic: true, to: {width: new_width}});

            navigationList.width = new_width;
            mainContainer.updateLayout({isRoot: true});

            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                    },
                    single: true
                });
            }
        }
    },

    onMainViewRender:function() {
        if (!window.location.hash) {
            this.redirectTo("profile");
        }
    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },

    signOut: function () {
        var me = this;

        Ext.Msg.show({
            title: 'Выход',
            message: 'Вы действительно хотите выйти?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            closeToolText: 'Закрыть',
            fn: function (btn) {
                var refs                = me.getReferences(),
                    navigationTreeList  = refs.navigationTreeList,
                    store               = navigationTreeList.getStore(),
                    viewModel           = me.getViewModel(),
                    currentRoute        = viewModel.getData().currentView.routeId,
                    node                = store.findNode('routeId', currentRoute);

                navigationTreeList.setSelection(node);
                if (btn === 'yes') {
                    document.location.href = '/user/signout';
                }
            }
        });
    }
});