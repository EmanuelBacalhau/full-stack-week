'use client'

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import Link from 'next/link'
import { quickSearchOptions } from '../_constants/search'
import Image from 'next/image'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useRouter } from 'next/navigation'

export const Sidebar = () => {
  const { data } = useSession()
  const router = useRouter()
  const handleLoginWithGoogleClick = () => signIn('google')
  const handleLogOutWithGoogleClick = () => signOut()

  const handleRedirectToBookings = () => {
    if (!data?.user) {
      signIn('google')
    } else {
      router.push('/bookings')
    }
  }

  function handleQuickSearchClick(title: string) {
    router.push(`/barbershop?service=${title}`)
  }

  return (
    <SheetContent className="w-[90%] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {!data?.user && (
          <>
            <h2 className="text-lg font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta Google
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleLoginWithGoogleClick}
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}

        {data?.user?.image && (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user.image} alt="User" />
            </Avatar>

            <div className="flex flex-col">
              <p className="font-bold">{data.user.name}</p>
              <p className="truncate text-xs text-muted-foreground max-sm:max-w-[180px]">
                {data.user.email}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button
            onClick={handleRedirectToBookings}
            className="justify-start gap-2"
            variant="ghost"
          >
            <CalendarIcon size={18} />
            Agendamentos
          </Button>
        </SheetClose>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button
              className="justify-start gap-2"
              variant="ghost"
              onClick={() => handleQuickSearchClick(option.title)}
            >
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={18}
                height={18}
              />
              {option.title}
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 py-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sair</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja sair da sua conta?
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-3">
                <DialogClose asChild>
                  <Button className="w-full" variant="outline">
                    Voltar
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={handleLogOutWithGoogleClick}
                  >
                    Sair
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </SheetContent>
  )
}
