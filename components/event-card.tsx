'use client';
import { useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { EventDetailsUser } from "./event-details-user"
import { Calendar } from 'lucide-react'

interface EventCardProps {
  title: string
  date: string
  image: string
  description: string
  time: string
  location: string
  availableTickets: number
  price: number
  id: string
}

export default function EventCard({ title, date, image, description, time, location, availableTickets, price }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className="relative h-40"> {/* Update 1: Reduced image height */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3 flex justify-between items-center"> {/* Update 2: Reduced padding */}
          <div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <time>{date}</time>
            </div>
          </div>
          <Button variant="outline" size="lg" className="rounded-3xl font-bold px-5 border-[2.45px] border-gray-500 hover:bg-gray-100">
            Buy
          </Button>
        </div>
      </div>
      <EventDetailsUser
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={{
          name: title,
          image,
          description,
          date,
          time,
          location,
          availableTickets,
          price,
        }}
      />
    </>
  )
}

