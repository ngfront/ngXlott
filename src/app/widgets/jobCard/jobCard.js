(function() {
	'use strict';

	angular
	.module('app.widget.jobCard')
	.controller('jobCardController', jobCardController);

	function jobCardController($scope,$timeout, $state, $stateParams,JobService) {

		$scope.migrateToProfilesState = migrateToProfilesState;
		$scope.toggleJobOptions = toggleJobOptions;

    $scope.editJob = editJob;
    $scope.deleteJob = deleteJob;
    $scope.previewJob = previewJob;
    $scope.copyJob = copyJob;

    var company_id = $stateParams.company_id;

    jQuery('.jobPanel').hide();

    jQuery('.viewmore').click(function(){
      jQuery(this).addClass('active');
      jQuery(this).siblings('.jobPanel').show('slow').addClass('active-options');
   });

    // $scope.closeThis = function() {
    //   jQuery('.jobPanel').hide();
    // }

     // Hiding joboptions
     jQuery(document).mouseup(function (e)
     {
      var container = jQuery(".active-options");
          if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
          {
            container.hide();
            jQuery('.viewmore').removeClass('active');
          }
        });



     function migrateToProfilesState(jobId, jobSkills) {

      var jobId = jobId;
      var jobSkill = jobSkills;

      var skillsToSave = jobSkill.map(function(skill){
        return {
          score: skill.score,
          skillId: skill.skill.id,
          display: skill.skill.display
        }
      });

      JobService.savejobSkills(skillsToSave);

      var modSkills = jobSkill.map(function(skill){
        return {
          score: skill.score,
          skillId: skill.skill.id
        }
      });

      var params = {
       "id": jobId,
       "skills": modSkills,
       "location" : $scope.profileLocation
     };

     $state.go('dashboard.jobs.profiles', params);

   }
   function toggleJobOptions() {                
    $scope.optionsPanel = !$scope.optionsPanel;
  }


  function editJob(jobId) {

   $state.go('dashboard.editJob', {jobId: jobId, companyId: company_id});
 }

 function deleteJob(jobId) {

   JobService.deleteJob(jobId).then(function(data){

    JobService.fetchCreatedJobs(company_id).then(function(data){
      $scope.cj.jobsList = data.payload; 
    });


  })
 }

 function previewJob(jobId) {
   var params = {
    jobId: jobId
  };

  $state.go('dashboard.previewJob', params);
}

function copyJob(job) {
 console.log(job);
}

}
})();