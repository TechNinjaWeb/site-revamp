(function() {
    angular.module('backend.constants', [])
        .constant('CONSTANTS', {
        	parseURL: {custom: 'https://techninja.back4app.io/', default: 'https://parseapi.back4app.com/'},
        	parseAppID: 'p0dYyYK6mD2acO2KzwLBA9x5aQUAfsp5YE3zkMNk',
        	parseJsKey: '8jUv8QOggDFGcCAC27UhGuFQ08PPwOaTVjXNyYuK',
            anonymousToken: 'ba8fa7e5-633d-48a2-be11-a01aa0283793',
            signupToken: 'e311d36c-5d65-4514-b68c-670a98b1f516',
            appname: 'techninja'
        });
})();