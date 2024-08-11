import { BarbershopItem } from '@/_components/barbershop-item'
import { Header } from '@/_components/header'
import { Search } from '@/_components/search'
import { db } from '@/_lib/prisma'

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

async function getBarbershopBySearch({ searchParams }: BarbershopPageProps) {
  const response = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  })

  return response
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await getBarbershopBySearch({ searchParams })

  return (
    <div>
      <Header />

      <div className="px-5">
        <Search />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-muted-foreground">
          Resultado para: &quot;{searchParams.search}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default BarbershopPage
