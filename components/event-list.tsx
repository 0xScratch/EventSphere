'use client'

import {getProgram} from '@/utils/connectAnchorProgram'
import {useEffect, useState} from 'react'
import EventCard from '../components/event-card'

interface EventItem {
    publicKey: string
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

export default function EventList() {
    const [events, setEvents] = useState<Array<EventItem>>([])
    const [listLoading, setListLoading] = useState(true)

    useEffect(() => {
        getEventList()
    }, [])

    const getEventList = async () => {
        const program = getProgram()

        try {
            const eventList = await program.account.eventContract.all()
            console.log(eventList)
            const eventArray: EventItem[] = eventList.map((eventItem) => ({
                publicKey: eventItem.publicKey.toString(),
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
            {listLoading ? (
                <div className="mx-auto w-full text-center font-bold">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {events.map((eventItem) => (
                        <EventCard
                            key={eventItem.publicKey}
                            id={eventItem.publicKey}
                            title={eventItem.name as string}
                            date={new Date(Number(eventItem.date) * 1000).toLocaleDateString()}
                            image="/dimensions.png"
                            description={eventItem.description as string}
                            time={new Date(Number(eventItem.date) * 1000).toLocaleTimeString()}
                            location={eventItem.location as string}
                            price={Number(eventItem.ticketPrice)}
                            ticketQuantity={Number(eventItem.ticketQuantity)}
                            ticketsMinted={Number(eventItem.ticketsMinted)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}