This application is a backend application consisting of a RESTful JSON API for a contact us form. Entries can be submitted by anyone, the listing of messages is restricted to authenticated users only.

The .env file must be created prior to running with the following values filled out
PORT=
JWT_SECRET=
DB_FILE_LOCATION=

To start the application, run 'npm build start'

The following routes are accepted
`POST /contact_form/entries`
Request body expected:
    ```json
    {
        "name": "some string",
        "email": "address@email.com", // should be a valid email address
        "phoneNumber": "2343331234",
        "content": "User's message goes here"
    }

`POST /users`
Request body accepted (all properties required):
    ```json
    {
        "name": "Some Name",
        "password": "password", // must be minimum 8 characters
        "email": "address@email.com" // must be a valid email address
    }

`POST /auth`
Expected request:
    ```json
    {
        "email": "address@email.com",
        "password": "somepassword"
    }

`GET /contact_form/entries` with authorized Bearer Token

`GET /contact_form/entries/:id` with authorized Bearer Token
