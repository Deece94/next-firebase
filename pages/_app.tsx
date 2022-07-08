import '../styles/globals.css'
import '../styles/bootstrap.min.css'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default MyApp
