CREATE TABLE IF NOT EXISTS "Blog" (
	"id" serial NOT NULL,
	"title" text,
	"content" text,
	"writer_id" numeric,
	"created_at" timestamp,
	"updated_at" timestamp
);
