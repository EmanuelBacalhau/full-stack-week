'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import type { QuickSearchOption } from '@/_constants/search'
import { useRouter } from 'next/navigation'

interface QuickSearchButtonProps {
  option: QuickSearchOption
}

export const QuickSearchButton = ({ option }: QuickSearchButtonProps) => {
  const router = useRouter()

  function handleClick() {
    router.push(`/barbershop?service=${option.title}`)
  }

  return (
    <Button
      key={option.title}
      className="gap-2"
      variant="outline"
      onClick={handleClick}
    >
      <Image src={option.imageUrl} alt={option.title} width={16} height={16} />
      {option.title}
    </Button>
  )
}
