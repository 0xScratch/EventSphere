'use client'
import {useState} from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import {EventDetailsUser} from './event-details-user'
import {Calendar} from 'lucide-react'
import {SOL_PRICE_USD} from '@/utils/constants';

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
    ticketQuantity: number;
    ticketsMinted: number;
}


export default function EventCard(
    {
        ticketQuantity,
        ticketsMinted,
        id,
        title,
        date,
        image,
        description,
        time,
        location,
        price
    }: EventCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div
                className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="relative h-40">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-3 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">{title}</h3>
                            <div className="flex items-center text-gray-500">
                                <Calendar className="h-4 w-4 mr-2"/>
                                <time>{date}</time>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-3xl font-bold px-5 border-[2.45px] border-gray-500 hover:bg-gray-100"
                        >
                            Buy
                        </Button>
                    </div>

                    <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>{ticketsMinted} sold</span>
                            <span>{ticketQuantity} total</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{width: `${(ticketsMinted / ticketQuantity) * 100}%`}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <EventDetailsUser
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={{
                    ticketQuantity,
                    ticketsMinted,
                    id: id,
                    name: title,
                    image,
                    description,
                    date,
                    time,
                    location,
                    price
                }}
            />
        </>
    )
}
