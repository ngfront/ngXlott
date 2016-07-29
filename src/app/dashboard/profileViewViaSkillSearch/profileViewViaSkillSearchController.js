(function() {
    'use strict';

    angular
    .module('app.dashboard.profileViewViaSkillSearch')
    .controller('profileViewViaSkillSearchController', profileViewViaSkillSearchController);

    function profileViewViaSkillSearchController(JobService, $stateParams, $state) {

       var self = this;
       self.loadMoreProfiles = loadMoreProfiles;
       self.navigateBack = navigateBack;

       console.log('$stateParams.skills', $stateParams);
       
      jQuery('.primaryInteractionArea').addClass('hideSecNav profileView');


      console.log('$stateParams', $stateParams);
      JobService.fetchProfile($stateParams.profile_id)
					.then(function(data){
						console.log(data);
						self.profile = data.payload;
            self.Profileskills = self.profile.rank;
					});

      function loadMoreProfiles() {

      } 

      function navigateBack() {
        var params = {
          skills: $stateParams.skills
        };

        $state.go('dashboard.searchedProfiles', params);
      }


    }
})();
