import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700']})

export const metadata = {
  title: 'CrispyCrown Donuts',
  description: 'Discover a world of irresistible flavors with DoughJoy Delights, your online haven for handcrafted, gourmet donuts made with love and the finest ingredients.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='max-w-6xl mx-auto p-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
