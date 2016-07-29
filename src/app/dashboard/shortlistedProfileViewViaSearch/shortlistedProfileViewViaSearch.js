(function() {
    'use strict';

    angular
    .module('app.dashboard.shortlistedProfileViewSearch')
    .controller('searchedShortlistedController', searchedShortlistedController);

    function searchedShortlistedController(authService, JobService, $stateParams) {
    	var self = this;

    	self.profileId = $stateParams.profile_id;
    	
    	JobService.fetchProfile(self.profileId)
					.then(function(data){
						console.log(data);
						self.profile = data.payload;
					});
    }
    
})();