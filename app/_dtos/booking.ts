export type Booking = {
  id: string
  date: Date
  barbershopService: {
    name: string
    price: number
    barbershop: {
      name: string
      imageUrl: string
      address: string
      phones: string[]
    }
  }
}
