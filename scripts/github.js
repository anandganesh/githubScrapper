var app = angular.module('shippingApp', ['ngMaterial', 'angularMoment']);

app.controller('shippingCtrl', ['$scope', '$mdSidenav', 'callApi',
function($scope, $mdSidenav, callApi) {
	$scope.search = "";
	var url = "https://api.github.com/search/issues";
	$scope.getData = function() {
		var totalIssues = "?q=is:open+repo:" + $scope.search;
		var TotalIssues_lessThan24hours = moment().subtract(24, "hours").format('YYYY-MM-DD');
		var Total_issues_lessThan7days = moment().subtract(7, "days").format('YYYY-MM-DD');
		// search string for more last 24 hours
		var openIssues24hours = "?q=is:open+repo:" + $scope.search + "+created:>" + TotalIssues_lessThan24hours;

		// search string for more than 24 hours less than 7 days
		var openIssues24to7hours = "?q=is:open+repo:" + $scope.search + "+created:>" + TotalIssues_lessThan24hours + "+created:>" + Total_issues_lessThan7days;

		// search string for more than 7 days
		var openIssues7hours = "?q=is:open+repo:" + $scope.search + "+created:<" + Total_issues_lessThan7days;

		callApi.call(url + totalIssues, "").then(function(response) {
			$scope.column1 = response.data.total_count;
		}),function(){alert("asdf");};

		callApi.call(url + openIssues24hours, "").then(function(response) {
			$scope.column2 = response.data.total_count;
		});

		callApi.call(url + openIssues24to7hours, "").then(function(response) {
			$scope.column3 = response.data.total_count;
		});

		callApi.call(url + openIssues7hours, "").then(function(response) {
			$scope.column4 = response.data.total_count;
		});
	}
}]);
// factory for rest api calls
app.factory('callApi', ['$http', '$log',
function($http, $log) {

	return {
		call : function(url, config) {
			return $http({
				method : "get",
				url : url,
			}).error(function(){
				console.log("error");
			});
			//  return $http.post(url,config);
		}
	}
}]);
