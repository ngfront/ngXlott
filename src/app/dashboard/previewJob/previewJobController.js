(function() {
    'use strict';

    angular
    .module('app.dashboard.previewJob')
    .controller('previewJobController', previewJobController);


    function previewJobController($state, $stateParams, JobService, authService, companyService) {
    	var self = this;

        var jobId = $stateParams.jobId;

    	jQuery('.primaryInteractionArea').addClass('hugeModal');

        jQuery('body').addClass('opDetails');

    	self.navigateToCreateJob = navigateToCreateJob;
        self.company_id = authService.getCompanyId();

        var heightToGive = jQuery('.opDetails .primaryInteractionArea.hugeModal').height();
        jQuery('body').height(2100);
        console.log(heightToGive);

        //
        init();

        function init(){
            
            //jQuery('.primaryInteractionArea.hugeModal').insertBefore(jQuery('body > .container'));

            self.companyId = authService.getCompanyId();

            JobService.fetchJob(jobId).then(function(data){
                self.job = data.payload;
                console.log('job details', self.job);
                self.job.areaToContribute = self.job.areaToContribute.split(",");
                self.job.skillsToDisplay = self.job.jobs_skills.map(function(skill){
                    return {
                        skill: skill.skill.display,
                        rating: skill.score
                    };
                })
            })

            // Fetch Comapny details
            companyService.fetchCompany(self.company_id).then(function(data){
                self.company = data.payload;
                console.log('company fetched', self.company);

                // self.job.areaToContribute = self.job.areaToContribute.split(",");
            });

        }
    	function navigateToCreateJob() {
    		// Replace this with previous Location
            jQuery('body').removeClass('opDetails');
            var params = {
                company_id: self.companyId
            }
    		$state.go('dashboard.jobs', params);
    	}
    }

})()