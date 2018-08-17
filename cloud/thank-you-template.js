module.exports.text = `
	Here is your quote!
	\n\n
	Email: %recipient.email% \n
	\n\n
	If you wish to not get any further communication from Tech Ninja | Web & IT please email unsubscribe to unsubscribe@tech-ninja.ca or follow this link %unsubscribe_url%.
	\n\n
`;
module.exports.html = `
	<!DOCTYPE html>
	<html>

	<head>
	    <!--  Essential META Tags -->
	    <title>Tech Ninja | Web & IT</title>
	    <meta name="viewport"             content="width=device-width, initial-scale=1">
	    <meta name="description"          content="Web, Mobile & IoT Technology">
	    <meta name="keywords"             content="website, design, development, custom, components, iot, mobile">
	    <meta name="author"               content="Tech Ninja">
	</head>

	<body>
	  	<h1>Here is your quote!</h1>
	  	<br /> 
		<p>Email: %recipient.email%</p>
	</body>

	</html>
`;