CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"contact_number" varchar(50),
	"address" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "companies_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "credit_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"card_number" varchar(20) NOT NULL,
	"cardholder_name" varchar(255),
	"expiry_date" timestamp,
	"payment_method" varchar(50),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invoice_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_id" integer NOT NULL,
	"description" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_code" varchar(10) NOT NULL,
	"company_id" integer NOT NULL,
	"issued_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "invoices_invoice_code_unique" UNIQUE("invoice_code"),
	CONSTRAINT "invoice_code_format" CHECK (substring("invoices"."invoice_code" from 1 for 2) = 'GL')
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"sale_date" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "credit_cards" ADD CONSTRAINT "credit_cards_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_services" ADD CONSTRAINT "invoice_services_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;