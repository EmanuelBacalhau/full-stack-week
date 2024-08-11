'use client'

import type { Barbershop } from '@prisma/client'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'

interface BarbershopItemProps {
  barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[160px]">
      <CardContent className="p-1">
        <div className="relative h-[160px] w-full">
          <Image
            fill
            className="rounded-md object-cover"
            alt="Imagem da barbearia"
            src={barbershop.imageUrl}
          />

          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant={'secondary'}
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        <div className="mt-2">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {barbershop.address}
          </p>

          <Button variant={'secondary'} className="mt-3 w-full" asChild>
            <Link href={`/barbershop/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
