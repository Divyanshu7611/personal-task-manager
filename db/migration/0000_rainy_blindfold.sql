CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar NOT NULL,
	"age" integer NOT NULL,
	"password" text NOT NULL,
	"phone" varchar NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
