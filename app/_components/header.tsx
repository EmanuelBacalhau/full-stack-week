'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Calendar, CircleUserRoundIcon, MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetTrigger } from './ui/sheet'
import { Sidebar } from '@/_components/sidebar'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarImage } from './ui/avatar'

import { Search } from './search'
import { useEffect, useState } from 'react'

export const Header = () => {
  const { data } = useSession()
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [currentPath])

  const handleRedirectToBookings = () => {
    if (!data?.user) {
      signIn('google')
    } else {
      router.push('/bookings')
    }
  }

  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <CardContent className="container flex items-center justify-between gap-11 py-5">
        <Link href="/">
          <Image src={'/logo.png'} alt="FSW Barber" width={133} height={22} />
        </Link>

        <div className="hidden flex-1 lg:block">
          {currentPath !== '/' && <Search />}
        </div>

        <div className="hidden gap-6 md:flex">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleRedirectToBookings}
          >
            <Calendar />
            Agendamentos
          </Button>

          {!data?.user ? (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => signIn('google')}
            >
              <CircleUserRoundIcon />
              Entrar
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                {data?.user?.image && (
                  <Button
                    variant="ghost"
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={data.user.image} alt="User" />
                    </Avatar>

                    <p className="space-x-1 font-bold">
                      <span>{data.user.name?.split(' ')[0]}</span>
                      <span>{data.user.name?.split(' ')[1]}</span>
                    </p>
                  </Button>
                )}
              </SheetTrigger>

              <Sidebar />
            </Sheet>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <Sidebar />
          </Sheet>
        </div>
      </CardContent>
    </Card>
  )
}
