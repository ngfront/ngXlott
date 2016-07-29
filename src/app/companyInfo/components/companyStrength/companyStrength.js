angular
	.module('companyStrengthComponent')
	.controller('companyStrengthController', companyStrengthController);

function companyStrengthController ($timeout, $q, $log) {
    var self = this;


    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.company = {};

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
     	
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
      // self.company.strength = self.strength.display;

      // console.log(self.company.strength);
      self.company.companyStrength = item.display;
    }

    /**
     * Build `states` list of key/value pairs
     */

    function loadAll() {
      var allStates = '10, 50, More than 50, More than 100';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };

        // return state;
      });

    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
  }