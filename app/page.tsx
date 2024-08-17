import { db } from './_lib/prisma'

import Image from 'next/image'

import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { getAllBookingsByUser } from './_actions/get-all-bookings-by-user'
import { BarbershopSection } from './_components/barbershop-section'
import { BookingList } from './_components/booking-list'
import { Header } from './_components/header'
import { Search } from './_components/search'
import { Button } from './_components/ui/button'
import { Welcome } from './_components/welcome'
import { quickSearchOptions } from './_constants/search'
import { authOptions } from './_lib/auth'

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

  const bookingsFormatted = !bookings
    ? []
    : bookings?.map((booking) => ({
        ...booking,
        barbershopService: {
          ...booking.barbershopService,
          price: Number(booking.barbershopService.price),
        },
      }))

  return (
    <div>
      <Header />

      <div className="container relative hidden justify-center px-32 py-16 md:flex lg:h-[460px]">
        <Image
          src="/background-screen-lg.jpeg"
          fill
          objectFit="cover"
          className="opacity-30 grayscale filter"
          alt="teste"
        />

        <div className="z-10 w-full md:flex md:flex-col md:gap-4 lg:grid lg:grid-cols-2 lg:flex-row lg:gap-32">
          <div className="space-y-3 md:w-full lg:w-[440px]">
            <Welcome userName={session?.user?.name} />
            <Search />

            <BookingList bookings={bookingsFormatted} />
          </div>

          <div className="md:w-full lg:max-w-[617px]">
            <BarbershopSection barbershops={barbershops} title="Recomendados" />
          </div>
        </div>
      </div>

      <div className="container space-y-3 p-5">
        <div className="space-y-3 md:hidden">
          <Welcome userName={session?.user?.name} />

          <Search />

          <div className="flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
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

          <BookingList bookings={bookingsFormatted} />

          <BarbershopSection barbershops={barbershops} title="Recomendados" />
        </div>

        <BarbershopSection barbershops={barbershops} title="Populares" />

        <BarbershopSection
          barbershops={popularesBarbershops}
          title="Mais visitados"
        />
      </div>
    </div>
  )
}

export default Home
