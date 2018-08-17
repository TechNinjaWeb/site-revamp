const fs = require('fs');
const path = require('path');
const api_key = 'key-d00f6701b10db40f1f639d64b357e372';
const domain = '';
const sandbox_domain = 'sandboxec0360fefad54dd19b7838403786500d.mailgun.org';
const mailgun = require('mailgun.js');
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || api_key });
const resolve = require('path').resolve;

const sandbox_mode = true;
const br = "\n\n\n";

var isAuthed = (user)=>{
	console.log("Got User to authenticate", user);
	console.log("Got role to search", user.role.objectId)

	var queryRole = new Parse.Query(Parse.Role);
	queryRole.equalTo('objectId', user.role.objectId);

	return queryRole.first();
}

console.log("Entered Main.JS in Cloud folder");

Parse.Cloud.afterSave("Quotes", function(request, response) { 
	var quote = request.object;
	console.log("After Save: ", quote.get('email'), quote);

	var recipientVars = [quote].map(object=>{
		var ret = {};
		var keys = Object.keys(object.attributes);

		ret.id = object.id;
		keys.forEach(key=>ret[key] = object.get(key));
		return { [ret.email]: ret };
	})
	.reduce((p, c, i, a) => {
        var key = Object.keys(c)[0];
        p[key] = c[key];
        return p;
    }, {});


	// Prepare to try and send confirmation email
	var id = quote.id;
	var email = quote.get('email');

  	console.log(`
  		User: ${email}
		sent confirmation: ${true} 
  	`);

  	// Create email template
  	var email_data = {
	  	from: 'Tech Ninja | Web &amp; IT <no-reply@mailgun.tech-ninja.ca>',
	  	to: email,
	  	subject: 'Thank You For Your Interest in Tech Ninja | Web & IT',
	  	text: require('./thank-you-template.js').text,
	  	'recipient-variables': JSON.stringify(recipientVars),
		html: require('./thank-you-template.js').html
	};

	// Send message using mailgun api
	var promises = [];
	var url = !!sandbox_mode ? sandbox_domain : domain;

  	mg.messages.create(url, email_data)
		.then(msg => {
			console.log(`Sending Confirmation Email!
				${JSON.stringify(quote)}${br}
				${msg.message}
			`);

			response.success({mailgun_response: msg, quote});
		})
		.catch(err => {response.error(err); console.log(err)}) // logs any error 
});


Parse.Cloud.define("send-test-email", function(request, response) {
	var user;
	try { user = JSON.parse(JSON.stringify(request.user))}
	catch(e) {user = request.user}
	console.log("Got data?", !!request.params, request.params, user);

	if (!!request.user && 'id' in request.user) 
		isAuthed(user)
			.then((result)=>{
				if (!result || !('id' in result)) return response.error({message: "Not authorized!", result});
				// Bypass security
				// Parse.Cloud.useMasterKey();

				console.log("Result!", result);
				var query = new Parse.Query(Parse.User);
				query.containedIn('objectId', request.params.userIds);
				query.find(null, {useMasterKey: true}).then(users=>{
					users.forEach(user=>Object.keys(user.attributes).forEach(key=>console.log(key + " is equal to: " + user.get(key))))
					var formatted_users = users
						.map(user=> {
							var attributes;
							try { attributes = JSON.parse(JSON.stringify(user.attributes))}
							catch(e) {attributes = user}

							console.log("Got users info!", user);

							return Object.assign({}, {id: user.id}, attributes)
						} )
						.map(user=>({ [user.email]: user }) );

					var data = request.params || {
					  	from: 'DoThis!Local <no-reply@dothislocal.ca>',
					  	bcc: [], 
					  	subject: 'Test Email',
					  	text: "Testing some Mailgun awesomness!",
						html: "<h1>Testing some Mailgun awesomness for user %recipient.firstname% %recipient.lastname%</h1>"
					};

					response.success({result, data, formatted_users});


					// mg.messages.create(domain, data)
					// 	.then(msg => {response.success({msg}); return msg})
					// 	.then(msg => console.log(msg)) // logs response data
					// 	.catch(err => {response.error({err}); return msg})
					// 	.catch(err => console.log(err)); // logs any error        	
				})
				
			});
	else response.error({message: "User was not found. Please login with admin account"})
});


Parse.Cloud.define("test", function(request, response) {
	response.success({message: 'you got it bad!'});
});