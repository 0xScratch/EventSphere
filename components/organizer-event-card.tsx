'use client';
import { useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { QrCode } from 'lucide-react'
import { EventDetailsOrganizer } from "./event-details-organizer"

interface OrganizerEventCardProps {
  title: string
  date: string
  image: string
  description: string
  time: string
  location: string
  ticketsSold: number
  totalCapacity: number
  price: number
}

export default function OrganizerEventCard({ title, date, image, description, time, location, ticketsSold, totalCapacity, price }: OrganizerEventCardProps) {
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
        <div className="p-4"> {/* Update 2: Reduced padding */}
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex items-center justify-between mb-4">
            <time className="text-gray-500 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {date}
            </time>
            <Button variant="outline" size="sm" className="rounded-full">
              <QrCode className="h-4 w-4 mr-2" />
              Scan Tickets
            </Button>
          </div>
          <div className="bg-gray-100 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${(ticketsSold / totalCapacity) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {ticketsSold} / {totalCapacity} tickets sold
          </p>
        </div>
      </div>
      <EventDetailsOrganizer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={{
          name: title,
          image,
          description,
          date,
          time,
          location,
          ticketsSold,
          totalCapacity,
          price
        }}
      />
    </>
  )
}