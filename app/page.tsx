import { db } from './_lib/prisma'

import Image from 'next/image'

import { Header } from './_components/header'
import { BarbershopSection } from './_components/barbershop-section'
import { quickSearchOptions } from './_constants/search'
import { BookingItem } from './_components/booking-item'
import { Search } from './_components/search'
import { Button } from './_components/ui/button'
import Link from 'next/link'
import { authOptions } from './_lib/auth'
import { getServerSession } from 'next-auth'
import { getAllBookingsByUser } from './_actions/get-all-bookings-by-user'

async function getBarbershops() {
  const barbershops = await db.barbershop.findMany()

  return barbershops
}

async function getPopularesBarbershop() {
  const barbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return barbershops
}

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await getBarbershops()
  const popularesBarbershops = await getPopularesBarbershop()

  const bookings = session && (await getAllBookingsByUser(session.user.id))

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Emanuel!</h2>
        <p>Segunda-feira, 06 de agosto.</p>

        <Search />

        <div className="my-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="gap-2"
              variant="outline"
              asChild
            >
              <Link href={`/barbershop?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative h-[150px] w-full">
          <Image
            src={'/banner-01.png'}
            fill
            className="rounded-xl object-cover"
            alt="Agende os melhores com FSW Barbers"
          />
        </div>

        {bookings && bookings.length !== 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-muted-foreground">
              Agendamentos
            </h2>

            <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {bookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        <BarbershopSection barbershops={barbershops} title="Recomendados" />

        <BarbershopSection
          barbershops={popularesBarbershops}
          title="Populares"
        />
      </div>
    </div>
  )
}

export default Home
