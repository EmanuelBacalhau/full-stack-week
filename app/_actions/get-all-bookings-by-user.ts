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
          price: true,
          barbershop: {
            select: {
              name: true,
              imageUrl: true,
              address: true,
              phones: true,
              description: true,
            },
          },
        },
      },
    },
  })

  return bookings
}
