(function() {
    'use strict';

    angular
    	.module('app.companyInfo')
    	.directive('companyStrength', companyStrength)
        .directive('currency', currency)
    	.controller('companyInfoController', companyInfoController);

        function companyInfoController($state, companyService, $stateParams, authService){
            var self = this;
          
            self.fetchCompanyDetails = fetchCompanyDetails;
            self.saveCompanyDetails = saveCompanyDetails;

            self.company_id = $stateParams.company_id;

            var auth_token = authService.getAuthToken();

            companyService.fetchCompany(self.company_id).then(function(data){
                console.log('company data fetched', data.payload);
                self.company = data.payload;
            });
            jQuery('body').addClass('paintMeWhite');

            console.log('company_id fetched', self.company_id);


            function fetchCompanyDetails(company){
                console.log(company);
            }

            function saveCompanyDetails(company) {
                //company.company_id = self.company_id;
                //delete company[company.companyId]; 

                 delete company.companyId;
                 delete company.images;
                console.log('Company going to server', company);

                companyService.saveCompany(company, self.company_id)
                    .then(function(data){
                        jQuery('body').removeClass('paintMeWhite');
                        var companyId = data.payload.companyId;
                        console.log(companyId);

                        // Route to Dashboard to create Jobs
                        var params = {
                            companyId: companyId
                        }

                        console.log('params passed to home');

                        // $state.go('dashboard.createJob', params);
                        $state.go('dashboard.home', params);
                    });
            }
        }

    	function companyStrength(companyService) {
			var DDO = {
				restrict: 'E',
                scope :{
                    company: '='
                },
				templateUrl: 'src/app/companyInfo/components/companyStrength/companyStrength.html',
                controller:'companyStrengthController as cs',
                bindToController: true
			}
			return DDO;
		}

        function currency() {
            var DDO = {
                restrict: 'E',
                scope :{
                    company: '='
                },
                templateUrl: 'src/app/companyInfo/components/currency/currency.html',
                controller:'currencyController as cc',
                bindToController: true
            }
            return DDO;
        }

})();
