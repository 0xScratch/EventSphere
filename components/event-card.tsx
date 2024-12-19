'use client'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import {EventDetailsUser} from './event-details-user'
import {Calendar} from 'lucide-react'
import {useWallet} from '@solana/wallet-adapter-react'
import {web3} from '@coral-xyz/anchor'
import {getProgram} from '@/utils/connectAnchorProgram'

interface EventCardProps {
    title: string
    date: string
    image: string
    description: string
    time: string
    location: string
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
    const [hasTickets, setHasTickets] = useState(false)
    const wallet = useWallet()

    useEffect(() => {
        const checkExistingPurchase = async () => {
            if (!wallet.publicKey) return

            try {
                const program = getProgram()
                const [ticketPurchasePDA] = web3.PublicKey.findProgramAddressSync(
                    [
                        Buffer.from("ticket_purchase"),
                        wallet.publicKey.toBuffer(),
                        new web3.PublicKey(id).toBuffer()
                    ],
                    program.programId
                )

                await program.account.ticketPurchase.fetch(ticketPurchasePDA)
                setHasTickets(true)
            } catch {
                setHasTickets(false)
            }
        }

        checkExistingPurchase()
    }, [wallet.publicKey, id])

    const handleCardClick = () => {
        if (!hasTickets) {
            setIsModalOpen(true)
        }
    }

    return (
        <>
            <div
                className={`bg-white rounded-3xl overflow-hidden shadow-lg ${!hasTickets ? 'cursor-pointer' : ''}`}
                onClick={handleCardClick}
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
                            disabled={hasTickets}
                            className={`rounded-3xl font-bold px-5 border-[2.45px] ${
                                hasTickets
                                    ? 'border-gray-300 text-gray-400'
                                    : 'border-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            {hasTickets ? 'Already Purchased' : 'Buy'}
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
            {!hasTickets && (
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
            )}
        </>
    )
}