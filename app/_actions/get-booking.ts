'use server'

import { db } from '@/_lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'

interface GetBookingProps {
  barbershopId: string
  date: Date
}

export async function getBookings({ barbershopId, date }: GetBookingProps) {
  const bookings = await db.booking.findMany({
    where: {
      barbershopService: {
        barbershopId,
      },
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
    select: {
      date: true,
    },
  })

  return bookings
}
