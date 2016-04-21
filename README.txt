Name: David Hoxie
Email: dahoxie@gmail.com
Date: 4/20/16
Assignment: Assignment 7

Files:

    server.js - Express server that will store links using
				mongodb, track "clicks" on links, and redirect
				user to a link on request.

To Run:
	-Start Mongodb.
	-Change to directory server.js is located
	-Run command node server.js
	-Access with:
        curl --silent --request POST \
        --header 'Content-Type: application/json' \
        --data '{ "link": "google.com", "title": "google" }' \
       'http://localhost:3000/links' | python -m json.tool

		examples
		localhost:3000/links
	    localhost:3000/clicks/:google

Required Node Modules:
    -express
    -mongodb
    -body-parser
