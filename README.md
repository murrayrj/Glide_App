# Glide

It’s a realtime web application that allows you to experience different places through user generated experiences.

# Our approach

Since the Instagram API only returned 20 media objects per GET request, of which only a couple were videos, we decided to use web sockets to get real time posts of videos from Instagram. Our decision to  approach the app like this meant we had to manage a lot of data from Instagram without delays on the client side.

# Technologies

* Node.js
* Express.js
* MongoDB
* Instagram API
* Google Maps API

# Installation

To install you need to run Ngrok on port 3000 by entering ```ngrok http 3000``` in the command line.

Take the url and change it on ```server.js``` line 25 and ```map.js``` line 12.
Then run ```npm install``` to install all of the dependencies.

Finally run ```nodemon server.js``` and use your ngrok url in the browser to see the website.

If you want to take a look of our mood board / [wireframes](http://pataruco.s3.amazonaws.com/ga/glide/design_research_002.pdf)
 


