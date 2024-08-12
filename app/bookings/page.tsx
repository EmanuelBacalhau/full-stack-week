import { getAllBookingsByUser } from '@/_actions/get-all-bookings-by-user'
import { BookingItem } from '@/_components/booking-item'
import { Header } from '@/_components/header'
import { authOptions } from '@/_lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return notFound()
  }

  const bookings = await getAllBookingsByUser(session.user.id)

  return (
    <>
      <Header />

      <div>
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}
export default Bookings
