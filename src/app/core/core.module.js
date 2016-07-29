(function() {
    'use strict';

    angular
        .module('app.core', [
            
            'ui.router', 'ngMaterial',
            'angular-click-outside',
            'checklist-model','LocalStorageModule',
            'app.router', 'app.constants',
            'app.dataService'
            
        ]);

})();
