import { Search } from 'lucide-react'
import { Header } from './_components/header'
import { Input } from './_components/ui/input'
import { Button } from './_components/ui/button'
import Image from 'next/image'
import { Card, CardContent } from './_components/ui/card'
import { Badge } from './_components/ui/badge'
import { Avatar, AvatarImage } from './_components/ui/avatar'
import { db } from './_lib/prisma'
import { BarbershopSection } from './_components/barbershop-section'

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

        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/EmanuelBacalhau.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

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
