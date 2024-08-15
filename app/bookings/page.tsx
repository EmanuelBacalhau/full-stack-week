import { getAllBookingsByUser } from '@/_actions/get-all-bookings-by-user'
import { BookingItem } from '@/_components/booking-item'
import { Header } from '@/_components/header'
import { authOptions } from '@/_lib/auth'
import { isFuture } from 'date-fns'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return notFound()
  }

  const bookings = await getAllBookingsByUser(session.user.id)

  const bookingsConfirmed = bookings.filter((booking) => isFuture(booking.date))
  const bookingsFinalized = bookings.filter(
    (booking) => !isFuture(booking.date),
  )

  return (
    <>
      <Header />

      <div className="space-y-6 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {bookings.length === 0 && (
          <p className="text-center text-muted-foreground">
            Você não possui agendamentos.
          </p>
        )}

        {bookingsConfirmed.length !== 0 && (
          <div className="space-y-3">
            <h1 className="text-xs uppercase text-muted-foreground">
              Próximos
            </h1>

            <div className="space-y-3">
              {bookingsConfirmed.map(
                ({
                  id,
                  date,
                  barbershopService: { barbershop, name, price },
                }) => (
                  <BookingItem
                    key={id}
                    booking={{
                      id,
                      date,
                      barbershopService: {
                        barbershop,
                        name,
                        price: Number(price),
                      },
                    }}
                  />
                ),
              )}
            </div>
          </div>
        )}

        {bookingsFinalized.length !== 0 && (
          <div className="space-y-3">
            <h1 className="text-xs uppercase text-muted-foreground">
              Próximos
            </h1>

            <div className="space-y-3">
              {bookingsFinalized.map(
                ({
                  id,
                  date,
                  barbershopService: { barbershop, name, price },
                }) => (
                  <BookingItem
                    key={id}
                    booking={{
                      id,
                      date,
                      barbershopService: {
                        barbershop,
                        name,
                        price: Number(price),
                      },
                    }}
                  />
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default Bookings
