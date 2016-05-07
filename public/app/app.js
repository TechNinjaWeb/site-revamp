var app = angular.module('backand.service', [
	'backand', 
	'backand.service.interceptors'
	])
    .config(function(BackandProvider, $httpProvider) {
        console.warn("BackandProvider", BackandProvider, $httpProvider);

        $httpProvider.interceptors.push('BackandInterceptor');
        BackandProvider.setAppName('techninja');
        BackandProvider.setSignUpToken('e311d36c-5d65-4514-b68c-670a98b1f516');
        BackandProvider.setAnonymousToken('ba8fa7e5-633d-48a2-be11-a01aa0283793');
    })
    .service('BackandService', function dataService($http, Backand) {
	    var self = window.DataService = this;
	    console.log("Self", self);
	    var baseUrl = '/1/objects/';

	    self.name = null;

	    self.readAll = function() {
	        return $http({
	            method: 'GET',
	            url: Backand.getApiUrl() + baseUrl + self.name
	        }).then(function(response) {
	            return response.data.data;
	        });
	    };

	    self.readOne = function(id) {
	        return $http({
	            method: 'GET',
	            url: Backand.getApiUrl() + baseUrl + self.name + '/' + id
	        }).then(function(response) {
	            return response.data;
	        });
	    };

	    self.create = function(data) {
	        return $http({
	            method: 'POST',
	            url: Backand.getApiUrl() + baseUrl + self.name,
	            data: data,
	            params: {
	                returnObject: true
	            }
	        }).then(function(response) {
	            return response.data;
	        });
	    };

	    self.update = function(id, data) {
	        return $http({
	            method: 'PUT',
	            url: Backand.getApiUrl() + baseUrl + self.name + '/' + id,
	            data: data
	        }).then(function(response) {
	            return response.data;
	        });
	    };

	    self.delete = function(id) {
	        return $http({
	            method: 'DELETE',
	            url: Backand.getApiUrl() + baseUrl + self.name + '/' + id
	        })
	    };

	    self.logout = function() {
	        Backand.signout();
	    }

	    //get the object name and optional parameters
		self.getList = function(name, sort, filter) {
		    return $http({
		        method: 'GET',
		        url: Backand.getApiUrl() + '/1/objects/' + name,
		        params: {
		            pageSize: 20,
		            pageNumber: 1,
		            filter: filter || '',
		            sort: sort || ''
		        }
		    });
		};
	}).run(function(BackandService){

	});

angular.bootstrap(document, ['backand.service'])
