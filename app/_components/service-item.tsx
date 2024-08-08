import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import type { BarbershopService } from '@prisma/client'
import { Button } from './ui/button'

interface ServiceItemProps {
  service: BarbershopService
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="">
      <CardContent className="flex gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            layout="fill"
            className="rounded-md object-cover"
            alt={service.name}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </p>
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
