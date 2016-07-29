(function() {
    'use strict';

    angular
    	.module('app.dashboard.home')
    	.controller('homeController', homeController);

    	function homeController($state, $stateParams, authService) {
    		var self = this;
    		self.TravelToCreateJobState = TravelToCreateJobState;

             jQuery('.listJobs').removeClass('active');
                jQuery('.primehome').addClass('active');
                
            console.log('params to home', $stateParams);
            
    		var companyId = authService.getCompanyId();

    		console.log('companyId', companyId);


            function TravelToCreateJobState() {

                var companyId = authService.getCompanyId();

                var params = {
                    companyId: companyId
                };

                $state.go('dashboard.createJob', params);
            }
    	}

    })()