import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

interface BookingItemProps {
  booking: {
    date: Date
    barbershopService: {
      name: string
      barbershop: {
        name: string
        imageUrl: string
      }
    }
  }
}

export const BookingItem = ({ booking }: BookingItemProps) => {
  const {
    date,
    barbershopService: { barbershop, name: serviceName },
  } = booking

  const isConfirmed = isFuture(date)

  const month = format(date, 'MMMM', {
    locale: ptBR,
  })
  const day = format(date, 'dd', {
    locale: ptBR,
  })
  const time = format(date, 'HH:mm', {
    locale: ptBR,
  })

  return (
    <Card className="min-w-[90%]">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge
            className="w-fit"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>
          <h3 className="font-semibold">{serviceName}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm">{barbershop.name}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm capitalize">{month}</p>
          <p className="text-2xl">{day}</p>
          <p className="text-sm">{time}</p>
        </div>
      </CardContent>
    </Card>
  )
}
