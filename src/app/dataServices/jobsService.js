(function() {
  'use strict';

  angular
  .module('app.dataService')
  .factory('JobService', JobService);


  function JobService($http, $q, END_POINTS, localStorageService) {

    var data = {
      savejobSkills: savejobSkills,
      getJobSkills: getJobSkills,
      
      saveSearchedSkills: saveSearchedSkills,
      getSearchedSkills: getSearchedSkills,

      fetchJob: fetchJob,
      updateJob: updateJob,
      deleteJob : deleteJob,
      fetchCreatedJobs: fetchCreatedJobs,
      fetchProfilesForCreatedJob: fetchProfilesForCreatedJob,
      fetchProfile : fetchProfile,
      fetchProfilesWithParams: fetchProfilesWithParams,
      toShortlist : toShortlist,
      fetchShortlistedProfiles: fetchShortlistedProfiles,
      fetchProfilesForSearchedSkills : fetchProfilesForSearchedSkills,
      shortlistSearchedProfile : shortlistSearchedProfile,
      fetchCompanysShortListedProfiles : fetchCompanysShortListedProfiles
    };


    function savejobSkills(skills){
      localStorageService.set('job_skills', skills);
    }

    function getJobSkills() {
      var skillsToReturn = localStorageService.get('job_skills');
      return skillsToReturn;
    }

     function saveSearchedSkills(skills){
      localStorageService.set('searched_skills', skills);
    }

    function getSearchedSkills() {
      var skillsToReturn = localStorageService.get('searched_skills');
      return skillsToReturn;
    }



    function fetchCompanysShortListedProfiles(companyId) {
   
      var deffered = $q.defer();
     
      console.log('companyId in service', companyId);
      console.log('end poinyts hitting', END_POINTS.fetchCompanysShortListedProfiles+companyId);

      $http({
        url: END_POINTS.fetchCompanysShortListedProfiles+companyId,
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      .success(function(data, status, headers, config) {
        deffered.resolve(data);

      });
      return deffered.promise;
    }
  


    function shortlistSearchedProfile(jobId, profileId) {
      console.log(jobId, profileId);

      var deffered = $q.defer();
      
      var data = {
        jobId: jobId,
        profileId: profileId
      }


      $http({
        url: END_POINTS.shortlistSearchedProfile,
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        data: data
      })
      .success(function(data, status, headers, config) {
        deffered.resolve(data);

      });
      return deffered.promise;

    }


    function fetchJob(jobId) {
     var deffered = $q.defer();
     $http.get(END_POINTS.fetch_job+jobId).then(
      function(data){
       deffered.resolve(data.data);
     },
     function(error) {
       deffered.reject(error);
     });
     return deffered.promise;
   }

   function updateJob(job) {
    var deffered = $q.defer();
    var jobId = job.id;


    $http({
      url: END_POINTS.fetch_job+jobId,
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      data: job
    })
    .success(function(data, status, headers, config) {
      deffered.resolve(data);
      
    });
    return deffered.promise;


  }

  function deleteJob(jobId) {
   var deffered = $q.defer();

   $http.delete(END_POINTS.delete_job+jobId).then(
    function(data){
     deffered.resolve(data.data);
   },
   function(error) {
     deffered.reject(error);
   });
   return deffered.promise;
 }

 function fetchShortlistedProfiles(jobId) {
   var deffered = $q.defer();

   $http.get(END_POINTS.fetchShortListedProfiles+jobId).then(
    function(data){
     deffered.resolve(data.data);
   },
   function(error) {
     deffered.reject(error);
   });
   return deffered.promise;
 }

 function toShortlist(jobId, profileId ) {

  var deffered = $q.defer();

  var data = {
    jobId : jobId,
    profileId: profileId
  };

  console.log('shortlisyed data', data);

  $http({
    url: END_POINTS.toShortlist,
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
  .success(function(data, status, headers, config) {
    deffered.resolve(data);

  });

  return deffered.promise;
}




function fetchProfilesWithParams(skills) {
  var deffered = $q.defer();
  $http.post( END_POINTS.profiles, {params: skills} )
  .success(function(data, status, headers, config) {
    deffered.resolve(data.data);        
  })

}

function fetchCreatedJobs(companyId) {


 var deffered = $q.defer();

 $http.get(END_POINTS.created_jobs+companyId).then(
  function(data){
   deffered.resolve(data.data);
 },
 function(error) {
   deffered.reject(error);
 });
 return deffered.promise;

}


function fetchProfilesForSearchedSkills(skills, page) {
  console.log('skillsToBeSearched', skills);

  var deffered = $q.defer();
  
  var dataToPass = {
    skills: skills,
    page_size: 5,
    page: page
  };
  $http({
    url: END_POINTS.profiles_for_selected_jobs,
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    data: dataToPass
  })
  .success(function(data, status, headers, config) {
    deffered.resolve(data);

  });

  return deffered.promise;



}


function fetchProfilesForCreatedJob(skills, page) {

  var skills = skills;
  var page = page;

  console.log('skills', skills);
  console.log('page', page);
  
  var deffered = $q.defer();
  
  var dataToPass = {
    skills: skills,
    // location: location,
    page_size: 5,
    page: page
  };
  $http({
    url: END_POINTS.profiles_for_selected_jobs,
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    data: dataToPass
  })
  .success(function(data, status, headers, config) {
    deffered.resolve(data);

  });

  return deffered.promise;

 }

 function fetchProfile(profile_id) {
  var deffered = $q.defer();

  $http.get(END_POINTS.profile_view+profile_id).then(
    function(data){
      deffered.resolve(data.data);
    },
    function(error) {
      deffered.reject(error);
    });
  return deffered.promise;
}
return data;
}
})();
