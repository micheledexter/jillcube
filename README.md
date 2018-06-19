# JillCUBE

A trivia game (still in working progress) that lets you currently play against an AI, and 

## Built With

* React
* React Redux
* React Sagas
* PostgreSQL
* Material-UI
* Node.js
* Passport.js

## Express/Passport with React
This version uses React to control the login requests and redirection in coordination with client-side routing.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `jillcube_db` and run the following SQL:

```SQL
CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(12) NOT NULL UNIQUE,
	"password" TEXT NOT NULL UNIQUE,
	"name" varchar(12),
	"type" TEXT NOT NULL DEFAULT 'standard',
	"profile_image" VARCHAR(255),
	"profile_text" varchar(1000),
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "games" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL UNIQUE,
	"description" TEXT NOT NULL,
	"player_min" integer NOT NULL,
	"player_max" integer NOT NULL,
	"game_image" TEXT NOT NULL,
	CONSTRAINT games_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "game_instance" (
	"id" serial NOT NULL,
	"start_time" TIMESTAMP NOT NULL,
	"end_time" TIMESTAMP,
	"status" varchar(15) NOT NULL,
	"code" varchar(4) NOT NULL,
	"game_id" integer NOT NULL,
	CONSTRAINT game_instance_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "players" (
	"id" serial NOT NULL,
	"instance_id" integer NOT NULL,
	"user_id" integer,
	"name" varchar(12) NOT NULL,
	"score" integer NOT NULL DEFAULT '0',
	"type" varchar(10) NOT NULL DEFAULT 'guest',
	"player_number" integer NOT NULL,
	CONSTRAINT players_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "game_data" (
	"id" serial NOT NULL,
	"prompt" TEXT NOT NULL UNIQUE,
	"game_id" integer NOT NULL,
	CONSTRAINT game_data_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "prompt_answers" (
	"id" serial NOT NULL,
	"player_id" integer NOT NULL,
	"instance_id" integer NOT NULL,
	"data_id" integer NOT NULL,
	"answer" varchar(40),
	CONSTRAINT prompt_answers_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "watson" (
	"id" serial NOT NULL,
	"data_id" integer not null,
	"answer" varchar(20)
);

CREATE TABLE "holmes" (
	"id" serial not null,
	"data_id" integer not null,
	"answer" varchar(20)
);

insert into "watson" ("data_id", "answer") values 
('8', 'get married'),
('8', 'eat feces'),
('8', 'raise elephants'),
('6', 'Brazil'),
('6', 'the United States'),
('6', 'Canada'),
('7', 'food coloring'),
('7', 'trees'),
('7', 'dirt'),
('9', 'famous people'),
('9', 'dogs'),
('9', 'robots'),
('10', 'playing music'),
('10', 'wearing shoes'),
('10', 'using their hands'),
('11', 'a taco'),
('11', 'a human'),
('11', 'a regular Cheeto'),
('12', 'nobody'),
('12', 'the Easter Bunny'),
('12', 'a robot'),
('13', 'their feet'),
('13', 'straws'),
('13', 'their shells'),
('14', 'baked bean'),
('14', 'lava'),
('14', 'dry'),
('15', 'pounds'),
('15', 'brain cells'),
('15', 'cucumbers'),
('16', 'a "spicy mama"'),
('16', 'no friends'),
('16', 'horrible odor'),
('17', 'Santa Clause'),
('17', 'Sherlock Holmes'),
('17', 'Nothing'),
('18', 'platypus'),
('18', 'zebra'),
('18', 'police'),
('19', 'people'),
('19', 'trees'),
('19', 'cucumbers'),
('20', 'series'),
('20', 'peg'),
('20', 'bundle'),
('21', 'indecent exposure'),
('21', 'skinning a cat'),
('21', 'being possessed'),
('22', 'underwear'),
('22', 'shoe sizes'),
('22', 'hair color'),
('23', 'pure ivory'),
('23', 'taco shells'),
('23', 'hair');

insert into "holmes" ("data_id", "answer") values
('6', 'Greenland'),
('6', 'Australia'),
('6', 'Sprindiculy'),
('7', 'mold'),
('7', 'dinosaurs'),
('7', 'rocks'),
('8', 'sell marijuana'),
('8', 'carry a gun'),
('8', 'teach math'),
('9', 'cats'),
('9', 'fruit'),
('9', 'furries'),
('10', 'singing'),
('10', 'making bets'),
('10', 'speaking'),
('11', 'a carrot'),
('11', 'a fork'),
('11', 'a donut'),
('12', 'Japan itself'),
('12', 'Mount Fuji'),
('12', 'Tokyo'),
('13', 'gills'),
('13', 'their tongues'),
('13', 'the lakebed'),
('14', 'razor'),
('14', 'seaweed'),
('14', 'blood'),
('15', 'pancakes'),
('15', 'grand'),
('15', 'plastic eggs'),
('16', 'giant nipples'),
('16', 'no mother'),
('16', 'a small p****'),
('17', 'A dog named "bo"'),
('17', 'Big Foot'),
('17', 'Sherlock Holmes'),
('18', 'tuna fish'),
('18', 'Loch Ness Monster'),
('18', 'toy poodle'),
('19', 'babies'),
('19', 'people online'),
('19', 'fruit bowls'),
('20', 'rainbow'),
('20', 'legion'),
('20', 'pointy pod'),
('21', 'sending email scams'),
('21', 'being a person'),
('21', 'bringing funky back'),
('22', 'myspace accounts'),
('22', 'pooping habits'),
('22', 'fingerprints'),
('23', 'cat fur'),
('23', 'duck bladder'),
('23', 'steel');



ALTER TABLE "game_instance" ADD CONSTRAINT "game_instance_fk0" FOREIGN KEY ("game_id") REFERENCES "games"("id");

ALTER TABLE "players" ADD CONSTRAINT "players_fk0" FOREIGN KEY ("instance_id") REFERENCES "game_instance"("id");
ALTER TABLE "players" ADD CONSTRAINT "players_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "game_data" ADD CONSTRAINT "game_data_fk0" FOREIGN KEY ("game_id") REFERENCES "games"("id");

ALTER TABLE "prompt_answers" ADD CONSTRAINT "prompt_answers_fk0" FOREIGN KEY ("player_id") REFERENCES "players"("id");
ALTER TABLE "prompt_answers" ADD CONSTRAINT "prompt_answers_fk1" FOREIGN KEY ("instance_id") REFERENCES "game_instance"("id");
ALTER TABLE "prompt_answers" ADD CONSTRAINT "prompt_answers_fk2" FOREIGN KEY ("data_id") REFERENCES "game_data"("id");

ALTER TABLE "public"."game_data" ADD COLUMN "answer" text;
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run dev:client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Linting

The Airbnb ESLint for react is a part of this project. If you would like to take advantage of this in VS Code, you can add the `ESLint` extension. Click the `Extensions` button (the button right below the `Debug`) and search for `ESLint`. Click `install` for the first result and then click `Reload`. Then it should be all set up!

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

## Production Build

This is the build Heroku will run, but during development, you will likely not need to use it.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Herkoku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy
