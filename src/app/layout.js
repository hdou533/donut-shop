import { Roboto } from 'next/font/google'
import './globals.css'
import Header from './../components/layout/Header';
import AppProvider from './../components/AppContext';
import { Toaster } from 'react-hot-toast';


const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700']})

export const metadata = {
  title: 'CrispyCrown Donuts',
  description: 'Discover a world of irresistible flavors with DoughJoy Delights, your online haven for handcrafted, gourmet donuts made with love and the finest ingredients.',
}

export default function RootLayout({ children }) {
  let newDate = new Date()
  let year = newDate.getFullYear();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='max-w-6xl mx-auto p-4'>
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className='text-center text-gray-500 border-t p-8'>
              &copy; {year} All rights reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  )
}
