'use client'

import {useState} from 'react'
import {getProgram} from '@/utils/connectAnchorProgram'
import {BN, web3, AnchorError, AnchorProvider} from '@coral-xyz/anchor'
import {MapPin, Upload} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import Image from 'next/image'
import {useWallet} from '@solana/wallet-adapter-react'
import {z} from 'zod'

const eventSchema = z.object({
    name: z.string().min(1, 'Event name is required'),
    description: z.string().min(1, 'Event description is required'),
    location: z.string().min(1, 'Event location is required'),
    ticketQuantity: z.number().min(1, 'At least one ticket is required'),
    ticketPrice: z.number().min(0, 'Please enter a valid ticket price'),
    date: z.string().min(1, 'Event date is required'),
    time: z.string().min(1, 'Event time is required'),
})

export default function CreateEvent() {
    const [image, setImage] = useState<File | null>(null)
    const {publicKey} = useWallet()

    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [ticketQuantity, setTicketQuantity] = useState<number | undefined>(undefined)
    const [ticketPrice, setTicketPrice] = useState<number | undefined>(undefined)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [notice, setNotice] = useState({msg: '', type: ''})
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const createEvent = async () => {
        setNotice({msg: '', type: ''})
        setErrors({})

        // Validate using Zod schema
        const validationResult = eventSchema.safeParse({
            name,
            description,
            location,
            ticketQuantity,
            ticketPrice,
            date,
            time,
        })

        if (!validationResult.success) {
            const newErrors: { [key: string]: string } = {}
            validationResult.error.errors.forEach((error) => {
                if (error.path.length > 0) {
                    newErrors[error.path[0]] = error.message
                }
            })
            setErrors(newErrors)
            return
        }

        setIsLoading(true)

        try {
            const program = getProgram()
            const provider = program.provider as AnchorProvider

            // Generate a new keypair for the proposal
            const eventAccount = web3.Keypair.generate()
            const organizer = provider.wallet.publicKey
            const ticketsMinted = 0

            // Combine date and time into a Unix timestamp
            const eventDate = new Date(`${date}T${time}`)
            const unixTimestamp = Math.floor(eventDate.getTime() / 1000)

            // Convert ticket price from SOL to lamports
            const ticketPriceLamports = (ticketPrice ?? 0) * 1_000_000_000


            await program.methods
                .createEvent(
                    organizer,
                    name,
                    description,
                    location,
                    new BN(unixTimestamp.toString()),
                    ticketQuantity ?? 0,
                    new BN(ticketPriceLamports.toString()), // Use BN for u64
                    ticketsMinted
                )
                .accounts({
                    event: eventAccount.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId
                } as Partial<typeof program.account>)
                .signers([eventAccount])
                .rpc()
            setNotice({msg: 'Event created successfully', type: 'success'})
        } catch (err) {
            if (err instanceof AnchorError) {
                setNotice({msg: err.error.errorMessage, type: 'err'})
            } else {
                setNotice({msg: `TransactionError: ${err}`, type: 'err'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-green-300">
            {publicKey ? (
                <div className="container mx-auto px-4 py-12">
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mt-8">
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="event-image"
                            >
                                Event Banner
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="event-image"
                                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    {image ? (
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt="Event banner"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500"/>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span>{' '}
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG or GIF (MAX. 800x400px)
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        id="event-image"
                                        type="file"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="event-name"
                            >
                                Event Title
                            </label>
                            <Input
                                id="event-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter the name of your event"
                            />
                            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="event-description"
                            >
                                Event Description
                            </label>
                            <Textarea
                                id="event-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your event"
                                className="h-32"
                            />
                            {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description}</p>}
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="event-location"
                            >
                                Venue
                            </label>
                            <div className="relative">
                                <MapPin
                                    className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400"/>
                                <Input
                                    id="event-location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter the event location"
                                    className="pl-10"
                                />
                            </div>
                            {errors.location && <p className='text-red-500 text-sm mt-1'>{errors.location}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="event-date"
                                >
                                    Date
                                </label>
                                <Input
                                    id="event-date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="appearance-none"
                                />
                                {errors.date && <p className='text-red-500 text-sm mt-1'>{errors.date}</p>}
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="event-time"
                                >
                                    Time
                                </label>
                                <Input
                                    id="event-time"
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="appearance-none"
                                />
                                {errors.time && <p className='text-red-500 text-sm mt-1'>{errors.time}</p>}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="ticket-quantity"
                            >
                                Available Tickets
                            </label>
                            <Input
                                id="ticket-quantity"
                                type="number"
                                value={ticketQuantity === undefined ? '' : ticketQuantity}
                                onChange={(e) => setTicketQuantity(Number(e.target.value))}
                                placeholder="Enter the number of available tickets"
                                min="1"
                            />
                            {errors.ticketQuantity &&
                                <p className='text-red-500 text-sm mt-1'>{errors.ticketQuantity}</p>}
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="ticket-price"
                            >
                                Ticket Price (SOL)
                            </label>
                            <Input
                                id="ticket-price"
                                type="number"
                                placeholder="Enter the ticket price in SOL"
                                value={ticketPrice === undefined ? '' : ticketPrice}
                                onChange={(e) => setTicketPrice(Number(e.target.value))}
                                min="0"
                                step="0.01"
                            />
                            {errors.ticketPrice && <p className='text-red-500 text-sm mt-1'>{errors.ticketPrice}</p>}
                        </div>
                        <Button
                            onClick={() => createEvent()}
                            className="w-full"
                        >
                            {!isLoading ? 'Create Event' : 'In progress'}
                        </Button>
                        <p
                            className={`text-center mt-4 ${
                                notice?.type === 'err' ? 'text-error' : 'text-success'
                            }`}
                        >
                            {notice?.msg}
                        </p>{' '}
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-12">
                    <div className="p-10 max-w-xl mx-auto mt-12">
                        <p>You need Connect your wallet</p>
                    </div>
                </div>
            )}
        </main>
    )
}