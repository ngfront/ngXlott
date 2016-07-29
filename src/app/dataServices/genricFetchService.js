(function() {
  'use strict';

  angular
  .module('app.dataService')
  .factory('FetchService', FetchService);


  function FetchService($http, $q, END_POINTS) {

    var data = {
     loadLocations : loadLocations,
     loadSkills: loadSkills,
     loadCTC : loadCTC,
     loadEquity: loadEquity
   };

   function loadEquity() {
    var deffered = $q.defer();

   $http.get(END_POINTS.equity).then(
    function(data){
       deffered.resolve(data.data);
   },
   function(error) {
       deffered.reject(error);
   });
   return deffered.promise;
   
   }
   function loadCTC() {
     var deffered = $q.defer();

   $http.get(END_POINTS.ctc).then(
    function(data){
       deffered.resolve(data.data);
   },
   function(error) {
       deffered.reject(error);
   });
   return deffered.promise;
   }
   function loadLocations() {
       var deffered = $q.defer();

   $http.get(END_POINTS.locationsForJob).then(
    function(data){
       deffered.resolve(data.data);
   },
   function(error) {
       deffered.reject(error);
   });
   return deffered.promise;
   }


   function loadSkills() {
       var deffered = $q.defer();

   $http.get(END_POINTS.skills).then(
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
