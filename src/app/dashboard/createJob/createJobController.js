(function() {
    'use strict';

    angular
    .module('app.dashboard.createJob')
    .controller('createJobController', createJobController)
    .directive('selectLocation', selectLocation)
    .directive('selectSkills', selectSkills)
    .directive('ctcMin', ctcMin)
    .directive('ctcMax', ctcMax)
    .directive('eqMin', eqMin)
    .directive('eqMax', eqMax)
    .directive('growthSkill', growthSkill)

    function createJobController($state, $stateParams, companyService, END_POINTS,  $http) {
      var self = this;
      self.job = {};


      self.saveJobDetails = saveJobDetails;
      self.saveAndTravel = saveAndTravel;

      self.areasToContribute = [];

      self.areasToContribute = [
      'Product Design',
      'FrontEnd Development',
      'Backend Development',
      'Database',
      'Algorithm',
      'Machine Learning',
      'Big Data'
      ];

      init();

      function init() {
        var companyId = $stateParams.companyId;
    }

    jQuery('.primaryInteractionArea').addClass('CreateJobView');

    function saveJobDetails(job) {
      
        console.log('Job Details', job);
    }

    function saveAndTravel(job) {
        job.areaToContribute = job.areaToContribute || '';
        job.learningOp = job.learningOp || '';

        var modAreaToContribute = job.areaToContribute.toString();
        var modLearningOp = job.learningOp.toString();

        console.log('LOP', modLearningOp);
        
        self.job.areaToContribute = modAreaToContribute;
        self.job.learningOp = modLearningOp;
            
        job.companyId = $stateParams.companyId;
        console.log('Job Details Sent', job);
        companyService.saveJob(job).then(function(data){
            console.log(data);

            var params = {
                company_id : data.companyId
            };

            $state.go('dashboard.jobs', params);
        });
    }

}



function selectLocation() {
  var DDO = {
    restrict: 'E',
    scope: {
        job: "="
    },
    templateUrl: 'src/app/dashboard/createJob/components/locationSelection/locationSelection.html',
    controller:'locationSelectionController as ls',
    bindToController: true
}

return DDO;
}

function ctcMin() {
    var DDO = {
        restrict: 'E',
        scope: {
            job: "="
        },
        templateUrl: 'src/app/dashboard/createJob/components/ctcMin/ctcMin.html',
        controller:'ctcMinController as cmin',
        bindToController: true
    }

    return DDO;
}

function ctcMax() {
    var DDO = {
        restrict: 'E',
        scope: {
            job: "="
        },
        templateUrl: 'src/app/dashboard/createJob/components/ctcMax/ctcMax.html',
        controller:'ctcMaxController as cmax',
        bindToController: true
    }

    return DDO;
}

function eqMin() {
    var DDO = {
        restrict: 'E',
        scope: {
            job: "="
        },
        templateUrl: 'src/app/dashboard/createJob/components/equityMin/equityMin.html',
        controller:'eqMinController as eqmin',
        bindToController: true
    }

    return DDO;
}

function eqMax() {
    var DDO = {
        restrict: 'E',
        scope: {
            job: "="
        },
        templateUrl: 'src/app/dashboard/createJob/components/equityMax/equityMax.html',
        controller:'eqMaxController as eqmax',
        bindToController: true
    }

    return DDO;
}

function selectSkills() {
    var DDO = {
        restrict: 'E',
        scope: {
            job: "="
        },
        templateUrl: 'src/app/dashboard/createJob/components/selectSkills/selectSkills.html',
        controller:'selectSkillsController as ss',
        bindToController: true
    }

    return DDO;
}

function growthSkill() {
    var DDO = {
        restrict: 'E',
        scope: {
            job: "="
        },
        templateUrl: 'src/app/dashboard/createJob/components/growthSkill/growthSkill.html',
        controller:'growthSkillController as gs',
        bindToController: true
    }

    return DDO;
}


})();
