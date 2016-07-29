(function() {
    'use strict';

    angular.module('app.widgets', [

    	'companyStrengthComponent',
        'currencyComponent',
    	'locationSelectionComponent',
        'selectskillsComponent',
    	'ctcMin',
    	'ctcMax',
    	'eqMin',
    	'eqMax',
    	'growthSkill',
        // editJob Widgets
        'editlocationSelectionComponent',
        'editskillsComponent',
        'editctcMin',
        'editctcMax',
        'editeqMin',
        'editeqMax',
        'editgrowthSkill',

        'app.widget.jobCard',
        'app.widget.profileCard'

    ]);
})();
