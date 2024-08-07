import { Search } from 'lucide-react'
import { Header } from './_components/header'
import { Input } from './_components/ui/input'
import { Button } from './_components/ui/button'
import Image from 'next/image'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Emanuel!</h2>
        <p>Segunda-feira, 06 de agosto.</p>

        <form className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <Search />
          </Button>
        </form>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src={'/banner-01.png'}
            fill
            className="rounded-xl object-cover"
            alt="Agende os melhores com FSW Barbers"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
