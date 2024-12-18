'use client'

import {useState} from 'react'
import {useWallet} from '@solana/wallet-adapter-react'
import {BN, web3} from '@coral-xyz/anchor'
import {getProgram} from '@/utils/connectAnchorProgram'
import Image from 'next/image'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Slider} from "@/components/ui/slider"
import {Calendar, MapPin} from 'lucide-react'
import {SOL_PRICE_USD} from "@/utils/constants";

interface EventDetailsUserProps {
    isOpen: boolean
    onClose: () => void
    event: {
        ticketsMinted: number
        ticketQuantity: number
        id: string
        name: string
        image: string
        description: string
        date: string
        time: string
        location: string
        price?: number
    }
}

const displayPrice = (lamports: number) => {
    const solPrice = lamports / 1e9;
    const usdPrice = solPrice * SOL_PRICE_USD;
    return usdPrice.toFixed(2);
}


export function EventDetailsUser({isOpen, onClose, event}: EventDetailsUserProps) {
    const [ticketCount, setTicketCount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const wallet = useWallet()

    const purchaseTickets = async (ticketCount: number) => {
        if (!wallet.publicKey) {
            setErrorMessage("Please connect your wallet");
            return;
        }
        setIsLoading(true);
        setErrorMessage("");

        try {

            // Debug log
            console.log("Event ID:", event.id);
            console.log("Wallet pubkey:", wallet.publicKey.toString());

            const program = getProgram();

            const [ticketPurchasePDA] = web3.PublicKey.findProgramAddressSync(
                [
                    Buffer.from("ticket_purchase"),
                    wallet.publicKey.toBuffer(),
                    new web3.PublicKey(event.id).toBuffer()
                ],
                program.programId
            );

            console.log("PDA:", ticketPurchasePDA.toString());

            const tx = await program.methods
                .purchaseTickets(new BN(ticketCount))
                .accounts({
                    user: wallet.publicKey,
                    event: new web3.PublicKey(event.id),
                    ticketPurchase: ticketPurchasePDA,
                    systemProgram: web3.SystemProgram.programId,
                } as never)
                .rpc();

            console.log("Success:", tx);
            onClose();
        } catch (error) {
            console.error("Detailed error:", error);
            setErrorMessage(error instanceof Error ? error.message : String(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="relative h-48 w-full">
                        <Image
                            src={event.image}
                            alt={event.name}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4"/>
                        {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4"/>
                        {event.location}
                    </div>
                    <div className="text-lg font-bold">
                        ${displayPrice(Number(event.price) || 0)} USD ({(Number(event.price) / 1e9).toFixed(4)} SOL)
                    </div>
                    <div className="text-sm text-gray-600">
                        <span className="font-semibold">{event.ticketQuantity - event.ticketsMinted}</span> tickets remaining
                    </div>
                    <div>
                        <label htmlFor="ticket-count" className="block text-sm font-bold text-gray-700 mb-2">
                            How many tickets would you like to buy?
                        </label>
                        <Slider
                            id="ticket-count"
                            min={1}
                            max={5}
                            step={1}
                            value={[ticketCount]}
                            onValueChange={(value) => setTicketCount(value[0])}
                            className="mb-5"
                        />
                    </div>

                    {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}


                    <Button
                        className="w-full"
                        onClick={() => purchaseTickets(ticketCount)}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : `Reserve ${ticketCount} Ticket${ticketCount > 1 ? 's' : ''} - $${(Number(displayPrice(Number(event.price) || 0)) * ticketCount).toFixed(2)}`}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}