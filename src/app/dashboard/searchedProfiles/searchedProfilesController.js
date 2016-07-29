(function() {
    'use strict';

    angular
    .module('app.dashboard.profileView')
    .controller('searchedProfilesController', searchedProfilesController)
    .directive('profileCard', profileCard);


        function profileCard() {
            var DDO = {
                restrict: 'E',
                templateUrl: 'src/app/widgets/profileCard/profilecard.html',
                controller: 'profileCardController',
                link: function(scope, element, attrs) {
                    
                    var triggerOptions = element.find('.viewmore');
                    
                    triggerOptions.bind('click', function(event) {
                        console.log(event);
                        
                    });
                }

            };  

            return DDO;
        }
    function searchedProfilesController(JobService, $stateParams, $state, authService, $timeout) {


        jQuery('.profileSwitcher li:nth-child(1)').addClass('active');
         jQuery('.profileSwitcher li:nth-child(2)').removeClass('active');

        var self = this;
        self.profileWrap = [];
        self.queryParams = $stateParams.skills;
        self.onProfileSelect = onProfileSelect;
        
        self.skillsSelected = [];
        self.loadMoreProfiles = loadMoreProfiles;
        self.page = 1;
        self.triggerProfileShortlist = triggerProfileShortlist;
        self.displayShortlistedProfiles = displayShortlistedProfiles;
        self.filterResults = filterResults;
        self.showFilters = false;
        self.toggleFilters = toggleFilters;

        self.locationsForFilter = ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Pune"];

        self.skillsForFilter = JobService.getSearchedSkills();

        self.profiles_shortlisted = $stateParams.profiles_shortlisted;
        self.redirectToCreateJob = redirectToCreateJob;


        function redirectToCreateJob() {
            self.companyId = authService.getCompanyId();

            var params = {
                companyId: self.companyId
            }
            $state.go('dashboard.createJob', params);
        }
        function filterResults(filters) {

            var filteredSkills = self.skillsForFilter.map(function(skill){
                return {
                    score: skill.score,
                    skillId: skill.skillId
                }
            })
            console.log(filteredSkills);
            //var locationsSelected = self.filters.location;

            JobService.fetchProfilesForSearchedSkills(filteredSkills, self.page).then(function(data){
                self.profileWrap = data.payload;
                console.log('new profiles', self.profileWrap);
            })
        
        }   


        function toggleFilters(){
            self.showFilters = !self.showFilters;
         //console.log('$stateParams on search roll', $stateParams);
        }


        function displayShortlistedProfiles() {

            self.skillsToPass = JobService.getSearchedSkills();

            var params = {
                skills: self.skillsToPass,
               total_profiles: self.totalProfileCount
            }
            $state.go('dashboard.searchedProfilesShortlisted', params);
        }

        jQuery('.primaryInteractionArea').addClass('hideSecNav viaSearch');
        
        var jobId = $stateParams.id;

        console.log('$stateParams on thissss', $stateParams);

        var skillsIdFetched = $stateParams.skills;
        
        console.log('skillsIdFetched', skillsIdFetched);

        var newSkill = skillsIdFetched.map(function(skillId){
            return {
                skillId: skillId,
                score: 3
            }
        });
        
   

        console.log('newSkill', newSkill);

        JobService.fetchProfilesForSearchedSkills(newSkill, self.page)
        .then(function(data){
            console.log('Profiles Data Fetched', data);
            self.totalProfileCount = data.count;

            self.profileWrap = data.payload;
            self.profilesId = self.profileWrap.map(function(profile){
                return profile.id;
            });
        });
        
        





        function loadMoreProfiles() {
            self.page = ++self.page;
            
            console.log('newSkill ', newSkill);
            console.log('page', self.page);

            JobService.fetchProfilesForSearchedSkills(newSkill, self.page)  // Initially requesting page 1
            .then(function(data){

                console.log('self.profileWrap before', self.profileWrap);

                self.profileWrap = self.profileWrap.concat(data.payload);

                console.log('self.profileWrap after', self.profileWrap);

                self.profilesId = self.profileWrap.map(function(profile){
                    return profile.id;
                });
            });
        }

        

        function triggerProfileShortlist(profileId) {
            
            var _this = jQuery(this);
            jQuery(_this).click(function(event){
                $(_this).siblings('.displayJobs').show();
            })

            // Fetch Jobs here for Company Id
            var company_id = authService.getCompanyId();

             JobService.fetchCreatedJobs(company_id).then(function(data){

                    self.jobs = data.payload.map(function(job){
                        return job.title
                    });
                    
                    console.log('self.jobsList', self.jobs);        

                });

        }



        function onProfileSelect(profile_id) {
            console.log('on profile select $stateParams.skills', $stateParams.skills);

            // var params = {
            //    profile_id : profile_id,
            //     skills: $stateParams.skills 
            // };


           
            // $state.go("dashboard.profileViewViaSkillSearch", params);
        }



    }
})();
