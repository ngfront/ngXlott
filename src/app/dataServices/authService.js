(function() {
	'use strict';

	angular
	.module('app.dataService')
	.factory('authService', authService);

	function authService($q, $http, localStorageService, END_POINTS) {
		var isUserAuthentic;
		var user;

	var data = {
		setCompanyId: setCompanyId,
		getCompanyId: getCompanyId,
		validateUser: validateUser,
		assignCurrentUser: assignCurrentUser,
		getCurrentUser: getCurrentUser,
		clearUser: clearUser,
		setAuthToken: setAuthToken,
		getAuthToken: getAuthToken
	}

	function setCompanyId(id){
		console.log('id', id);
		localStorageService.set('company_id', id);
	}
	function getCompanyId(){
		var company_id = localStorageService.get('company_id');
		return company_id;
	}
	function validateUser(credentials) {
		console.log('Passed On logins', credentials);
		var deffered = $q.defer();
		user = credentials;

	  	$http({
	      	url: END_POINTS.login,
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: credentials
	    })
  		.success(function(data, status, headers, config) {
      		deffered.resolve(data);
      		isUserAuthentic = true;
		});

	    return deffered.promise;
	}
	

	function setAuthToken(token) {
		localStorageService.set('auth_token', token);
	}

	function getAuthToken() {
		var auth_token = localStorageService.get('auth_token');
		return auth_token;
	}


	function clearUser() {
		localStorageService.clearAll();
	}
	 function assignCurrentUser (user) {
    	$rootScope.currentUser = user;
    	saveUser(user);
    	return user;
  	}

  	function getCurrentUser(){
  		var loggedInUser = localStorageService.get('user');
  		if (loggedInUser!==null){
  			return true;
  		}else{
  			return false;
  		}
  	}

  	function saveUser(currentUser) {
  		localStorageService.set('user', currentUser);
  	}

	

	return data;	
	}
})();