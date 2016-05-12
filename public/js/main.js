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
		// console.info("Turned on el");
		setBg( element, 'black' );
	}

	function off() {
		scaleNav( 'up' );
		element.css('position', 'relative')
		.css('width', '100%')
		dropped = false;
		// console.info("Shut off el");
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

function getInputs() {
	var form = $('.contact-box .form-container'),
		inputs = form.find('input'),
		message = form.find('textarea');

	var all = $.merge( inputs, message );
	var results = all.map(function(i, e){ return e.value; });

	console.log("Results", results);

	return results;
}

function clearForm() {
	$('form.form-container').closest('form').find("input, textarea").val("");
}