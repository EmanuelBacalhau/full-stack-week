'use server'

import { db } from '@/_lib/prisma'

export async function getAllBookingsByUser(userId: string) {
  const bookings = await db.booking.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      date: true,
      barbershopService: {
        select: {
          name: true,
          barbershop: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  })

  return bookings
}
