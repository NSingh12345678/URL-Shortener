#
The project aims to develop a system that generates and stores short URLs for full-length URLs. It also includes a search functionality to retrieve the stored URLs using MongoDB Atlas as the database. The project is implemented using Node.js and utilizes MongoDB Cloud as the database solution.
To create a URL shortener and search optimization project using Node.js and MongoDB Cloud as the database solution -
1.Set up a MongoDB Cloud account and obtained the connection details.
2.Created a new directory for our project.
Opened a terminal or command prompt and navigate to the project directory.
Ran the command "npm init" to initialize a new Node.js project.
3.Ran the command "npm install express mongoose shortid" to install the packages.
4.Created a route in app.js to handle the URL shortening functionality.
When a user submits a URL, generate a short ID using the Shortid package.
Saves the original URL and the shortened URL with the generated ID to the database.
and return the shortened URL to the user.
5.Tested the project locally to ensure that URL shortening, redirection, and search functionalities work as expected.
6.Tested the deployed project to ensure it functions correctly in a live environment.
