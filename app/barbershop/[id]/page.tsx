import { PhoneItem } from '@/_components/phone-item'
import { ServiceItem } from '@/_components/service-item'
import { Button } from '@/_components/ui/button'
import { Sheet, SheetTrigger } from '@/_components/ui/sheet'
import { db } from '@/_lib/prisma'
import { Sidebar } from '@/sidebar'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BarbershopPageProps {
  params: {
    id: string
  }
}

async function getBarbershopDetails(id: string) {
  const barbershop = await db.barbershop.findUnique({
    where: { id },
    include: {
      barbershopServices: true,
    },
  })

  return barbershop
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await getBarbershopDetails(params.id)

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-[280px] w-full">
        <Image
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
          alt={barbershop.name}
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <Sidebar />
        </Sheet>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-muted-foreground">
          Sobre nós
        </h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-muted-foreground">
          Serviços
        </h2>
        {barbershop.barbershopServices.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>

      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
