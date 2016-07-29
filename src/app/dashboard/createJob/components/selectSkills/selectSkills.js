angular
  .module('selectskillsComponent')
  .controller('selectSkillsController', selectSkillsController);

function selectSkillsController ($scope, $timeout, $q, $log, $http, FetchService) {
    var self = this;
    self.job = {};


    self.selectedSkills = [];  // Model
    self.transformChip = transformChip;

    // Custom Additions
    self.skills = [];
    self.selectedSkillsWrap = [];
    self.skillsToLoopOver = [];
    self.job.jobs_skills = [];
    self.displayError = false;

    init();

    function init() {

      FetchService.loadSkills()
        .then(function(data){
          var allSkills = data.map(function(skill){
            return { id: skill.id, value: skill.value.toLowerCase(), display: skill.value }
          });
          self.skills = self.skills.concat(allSkills);
        });

    }


    function transformChip(chip) {
      
      self.job.jobs_skills = self.job.jobs_skills || [];

      console.log('skilll To Add',chip);
      
      console.log('self.job.jobs_skills', self.job.jobs_skills);
      
      if(self.job.jobs_skills.length == 0) {
        chip.score = 3;
        var skillsObj = {skillId: chip.id, display: chip.value, score: chip.score};
        self.job.jobs_skills.push(skillsObj);
      }else{
        for(var i=0; i<self.job.jobs_skills.length;i++) {

          if(chip.id == self.job.jobs_skills[i].skillId){
            self.displayError = true;
            break;
          }else {
            self.displayError = false;
            chip.score = 3;
            var skillsObj = {skillId: chip.id, display: chip.value, score: chip.score};
            self.job.jobs_skills.push(skillsObj);
            break;
          }
        }
      }
      console.log('self.job.jobs_skills', self.job.jobs_skills);
      // self.job.jobs_skills.map(function(skill){
      //   console.log('sdfsdf');
      //     if(chip.skillId == skill.skillId){
      //       alert('skill already addedd');
      //     }else {
      //       chip.score = 3;
      //        var skillsObj = {skillId: chip.id, display: chip.value, score: chip.score};
      //        self.job.jobs_skills.push(skillsObj);
      //     }
      // });
      

    }

    
    
  }