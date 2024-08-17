import type { Booking } from '@/_dtos/booking'
import { BookingItem } from './booking-item'

interface BookingItemProps {
  bookings: Booking[]
}

export const BookingList = ({ bookings }: BookingItemProps) => {
  return (
    <div>
      {bookings.length !== 0 && (
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase text-muted-foreground">
            Agendamentos
          </h2>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {bookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={{
                  id: booking.id,
                  date: booking.date,
                  barbershopService: {
                    name: booking.barbershopService.name,
                    price: Number(booking.barbershopService.price),
                    barbershop: {
                      name: booking.barbershopService.barbershop.name,
                      imageUrl: booking.barbershopService.barbershop.imageUrl,
                      address: booking.barbershopService.barbershop.address,
                      phones: booking.barbershopService.barbershop.phones,
                    },
                  },
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
