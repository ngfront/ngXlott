(function() {
    'use strict';

    angular
    	.module('app.dashboard.createdJobs')
    	.controller('CreatedJobsController', CreatedJobsController)
        .directive('jobCard', jobCard)
        .filter('reverse', function() {
            return function(items) {
                return items.slice().reverse();
            };
        });
        function jobCard() {
            var DDO = {
                restrict: 'E',
                // scope: {
                //     jobsList: "="
                // },
                templateUrl: 'src/app/widgets/jobCard/jobcard.html',
                controller: 'jobCardController',
                link: function(scope, element, attrs) {
                    // console.log('scope', scope);
                    var triggerOptions = element.find('.viewmore');
                    console.log('triggerOptions', triggerOptions);
                    triggerOptions.bind('click', function(event) {
                        console.log(event);
                        // var optionsPanel = $(this).siblings('.jobPanel');
                        // optionsPanel.show();
                        // scope.togglejobPanel = true;
                        // console.log(scope);
                    });
                }

            };  

            return DDO;
        }
        function CreatedJobsController(JobService, $stateParams, $state, authService) {
            var self = this;
            self.jobsList = [];
            self.showJobOptions = false;

            self.toggleJobOptions = toggleJobOptions;
            self.editJob = editJob;
            self.deleteJob = deleteJob;
            self.previewJob = previewJob;
            self.copyJob = copyJob;
            self.fetchProfiles = fetchProfiles;
            self.migrateToProfilesState = migrateToProfilesState;
            self.TravelToCreateJobState = TravelToCreateJobState;
            self.profileLocation = [];
            self.optionsPanel = false;

            console.log('$stateParams', $stateParams);

            var company_id = $stateParams.company_id;


            function migrateToProfilesState(jobId, jobSkills, location) {
                var jobId = jobId;
                var jobSkill = jobSkills;
                
                self.profileLocation.push(location);

                var params = {
                    "id": jobId,
                    "skills": jobSkill,
                    "location" : self.profileLocation
                };

                console.log('Params passed to fetch Profiles', params);
                $state.go('dashboard.jobs.profiles', params);
            }

            function TravelToCreateJobState() {
                var params = {
                    companyId: company_id
                }
                $state.go('dashboard.createJob',params)
            }

            // Fetching authToken Globally
            var authToken = authService.getAuthToken();
            console.log('Auth Token Saved'+authToken);  

            // If authtoken is present 
            if(authToken) {
                init();
                console.log('Auth Token is fetched from LS');
            }else {
                $state.go('auth');
            }

            // Fetching Created Jobs
            function init() {

                var company_id = $stateParams.company_id;

                JobService.fetchCreatedJobs(company_id).then(function(data){
                	self.jobsList = data.payload;  
                    console.log('self.jobsList',self.jobsList);        

                    // var idOfLastJob = self.jobsList[self.jobsList.length-1].id;
                    // var skillsOfLastJob = self.jobsList[self.jobsList.length-1].jobs_skills; 

                    // fetchProfiles(idOfLastJob, skillsOfLastJob); 

                });

                // Setting CompanyId in LS
                 var company_id = $stateParams.company_id;
                console.log('company_id', company_id);
                authService.setCompanyId(company_id);


            }

            // Fetching Profiles
            function fetchProfiles(jobId, jobSkills) {

                console.log('Job iD', jobId);
                
                var jobSkills = jobSkills.toString();
                console.log('Job Skills', jobSkills);

                var params = {
                    skillId: jobId,
                    skills: jobSkills
                }
                $state.go('dashboard.jobs.profiles', params);
            }

       

            function toggleJobOptions() {                
                // self.jobsList[index].showJobPanel = !self.jobsList[index].showJobPanel;
                self.optionsPanel = !self.optionsPanel;
                console.log(self.optionsPanel);
            }

            function editJob(jobId) {
                
                $state.go('dashboard.editJob', {jobId: jobId, companyId: company_id});
            }
            function deleteJob(jobId) {
                console.log('Job to be Deleted', jobId);
                JobService.deleteJob(jobId).then(function(data){
                    console.log('data returned when job gets deleted', data);

                    JobService.fetchCreatedJobs(company_id, authToken).then(function(data){
                    self.jobsList = data.payload;  
                    console.log('self.jobsList',self.jobsList);        

                    // var idOfLastJob = self.jobsList[self.jobsList.length-1].id;
                    // var skillsOfLastJob = self.jobsList[self.jobsList.length-1].jobs_skills; 

                    // fetchProfiles(idOfLastJob, skillsOfLastJob); 

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
