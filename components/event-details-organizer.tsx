import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, QrCode } from 'lucide-react'

interface EventDetailsOrganizerProps {
  isOpen: boolean
  onClose: () => void
  event: {
    name: string
    image: string
    description: string
    date: string
    time: string
    location: string
    ticketsSold: number
    totalCapacity: number
    price?: number
  }
}

export function EventDetailsOrganizer({ isOpen, onClose, event }: EventDetailsOrganizerProps) {
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
            Ticket Price: ${event.price ? event.price.toFixed(2) : 'N/A'}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{event.ticketsSold}</span> / {event.totalCapacity} tickets sold
          </div>
          <div className="bg-gray-100 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${(event.ticketsSold / event.totalCapacity) * 100}%` }}
            ></div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full" onClick={() => console.log('Open QR code scanner')}>
              <QrCode className="h-5 w-5 mr-2" />
              Scan Tickets
            </Button>
            <Button className="w-full" variant="outline">
              Edit Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}