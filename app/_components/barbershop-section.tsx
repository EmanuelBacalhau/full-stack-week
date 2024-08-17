import type { Barbershop } from '@prisma/client'
import { BarbershopItem } from './barbershop-item'

interface BarbershopSectionProps {
  title: string
  barbershops: Barbershop[]
}

export const BarbershopSection = ({
  title,
  barbershops,
}: BarbershopSectionProps) => {
  return (
    <div>
      <h2 className="mb-3 text-xs font-bold uppercase text-muted-foreground lg:text-base">
        {title}
      </h2>

      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barberShop) => (
          <BarbershopItem key={barberShop.id} barbershop={barberShop} />
        ))}
      </div>
    </div>
  )
}
