(function() {
    'use strict';

    angular
    .module('app.dashboard.profilesShortlistedShortlistedForCreatedJob')
    .controller('ProfileViewShortlistedController', ProfileViewShortlistedController);

    function ProfileViewShortlistedController($stateParams, JobService, $state) {
        var self = this;
        self.navigateBack = navigateBack;
        
        console.log('$stateParams', $stateParams);

        JobService.fetchProfile($stateParams.profile_id).then(function(data){
                console.log(data);
                    self.profile = data.payload;
                    console.log(self.profile);
        });



    function checkForSkill(skill) {
    console.log(skill);
    if(skill == "All Skills") {
        self.allSkillsActivated = true;
    }else {
       self.allSkillsActivated = false; 
    }
}


function navigateToNextProfile(){

    var nextId = findNextId(self.profileIds, self.currentProfileId, 0);
    console.log('Next Profile', nextId);
    
    // If nextProfile Exist
    if(nextId!==undefined) {
        $state
            .go('dashboard.jobs.profileView',{
                job_id: $stateParams.job_id,
                profile_id: nextId
            });
    }
    // If Array Exhausts and Current Profile is last profile, then
    else {
        console.log('Now we are here');
        // Step 1 - Create new profileIds Stack
        JobService
            .fetchProfilesForCreatedJob()
                .then(function(data){
                    // console.log(data);
                    self.newProfiles = data;

                    // Concatinate IDS OF NEW PROFILE TO OLD STACK HERE
                    var newProfileIds = self.newProfiles.map(function(profile){
                        return profile.id;
                    });
                    console.log('newProfileIds', newProfileIds);

                    self.profileIds = self.profileIds.concat(newProfileIds);
                    console.log('New ProfileStack Inside', self.profileIds);

                    // Step 2 - Call findNextId with this new ProfileStack
                    var nextId = findNextId(self.profileIds, self.currentProfileId, 6);
                    alert(nextId);
                    console.log('Next Profile id Now Bitch', nextId);

                    // Step 3 -  Make State triggers new Profiles based on next Id
                    $state
                        .go('dashboard.jobs.profileView',{
                            job_id: $stateParams.job_id,
                            profile_id: nextId
                        });
                });
       
    }

}

function findNextId(profiles, currentId, spider) {
  
  console.log('Profiles Receieved', profiles);
  console.log('Current Id', currentId);

  var nextProfile;
  for(var i=spider; i<profiles.length; i++) {
    
    if( profiles[i] === currentId ) {
      i++;
      nextProfile = profiles[i]; 
      console.log('nextId Found', nextProfile);
      break;
    }
  } 
  return nextProfile;
}




function navigateBack() {

    $state.go('dashboard.jobs.profilesShortlisted', { id: $stateParams.job_id })
}


}



})();