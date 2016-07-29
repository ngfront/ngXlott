angular
	.module('ctcMax')
	.controller('ctcMaxController', ctcMaxController);

function ctcMaxController ($timeout, $q, $log, $http, FetchService) {
    var self = this;

  //   self.job.ctc = {
  // };
  //     self.job.ctc.max = '';

  self.selectedCtcChange = selectedCtcChange;


  //
  init();

  function init() {
    FetchService.loadCTC()
    .then(function(data){
      var ctcStack = data.map(function(ctc){
        return { value: ctc.display.toLowerCase(), display: ctc.display }
      });
      self.ctcStack = [].concat(ctcStack);
    });
  }

  function selectedCtcChange(package) { 
    // self.job.ctc = {};
    if( package!== undefined ) {
    //self.job.ctc = { max : '' };
    self.job.ctcMax = package.display;
    console.log('Selected Ctc Max', self.job.ctcMax);
    }
    
  }


   
  }











    