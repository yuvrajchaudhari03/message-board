import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Message Board',
  description: 'Message Board',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}
