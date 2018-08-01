angular.module('auth.service', [])
    .service('AuthService', [function AuthService() {

        var self = this;
        self.currentUser = {};

        loadUserDetails();

        function loadUserDetails() {
            return console.log("Backand was replaced and needs rebuilding");
            // return Backand.getUserDetails()
            //     .then(function(data) {
            //         self.currentUser.details = data;
            //         if (data !== null)
            //             self.currentUser.name = data.username;
            //     });

        }

        self.getSocialProviders = function() {
            return console.log("Backand was replaced and needs rebuilding");
            // return Backand.getSocialProviders()
        };

        self.socialSignin = function(provider) {
            return console.log("Backand was replaced and needs rebuilding");
            // Backand.setRunSignupAfterErrorInSigninSocial(false); //by default run sign-up if there is no sign in
            // return Backand.socialSignin(provider)
            //     .then(function(response) {
            //         loadUserDetails();
            //         return response;
            //     });
        };

        self.socialSignup = function(provider) {
            return console.log("Backand was replaced and needs rebuilding");
            // return Backand.socialSignUp(provider)
            //     .then(function(response) {
            //         loadUserDetails();
            //         return response;
            //     });
        };

        self.signin = function(username, password) {
            return console.log("Backand was replaced and needs rebuilding");
            // return Backand.signin(username, password)
            //     .then(function(response) {
            //         loadUserDetails();
            //         return response;
            //     });
        };

        self.signup = function(firstName, lastName, username, password, parameters) {
            return console.log("Backand was replaced and needs rebuilding");
            // return Backand.signup(firstName, lastName, username, password, password, parameters)
            //     .then(function(signUpResponse) {
            //         if (signUpResponse.data.currentStatus === 1) {
            //             return self.signin(username, password)
            //                 .then(function() {
            //                     return signUpResponse;
            //                 });

            //         } else {
            //             return signUpResponse;
            //         }
            //     });
        };

        self.changePassword = function(oldPassword, newPassword) {
            return console.log("Backand was replaced and needs rebuilding");
            // return Backand.changePassword(oldPassword, newPassword)
        };

        self.requestResetPassword = function(username) {
            return console.log("Backand was replaced and needs rebuilding");
            // return Backand.requestResetPassword(username)
        };

        self.resetPassword = function(password, token) {
            return console.log("Backand was replaced and needs rebuilding");
            // return Backand.resetPassword(password, token)
        };

        self.logout = function() {
            return console.log("Backand was replaced and needs rebuilding");
            // Backand.signout().then(function() {
            //     angular.copy({}, self.currentUser);
            // });
        };

    }]);