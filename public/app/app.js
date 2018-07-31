var app = angular.module('app', [
		'backand', 
		'auth.service',
		'login.ctrl',
		'ui.router',
		'backend.constants'
	])
  .controller('main', function($scope, $http, Backand, CONSTANTS) {
  	window.http = $http;
    $http.defaults.headers.common.anonymousToken = CONSTANTS.anonymousToken;

    $scope.message = "Loaded";
    $scope.appCtrl = $scope;

    var self = this;
    var baseUrl = Backand.getApiUrl() + '/1/objects/';

    var objectName = 'leads';

    self.readAll = function () {
        return $http({
            method: 'GET',
            url: baseUrl + objectName
        }).then(function(response) {
            return response.data.data;
        });
    };

    self.readOne = function (id) {
        return $http({
            method: 'GET',
            url: baseUrl + objectName + '/' + id
        }).then(function(response) {
            return response.data;
        });
    };

    self.create = function (description) {
        return $http({
            method: 'POST',
            url : baseUrl + objectName,
            data: {
                description: description
            },
            params: {
                returnObject: true
            }
        }).then(function(response) {
            return response.data;
        });
    };

    self.update = function (id, data) {
        return $http({
            method: 'PUT',
            url : baseUrl + objectName + '/' + id,
            data: data
        }).then(function(response) {
            return response.data;
        });
    };

    self.delete = function (id) {
        return $http({
            method: 'DELETE',
            url : baseUrl + objectName + '/' + id
        })
    };

    self.signin = function (username, password) {
        return Backand.signin(username, password)
            .then(function (response) {
                loadUserDetails();
                return response;
            });
    };

    self.saveForm = function () {
        var inputs = getInputs();
        /* $http({
            method: 'POST',
            url : baseUrl + objectName,
            data: {
                fullname: inputs[0],
                email: inputs[1],
                subject: inputs[2],
                message: inputs[3]
            },
            params: {
                returnObject: true
            }
        }).then(function(response) {
            return response.data;
        }); */
        // Send inputs back
        return inputs;
    };

    self.sendQuote = function ( email, quote ) {
        console.log("Quote", quote);
        // Gather Data By Name
        var data = quote.reduce(function(o, c, i, a){
        	var name = c.name.camelCase().trim();
        	if (c.value >0) o[name] = angular.toJson(c);

        	try {
        		o[name] = parseFloat( o[name] );

        		if (c.hasOwnProperty('checked') && c.checked) o[name] = c.checked;
        		if (!c.hasOwnProperty('checked') && !c.checked) o[name] = parseFloat(c.value);
        	} catch (e) {
        		o[name] = c.value;
        	}
        	return o;
        }, {});

        console.warn("Data", data);
        // Set Users Email
        data.email = email;
        // $http({
        //     method: 'POST',
        //     url: Backand.getApiUrl() + '/1/objects/quotes?returnObject=true',
        //     data: data
        // }).success(function(res){
        // 	console.log("Posted .. Toastr This", res);
        // 	toastr.success("Thank You! We've Sent An Email To: " + email);
        // }).error(function(err){
        // 	console.warn(err);
        // });
        // Redundant return
        // Debugging
        toastr.success("Thank You! We've Sent An Email To: " + email);
        return {email: email, quote: quote};
    };

    self.clearForm = function() {
    	clearForm();
    }

    angular.extend($scope, self);
  });

app.config(function($stateProvider, $urlRouterProvider, BackandProvider, CONSTANTS) {
	BackandProvider.setAppName(CONSTANTS.appname);
	BackandProvider.setSignUpToken(CONSTANTS.signupToken);
	BackandProvider.setAnonymousToken(CONSTANTS.annonymousToken);

	BackandProvider.runSigninAfterSignup(true);

	// $stateProvider.state('home', {
	// 	abstract: true,
	// 	controller: 'LoginController',
	// 	template: '<div ui-view="home"></div>'
	// })
	// .state('home.index', {
	// 	url: '/',
	// 	views: {
	// 		'home@home': {
	// 			template: '<button class="signIn" ng-click="getLeads()">Sign In</button><br><br><br>'
	// 			 + '<div>{{ message }}</div>',
	// 			controller: 'main'
	// 		}
	// 	}
	// });

	// .state('home.index', {
	// 	url: '/',
	// 	views: {
	// 		'home@home': {
	// 			templateUrl: './app/views/home.tpl.html'
	// 			controller: 'main'
	// 		}
	// 	}
	// });

	$urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, Backand, AuthService){
	// console.log("App Running", $rootScope);

	window.BackAnd = Backand;
	window.AuthService = AuthService;
})
angular.bootstrap(document, [app.name]);
