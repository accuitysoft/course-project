# Project

For this project you must work alone to build a backend application consisting of a RESTful JSON API for a contact us form [_(examples)_](https://www.jotform.com/form-templates/category/contact-form) you'll be building out in a later class. All persistent data is to be stored in a simple JSON file that’s operated on through Node’s `fs` module.

User will be required in order to use the API and users must be able to register and login via the JSON API as well. 


## Route Breakdown

1. Route to _create_ an entry when the user submits their contact form.
1. Route to _create_ or register a user.
1. Route to log a registered user in to _create_ a JWT (JSON Web Token) token.
1. Route to _get_ a listing of all submissions when given a valid JWT


## Required Fields

These fields represent fields that will be submitted in the form. They will be represented in your JSON as object propreties. They must be validated against the server else respond with an appropriate HTTP status code and does not write the entry to the JSON file (your database).

- Name
- Email
- Phone number


## Phases

### Phase One
- GitHub repository is set up.
- Express is running on a high port number such as `3000`.

### Phase Two
- Routes are setup and semantically correct, and respond with a valid and applicable response, e.g. when a new resource is created, the created object with the appropriate status code, for the form submission route.
- Express default error handling middleware is setup.
- Express JSON parsing middleware is setup.
#### Resources
- [Default error handler](https://expressjs.com/en/guide/error-handling.html#the-default-error-handler)

### Phase Three
- Submitted entries are saved to the JSON file.
- Can request an array of objects (in JSON) for all submitted entries.
- Users can register.
- Users can login.



## Rubric

| Assessment Criteria | Not Good Enough _(0% score <60%)_ | Good _(60% score <90%)_ | Very Good _(%90 score %100)_ | **Marks** |
| --- | --- | --- | --- | --- |
| ***Repository and Package Setup*** | The project exists with `package.json` with some correct information in it. Files are disorderly placed. | A git repository was created for this project which contains a `package.json` with useful npm scripts and a `.gitignore` that ignores `node_modules`. which mostly contains the correct information. Files are fairly organized. | A git repository was created for this project which contains a package.json, with the appropriate npm start script using nodemon and the appropriate name and author fields were completed. | **10** |
| ***Maintainability*** | Code and modules are not reasonably organized. The code is also mostly difficult to follow and reason about. | Most relevant files and code is easy to read and understand. The router module exists and contains some or all relevant code. | All code is well organized into modules and easy to follow and understand. Strict mode is enforced in all relevant files and code is easy to read and understand with reasonable formatting. | **10** |
| ***Functionality*** | An attempt to get an Express app with the desired functionality was made. | An Express app with the desired functionality runs and responds to most HTTP requests without error and accept JSON in the request bodies. | An Express HTTP server runs on a high port number. The server responds to all HTTP requests without error and implements all required functionality. All routes accept JSON in request bodies and are defined in a router file which is used as Express middleware. | **20** |
| ***HTTP Semantics*** | Most HTTP methods (verbs) and status codes were not correctly implemented. | Most HTTP responses use the proper HTTP status code or a 200 status code. The appropriate HTTP methods were used to define many routes. | All HTTP responses use the proper HTTP status code or a 200 status code. The appropriate HTTP methods were used to define all routes. | **10** |
