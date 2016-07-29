(function() {
	'use strict';

	angular
	.module('app.dataService')
	.factory('companyService', companyService);

	function companyService($http, $q, END_POINTS) {
		var data = {
			saveCompany: saveCompany,
			saveJob: saveJob,
			fetchCompany: fetchCompany
		};

		function fetchCompany(id) {
			

			var deffered = $q.defer();

           $http.get(END_POINTS.fetch_company_details+id).then(
            function(data){
               deffered.resolve(data.data);
           },
           function(error) {
               deffered.reject(error);
           });
           return deffered.promise;
		}

		function saveCompany(company, companyId) {
			var deffered = $q.defer();

		console.log('CID GOT', companyId);

			console.log('company data', company);

			 $http({
      			url: END_POINTS.create_company+companyId,
      			method: "PATCH",
      			headers: { 
      				'Content-Type': 'application/json' ,
      			},
      			data: company
    		})
    .success(function(data, status, headers, config) {
      deffered.resolve(data);
      
    });

    return deffered.promise;




		}


		function saveJob(job) {
         var deffered = $q.defer();

           $http.post(END_POINTS.save_job, job).then(
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