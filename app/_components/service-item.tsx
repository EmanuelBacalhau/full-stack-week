'use client'

import { createBooking } from '@/_actions/create-booking'
import { getBookings } from '@/_actions/get-bookings'
import type { Barbershop, BarbershopService } from '@prisma/client'
import { format, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Card, CardContent } from './ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { useToast } from './ui/use-toast'
import { TIME_LIST } from '@/_constants/time-list'
import { BookingSummary } from './booking-summary'

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name' | 'id'>
}

export const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { toast } = useToast()
  const { data } = useSession()

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<string[]>([])

  useEffect(() => {
    async function fetch() {
      if (!selectedDay) return

      const bookings = await getBookings({
        date: selectedDay,
        barbershopId: barbershop.id,
      })

      const formattedBookings = bookings.map((booking) => {
        return format(booking.date, 'HH:mm')
      })

      setDayBookings(
        TIME_LIST.filter((time) => !formattedBookings.includes(time)),
      )
    }

    fetch()
  }, [selectedDay, barbershop])

  function handleCHangeSheetOpen() {
    setIsSheetOpen((prev) => !prev)
    setSelectedDay(undefined)
    setSelectedTime(undefined)
  }

  const handleWithUserNotLogged = () => signIn('google')

  function handleDateSelect(day: Date | undefined) {
    setSelectedDay(day)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    try {
      if (!selectedDay || !selectedTime || !data?.user) return

      const [hour, minute] = selectedTime.split(':')

      const newDate = set(selectedDay, {
        hours: Number(hour),
        minutes: Number(minute),
      })

      await createBooking({
        barbershopServiceId: service.id,
        date: newDate,
      })

      toast({
        description: 'Reserva criada com sucesso',
      })

      setSelectedDay(undefined)
      setSelectedTime(undefined)
    } catch (error) {
      toast({
        description: 'Erro ao criar reserva',
      })
    }
  }

  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            layout="fill"
            className="rounded-md object-cover"
            alt={service.name}
          />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="w-[160px] truncate text-sm text-muted-foreground sm:w-full">
            {service.description}
          </p>

          <div className="flex w-full items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </p>

            <Sheet open={isSheetOpen} onOpenChange={handleCHangeSheetOpen}>
              {data?.user ? (
                <SheetTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Reservar
                  </Button>
                </SheetTrigger>
              ) : (
                <Button
                  onClick={handleWithUserNotLogged}
                  variant="secondary"
                  size="sm"
                >
                  Reservar
                </Button>
              )}

              <SheetContent className="overflow-auto [&::-webkit-scrollbar]:hidden">
                <SheetHeader>
                  <SheetTitle className="mb-3 text-left">
                    Fazer reservar
                  </SheetTitle>
                </SheetHeader>

                <div className="border-y border-solid py-3">
                  <Calendar
                    fromDate={new Date()}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    mode="single"
                    locale={ptBR}
                  />
                </div>

                {selectedDay && (
                  <div className="flex gap-2 overflow-x-auto border-b border-solid px-2 py-3 [&::-webkit-scrollbar]:hidden">
                    {dayBookings.map((time) => (
                      <Button
                        onClick={() => handleTimeSelect(time)}
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        className="rounded-full border border-solid"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <div className="p-3">
                    <BookingSummary
                      service={{
                        name: service.name,
                        price: Number(service.price),
                      }}
                      selectedDay={selectedDay}
                      selectedTime={selectedTime}
                      barbershopName={barbershop.name}
                    />
                  </div>
                )}

                <SheetFooter className="mt-3 px-3">
                  <SheetClose asChild>
                    <Button
                      disabled={!selectedTime || !selectedDay}
                      onClick={handleCreateBooking}
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
