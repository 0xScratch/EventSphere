'use client'

import { useState } from 'react'
import { MapPin, Upload, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'

export default function CreateEvent() {
  const [image, setImage] = useState<File | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-green-300">
      
      <div className="container mx-auto px-4 py-12">
        <form className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mt-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event-image">
              Event Banner
            </label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="event-image" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                {image ? (
                  <Image src={URL.createObjectURL(image)} alt="Event banner" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                )}
                <input id="event-image" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event-name">
              Event Title
            </label>
            <Input id="event-name" type="text" placeholder="Enter the name of your event" />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event-description">
              Event Description
            </label>
            <Textarea id="event-description" placeholder="Describe your event" className="h-32" />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event-location">
              Venue
            </label>
            <div className="relative">
              <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400" />
              <Input id="event-location" type="text" placeholder="Enter the event location" className="pl-10" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event-date">
                Date
              </label>
              <Input 
                id="event-date" 
                type="date" 
                className="appearance-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event-time">
                Time
              </label>
              <Input 
                id="event-time" 
                type="time" 
                className="appearance-none"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticket-quantity">
              Available Tickets
            </label>
            <Input id="ticket-quantity" type="number" placeholder="Enter the number of available tickets" min="1" />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticket-price">
              Ticket Price
            </label>
            <div className="relative">
              <DollarSign className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400" />
              <Input id="ticket-price" type="number" placeholder="Enter the ticket price" min="0" step="0.01" className="pl-10" />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </form>
      </div>
    </main>
  )
}