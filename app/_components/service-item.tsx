'use client'

import { createBooking } from '@/_actions/create-bookinfg'
import type { Barbershop, BarbershopService } from '@prisma/client'
import { format, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
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

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
]

export const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { toast } = useToast()
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleWithUserNotLogged = () => signIn('google')

  function handleDateSelect(day: Date | undefined) {
    setSelectedDay(day)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    try {
      const [hour, minute]: string[] = selectedTime?.split(':') as string[]

      const newDate = set(selectedDay as Date, {
        hours: Number(hour),
        minutes: Number(minute),
      })

      await createBooking({
        userId: data?.user.id as string,
        barbershopServiceId: service.id,
        date: newDate,
      })
      toast({
        description: 'Reserva criada com sucesso',
      })
    } catch (error) {
      toast({
        description: 'Erro ao criar reserva',
      })
    }
  }

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

            <Sheet>
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
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    mode="single"
                    locale={ptBR}
                  />
                </div>

                {selectedDay && (
                  <div className="flex gap-2 overflow-x-auto border-b border-solid px-2 py-3 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
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

                {selectedTime && (
                  <div className="p-3">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-muted-foreground">
                            Data
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {format(selectedDay as Date, "dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-muted-foreground">
                            Horário
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {selectedTime}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-muted-foreground">
                            Barbearia
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
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
