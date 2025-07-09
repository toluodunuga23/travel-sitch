import { PrismaClient, Prisma } from "../src/app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
];

async function main() {
  console.log("🌱 Seeding...");

  // Create users or find existing ones
  const createdUsers = [];
  for (const u of userData) {
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: u.email },
    });

    if (!user) {
      // Create user if it doesn't exist
      user = await prisma.user.create({ data: u });
      console.log(`✅ Created user: ${user.name} (${user.email})`);
    } else {
      console.log(`ℹ️  User already exists: ${user.name} (${user.email})`);
    }

    createdUsers.push(user);
  }

  // Check if event already exists
  const existingEvent = await prisma.event.findFirst({
    where: { title: "Prisma Workshop" },
  });

  let event1;
  if (!existingEvent) {
    // Create event hosted by Alice
    event1 = await prisma.event.create({
      data: {
        title: "Prisma Workshop",
        description: "Learn how to use Prisma with PostgreSQL.",
        date: new Date("2025-08-01T10:00:00.000Z"),
        endDate: new Date("2025-08-01T15:00:00.000Z"),
        location: "Online",
        isOnline: true,
        price: 0,
        hostId: createdUsers[0].id, // Alice
        url: "https://prisma.io/events/workshop",
        imageUrl: "https://example.com/event-banner.png",
      },
    });
    console.log("✅ Created event: Prisma Workshop");
  } else {
    event1 = existingEvent;
    console.log("ℹ️  Event already exists: Prisma Workshop");
  }

  // Create event attendance (check for existing attendance first)
  const attendanceData = [
    {
      userId: createdUsers[0].id, // Alice
      eventId: event1.id,
      rsvp: "yes",
    },
    {
      userId: createdUsers[1].id, // Bob
      eventId: event1.id,
      rsvp: "maybe",
    },
  ];

  for (const attendance of attendanceData) {
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        userId_eventId: {
          userId: attendance.userId,
          eventId: attendance.eventId,
        },
      },
    });

    if (!existingAttendance) {
      await prisma.attendance.create({
        data: attendance,
      });
      console.log(`✅ Created attendance for user ${attendance.userId}`);
    } else {
      console.log(
        `ℹ️  Attendance already exists for user ${attendance.userId}`
      );
    }
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
