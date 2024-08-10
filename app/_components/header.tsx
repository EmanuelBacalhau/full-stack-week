import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetTrigger } from './ui/sheet'
import { Sidebar } from '@/sidebar'

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

          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}
