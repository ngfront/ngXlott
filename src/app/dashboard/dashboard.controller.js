(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('dashboardController', dashboardController);


  function dashboardController($scope, $log, $state, JobService, FetchService, authService) {
    var self = this;
    self.showSecNav = true;
    self.takeSecNavFromAshes = takeSecNavFromAshes;
   	self.selectedSkills = [];  // Model
    self.transformChip = transformChip;
    self.removeSkill = removeSkill;

    // Custom Additions
    self.skills = [];
    self.selectedSkillsWrap = [];
    self.skillsToLoopOver = [];
    self.skillSelected = [];
    self.selectedSkillId = [];
    self.companyId;
    self.ifIAmVisible = false;
    init();

    self.skillsToBeStoredLocally = [];

     // Hiding joboptions
     jQuery(document).mouseup(function (e)
     {
      var container = jQuery("ul.companyDrop");
          if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
          {
            container.hide();
            jQuery('.viewmore').removeClass('active');
          }
        });
     
     jQuery('.companyDrop').hide();

     jQuery('.avatarWrap').click(function(){
      jQuery('.companyDrop').toggle('fast');
     })

    function init() {
      // Fetch Company id
      // 
      self.companyId = authService.getCompanyId();

      // console.log('companyId in dashboard parent controller', self.companyId);
      // console.log(self)
      FetchService.loadSkills()
      .then(function(data){
        var allSkills = data.map(function(skill){
          return { id: skill.id, value: skill.value.toLowerCase(), display: skill.value }
        });
        self.skills = self.skills.concat(allSkills);
      });
    }

    function removeSkill(chip) {

      console.log('self.skillsToBeStoredLocally is right now ', self.skillsToBeStoredLocally);
      
      var skillsStored = self.skillsToBeStoredLocally;

      console.log('Chip Fetch',  chip);

      var res = skillsStored
      .filter(function(skill){
        return skill.skillId == chip.id
      }).map(function(spider){
        return spider.skillId
      })

      console.log(res[0]);

      function findIndex(skillsStored, res) {
        for(var i=0; i<skillsStored.length; i++) {
          if( skillsStored[i].skillId == res[0] ) {
            var index = i;
            break;
          }
        }
        return index;
      }

      var iToDelete = findIndex(skillsStored, res);

// Now Splice
skillsStored.splice(iToDelete, 1);

console.log('org array now', skillsStored);



// Store this array locally and search again
JobService.saveSearchedSkills(skillsStored);

self.selectedSkillId = skillsStored.map(function(spider){
  return spider.skillId
});

console.log('SkilliDS AFTER DELETION', self.selectedSkillId);

 var params = {
        skills : self.selectedSkillId
      };

      $state.go('dashboard.searchedProfiles', params);



}
function takeSecNavFromAshes() {
  jQuery('.listJobs').addClass('active');
   jQuery('.primehome').removeClass('active');
  jQuery('.primaryInteractionArea').removeClass('hideSecNav');
}

function transformChip(chip) {

      // console.log('this is skill', chip);
      console.log('aakash');

      var skill = {
        skillId: chip.id,
        display: chip.display,
        score: 3
      };

      self.skillsToBeStoredLocally.push(skill);

      // Now save it locally
      JobService.saveSearchedSkills(self.skillsToBeStoredLocally);

      jQuery('.primaryInteractionArea').addClass('hideSecNav');

      self.selectedSkillId.push(chip.id);


      var params = {
        skills : self.selectedSkillId
      };

      $state.go('dashboard.searchedProfiles', params);



    }

  }

})();
