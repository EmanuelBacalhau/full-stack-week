'use server'

import { authOptions } from '@/_lib/auth'
import { db } from '@/_lib/prisma'
import { getServerSession } from 'next-auth'

interface CreateBookingParams {
  barbershopServiceId: string
  date: Date
}

export async function createBooking(params: CreateBookingParams) {
  const data = await getServerSession(authOptions)

  if (!data?.user) {
    throw new Error('Unauthorized')
  }

  await db.booking.create({
    data: {
      barbershopServiceId: params.barbershopServiceId,
      date: params.date,
      userId: data.user.id,
    },
  })
}
