angular
	.module('eqMin')
	.controller('eqMinController', eqMinController);

function eqMinController ($timeout, $q, $log, FetchService) {
    var self = this;


    self.job = {};
  // self.job.equity = {
  // };
  // self.job.equity.min = '';
  self.selectedEquityChange = selectedEquityChange;


  //
  init();

  function init() {
    FetchService.loadEquity()
    .then(function(data){
      var equityStack = data.map(function(equity){
        return { value: equity.display.toLowerCase(), display: equity.display }
      });
      self.EquityStack = [].concat(equityStack);
    });
  }

  function selectedEquityChange(equity) { 
    if(equity!== undefined) {
      self.job.equityMin = equity.display;
    
    //console.log('Selected Equity Min', self.job.equity.min);
    }
    console.log('equity', equity);
    
  }
  }