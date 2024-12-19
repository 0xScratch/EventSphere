'use client'

import {useState} from 'react'
import Image from 'next/image'
import {Calendar, MapPin, QrCode} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {QRCodeSVG} from 'qrcode.react'

interface TicketCardProps {
    ticket: {
        id: string
        eventName: string
        date: string
        time: string
        location: string
        description: string
        quantity: number
        image: string
        eventPubkey: string
    }
    walletAddress: string
}

const VERIFY_BASE_URL = process.env.NEXT_PUBLIC_VERIFY_URL || 'https://yourapp.com'

export default function TicketCard({ticket, walletAddress}: TicketCardProps) {
    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false)
    const verificationUrl = `${VERIFY_BASE_URL}/verify?wallet=${walletAddress}&event=${ticket.eventPubkey}`

    const handleQRClick = () => {
        window.open(verificationUrl, '_blank')
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
                {ticket.quantity > 1 && (
                    <div
                        className="absolute top-4 right-4 bg-black text-white rounded-full px-2 py-1 text-xs font-bold">
                        {ticket.quantity}x
                    </div>
                )}
                <Image
                    src={ticket.image}
                    alt={ticket.eventName}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{ticket.eventName}</h3>
                <div className="flex items-center text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 mr-2"/>
                    <span>{ticket.date} at {ticket.time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2"/>
                    <span>{ticket.location}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                <Button
                    variant="outline"
                    className="w-full bg-black text-white hover:bg-gray-800 hover:text-white font-bold"
                    onClick={() => setIsQRDialogOpen(true)}
                >
                    <QrCode className="h-4 w-4 mr-2"/>
                    Show QR Code
                </Button>
            </div>

            <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-center">QR Code for {ticket.eventName}</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center items-center py-4">
                        <div
                            onClick={handleQRClick}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            title="Click to open verification page"
                        >
                            <QRCodeSVG
                                value={verificationUrl}
                                size={250}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                    </div>
                    <p className="text-center text-sm text-gray-500">Click QR code to open verification page</p>
                </DialogContent>
            </Dialog>
        </div>
    )
}