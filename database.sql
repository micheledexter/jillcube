CREATE TABLE "users"
(
    "id" serial NOT NULL,
    "username" varchar(12) NOT NULL UNIQUE,
    "password" TEXT NOT NULL UNIQUE,
    "name" varchar(12),
    "type" TEXT NOT NULL DEFAULT 'standard',
    "profile_image" VARCHAR(255),
    "profile_text" varchar(1000),
    CONSTRAINT users_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);
CREATE TABLE "games"
(
    "id" serial NOT NULL,
    "title" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "player_min" integer NOT NULL,
    "player_max" integer NOT NULL,
    "game_image" TEXT NOT NULL,
    CONSTRAINT games_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);
CREATE TABLE "game_instance"
(
    "id" serial NOT NULL,
    "start_time" TIMESTAMP NOT NULL,
    "end_time" TIMESTAMP,
    "status" varchar(15) NOT NULL,
    "code" varchar(4) NOT NULL,
    "game_id" integer NOT NULL,
    CONSTRAINT game_instance_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);
CREATE TABLE "players"
(
    "id" serial NOT NULL,
    "instance_id" integer NOT NULL,
    "user_id" integer,
    "name" varchar(12) NOT NULL,
    "score" integer NOT NULL DEFAULT '0',
    "type" varchar(10) NOT NULL DEFAULT 'guest',
    "player_number" integer NOT NULL,
    CONSTRAINT players_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);
CREATE TABLE "game_data"
(
    "id" serial NOT NULL,
    "prompt" TEXT NOT NULL UNIQUE,
    "game_id" integer NOT NULL,
    CONSTRAINT game_data_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);
CREATE TABLE "prompt_answers"
(
    "id" serial NOT NULL,
    "player_id" integer NOT NULL,
    "instance_id" integer NOT NULL,
    "data_id" integer NOT NULL,
    "answer" varchar(40),
    CONSTRAINT prompt_answers_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "game_instance" ADD CONSTRAINT "game_instance_fk0" FOREIGN KEY ("game_id") REFERENCES "games"("id");
ALTER TABLE "players" ADD CONSTRAINT "players_fk0" FOREIGN KEY ("instance_id") REFERENCES "game_instance"("id");
ALTER TABLE "players" ADD CONSTRAINT "players_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "game_data" ADD CONSTRAINT "game_data_fk0" FOREIGN KEY ("game_id") REFERENCES "games"("id");
ALTER TABLE "prompt_answers" ADD CONSTRAINT "prompt_answers_fk0" FOREIGN KEY ("player_id") REFERENCES "players"("id");
ALTER TABLE "prompt_answers" ADD CONSTRAINT "prompt_answers_fk1" FOREIGN KEY ("instance_id") REFERENCES "game_instance"("id");
ALTER TABLE "prompt_answers" ADD CONSTRAINT "prompt_answers_fk2" FOREIGN KEY ("data_id") REFERENCES "game_data"("id");