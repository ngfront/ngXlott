(function() {
    'use strict';

    angular
    .module('app.dashboard.profilesShortlistedForCreatedJob')
    .controller('ProfilesShortlistedController', ProfilesShortlistedController);

    function ProfilesShortlistedController($stateParams, JobService, $state) {
    	var self = this;
    	self.shortlistedProfiles = [];
        self.displayAllProfiles = displayAllProfiles;
        self.onProfileSelect = onProfileSelect;

    	var job_id = $stateParams.id;
        
        self.total_profiles = $stateParams.total_profiles;

    	init();

    	function init() {

            jQuery('.profileSwitcher li:nth-child(2)').addClass('active');
                jQuery('.profileSwitcher li:nth-child(1)').removeClass('active');
    		// Make a api call to fetch Shortlisted Profiles
             JobService.fetchShortlistedProfiles(job_id)
                .then(function(data){
                    console.log('Shortlisted Profiles Data Fetched', data);
                    	self.shortlistedProfiles = data;
                        self.shortlistedProfileCount = self.shortlistedProfiles.length;
                    });
    	}

        function displayAllProfiles() {
                var params = {
                    id: job_id,
                    profiles_shortlisted: $stateParams.profiles_shortlisted
                };
                $state.go('dashboard.jobs.profiles', params);
        }

        function onProfileSelect(profileId) {
            
            var params = {
               job_id: $stateParams.id,
               profile_id: profileId
            };

            $state.go('dashboard.jobs.profileViewForShortlisted', params);
        }



    }


})();