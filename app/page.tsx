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
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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

  const currentDate = new Date()

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session ? session.user.name?.split(' ')[0] : 'bem vindo'}!
        </h2>
        <p>
          <span className="capitalize">
            {format(currentDate, 'EEEE', {
              locale: ptBR,
            })}
          </span>
          , <span>{format(currentDate, 'dd')}</span>
          {' de '}
          <span className="capitalize">
            {format(currentDate, 'MMMM', {
              locale: ptBR,
            })}
          </span>
        </p>

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
