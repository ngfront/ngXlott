angular
	.module('growthSkill')
	.controller('growthSkillController', growthSkillController);

function growthSkillController ($timeout, $q, $log, FetchService) {
    var self = this;


      self.job = {};


    self.selectedSkills = [];  // Model
    self.transformChip = transformChip;

    // Custom Additions
    self.skills = [];
    self.selectedSkillsWrap = [];
    self.skillsToLoopOver = [];

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
    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      
      console.log(chip.display);

      self.selectedSkillsWrap.push(chip.display);

      self.job.learningOp = self.selectedSkillsWrap;

    }


  }