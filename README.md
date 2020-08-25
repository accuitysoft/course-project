This application is a backend application consisting of a RESTful JSON API for a contact us form. Entries can be submitted by anyone, the listing of messages is restricted to authenticated users only.

To be run together with starter-project

The .env file must be created prior to running with the following values filled out
PORT=4000
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_PORT=3306
DB_DATABASE=
JWT_SECRET=

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

For CRUD operations for experience
`GET /experience` 
`GET /experience/search/:id` 
`GET /experience/categories` 
`POST /experience/` 
`PATCH /experience/` 
`DELETE /experience/:id` 

For CRUD operations for blog (alternative to portfolio)
`GET /blog/summary` 
`GET /blog/page/:id` 
`POST /blog` 
`PATCH /blog` 
`DELETE /blog:id` 

To set up database, please run the commands below.


create database personalProject

use personalProject

CREATE TABLE IF NOT EXISTS `user` (
  `userID` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  primary key (`userID`)
)

CREATE TABLE IF NOT EXISTS `contact` (
  `contactID` varchar(50) NOT NULL,
  `content` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phoneNumber` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  primary key (`contactID`)
)

CREATE TABLE IF NOT EXISTS `experience` (
  `experienceID` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `experience` varchar(100) NOT NULL,
  primary key (`experienceID`)
)


CREATE TABLE IF NOT EXISTS `blog` (
  `blogID` varchar(50) NOT NULL,
  `picture` varchar(100) NOT null,
  `date` date NOT NULL,
  `cardTitle` varchar(200) NOT NULL,
  `cardSummary` text NOT NULL,
  `blogTitle` varchar(200) ,
  `blogText`  text NOT NULL,
  primary key (`blogID`)
)

insert into user (userID, password, email, name) values (
'1fc25ade-375d-4b98-91ea-4abb33288099',
'password123',
'me@shanelee.ca',
'Shane Lee'
)

insert into experience (experienceID, category, experience)
values
('48562ec6-99db-4534-86e2-ffaee36880bd', 'Accounting Experience', 'Control Implementation'),
('880922e8-d64d-4625-a72f-079e686ff555', 'Accounting Experience', 'Software Transition'),
('36608261-2e39-4b7f-87b4-df8630b5208a', 'Accounting Experience', 'Audit Preparation'),
('1a42b20d-90c5-4bc4-a5f6-e2381a52b245', 'Accounting Experience', 'Cashflow Management'),
('a6e56c3a-3983-471d-baba-497a9ce79282', 'Accounting Experience', 'Management Report'),
('aa39c344-da3d-47b1-a438-b2f83c7dedaa', 'Accounting Experience', 'Credit Facility Application'),
('605b809e-86fc-4035-a26c-50d85674d6fc', 'Accounting Experience', 'Workflow Implementation'),
('4c58ee19-f294-4743-a90e-d8488dd53007', 'Developer Experience', 'html'),
('00948311-dd05-4156-8ccf-fb0c55597015', 'Developer Experience', 'CSS'),
('27fbf985-4e79-4a0d-bd25-371e455b7a14', 'Developer Experience', 'Javascript'),
('37e93fc1-d6d0-4fea-a146-b5241523f311', 'Developer Experience', 'Express JS'),
('4ae4ea9d-f1c8-4e35-a091-a1793721b1dc', 'Developer Experience', 'React'),
('3a24b4df-fc66-4c1f-b60b-6d2289024502', 'Developer Experience', 'SQL'),
('6b447ee9-3e15-4237-8fb3-cfe0f082bf03', 'Developer Experience', 'Git'),
('11928881-7f3e-4ff5-a5ee-db088ede1aae', 'Education', 'Chartered Accountant of Canada'),
('0975e670-cc9c-4c4a-bf93-368142ecfce6', 'Education', 'Honours BBA, Wilfrid Laurier University')

insert into blog (blogID, picture, date, cardTitle, cardSummary, blogTitle, blogText)
values
('c7a62393-f457-4caa-97e9-7c51c7d3c58d', '/img/data-validation.png', '2020-08-21', 'Does your business have processes for data validation?', 'While businesses understand the value of tracking data, many have yet to implement controls that validate them. As a result, the data obtained does not provide accurate information.', 'Does your business have processes for data validation?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Scelerisque eu ultrices vitae auctor eu augue. Semper viverra nam libero justo laoreet sit. Nec dui nunc mattis enim ut tellus elementum sagittis. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Ut tellus elementum sagittis vitae et leo duis. Tempus quam pellentesque nec nam aliquam. Nulla facilisi morbi tempus iaculis urna id. Orci ac auctor augue mauris augue neque. Varius duis at consectetur lorem donec massa sapien faucibus et. Suspendisse potenti nullam ac tortor vitae purus faucibus.'),
('b346d7ef-bbce-43c0-abfd-025d171f2ddf', '/img/connecting-data.jpg', '2020-08-21', 'Connecting operational and financial data to identify process weaknesses', 'The traditional form of comparing financial data month over month has been the norm over the years. However, recent technologies in data analytics allows us to connect data from multiple sources to gain valuable insights.', 'Connecting operational and financial data to identify process weaknesses', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Scelerisque eu ultrices vitae auctor eu augue. Semper viverra nam libero justo laoreet sit. Nec dui nunc mattis enim ut tellus elementum sagittis. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Ut tellus elementum sagittis vitae et leo duis. Tempus quam pellentesque nec nam aliquam. Nulla facilisi morbi tempus iaculis urna id. Orci ac auctor augue mauris augue neque. Varius duis at consectetur lorem donec massa sapien faucibus et. Suspendisse potenti nullam ac tortor vitae purus faucibus.'),
('76f6c6f7-a4f3-45c2-85a3-95c5cbc2bd43', '/img/corporate-culture.jpg', '2020-08-21', 'Corporate Culture Change - Implementing Data Collection Processes', 'Process changes are inevitable when implementing new data collection points. The old culture of "just get it done" no longer applies.', 'Corporate Culture Change - Implementing Data Collection Processes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Scelerisque eu ultrices vitae auctor eu augue. Semper viverra nam libero justo laoreet sit. Nec dui nunc mattis enim ut tellus elementum sagittis. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Ut tellus elementum sagittis vitae et leo duis. Tempus quam pellentesque nec nam aliquam. Nulla facilisi morbi tempus iaculis urna id. Orci ac auctor augue mauris augue neque. Varius duis at consectetur lorem donec massa sapien faucibus et. Suspendisse potenti nullam ac tortor vitae purus faucibus.')
