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
      <div className="flex flex-col min-h-screen justify-between">
        <Header/>
        <div className="bg-zinc-900 text-zinc-300 flex-grow">
          <Component {...pageProps} className="p-8"/>
        </div>
        <Footer/>
      </div>
    </CartProvider>
    <Analytics />
    </>
  );
}

export default MyApp;
