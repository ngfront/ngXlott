

(function() {
    'use strict';

    var app = angular.module('app.constants', []);


  app.constant('END_POINTS', {

    login:                      'http://104.197.157.160/user',
    create_company:             'http://104.197.157.160/company/',
    fetch_company_details:      'http://104.197.157.160/company/',
    save_job:                   'http://104.197.157.160/job',
    fetch_job:                  'http://104.197.157.160/job/',
    delete_job:                 'http://104.197.157.160/job/',
    created_jobs :              'http://104.197.157.160/company/jobs/',
    profiles_for_selected_jobs: 'http://104.197.157.160/profile',
    toShortlist:                'http://104.197.157.160/shortlisted',
    profile_view:               'http://104.197.157.160/profile/',
    fetchShortListedProfiles:   'http://104.197.157.160/profile/shortlisted/',
     shortlistSearchedProfile:   'http://104.197.157.160/shortlisted',
    fetchCompanysShortListedProfiles:   'http://104.197.157.160/company/shortlised/',

    profiles :                  'src/app/dummyRemote/profile_view.json',
    locationsForJob:            'src/app/dummyRemote/locations.json',
    skills:                     'src/app/dummyRemote/skills.json',
    ctc :                       'src/app/dummyRemote/ctc.json',
    equity:                     'src/app/dummyRemote/equity.json',







    // login:                      'http://192.168.1.40:8000/user',
    // create_company:             'http://192.168.1.40:8000/company/',
    // fetch_company_details:      'http://192.168.1.40:8000/company/',
    // save_job:                   'http://192.168.1.40:8000/job',
    // fetch_job:                  'http://192.168.1.40:8000/job/',
    // delete_job:                 'http://192.168.1.40:8000/job/',
    // created_jobs :              'http://192.168.1.40:8000/company/jobs/',
    // profiles_for_selected_jobs: 'http://192.168.1.40:8000/profile',
    // toShortlist:                'http://192.168.1.40:8000/shortlisted',
    // profile_view:               'http://192.168.1.40:8000/profile/',
    // shortlistSearchedProfile:   'http://192.168.1.40:8000/shortlisted',
    // fetchCompanysShortListedProfiles:   'http://192.168.1.40:8000/company/shortlised/',
    // fetchShortListedProfiles:   'http://192.168.1.40:8000/profile/shortlisted/',
    

    // profiles :                  'src/app/dummyRemote/profile_view.json',
    // locationsForJob:            'src/app/dummyRemote/locations.json',
    // skills:                     'src/app/dummyRemote/skills.json',
    // ctc :                       'src/app/dummyRemote/ctc.json',
    // equity:                     'src/app/dummyRemote/equity.json',

  });

})();