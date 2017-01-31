CREATE TABLE task (
	id SERIAL PRIMARY KEY,
	message varchar (300)
	)

	ALTER TABLE task
  ADD COLUMN "complete" BOOLEAN DEFAULT FALSE;

	
