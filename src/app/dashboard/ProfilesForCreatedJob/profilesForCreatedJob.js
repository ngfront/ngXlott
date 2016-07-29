(function() {
    'use strict';

    angular
    .module('app.profilesForCreatedJob')
    .controller('ProfilesForCreatedJobController', ProfilesForCreatedJobController);


    function ProfilesForCreatedJobController($http,$scope,$state, $stateParams, JobService, $filter) {
        var self = this;
        self.profileWrap = []; 
        self.onProfileSelect = onProfileSelect;
        self.filterResults = filterResults;
        self.showFilters = false;
        self.toggleFilters = toggleFilters;

        self.selectedLocations = selectedLocations;
        self.filters = { };
        self.profilesId = [];
        self.triggerProfileShortlist = triggerProfileShortlist;
        self.displayShortlistedProfiles = displayShortlistedProfiles;
        self.displayAllProfiles = displayAllProfiles;
        self.loadMoreProfiles = loadMoreProfiles;
        self.skillsForFilter = [];

        var job_id = $stateParams.id;
        var companyId = $stateParams.company_id;
        var skillsForJob = [];

        var skillsForJob = $stateParams.skills;
        var location = $stateParams.location;

        self.locationsForFilter = ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Pune"];
        
        self.page = 1;

        console.log('$stateparams fetched when job is selected', $stateParams);
        

        init();

          function filterResults(filters) {

            var filteredSkills = self.skillsForFilter.map(function(skill){
                return {
                    score: skill.score,
                    skillId: skill.skillId
                }
            })
            console.log(filteredSkills);
            var locationsSelected = self.filters.location;

            JobService.fetchProfilesForSearchedSkills(filteredSkills, self.page).then(function(data){
                self.profileWrap = data.payload;
                console.log('new profiles', self.profileWrap);
            })
        
        }



        function init() {

            jQuery('.profileSwitcher li:nth-child(1)').addClass('active');

            self.profilesShortlisted = $stateParams.profiles_shortlisted;
            
            // Fetch skills from Filter

            self.skillsForFilter = JobService.getJobSkills();


                
            if(skillsForJob == null) {

                JobService.fetchJob(job_id).then(function(data){
                     var skillsForJob = data.payload.jobs_skills;
                    //console.log('Now NowNowNowNowNowNowskillsForJob brute', skillsForJob);

                    skillsForJob = skillsForJob.map(function(spider){
                        return {
                            skillId: spider.skill.id,
                            score: spider.score
                        }
                    });

                    // First Call to fetch All PROFILES

                    JobService.fetchProfilesForCreatedJob(skillsForJob, self.page)  // Initially requesting page 1
                        .then(function(data){
                            console.log('data', data);
                            self.profileWrap = data.payload;
                            
                            self.profileCount = data.count;

                            self.profilesId = self.profileWrap.map(function(profile){
                                return profile.id;
                            });
                        });

                        JobService.fetchShortlistedProfiles($stateParams.id)
                .then(function(data){
                    console.log('Shortlisted Profiles Data Fetched', data);
                        self.shortlistedProfiles = data;
                        self.shortlistedProfileCount = self.shortlistedProfiles.length;
                    });
                   
                });   
            }

            // Normal Job Call
            else {
                JobService.fetchProfilesForCreatedJob(skillsForJob, self.page)  // Initially requesting page 1
                        .then(function(data){

                            JobService.fetchShortlistedProfiles($stateParams.id)
                                .then(function(data){
                                console.log('Shortlisted Profiles Data Fetched', data);
                        self.shortlistedProfiles = data;
                        self.shortlistedProfileCount = self.shortlistedProfiles.length;
                    });


                            console.log('data', data);
                            self.profileWrap = data.payload;
                            self.profileCount = data.count;
                            self.profilesId = self.profileWrap.map(function(profile){
                                return profile.id;
                            });
                        });
                // Fetch also shortlisted count
                
                
            }
            
            }

            function triggerProfileShortlist(profileId) {
                JobService.toShortlist(job_id, profileId).then(function(data){
                })
            }

            function displayShortlistedProfiles() {
                
                var params = {
                    id : job_id,
                    total_profiles : self.profileCount
                };
                $state.go('dashboard.jobs.profilesShortlisted', params);
            }

            function onProfileSelect(profile_id) {
                
                var skillsToTransfer = $stateParams.skills;
                $state.go("dashboard.jobs.profileView",{ 'job_id': job_id, 'profile_id':profile_id, profiles: self.profilesId, skills: $stateParams.skills});
            }

            function toggleFilters() {
                self.showFilters = !self.showFilters;
            }

            function selectedLocations() {
             self.locationSelected = $filter('filter')(self.locations, {checked: true});

             return function () {
                self.locationSelected;
            }
        }

        function loadMoreProfiles() {
            self.page = ++self.page;            

            JobService.fetchProfilesForCreatedJob(skillsForJob, self.page)  // Initially requesting page 1
                    .then(function(data){
                        

                        self.profileWrap = self.profileWrap.concat(data.payload);


                        self.profilesId = self.profileWrap.map(function(profile){
                            return profile.id;
                        });

                    });
        }



        function displayAllProfiles() {
            var params = {
                id: job_id
            };
            $state.go('dashboard.jobs.profiles', params);
        } 

        




        


    }
})();
