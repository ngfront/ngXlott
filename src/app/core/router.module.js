

(function() {
    'use strict';

    var app = angular
        .module('app.router', []);

    app.run(function($rootScope){
          $rootScope.$on('$stateChangeStart',
            function($scope, event, toState, toParams, fromState, fromParams){

              // var currentStateName = fromState.name;
              // var nextStateName = toState.name;

              // if( currentStateName === 'editCompany' ) {
              //   // event.preventDefault();
              //   console.log('sadsadsadsa');
              //   jQuery('body').addClass('paintMeWhite');
              // }


              if( toState.name == 'dashboard.jobs' ) {
                jQuery('.listJobs').addClass('active');
              }

              if( toState.name == 'dashboard.home' ) {
                jQuery('.listJobs').removeClass('active');
                jQuery('.primehome').addClass('active');
              }

              if( toState.name == 'dashboard.jobs.profiles' ) {
                alert('asdsadsa');
                  jQuery('.profileSwitcher li:nth-child(1)').addClass('active');

              }

            });
      })
      app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

       $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $urlRouterProvider.otherwise("/company-info/1");

        $stateProvider
            .state('editCompany', {
                url: "/company-info/:company_id",
                templateUrl: "src/app/companyInfo/companyInfo.html",
                controller: 'companyInfoController as cic'
            })
              .state('dashboard.home', {
                url: "/home/:companyId",
                templateUrl: "src/app/dashboard/home/home.html",
                controller: "homeController as hc"
           })
             .state('auth', {
                url: "/login",
                templateUrl: "src/app/login/login.html",
                controller: 'loginController as lc'
            })
           .state('dashboard', {
                url: "/dashboard",
                abstract: true,
                templateUrl: "src/app/dashboard/dashboard.html",
                controller: "dashboardController as dc",
                // params : {
                //   companyId: null
                // }
           })

           .state('dashboard.jobs', {
              url: "/company/:company_id/jobs",
              templateUrl: "src/app/dashboard/jobs/jobs.html",
              controller: "CreatedJobsController as cj",
              params: {
                auth_token: null
              }
           })
             .state('dashboard.createJob', {
                  url: "/company/:companyId/createJob",
                  templateUrl: "src/app/dashboard/createJob/createJob.html",
                  controller: "createJobController as cjc"
              })
             .state('dashboard.editJob', {
                  url: "/company/:companyId/editJob/:jobId",
                  templateUrl: "src/app/dashboard/editJob/editJob.html",
                  controller: "editJobController as ej",
                   resolve: {
                    job: function(JobService, $stateParams, $q) {
                            //console.log($stateParams)

                            var deferred = $q.defer();

                            var jobId = $stateParams.jobId;
                            JobService.fetchJob(jobId).then(function(data){
                            //console.log('jobdata', data);
                            var jobDetails = data.payload;

                            var jobs = jobDetails;

                              var areasToContribute = [
                                    'Product Design',
                                    'FrontEnd Development',
                                    'Backend Development',
                                    'Database',
                                    'Algorithm',
                                    'Machine Learning'
                            ];

                            // job.areaToContribute = job.areaToContribute.split(',');
                            // console.log('total areas to repeat', areasToContribute);
                            deferred.resolve(jobs);
                          });
                            return deferred.promise;
                          }
                    }
              })
             .state('dashboard.previewJob', {
                  url: "/previewJob/:jobId",
                  templateUrl: "src/app/dashboard/previewJob/previewJob.html",
                  controller: "previewJobController as pj"

              })



            // When job is Clicked
              .state('dashboard.jobs.profiles',{
                  url: "/:id/allProfiles",
                  templateUrl: "src/app/dashboard/ProfilesForCreatedJob/profiles.html",
                  controller: "ProfilesForCreatedJobController as pc",
                  params: {
                      skills:null,
                      profiles_shortlisted : null
                      }
                      // location: {
                      //   array: true,
                      //   value: null
                      // }
              })
              .state('dashboard.jobs.profilesShortlisted',{
                  url: "/:id/shortlistedProfiles",
                  templateUrl: "src/app/dashboard/ProfilesShortlisted/ProfilesShortlisted.html",
                  controller: "ProfilesShortlistedController as psc",
                  params : {
                    total_profiles : null
                  }

              })

              .state('dashboard.jobs.profileView',{
                url: "/:job_id/:profile_id",
                templateUrl: "src/app/dashboard/ProfileView/profile.html",
                controller: "ProfileViewController as pv",
                params: {
                  profiles: {
                    array: true,
                    value: null
                  },
                  skills: {
                    array: true,
                    value: null
                  }
                }
              })
               .state('dashboard.jobs.profileViewForShortlisted',{
                url: "/:job_id/:profile_id/shortlisted",
                templateUrl: "src/app/dashboard/ProfileViewShortlisted/profile.html",
                controller: "ProfileViewShortlistedController as pvs",
                params: {profiles: null}
              })


           .state('dashboard.searchedProfiles', {
                url: "/?skills",
                templateUrl: "src/app/dashboard/searchedProfiles/searchedProfiles.html",
                controller: "searchedProfilesController as sp",
                params : {
                  skills :{
                    array: true,
                    value: null
                  },
                  profiles_shortlisted: null
                }
           })
           .state('dashboard.searchedProfilesShortlisted', {
                url: "/company/shortlisted",
                templateUrl: "src/app/dashboard/searchedProfilesShortlisted/searchedProfilesShortlisted.html",
                params :{
                  total_profiles: null,
                  skills: {
                    array: true,
                    value: null
                  }
                },
                controller: function($scope, authService, JobService, $stateParams, $state){

                  jQuery('.primaryInteractionArea').addClass('hideSecNav viaSearch');

                  $scope.total_profiles = $stateParams.total_profiles;

                  $scope.migrateToTotalProfiles = migrateToTotalProfiles;

                  var companyId = authService.getCompanyId();

                  JobService.fetchCompanysShortListedProfiles(companyId).then(function(data){
                    console.log(data);
                    $scope.profiles = data;
                    $scope.shortlistedProfilesCount = $scope.profiles.length;
                  });

                  function migrateToTotalProfiles() {

                    var params = {
                      profiles_shortlisted: $scope.shortlistedProfilesCount,
                      skills:  $stateParams.skills
                    };

                    console.log(params);

                    $state.go('dashboard.searchedProfiles', params);
                  }



                }

           })

             .state('dashboard.profileViewViaSkillSearch', {
                // url: "/:profile_id/?skillSet",
                url: "/:profile_id/:skills",
                templateUrl: "src/app/dashboard/profileViewViaSkillSearch/profileView.html",
                controller: "profileViewViaSkillSearchController as pvs",
                params : {
                  skills :{
                    array: true
                  }
                }
           })
             .state('dashboard.shortlistedProfileViewViaSearch', {
                // url: "/:profile_id/?skillSet",
                url: "/:profile_id",
                templateUrl: "src/app/dashboard/shortlistedProfileViewViaSearch/profileView.html",
                controller: "shortlistedProfileViewViaSearch as spv",
                // params : {
                //   skills :{
                //     array: true
                //   }
                // }
           })


           // Handling Query Parameters
            .state('dashboard.jobs.profiles.queried',{
                url: "/?skills?location",
              //   templateUrl: "src/app/dashboard/ProfilesForCreatedJob/profiles.html",
              // controller: "ProfilesForCreatedJobController as pc"
           })

    })




})();
