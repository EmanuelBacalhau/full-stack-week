import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'
import { BookingSummary } from './booking-summary'
import { PhoneItem } from './phone-item'

interface BookingItemProps {
  booking: {
    date: Date
    barbershopService: {
      name: string
      price: number
      barbershop: {
        name: string
        imageUrl: string
        address: string
        phones: string[]
      }
    }
  }
}

export const BookingItem = ({ booking }: BookingItemProps) => {
  const {
    date,
    barbershopService: { barbershop, name: serviceName, price },
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
    <Sheet>
      <SheetTrigger className="w-full" asChild>
        <Card className="min-w-[90%] cursor-pointer">
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
      </SheetTrigger>
      <SheetContent className="w-[90%] space-y-6">
        <SheetHeader>
          <SheetTitle className="text-left text-lg">
            Informações da reserva
          </SheetTitle>
        </SheetHeader>

        <div className="relative flex h-[180px] w-full items-end overflow-hidden rounded-md px-3 pb-3">
          <Image
            src="/map.png"
            alt={`Mapa da barbearia ${barbershop.name}`}
            fill
            className="object-cover"
          />

          <Card className="z-50 w-full rounded-md border-none">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-bold">{barbershop.name}</h3>
                <h3 className="max-w-[140px] truncate text-xs">
                  {barbershop.address}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <Badge className="">{isConfirmed ? 'Confirmada' : 'Finalizada'}</Badge>

        <BookingSummary
          selectedDay={date}
          selectedTime={time}
          service={{ name: serviceName, price }}
          barbershopName={barbershop.name}
        />

        <div className="space-y-3">
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
