angular
.module('ctcMin')
.controller('ctcMinController', ctcMinController);

function ctcMinController ($timeout, $q, $log, $http, FetchService) {
  var self = this;

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
 
if( package!== undefined ) { 
  // self.job.ctc = {
  //   min : ''
  // };
  self.job.ctcMin = package.display;

}
 
  }



}
