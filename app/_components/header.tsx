import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetTrigger } from './ui/sheet'
import { Sidebar } from '@/_components/sidebar'
import Link from 'next/link'

export const Header = () => {
  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <CardContent className="flex items-center justify-between p-5">
        <Link href="/">
          <Image src={'/logo.png'} alt="FSW Barber" width={133} height={22} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}
