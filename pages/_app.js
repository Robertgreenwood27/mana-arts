import "../styles.css";
import 'react-masonry-css';
import Header from "../components/Header";
import { CartProvider } from "../components/CartContext";
import Footer from "../components/Footer";
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <CartProvider>
      <Header/>
      <div  className="bg-zinc-900 text-zinc-300">
      <Component {...pageProps}  className="p-8"/>
      </div>
      <Footer/>
    </CartProvider>
    <Analytics />
    </>
  );
}

export default MyApp;

