import { Calendar, MapPin, SearchIcon, Grid } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import OrganizerEventCard from "../../components/organizer-event-card"
import Link from 'next/link'

export default function MyEvents() {
  return (
    <main>
      <div className="min-h-[39vh] bg-gradient-to-r from-blue-300 via-purple-400 to-green-300 relative">
        
        {/* Hero Section */}
        <section className="px-6 py-16 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              Your Events,
              <br/>
              Your Way
            </h1>
            <p className="text-xl text-gray-600">
              Track, update, and organize all your hosted events effortlessly
            </p>
          </div>
        </section>

        {/* Search Section - Positioned to overlap */}
        <section className="absolute bottom-0 left-0 right-0 px-8 transform translate-y-1/2">
          <div className="bg-white rounded-full p-2 flex items-center gap-2 shadow-lg max-w-6xl mx-auto">
            <Input
              type="text"
              placeholder="Search your events..."
              className="border-0 focus-visible:ring-0 text-base"
            />
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="ghost" className="rounded-full">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              Date
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="ghost" className="rounded-full">
              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
              Location
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="ghost" className="rounded-full">
              <Grid className="h-5 w-5 mr-2 text-gray-500" />
              Event Status
            </Button>
            <Button className="rounded-full bg-green-200 text-black hover:bg-green-300 ml-auto">
              <SearchIcon className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </section>
      </div>

      {/* Events Section */}
      <div className="bg-white pt-20 pb-8">
        <section className="px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Your Events</h2>
            <Button className="rounded-full bg-black text-white hover:bg-gray-800" asChild>
              <Link href="/create-event">Create New Event</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <OrganizerEventCard
              title="Dimensions 2021"
              date="2 September 2021"
              image="/dimensions.png"
              description="Experience the cutting-edge of electronic music and art at Dimensions 2021."
              time="20:00"
              location="Fort Punta Christo, Pula, Croatia"
              ticketsSold={150}
              totalCapacity={200}
              price={79.99}
            />
            <OrganizerEventCard
              title="Lovefest 2021"
              date="5 August 2021"
              image="/lovefest.jpg"
              description="Join the love revolution at Lovefest 2021, featuring top DJs and an amazing atmosphere."
              time="18:00"
              location="Vrnjačka Banja, Serbia"
              ticketsSold={80}
              totalCapacity={100}
              price={59.99}
            />
            <OrganizerEventCard
              title="Grapevine Gathering"
              date="2 October 2021"
              image="/grapevine.jpg"
              description="Indulge in a perfect blend of music and wine at the Grapevine Gathering."
              time="12:00"
              location="Rochford Wines, Yarra Valley, Australia"
              ticketsSold={200}
              totalCapacity={250}
              price={89.99}
            />
            <OrganizerEventCard
              title="Harvest Festival"
              date="15 November 2024"
              image="/harvest.jpg"
              description="Celebrate the season with local produce, crafts, and live performances."
              time="10:00"
              location="Central Park, New York, USA"
              ticketsSold={90}
              totalCapacity={500}
              price={29.99}
            />
          </div>
        </section>
      </div>
    </main>
  )
}