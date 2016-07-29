angular
	.module('editgrowthSkill')
	.controller('editgrowthSkillController', editgrowthSkillController);

function editgrowthSkillController ($scope, $timeout, $q, $log, FetchService) {
    


      // $scope.job = {};


    $scope.selectedSkills = [];  // Model
    $scope.transformChip = transformChip;

    // Custom Additions
    $scope.skills = [];
    
    // $scope.selectedSkillsWrap = [];
    // $scope.skillsToLoopOver = [];

    // $timeout(function(){
    //   // console.log('$scope on growth skill', $scope);
      
      

    // }, 5000);

  var skillArray = $scope.ej.editjob.learningOp.split(",");

      // console.log('skill array', skillArray);
      
      $scope.prevSkills = skillArray.map(function(spider){
        return {
          id: '',
          value: spider,
          display: spider 
        };
      })

      $scope.ej.editjob.learningOp = $scope.prevSkills;

    init();

    function init() {

      FetchService.loadSkills()
        .then(function(data){
          // console.log('skills data coming', data);
          var allSkills = data.map(function(skill){
            return { id: skill.id, value: skill.value.toLowerCase(), display: skill.value }
          });
          $scope.skills = $scope.skills.concat(allSkills);
        });

    }
    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      
      // console.log('chip added', chip);
      
      var chip = chip.display;

      // $scope.selectedSkillsWrap.push(chip.display);

      //$scope.job.learningOp = $scope.selectedSkillsWrap;

      $scope.ej.editjob.learningOp = chip;
      
      $scope.ej.editjob.learningOp = $scope.prevSkills;

      console.log('$scope.job.learningOp', $scope.ej.editjob.learningOp);


    }


  }