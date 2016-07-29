(function() {
  'use strict';

  angular
  .module('app.login')
  .controller('loginController', loginController);


  function loginController( authService, $state ) {
  	var self = this;
  	self.validateUser = validateUser;

  	function validateUser(user) {
  		

  		authService.validateUser(user)
     .then(function(fetchedUserData){

      console.log('User Fetched', fetchedUserData);



      var tokenFetched = fetchedUserData.payload.authToken;
      var companyId = fetchedUserData.payload.companyId;

      console.log('Token', tokenFetched);
      console.log('Company Id', companyId);

      if(fetchedUserData.success) {
      				// Pass token to service
             authService.setAuthToken(tokenFetched);        			

             if(fetchedUserData.payload.login_count > 1) {

              var params = {
                company_id: fetchedUserData.payload.companyId
              }
              $state.go('dashboard.jobs',params);
            }else {
              var params= {
                company_id : companyId,
                auth_token: tokenFetched
              };
              $state.go('editCompany', params);
            }
            
          }else{
        			// Reload the current State
              console.log('Login Failed');
              $state.go('auth');
            }
          });
   }






 }

})();



	// AuthenticationFactory.validateUser(credentials).then(function(data){

 //      console.log(data);

 //      var api_token = data.api_token;

 //      if(data.success) {
 //        AuthenticationFactory.setAuthToken(api_token);
 //        $state.go('profiles', {'auth_token': api_token});

 //      }else{
 //        self.status = false;
 //      }

 


 //    });
