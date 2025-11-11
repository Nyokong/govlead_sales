ALTER TABLE "credit_cards" ALTER COLUMN "expiry_date" SET DATA TYPE varchar(4);--> statement-breakpoint
ALTER TABLE "credit_cards" ALTER COLUMN "expiry_date" SET NOT NULL;