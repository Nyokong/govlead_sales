ALTER TABLE "account" DROP CONSTRAINT "account_userId_users_uID_fk";
--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_users_uID_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_users_uID_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "uID" text NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "uID" text NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "uID" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_uID_users_uID_fk" FOREIGN KEY ("uID") REFERENCES "public"."users"("uID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_uID_users_uID_fk" FOREIGN KEY ("uID") REFERENCES "public"."users"("uID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_uID_users_uID_fk" FOREIGN KEY ("uID") REFERENCES "public"."users"("uID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN "userId";