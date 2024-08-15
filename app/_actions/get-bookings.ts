'use server'

import { authOptions } from '@/_lib/auth'
import { db } from '@/_lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

interface GetBookingProps {
  barbershopId: string
  date: Date
}

export async function getBookings({ barbershopId, date }: GetBookingProps) {
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error('Unauthorized')
  }

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
  })

  revalidatePath('/bookings')

  return bookings
}
