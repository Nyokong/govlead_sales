CREATE TABLE "session" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "session_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uID" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"uID" text PRIMARY KEY NOT NULL,
	"firstname" text,
	"lastname" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	"secretcode" text,
	"image" text,
	"emailVerified" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_uID_users_uID_fk" FOREIGN KEY ("uID") REFERENCES "public"."users"("uID") ON DELETE cascade ON UPDATE no action;