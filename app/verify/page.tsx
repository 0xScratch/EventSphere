'use client'

import {useSearchParams} from 'next/navigation'
import {useEffect, useState, Suspense} from 'react'
import {getProgram} from '@/utils/connectAnchorProgram'
import * as web3 from '@solana/web3.js'

function VerifyTicketContent() {
    const searchParams = useSearchParams()
    const [isValid, setIsValid] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyTicket = async () => {
            try {
                const walletAddress = searchParams.get('wallet')
                const eventId = searchParams.get('event')

                if (!walletAddress || !eventId) {
                    setIsValid(false)
                    return
                }

                const program = getProgram()
                const [ticketPurchasePDA] = web3.PublicKey.findProgramAddressSync(
                    [
                        Buffer.from("ticket_purchase"),
                        new web3.PublicKey(walletAddress).toBuffer(),
                        new web3.PublicKey(eventId).toBuffer()
                    ],
                    program.programId
                )

                await program.account.ticketPurchase.fetch(ticketPurchasePDA)
                setIsValid(true)
            } catch (error) {
                console.error('Failed to verify ticket:', error)
                setIsValid(false)
            } finally {
                setLoading(false)
            }
        }

        verifyTicket()
    }, [searchParams])

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-100 grid place-items-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                    <div className="text-2xl font-bold">Verifying ticket...</div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-100 grid place-items-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                {isValid ? (
                    <div className="space-y-4">
                        <div className="text-6xl">✅</div>
                        <h1 className="text-2xl font-bold text-green-600">Valid Ticket</h1>
                        <p className="text-gray-600">This ticket is verified and authentic.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-6xl">❌</div>
                        <h1 className="text-2xl font-bold text-red-600">Invalid Ticket</h1>
                        <p className="text-gray-600">This ticket could not be verified.</p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default function VerifyTicket() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-gray-100 grid place-items-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                    <div className="text-2xl font-bold">Loading...</div>
                </div>
            </main>
        }>
            <VerifyTicketContent/>
        </Suspense>
    )
}