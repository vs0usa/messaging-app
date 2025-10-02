import { Database } from "@repo/db"
import type { Kysely } from "kysely"
import { auth } from "../config"
import { faker } from "@faker-js/faker"
import { authEnv } from "../env"

export async function seed(db: Kysely<Database>) {
  // 1. Generate users
  const users = Array.from({ length: 15 }, () => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  }))

  for (const user of users) {
    await auth.api.signUpEmail({
      body: {
        name: user.name,
        image: user.image,
        email: user.email,
        password: authEnv.SEED_DEFAULT_PASSWORD,
      },
    })
  }

  console.log(`✅ Created ${users.length} users`)

  // 2. Generate messages
  const insertedUsers = await db.selectFrom("users").selectAll().execute()
  const messages = []

  for (let i = 0; i < 50; i++) {
    const sender = faker.helpers.arrayElement(insertedUsers)
    const recipient = faker.helpers.arrayElement(
      insertedUsers.filter((u) => u.id !== sender.id),
    )

    messages.push({
      content: faker.lorem.sentence(),
      senderId: sender.id,
      recipientId: recipient.id,
      readAt: faker.datatype.boolean() ? faker.date.recent() : null,
    })
  }

  const insertedMessages = await db
    .insertInto("messages")
    .values(messages)
    .returning(["id"])
    .execute()

  console.log(`✅ Created ${insertedMessages.length} messages`)
  console.log("🎉 Database seeding completed successfully!")
}
