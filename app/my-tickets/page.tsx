'use client'

import {useCallback, useEffect, useState} from 'react'
import {useWallet} from '@solana/wallet-adapter-react'
import {getProgram} from '@/utils/connectAnchorProgram'
import {Calendar, MapPin, SearchIcon, Grid} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import TicketCard from "../../components/ticket-card"
import Link from 'next/link'

interface TicketPurchase {
    id: string
    eventName: string
    date: string
    time: string
    location: string
    description: string
    quantity: number
    image: string
    qrCode: string
    eventPubkey: string
}

export default function MyTickets() {
    const [tickets, setTickets] = useState<TicketPurchase[]>([])
    const [loading, setLoading] = useState(true)
    const wallet = useWallet()

    const fetchTickets = useCallback(async () => {
        if (!wallet.publicKey) {
            console.warn("Wallet is not connected");
            return;
        }
        try {
            const program = getProgram()
            const ticketPurchases = await program.account.ticketPurchase.all([
                {
                    memcmp: {
                        offset: 8,
                        bytes: wallet.publicKey?.toBase58(), // Optional chaining for safety
                    },
                },
            ])

            const tickets = await Promise.all(
                ticketPurchases.map(async (purchase) => {
                    const event = await program.account.eventContract.fetch(purchase.account.eventId)
                    return {
                        id: purchase.publicKey.toString(),
                        eventName: event.name,
                        date: new Date(Number(event.date) * 1000).toLocaleDateString(),
                        time: new Date(Number(event.date) * 1000).toLocaleTimeString(),
                        location: event.location,
                        description: event.description,
                        quantity: purchase.account.quantity,
                        image: '/dimensions.png',
                        qrCode: '/qr.png',
                        eventPubkey: purchase.account.eventId.toString(),
                    }
                })
            )

            setTickets(tickets)
        } catch (error) {
            console.error('Failed to fetch tickets:', error)
        } finally {
            setLoading(false)
        }
    }, [wallet.publicKey]) // Added a dependency on wallet.publicKey

    useEffect(() => {
        if (wallet.publicKey) {
            fetchTickets()
        }
    }, [wallet.publicKey, fetchTickets])

    if (!wallet.publicKey) {
        return (
            <div
                className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-green-300 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Please connect your wallet</h1>
                    <p className="text-lg">Connect your wallet to view your tickets</p>
                </div>
            </div>
        )
    }

    return (
        <main>
            <div className="min-h-[38vh] bg-gradient-to-r from-blue-300 via-purple-400 to-green-300 relative">
                <section className="px-6 py-16 flex items-center justify-between">
                    <div>
                        <h1 className="text-6xl font-bold leading-tight">
                            Your Tickets,
                            <br/>
                            Your Memories
                        </h1>
                        <p className="text-xl text-gray-600">
                            Access and manage all your event tickets in one place
                        </p>
                    </div>
                </section>

                <section className="absolute bottom-0 left-0 right-0 px-8 transform translate-y-1/2">
                    <div className="bg-white rounded-full p-2 flex items-center gap-2 shadow-lg max-w-6xl mx-auto">
                        <Input
                            type="text"
                            placeholder="Search your tickets..."
                            className="border-0 focus-visible:ring-0 text-base"
                        />
                        <div className="h-6 w-px bg-gray-200"/>
                        <Button variant="ghost" className="rounded-full">
                            <Calendar className="h-5 w-5 mr-2 text-gray-500"/>
                            Date
                        </Button>
                        <div className="h-6 w-px bg-gray-200"/>
                        <Button variant="ghost" className="rounded-full">
                            <MapPin className="h-5 w-5 mr-2 text-gray-500"/>
                            Location
                        </Button>
                        <div className="h-6 w-px bg-gray-200"/>
                        <Button variant="ghost" className="rounded-full">
                            <Grid className="h-5 w-5 mr-2 text-gray-500"/>
                            Event Type
                        </Button>
                        <Button className="rounded-full bg-green-200 text-black hover:bg-green-300 ml-auto">
                            <SearchIcon className="h-5 w-5 mr-2"/>
                            Search
                        </Button>
                    </div>
                </section>
            </div>

            <div className="bg-white pt-14 pb-4">
                <section className="px-8">
                    <div className="flex justify-between items-center mb-[1.4rem]">
                        <h2 className="text-3xl font-bold">Your Tickets</h2>
                        <Button className="rounded-full bg-black text-white hover:bg-gray-800" asChild>
                            <Link href="/">Buy Tickets</Link>
                        </Button>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="text-2xl font-bold">Loading tickets...</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {tickets.map((ticket) => (
                                <TicketCard key={ticket.id} ticket={ticket}/>
                            ))}
                            {tickets.length === 0 && (
                                <div className="col-span-full text-center py-10">
                                    <div className="text-2xl font-bold mb-2">No tickets found</div>
                                    <p className="text-gray-600">You haven`t purchased any tickets yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}