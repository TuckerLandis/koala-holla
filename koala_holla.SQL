-- The name of the database our application references is 'koala_holla', and as such, the database you initialize will need to be named the same

-- The create table statement need to be exceuted in order to initialize the database

-- We've included some sample Koalas for reference, and a test select statement to ensure your table is functional






CREATE TABLE "koalas" (
		"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"gender" VARCHAR (6) NOT NULL,
	"age" INT,
  "ready_to_transfer" VARCHAR (3),
  "notes" VARCHAR (250)
);

INSERT INTO "koalas" 
	("name", "gender", "age", "ready_to_transfer", "notes") 
VALUES 
	('Scotty', 'M', '4', 'Y', 'Born in Guatemala'), ('Jean', 'F', '5', 'Y', 'Allergic to lots of lava'), ('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)'), ('Logan', 'M', '15', 'N', 'Loves the sauna'), ('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana'), ('Betsy', 'F', '4', 'Y', 'Has a pet iguana')
;

SELECT * FROM "koalas";