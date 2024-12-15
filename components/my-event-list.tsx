'use client'
import { getProgram } from '@/utils/connectAnchorProgram' // Adjust the path as needed
import { useEffect, useState } from 'react'
import OrganizerEventCard from './organizer-event-card'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

interface EventItem {
  organizer: string | unknown
  name: string | unknown
  description: string | unknown
  location: string | unknown
  date: number | unknown
  ticketPrice: number | unknown
  ticketQuantity: number | unknown
  ticketsMinted: number | unknown
  soulBoundTokenMint: string | unknown
}

export default function MyEventList() {
  const { publicKey } = useWallet()

  const [events, setEvents] = useState<Array<EventItem>>([])
  const [listLoading, setListLoading] = useState(true)
  //   const [notice, setNotice] = useState({ msg: '', type: '' })

  useEffect(() => {
    getEventList(publicKey)
  })

  const getEventList = async (userPublicKey: PublicKey | null) => {
    if (!userPublicKey) {
      console.error('Connect your wallet first')
      return
    }
    const program = getProgram()

    try {
      // Fetch all accounts for the program where the owner is the user's public key
      const eventList = await program.account.eventContract.all([
        {
          memcmp: {
            offset: 8, // Adjust based on where the owner field is in the Plan struct
            bytes: userPublicKey.toBase58()
          }
        }
      ])

      const eventArray: EventItem[] = eventList.map((eventItem) => ({
        organizer: eventItem.account.organizer,
        name: eventItem.account.name,
        description: eventItem.account.description,
        location: eventItem.account.location,
        date: eventItem.account.date,
        ticketPrice: eventItem.account.ticketPrice,
        ticketQuantity: eventItem.account.ticketQuantity,
        ticketsMinted: eventItem.account.ticketsMinted,
        soulBoundTokenMint: eventItem.account.soulBoundTokenMint
      }))

      setEvents(eventArray)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setListLoading(false)
    }
  }
  return (
    <div>
      {publicKey ? (
        <div>
          <div>
            {listLoading ? (
              <div className="mx-auto w-full text-center font-bold">
                Loading...
              </div>
            ) : (
              <div>
                {events.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {events.map((eventItem, index) => (
                      <OrganizerEventCard
                        key={index}
                        title={eventItem.name as string}
                        date="2 September 2021"
                        image="/dimensions.png"
                        description={eventItem.description as string}
                        time="20:00"
                        location={eventItem.location as string}
                        totalCapacity={200}
                        ticketsSold={12}
                        price={79.99}
                      />
                    ))}
                  </div>
                ) : (
                  <div>Not found anything</div>
                )}
              </div>
            )}

            {/* <OrganizerEventCard
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
      /> */}
          </div>
        </div>
      ) : (
        <div>Connect your wallet</div>
      )}
    </div>
  )
}
