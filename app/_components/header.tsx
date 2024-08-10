import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { quickSearchOptions } from '@/_constants/search'
import { Avatar, AvatarImage } from './ui/avatar'
import Link from 'next/link'

export const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="flex items-center justify-between p-5">
        <Image src={'/logo.png'} alt="FSW Barber" width={133} height={22} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage
                  src="https://github.com/EmanuelBacalhau.png"
                  alt="User"
                />
              </Avatar>

              <div className="flex flex-col">
                <p className="font-bold">Emanuel Bacalhau</p>
                <p className="truncate text-sm text-muted-foreground">
                  carlosemanuelbatistabacalhau@gmail.com
                </p>
              </div>
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

              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-2"
                  variant="ghost"
                >
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    width={18}
                    height={18}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 py-5">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}
