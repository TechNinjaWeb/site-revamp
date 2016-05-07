console.log("Got it!");

var screenOffset = document.body.offsetHeight,
       menu = $('.navigation .navbar-default');
 var enabled = false;
 var dropped = false;
// Begin Menu Toggler
 if ( dropped && !enabled ) setBg( menu, 'transparent', 'off');
 else if ( !dropped && !enabled) setBg( menu, 'transparent', 'off');

$(document).on('scroll', function(e) {
	toggleBg( menu )
});

function toggleBg( element )  {
	var yPos = window.scrollY;
	var winHeight = window.innerHeight;
   	// Toggle Navbar
	var menuBgColor = element.css('backgroundColor');
	if (yPos >= 20 && enabled) setBg( element, 'black', 'on' ), enabled = false; 
		// console.log("Greater than 100");
	if (yPos < 20 && !enabled) setBg( element, 'transparent', 'off' ), enabled = true; 
		// console.log("Less than 100");

	if (yPos >= winHeight + 50 && !dropped) setPosition( element, 'on'); 
		// console.log("Greater than window");
	if (yPos < winHeight + 50 && dropped) setPosition( element, 'off'); 
		// console.log("Less than than window");
}

function setBg( element, color ) {
	// console.log(["Setting BG To", color, "On El", element]);
	element.animate({'background-color': color});
	if (color == 'black') enabled = true, toggleSlider( 'off' );
	if (color == 'transparent') enabled = false, toggleSlider( 'on' );
}

function setPosition( element, state ) {
	if (state === 'on') on();
	if (state === 'off') off();
	// console.log("Setting State to " + state);
	
	function on() {
		scaleNav( 'down' );
		element.css('position', 'fixed')
			.css('top', '-100px')
			.css('left', '0px')
			.css('width', '100%')
			.animate({top: 0});
		dropped = true;
		console.info("Turned on el");
		setBg( element, 'black' );
	}

	function off() {
		scaleNav( 'up' );
		element.css('position', 'relative')
		.css('width', '100%')
		dropped = false;
		console.info("Shut off el");
		setBg( element, 'transparent' );
	}
}


function scaleNav( state ) {
	if (state === 'up') scaleUp();
	if (state === 'down') scaleDown();

	function scaleDown( ) {
		var brand = $('.navigation a.navbar-brand'),
			links = $('.navigation ul'),
			bg = $('.navigation .navbar');

			brand.css('transform', 'scale(0.7)');
			links.css('transform', 'scale(0.8)')
				.css('margin-top', '10px');
			bg.animate({'height': '65px'})
	}

	function scaleUp( ) {
		var brand = $('.navigation a.navbar-brand'),
			links = $('.navigation .navigation ul'),
			bg = $('.navigation .navbar');

			brand.css('transform', 'scale(1)');
			links.css('transform', 'scale(1)')
				.css('margin-top', '20px');
			bg.animate({'height': '78px'});
	}
}

function toggleSlider( state ) {
	if (state == 'on') $('.slider .slide').fadeIn();
	if (state == 'off') $('.slider .slide').fadeOut();
}

function sendMessage() {
	var form = $('.contact-box .form-container'),
		inputs = form.find('input'),
		message = form.find('textarea');

	var all = $.merge( inputs, message );
	var results = all.map(function(i, e){ return e.value; });

	console.log("Results", results);
}
















// var Backand = function(Class, options) {
// 	if(!options) options = {};
// 	this.appname = options.appname || 'techninja'
// 	// init backand url
//     backand.options.url = options.url || "https://api.backand.com:8080";
	
// 	this.defaultCallback = options.callback || {
// 		success: function(res){
// 			res.forEach(function(e){ this.results.push(e); });
// 			return res;
// 		},
// 		error: function(err, res){
// 			this.err = {err: err, res: res}
// 			return this.err;
// 		},
// 		results: [],
// 		err: null
// 	};

// 	this.filter = options.filter || [];
// 	this.sort = options.sort || null;
// 	this.search = options.search || null;
// 	this.deep = options.deep || true;
// 	this.pageNum = options.pageNum || 1;
// 	this.pageSize = options.pageSize || 10;
// };
// Backand.prototype = function() {};

// Backand.prototype.filter = function(condition, bool) {
	
// 	if (!bool) this.filter = conditions;
// 	this.filter = this.filter || [];
// 	this.filter.push( condition );
// };

// Backand.prototype.sort = function(condition, bool) {
// 	if (!bool) this.filter = conditions;
// 	this.filter = this.filter || [];
// 	this.filter.push( condition );
// };

// Backand.prototype.search = function(condition, bool) {
// 	if (!bool) this.search = conditions;
// 	this.search = this.search || [];
// 	this.search.push( condition );
// };

// Backand.prototype.login = function(username, password, cb) {
// 	if(!username || !password) return "You must Enter Username or Password";

// 	backand.security.authentication.login(username, password, this.appname, cb.success, cb.error);
// };


// Backand.prototype.getUsers = function(cb) {
// 	this.uri = 'users';
// 	this.results = [];
// 	this.err = null;
	
// 	var url = this.baseUrl + this.uri
	
// 	this.defaultCallback = {
// 		success: function(res){
// 			res.forEach(function(e){ this.results.push(e); });
// 			return res;
// 		},
// 		error: function(err, res){
// 			this.err = {err: err, res: res}
// 			return this.err;
// 		},
// 		results: [],
// 		err: null
// 	}
// 	this.call( url, 'GET', cb || this.defaultCallback )
// }
// cb = {};
// cb.success = function(res){console.info(res)};
// cb.error = function(err, res){console.error(err, res)};
// Backand.prototype.call = function( url, method, cb ) {
// 	return $.ajax({
// 		url: url,
// 		method: method,
// 		headers: {
// 			'Content-Type': 'application/json;charset=utf8',
// 			'info': 'ba8fa7e5-633d-48a2-be11-a01aa0283793'
// 		},
// 		success: cb.success,
// 		error: cb.error,
// 		data: {
// 			pageSize: 20, 
// 			pageNumber: 1
// 		}
// 	})
// }

// var server = new Backand();