# EventSphere

**EventSphere** is a decentralized application (dApp) built on the Solana blockchain that aims to transform the event management industry by addressing significant challenges in ticketing. Events such as concerts and tech conferences often suffer from inflated prices, scalping, and a lack of transparency. For example, during a recent [Coldplay concert in India](https://www.hindustantimes.com/entertainment/music/coldplay-ticket-row-bookmyshow-reacts-to-scalping-and-black-marketing-promises-to-assist-probe-101731053387017.html), tickets were resold illegally on various platforms, frustrating genuine fans who were unable to secure tickets at fair prices. These issues arise from the involvement of multiple intermediaries in the ticketing process, complicating pricing control for organizers and leading to unfair practices.

## Purpose

The primary purpose of **EventSphere** is to create a seamless and transparent experience for event management and ticketing. By leveraging blockchain technology, we aim to eliminate intermediaries and empower organizers to issue tickets directly to attendees. Each ticket is represented as a non-transferable token on the blockchain, ensuring authenticity and preventing scalping.

Blockchain technology enhances security and transparency in several ways:

- **Immutable Records:** All transactions are recorded on the blockchain, making it easy to verify ticket ownership and authenticity without relying on third parties.
- **Smart Contracts:** These allow organizers to set specific rules for ticket sales, including pricing control and resale restrictions. If an event is canceled or a ticket becomes invalid, smart contracts can automatically update ticket statuses.
- **Direct Transactions:** By facilitating direct transactions between organizers and attendees, EventsDapp reduces costs associated with intermediaries, allowing for fairer pricing for consumers.

**EventSphere** is designed with user experience in mind; we prioritize simplicity so that users can focus on enjoying their events without needing to navigate complex blockchain concepts. Our platform ensures that both organizers and attendees can engage with events effortlessly while benefiting from the advantages of decentralized technology.

## Features

**EventSphere** offers the following features:

1. **Event Creation:** Organizers can create events on the platform, specifying details such as event name, date, time, location, and ticket prices.
2. **Ticket Issuance:** After creating an event, organizers can issue tickets as non-transferable tokens to attendees. Each ticket is linked to the attendee's wallet address, ensuring that only the rightful owner can access the event.
3. **Ticket Verification:** Attendees can verify their tickets by scanning a QR code or entering a unique code on the platform. This process confirms the ticket's authenticity and validity.
4. **Event Updates:** Organizers can communicate with attendees by sending event updates, such as schedule changes or additional information, directly through the platform.
5. **Refunds and Cancellations:** In the event of a cancellation or refund request, smart contracts can automatically process refunds to attendees based on predefined rules set by the organizer.

## Installation and Setup

To run **EventSphere** locally, follow these steps:

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/0xScratch/EventSphere.git
   cd EventSphere
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Head to [EventSphere_Smart_Contracts](https://github.com/0xScratch/EventSphere_Smart_Contracts) repository for the smart contracts (programs) and deploy them on the Solana blockchain. This will provide a `programId` that you will need to interact with the smart contracts.

4. Get a RPC Url for Solana Devnet from [Quicknode](https://www.quicknode.com)

5. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```env
   NEXT_PUBLIC_PROGRAM_ID=<programId>
   NEXT_PUBLIC_RPC_URL=<rpcUrl>
   ```

6. Start the development server:

   ```bash
    npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000` to access the **EventSphere** application.

## Technologies Used

- **Solana Blockchain:** A high-performance blockchain platform that enables fast and low-cost transactions.
- **React:** A JavaScript library for building user interfaces.
- **Next.js:** A React framework for server-side rendering and static site generation.
- **Tailwind CSS:** A utility-first CSS framework for designing responsive and customizable web interfaces.
- **Anchor:** A framework for building Solana programs in Rust.

## Contributing

We welcome contributions from the community to enhance **EventSphere** and make it more robust and user-friendly. If you have any suggestions, feature requests, or bug reports, please open an issue on this repository. You can also fork the project, make changes, and submit a pull request for review.
