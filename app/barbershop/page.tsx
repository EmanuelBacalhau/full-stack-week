import { BarbershopItem } from '@/_components/barbershop-item'
import { Header } from '@/_components/header'
import { Search } from '@/_components/search'
import { db } from '@/_lib/prisma'

interface BarbershopPageProps {
  searchParams: {
    service?: string
    title?: string
  }
}

async function getBarbershopBySearch({ searchParams }: BarbershopPageProps) {
  if (searchParams.title) {
    const response = await db.barbershop.findMany({
      where: {
        name: {
          contains: searchParams.title,
          mode: 'insensitive',
        },
      },
    })

    return response
  } else if (searchParams.service) {
    const response = await db.barbershopService.findMany({
      where: {
        name: {
          contains: searchParams.service,
          mode: 'insensitive',
        },
      },
      select: {
        barbershop: true,
      },
    })

    return response.map((item) => item.barbershop)
  } else {
    return []
  }
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await getBarbershopBySearch({ searchParams })

  return (
    <div>
      <Header />

      <div className="container py-5">
        <div className="lg:hidden">
          <Search />
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-muted-foreground">
          Resultado para: &quot;{searchParams.title || searchParams.service}
          &quot;
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default BarbershopPage
