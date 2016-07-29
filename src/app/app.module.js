  // (function(d) {
  //   var config = {
  //     kitId: 'nxe0kls',
  //     scriptTimeout: 3000,
  //     async: true
  //   },
  //   h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  // })(document);


(function() {

    'use strict';


    var app = angular.module('app', [
        /* Shared modules */
        'app.core',
        'app.widgets',
        
        // Custom Modules
        'app.login',
        'app.companyInfo',
        
        'app.dashboard',

        // Dashboard Modules
        'app.dashboard.home',
        'app.dashboard.editJob',
        'app.dashboard.previewJob',
        'app.dashboard.createJob',
        'app.dashboard.createdJobs',
        'app.profilesForCreatedJob',
        'app.dashboard.profileView',
        'app.dashboard.searchedProfiles',
        'app.dashboard.profilesShortlistedForCreatedJob',
        'app.dashboard.profileViewViaSkillSearch',
        'app.dashboard.searchedProfilesShortlisted',
        'app.dashboard.profilesShortlistedShortlistedForCreatedJob',
        'app.dashboard.shortlistedProfileViewSearch'
    ])
    .run(function($http, authService){

var auth_token = authService.getAuthToken();
$http.defaults.headers.common['Authentication-Token'] = auth_token;


});

jQuery(window).scroll(function (event) {
    var scroll = jQuery(window).scrollTop();
    if(scroll > 137) {
        jQuery('.searchHeader').addClass('hasShadow');
    }else {
      jQuery('.searchHeader').removeClass('hasShadow');  
    }
});


})();
