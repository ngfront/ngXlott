(function() {
    'use strict';

    angular
    .module('app.dashboard.searchedProfilesShortlisted')
    .controller('searchedShortlistedController', searchedShortlistedController);

    function searchedShortlistedController(authService, JobService) {
        
            console.log("jeet")
    	var self = this;

    	jQuery('.primaryInteractionArea').addClass('hideSecNav viaSearch');
    	
    	var companyId = authService.getCompanyId();
        jQuery('.profileSwitcher li:nth-child(2)').addClass('active');
         jQuery('.profileSwitcher li:nth-child(1)').removeClass('active');

    	JobService.fetchCompanysShortListedProfiles(companyId).then(function(data){
    		console.log(data);
    		self.profiles = data;
    	});
    }
    
})();