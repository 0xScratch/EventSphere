'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Web3Auth } from "@web3auth/modal"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { IAdapter, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base'
import { clientId } from '@/config/web3AuthConfig'
import { chainConfig } from '@/config/chainConfig'
import { createSolanaProvider } from '@/utils/solanaProvider'
import { AuthAdapter } from '@web3auth/auth-adapter'
import { getInjectedAdapters } from '@web3auth/default-solana-adapter'
import { modalConfig } from '@/config/modalConfig'
import { Button } from './ui/button'

const WalletButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function Navigation() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] = useState<IProvider | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const init = async () => {
      try {
        const solanaPrivateKeyPrvoider = createSolanaProvider(); 

        const web3auth = new Web3Auth({
          clientId: clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider: solanaPrivateKeyPrvoider,
          chainConfig: chainConfig,
        });

        // Setup external adapters
        const authAdapter = new AuthAdapter({
          adapterSettings: {
            loginConfig: {
              sms_passwordless: {
                verifier: "using-phonenumber",
                typeOfLogin: "sms_passwordless",
                clientId: clientId,
              }
            }
          },
        }) 

        web3auth.configureAdapter(authAdapter);
        
        const adapters = getInjectedAdapters({
          options: {
            clientId,
            chainConfig
          },
        })
        
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        })

        setWeb3auth(web3auth);

        await web3auth.initModal({
          modalConfig: modalConfig,  
        });
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet!")
      return
    }
    const web3authProvider = await web3auth.connect()

    if (web3auth.connected) {
      setLoggedIn(true)
    }

    setProvider(web3authProvider)
  }

  const logout = async() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet!")
      return
    }

    await web3auth.logout()
    setProvider(null)
    setLoggedIn(false)
  }

  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center py-4 px-6 z-10">
      <Link
        href="/"
        className="text-2xl font-bold mr-8"
        style={{
          fontFamily: 'Brush Script MT, cursive',
          letterSpacing: '0.1em'
        }}
      >
        EventSphere.
      </Link>

      <div className="flex items-center gap-8">
        <Link
          href="/"
          className={`${
            pathname === '/'
              ? 'text-gray-900 font-medium border-b-2 border-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Events
        </Link>
        <Link
          href="/my-tickets"
          className={`${
            pathname === '/my-tickets'
              ? 'text-gray-900 font-medium border-b-2 border-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Tickets
        </Link>
        <Link
          href="/my-events"
          className={`${
            pathname === '/my-events'
              ? 'text-gray-900 font-medium border-b-2 border-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Events
        </Link>
        <Link
          href="/create-event"
          className={`${
            pathname === '/create-event'
              ? 'text-gray-900 font-medium border-b-2 border-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Create Event
        </Link>
      </div>

      <div className="ml-auto">
        {
          loggedIn ? (
            <Button onClick={logout} className="rounded-full bg-white text-black hover:bg-gray-300">
              Logout
            </Button>
          ) : (
            <Button onClick={login} className="rounded-full bg-black text-white hover:bg-gray-800">
              Login
            </Button>
          )
        }
        <WalletButton />
      </div>
    </nav>
  )
}
