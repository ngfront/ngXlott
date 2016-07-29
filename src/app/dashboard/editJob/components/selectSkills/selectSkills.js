angular
  .module('editskillsComponent')
  .controller('editSkillsController', editSkillsController);

function editSkillsController ($scope, $timeout, $q, $log, $http, FetchService) {
    // var $scope = this;
    // $scope.job = {};


    $scope.selectedSkills = [];  // Model
    $scope.transformChip = transformChip;

    // Custom Additions
    $scope.skills = [];
    $scope.selectedSkillsWrap = [];
    $scope.skillsToLoopOver = [];
    $scope.skills = [];
    init();
    $scope.job = {};

    //  $timeout(function(){
    //   // console.log('$scope on growth skill', $scope);
      
    //   var skillArray = $scope.job.learningOp.split(",");

    //   // console.log('skill array', skillArray);
      
    //   $scope.prevSkills = skillArray.map(function(spider){
    //     return {
    //       id: '',
    //       value: spider,
    //       display: spider 
    //     };
    //   })

    //   $scope.job.learningOp = $scope.prevSkills;

    // }, 5000);

        //var skillsRecieved =  $scope.ej.editjob.jobs_skills;
        

        console.log('skillsRecieved', skillsRecieved);

 // $timeout(function(){



 //      }, 5000);



      var skillsRecieved =  $scope.ej.editjob.jobs_skills;
        
        console.log('skillsRecieved', skillsRecieved);  

        $scope.skillsToEdit = skillsRecieved.map(function(spider){
          return {
            score: spider.score,
            display: spider.skill.display,
            skillId: spider.skill.id
          }
        });

        //console.log('$scope.skills', $scope.skills);

        $scope.ej.editjob.jobs_skills = $scope.skillsToEdit;



    function init() {

      FetchService.loadSkills()
        .then(function(data){
          var allSkills = data.map(function(skill){
            return { id: skill.id, value: skill.value.toLowerCase(), display: skill.value, score: 3 }
          });
          $scope.skills = $scope.skills.concat(allSkills);
        });

    }
 

    function transformChip(chip) {
      
      console.log(chip);

      var chip = chip.display;

      //$scope.skillsToEdit = 
      // var skillsObj = { id: chip.id, display: chip.value, score: 3 };
      // $scope.skillsToLoopOver.push(skillsObj);

      // $scope.job.jobs_skills = $scope.skillsToLoopOver.map(function(skill){
      //   return {
      //     skillId : skill.id,
      //     score: skill.score
      //   }
      // })

      //$scope.job.jobs_skills = $scope.skillsToLoopOver;

    }

    
    
  }