'use client';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center py-4 px-6 z-10">
      <Link href="/" className="text-2xl font-bold mr-8" style={{ fontFamily: 'Brush Script MT, cursive', letterSpacing: '0.1em' }}>
        EventSphere.
      </Link>
      
      <div className="flex items-center gap-8">
        <Link href="/" className={`${pathname === '/' ? 'text-gray-900 font-medium border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>
          Events
        </Link>
        <Link href="/my-tickets" className={`${pathname === '/my-tickets' ? 'text-gray-900 font-medium border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>
          My Tickets
        </Link>
        <Link href="/my-events" className={`${pathname === '/my-events' ? 'text-gray-900 font-medium border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>
          My Events
        </Link>
        <Link href="/create-event" className={`${pathname === '/create-event' ? 'text-gray-900 font-medium border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>
          Create Event
        </Link>
      </div>
      
      <div className="ml-auto">
        <Button className="rounded-full bg-black text-white hover:bg-gray-800">
          Sign Up
        </Button>
      </div>
    </nav>
  )
}