(function() {
    'use strict';

    angular
    .module('app.dashboard.profileView')
    .controller('ProfileViewController', ProfileViewController)
    .filter('limitObjectTo', function() {
  return function(obj, limit) {
     var newObj = {},
      i = 0;
  for (var p in obj) {
    newObj[p] = obj[p];
    if (++i === limit) break;
  }
return newObj;
  };
});


    function ProfileViewController($timeout, $state, $stateParams, JobService) {
        var self = this;
        self.navigateBack = navigateBack;
        self.profile = {};
        var profile_id = $stateParams.profile_id;
        
        self.currentProfileId = $stateParams.profile_id;
        self.profileIds = [];
        self.nextProfile;
        self.navigateToNextProfile = navigateToNextProfile;
        self.limitAllSkills = 3;
        self.allSkillsActivated = true;
        self.checkForSkill = checkForSkill;
        self.showAllSkills = showAllSkills;
        self.showMoreLink = true;
        self.triggerProfileShortlist = triggerProfileShortlist;
        self.page = 1;
        self.spiderToStart = 0;
        console.log('stateParams',$stateParams);
        
        // var job_id = $stateParams.job_id;

        function triggerProfileShortlist() {
          var job_id = $stateParams.job_id;
          var profile_id = $stateParams.profile_id;
          
            JobService.toShortlist(job_id, profile_id).then(function(data){
                    console.log('Shortlisted Data',  data);

                });
        }
        function showAllSkills() {
          self.limitAllSkills = self.numberOfAllSkills;
          self.showMoreLink = false;
        }
             //
            init();

            function init() {

                $timeout(function(){
 jQuery('.skillsRating li').each(function(){
                    var rating = jQuery(this).find('span.rating');
                    console.log(rating);
                    jQuery(this).find('.meter').addClass(rating);
                });
                }, 100)
               

                self.profileIds = $stateParams.profiles;
                 console.log('self.profileIds', $stateParams);

            	JobService.fetchProfile(profile_id).then(function(data){
                console.log(data);
                    self.profile = data.payload;
                    self.Profileskills = data.payload.rank;

                    console.log('Profile Data', self.profile);

                        // Constructing a modded profile Skills 

                    //     var skills = self.profile.skills;
                    //     var allSkills = [];


                    //     for( var key in skills ) {
                    //         if(skills.hasOwnProperty(key)) {

                    //           allSkills.push( skills[key] );
                    //       }  
                    //   }
                    //   var resSkills = {};

                    //   for(var i=0; i<allSkills.length; i++) {
                    //       for(var x in allSkills[i]){
                    //         resSkills[x] = allSkills[i][x];   
                    //     }
                    // }

                    // self.profile.skills.allSkills = resSkills;
                    // console.log(self.profile.skills);
                    // self.numberOfAllSkills = Object.keys(self.profile.skills.allSkills).length;

                    // self.showMoreinAllSkills = self.numberOfAllSkills - self.limitAllSkills;


                    // self.profile.skills = {
                    //     "All Skills": self.profile.skills['allSkills'],
                    //     "Web FrontEnd" : self.profile.skills['Web FrontEnd'],
                    //     "Web Backend" : self.profile.skills['Web Backend'],
                    //     "Emerging" : self.profile.skills['Emerging Skills'],
                    //     "Meta Skill 1" : self.profile.skills['Meta Skill 1'],
                    //     "Meta Skill 2" : self.profile.skills['Meta Skill 2'],
                    //     "Meta Skill 3" : self.profile.skills['Meta Skill 3'],
                    // };

                    // console.log(self.profile.skills);



                });

}

function checkForSkill(skill) {
    console.log(skill);
    if(skill == "All Skills") {
        self.allSkillsActivated = true;
    }else {
       self.allSkillsActivated = false; 
    }
}


function navigateToNextProfile(){

    console.log('self.profileIds', self.profileIds);
    console.log('self.currentProfileId', self.currentProfileId);

    var nextId = findNextId(self.profileIds, self.currentProfileId, self.spiderToStart);

    console.log('Next Profile', nextId);
    
    //If nextProfile Exist
    if(nextId!==undefined) {
        console.log('hurraysdfsdfsdfsd');
        $state.go('dashboard.jobs.profileView',{
                job_id: $stateParams.job_id,
                profile_id: nextId
            });
    }
    // If Array Exhausts and Current Profile is last profile, then
    else {
        var skills = $stateParams.skills;
        ++self.page;
        self.spiderToStart = self.spiderToStart+5;
        console.log('Now we are here');
        // Step 1 - Create new profileIds Stack
        JobService
            .fetchProfilesForCreatedJob(skills,self.page)
                .then(function(data){
                    // console.log(data);
                    self.newProfiles = data.payload;

                    console.log('self.newProfiles', self.newProfiles);

                    //Concatinate IDS OF NEW PROFILE TO OLD STACK HERE
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


function findNextId(profiles, currentId, spiderToStart) {
  
  console.log('Profiles Receieved', profiles);
  console.log('Current Id', currentId);

  var nextProfile;

  for(var i=spiderToStart; i < profiles.length; i++) {
    
    if( profiles[i] == currentId ) {
        //console.log('Hurray');
      ++i;
      console.log('nextId Found', nextProfile);
      nextProfile = profiles[i]; 
      break;
    }

  } 
  console.log('nextProfile', nextProfile);

  return nextProfile;
}




function navigateBack() {

    $state.go('dashboard.jobs.profiles', { id: $stateParams.job_id })
}

}
})();
