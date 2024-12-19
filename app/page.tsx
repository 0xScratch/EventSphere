import { Calendar, MapPin, SearchIcon, Grid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EventList from '@/components/event-list'
export default function Home() {
  return (
    <main>
      <div className="min-h-[40vh] bg-gradient-to-r from-blue-300 via-purple-400 to-green-300 relative">
        {/* Hero Section */}
        <section className="px-6 py-16">
          <h1 className="text-6xl font-bold leading-tight mt-10">
            Techno. Dance.
            <br />
            Buy tickets.
          </h1>
        </section>

        {/* Search Section - Positioned to overlap */}
        <section className="absolute bottom-0 left-0 right-0 px-8 transform translate-y-1/2">
          <div className="bg-white rounded-full p-2 flex items-center gap-2 shadow-lg max-w-6xl mx-auto">
            <Input
              type="text"
              placeholder="Search by name or type..."
              className="border-0 focus-visible:ring-0 text-base"
            />
            <div className="h-6 w-px bg-gray-200" />
            <Button
              variant="ghost"
              className="rounded-full"
            >
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              Date
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <Button
              variant="ghost"
              className="rounded-full"
            >
              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
              Location
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <Button
              variant="ghost"
              className="rounded-full"
            >
              <Grid className="h-5 w-5 mr-2 text-gray-500" />
              Type of event
            </Button>
            <Button className="rounded-full bg-green-200 text-black hover:bg-green-300 ml-auto">
              <SearchIcon className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </section>
      </div>

      {/* Events Section */}
      <div className="bg-white pt-24 pb-12">
        <section className="px-8">
          <EventList />
        </section>
      </div>
    </main>
  )
}
