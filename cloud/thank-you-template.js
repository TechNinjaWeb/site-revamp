module.exports.text = `
	Your Monsignor Paul Dwyer CHS Target!Pak purchase is Confirmed!
	\n\n
	Thank you for supporting Monsignor Paul Dwyer Catholic High School! You should receive your Target!Pak(s) in the mail in about 1-2 weeks! 
	\n\n
	When you receive the Target!Pak, there will be a code on the back that you can register on dothislocal.ca to receive even more offers. DoThis!Local will be adding new offers on a regular basis so don't miss out.
	\n\n
	Your Confirmation Code: %recipient.id%
	\n\n
	please forward your confirmation code below to the student that asked you to support their school as the student has a chance to win some great prizes!
	\n\n
	First Name: %recipient.firstname% \n
	Last Name: %recipient.lastname% \n
	Address: %recipient.address% \n
	City: %recipient.city% \n
	Postal Code: %recipient.postal% \n
	You received this email because you recently made a purchase to support a local fundraiser. \n
	\n\n
	If you wish to not get any further communication from DoThis!Local please email unsubscribe to unsubscribe@dothislocal.ca or follow this link %unsubscribe_url%.
	\n\n
`;
module.exports.html = `
	<!DOCTYPE html>
	<html>

	<head>
	    <!--  Essential META Tags -->
	    <title>DoThis!Local</title>
	    <meta name="viewport"             content="width=device-width, initial-scale=1">
	    <meta name="description"          content="A unique fundraiser for students at Paul Dwyer">
	    <meta name="keywords"             content="fundraising coupons ads ontario schools clubs sports local saving">
	    <meta name="author"               content="Frank Baldwin">
	</head>

	<body>
	  	<div class="container" style="min-width: 340px; margin: auto 10px;">
		    <div class="header" style="display: flex; flex-wrap: wrap; justify-content: space-around; background-color: white;border-bottom: 4px solid #2563b2; padding: 15px 0; align-items: center; margin-left: 20px; margin-right: 20px;">
		        <img class="logo"
		        	src="https://dothislocal.ca/images/DoItLocalLogo.png" 
		        	alt="Monsignor Paul Dwyer Catholic High School"
		        	style="max-width: 300px;max-height: 80px; padding: auto 20px;">
		    </div>
		    <div class="content">
				<div class="page" style="margin: auto 20px; min-height: 70vh;">
					<h2>Your Monsignor Paul Dwyer CHS Target!Pak purchase is Confirmed!</h2>
					<p>
						Thank you for supporting Monsignor Paul Dwyer Catholic High School! You should receive your Target!Pak(s) 
						in the mail in about 1-2 weeks!
						<br /><br />
						When you receive the Target!Pak, there will be a code on the back that you can register on dothislocal.ca 
						to receive even more offers. DoThis!Local will be adding new offers on a regular basis so don't miss out.
					</p>

					<p>
						<h3>Your Confirmation Code: <b>%recipient.id%</b></h3>
						<p>
							<b>
								please forward your confirmation code above to the student 
								that asked you to support their school as the student has a chance to win some great prizes!
							</b>
						</p>
						<code>
							First Name: %recipient.firstname% <br />
							Last Name: %recipient.lastname% <br />
							Address: %recipient.address% <br />
							City: %recipient.city% <br />
							Postal Code: %recipient.postal% <br />
						</code>
					</p>
					<p>
						You received this email because you recently made a purchase to support a local fundraiser. 
						<br /><br />
						If you wish to not get any further communication from DoThis!Local please <a href="%unsubscribe_url%">click here</a>
						or email <b>unsubscribe</b> to <a href="mailto:unsubscribe@dothislocal.ca">unsubscribe@dothislocal.ca.</a>
					</p>
				</div>

		    </div>
		    <div class="footer col-sm-12 text-center bg-green" style="padding: 40px; color: white; vertical-align: middle; text-align: center;background-color: #109854">
		      &copy; 2017 DoThis!Local | All Rights Reserved
		    </div> 
    	</div>
	</body>

	</html>
`;