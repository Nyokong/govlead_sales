CREATE TABLE "account" (
	"userID" text NOT NULL,
	"session_state" boolean
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userID" text NOT NULL,
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
ALTER TABLE "account" ADD CONSTRAINT "account_userID_users_uID_fk" FOREIGN KEY ("userID") REFERENCES "public"."users"("uID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userID_users_uID_fk" FOREIGN KEY ("userID") REFERENCES "public"."users"("uID") ON DELETE cascade ON UPDATE no action;