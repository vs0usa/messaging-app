import { sql, type Kysely } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
  // Enable UUID extension
  await db.schema.createSchema("public").ifNotExists().execute()
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`.execute(db)

  // Users table
  await db.schema
    .createTable("users")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(db.fn("uuid_generate_v4")),
    )
    .addColumn("email", "text", (col) => col.notNull().unique())
    .addColumn("firstName", "text", (col) => col.notNull())
    .addColumn("lastName", "text", (col) => col.notNull())
    .addColumn("profilePictureUrl", "text")
    .addColumn("isActive", "boolean", (col) => col.notNull().defaultTo(true))
    .addColumn("createdAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .execute()

  // Messages table
  await db.schema
    .createTable("messages")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(db.fn("uuid_generate_v4")),
    )
    .addColumn("senderId", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("recipientId", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("replyToMessageId", "uuid", (col) =>
      col.references("messages.id").onDelete("set null"),
    )
    .addColumn("isEdited", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("editedAt", "timestamptz")
    .addColumn("readAt", "timestamptz")
    .addColumn("createdAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .execute()

  // Attachments table
  await db.schema
    .createTable("attachments")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(db.fn("uuid_generate_v4")),
    )
    .addColumn("messageId", "uuid", (col) =>
      col.notNull().references("messages.id").onDelete("cascade"),
    )
    .addColumn("fileName", "text", (col) => col.notNull())
    .addColumn("fileUrl", "text", (col) => col.notNull())
    .addColumn("fileSize", "integer", (col) => col.notNull())
    .addColumn("mimeType", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .execute()

  // Indexes for better performance
  await db.schema
    .createIndex("idx_messages_sender_id")
    .on("messages")
    .column("senderId")
    .execute()

  await db.schema
    .createIndex("idx_messages_recipient_id")
    .on("messages")
    .column("recipientId")
    .execute()

  await db.schema
    .createIndex("idx_messages_created_at")
    .on("messages")
    .column("createdAt")
    .execute()

  await db.schema
    .createIndex("idx_attachments_message_id")
    .on("attachments")
    .column("messageId")
    .execute()

  // Create function for updating updatedAt timestamps
  sql`
		CREATE OR REPLACE FUNCTION update_updated_at_column()
		RETURNS TRIGGER AS $$
		BEGIN
			NEW."updatedAt" = NOW();
			RETURN NEW;
		END;
		$$ language 'plpgsql';
	`.execute(db)

  // Create triggers for updatedAt timestamps
  sql`
		CREATE TRIGGER update_users_updated_at 
		BEFORE UPDATE ON users
		FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
	`.execute(db)

  sql`
		CREATE TRIGGER update_messages_updated_at 
		BEFORE UPDATE ON messages
		FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
	`.execute(db)
}

export async function down(db: Kysely<any>): Promise<void> {
  sql`DROP TRIGGER IF EXISTS update_users_updated_at ON users;`.execute(db)
  sql`DROP TRIGGER IF EXISTS update_messages_updated_at ON messages;`.execute(
    db,
  )
  sql`DROP FUNCTION IF EXISTS update_updated_at_column();`.execute(db)

  await db.schema.dropIndex("idx_attachments_message_id").execute()
  await db.schema.dropIndex("idx_messages_created_at").execute()
  await db.schema.dropIndex("idx_messages_recipient_id").execute()
  await db.schema.dropIndex("idx_messages_sender_id").execute()

  await db.schema.dropTable("attachments").execute()
  await db.schema.dropTable("messages").execute()
  await db.schema.dropTable("users").execute()
}
