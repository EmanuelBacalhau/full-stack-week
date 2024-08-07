import { db } from './_lib/prisma'

import Image from 'next/image'

import { Search } from 'lucide-react'
import { Header } from './_components/header'
import { Input } from './_components/ui/input'
import { Button } from './_components/ui/button'
import { BarbershopSection } from './_components/barbershop-section'
import { quickSearchOptions } from './_constants/search'
import { BookingItem } from './_components/booking-item'

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
  const barbershops = await getBarbershops()
  const popularesBarbershops = await getPopularesBarbershop()

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Emanuel!</h2>
        <p>Segunda-feira, 06 de agosto.</p>

        <form className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <Search />
          </Button>
        </form>

        <div className="my-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant="outline">
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={16}
                height={16}
              />
              {option.title}
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

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-muted-foreground">
          Agendamentos
        </h2>

        <BookingItem />

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
