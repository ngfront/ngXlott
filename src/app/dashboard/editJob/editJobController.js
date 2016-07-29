(function() {
    'use strict';

    angular
    .module('app.dashboard.editJob')
    .controller('editJobController', editJobController)
    .directive('editLocation', editLocation)
    .directive('editSkills', editSkills)
    .directive('editctcMin', editctcMin)
    .directive('editctcMax', editctcMax)
    .directive('editeqMin', editeqMin)
    .directive('editeqMax', editeqMax)
    .directive('editgrowthSkill', editgrowthSkill)

    function editJobController($stateParams, JobService, $state, job) {
    	var self = this;

        self.areasToContribute = ['Product Design',
                                    'FrontEnd Development',
                                    'Backend Development',
                                    'Database',
                                    'Algorithm',
                                    'Machine Learning'];

    	// Taking out stateParms
    	var companyId = $stateParams.companyId;
    	var jobId = $stateParams.jobId;

    	// console.log('CompanyId for job to be Edited', companyId);
    	// console.log('JobId for job to be Edited', jobId);
    	
    	self.saveJobDetails = saveJobDetails;
        self.saveAndTravel = saveAndTravel;

        jQuery('.primaryInteractionArea').addClass('EditJobView');


    	init();

    	function init() {
            console.log('job fetehed', job);

            self.editjob = job;
            self.editjob.areaToContribute = self.editjob.areaToContribute.split(',');
            console.log(self.editjob);

    		// Fetch Job data now
            // JobService.fetchJob(jobId).then(function(data){
            //     console.log('jobdata', data);
            //      var jobDetails = data.payload;
                 
            //      self.job = jobDetails;

            //       self.areasToContribute = [
            //             'Product Design',
            //             'FrontEnd Development',
            //             'Backend Development',
            //             'Database',
            //             'Algorithm',
            //             'Machine Learning'
            //     ];

            //      self.job.areaToContribute = self.job.areaToContribute.split(',');

            //      console.log('total areas to repeat', self.areasToContribute);
            //      console.log('Should be already checked', self.job.areaToContribute);
            // });



        }

        function saveJobDetails(job) {
            
            
            
            var temp = job.learningOp.map(function(data){
                return data.display;
            });
            job.learningOp = temp.toString();
            job.areaToContribute = job.areaToContribute.toString();
            // delete job.areasToContribute;

            
            

            // console.log('Job details Edited', job);

         //  JobService.updateJob(job).then(function(data){
         //     console.log('Job Modified', data);
         // });
         console.log(job);
      }

       function saveAndTravel(job) {
        console.log('Job to be saved', job);

          var temp = job.learningOp.map(function(data){
                return data.display;
            });
            delete job.areasToContribute;

            job.areaToContribute = job.areaToContribute.toString();
            job.learningOp = temp.toString();

            console.log('Job details Edited', job);
            
            JobService.updateJob(job).then(function(data){
             console.log('Job Modified', data);

             var params = {
                company_id: companyId
             };

             console.log('params', params);

             $state.go('dashboard.jobs', params);

        });
            
      }


  }


  function editLocation() {

    var DDO = {
        restrict: 'E',
        templateUrl: 'src/app/dashboard/editJob/components/locationSelection/locationSelection.html',
        controller:'editlocationSelectionController'
    }

  

    return DDO;
}


function editSkills() {
    var DDO = {
        restrict: 'E',
        templateUrl: 'src/app/dashboard/editJob/components/selectSkills/selectSkills.html',
        controller:'editSkillsController'
    }

    return DDO;
}

function editctcMin() {
    var DDO = {
        restrict: 'E',
        
        templateUrl: 'src/app/dashboard/editJob/components/ctcMin/ctcMin.html',
        controller:'editctcMinController',
        
    }

    return DDO;
}

function editctcMax() {
    var DDO = {
        restrict: 'E',
        
        templateUrl: 'src/app/dashboard/editJob/components/ctcMax/ctcMax.html',
        controller:'editctcMaxController',
        
    }

    return DDO;
}

function editeqMin() {
    var DDO = {
        restrict: 'E',
       
        templateUrl: 'src/app/dashboard/editJob/components/equityMin/equityMin.html',
        controller:'editeqMinController',
        
    }

    return DDO;
}

function editeqMax() {
    var DDO = {
        restrict: 'E',
        
        templateUrl: 'src/app/dashboard/editJob/components/equityMax/equityMax.html',
        controller:'editeqMaxController',
        
    }

    return DDO;
}


function editgrowthSkill() {
    var DDO = {
        restrict: 'E',
      
        templateUrl: 'src/app/dashboard/editJob/components/growthSkill/growthSkill.html',
        controller:'editgrowthSkillController',
        
    }

    return DDO;
}



})();

