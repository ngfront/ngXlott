angular
	.module('eqMax')
	.controller('eqMaxController', eqMaxController);

function eqMaxController ($timeout, $q, $log, FetchService) {
    var self = this;

// self.job = {};
 
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
      self.job.equityMax = equity.display;

    
    //console.log('Selected Equity max', self.job.equity.max);
    }
    console.log('equity', equity);
    
  }
  }