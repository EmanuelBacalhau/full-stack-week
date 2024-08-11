import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import Link from 'next/link'
import { quickSearchOptions } from '../_constants/search'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'

export const Sidebar = () => {
  return (
    <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
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

            <Button variant="outline" className="gap-2">
              <Image src="/google.svg" alt="Google" width={18} height={18} />
              Google
            </Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar>
          <AvatarImage
            src="https://github.com/EmanuelBacalhau.png"
            alt="User"
          />
        </Avatar>

        <div className="flex flex-col">
          <p className="font-bold">Emanuel Bacalhau</p>
          <p className="truncate text-xs text-muted-foreground max-sm:max-w-[180px]">
            carlosemanuelbatistabacalhau@gmail.com
          </p>
        </div> */}
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
  )
}
