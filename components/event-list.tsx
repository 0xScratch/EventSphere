'use client'

import {getProgram} from '@/utils/connectAnchorProgram'
import {useEffect, useState, useCallback} from 'react'
import EventCard from '../components/event-card'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from './ui/button'

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

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' })

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

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
            <div className='flex justify-between items-center mb-8'>
                <h2 className='text-3xl font-bold'>Most Popular Events</h2>
                <div className='flex gap-2'>
                    <Button
                        variant='outline' 
                        size='icon'
                        className='rounded-full'
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                    >
                        &#8592;
                    </Button>
                    <Button
                        variant='outline'  
                        size='icon'
                        className='rounded-full'
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                    >
                        &#8594;
                    </Button>
                </div>
            </div>
            {listLoading ? (
                <div className="mx-auto w-full text-center font-bold">Loading...</div>
            ) : (
                <div className='relative'>
                    <div className='overflow-hidden' ref={emblaRef}>
                        <div className='flex'>
                            {events.map((eventItem) => (
                                <div key={eventItem.publicKey} className='flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4'>
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}