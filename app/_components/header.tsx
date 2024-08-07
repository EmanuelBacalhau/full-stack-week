import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="flex items-center justify-between p-5">
        <Image src={'/logo.png'} alt="FSW Barber" width={133} height={22} />
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}
