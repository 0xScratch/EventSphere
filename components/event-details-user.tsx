import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calendar, MapPin } from 'lucide-react'

interface EventDetailsUserProps {
  isOpen: boolean
  onClose: () => void
  event: {
    name: string
    image: string
    description: string
    date: string
    time: string
    location: string
    availableTickets: number
    price?: number
  }
}

export function EventDetailsUser({ isOpen, onClose, event }: EventDetailsUserProps) {
  const [ticketCount, setTicketCount] = useState(1)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative h-48 w-full">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-600">{event.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            {event.date} at {event.time}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>
          <div className="text-lg font-bold">
            ${typeof event.price === 'number' ? event.price.toFixed(2) : 'N/A'}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{event.availableTickets}</span> tickets remaining
          </div>
          <div>
            <label htmlFor="ticket-count" className="block text-sm font-bold text-gray-700 mb-2">
              How many tickets would you like to buy?
            </label>
            <Slider
              id="ticket-count"
              min={1}
              max={5}
              step={1}
              value={[ticketCount]}
              onValueChange={(value) => setTicketCount(value[0])}
              className="mb-5"
            />
            {/* <div className="text-sm text-gray-600 mb-4">You've selected {ticketCount} ticket{ticketCount > 1 ? 's' : ''}</div>*/}
          </div>
          <Button className="w-full">
            Reserve {ticketCount} Ticket{ticketCount > 1 ? 's' : ''} - ${(event.price ? (event.price * ticketCount).toFixed(2) : 'N/A')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}