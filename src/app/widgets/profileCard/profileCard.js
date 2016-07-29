(function() {
	'use strict';

	angular
	.module('app.widget.profileCard')
	.controller('profileCardController', profileCardController);

	function profileCardController(JobService, authService, $scope, $stateParams, $state) {
		
		jQuery('.displayJobs').hide();


		$scope.shortlistProfile = shortlistProfile;
		$scope.onProfileSelect = onProfileSelect;

		


		function onProfileSelect(profile_id) {
            // console.log(profile_id);
            // console.log($stateParams);
            // $state.go("dashboard.profileViewViaSkillSearch",{ profile_id : profile_id  });

            var params = {
               profile_id : profile_id,
                skills: $stateParams.skills 
            };


           
            $state.go("dashboard.profileViewViaSkillSearch", params);

            
        }


		function shortlistProfile(jobId) {
			var jobId = jobId;
			var profileId = $scope.profile.id;

			JobService.shortlistSearchedProfile(jobId, profileId)
				.then(function(data){
					console.log('data recieved when shortlisted', data);

			});
		}


  		jQuery('.toShortlist').click(function(){
  			
  			var company_id = authService.getCompanyId();

  			jQuery(this).siblings('.displayJobs').show('slow');

  			JobService.fetchCreatedJobs(company_id).then(function(data){
  				


				$scope.jobs = data.payload.map(function(job){

                        return {
                        	title: job.title,
                        	id: job.id
                        }
                        	
                });     
            });



  		});


	}
})();
