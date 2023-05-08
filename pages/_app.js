import "../styles.css";
import 'react-masonry-css';
import Header from "../components/Header";
import { CartProvider } from "../components/CartContext";
import Footer from "../components/Footer";


function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <div  className="bg-zinc-900 text-zinc-300">
      <Header/>
      <Component {...pageProps}  className="p-8"/>
      <Footer/>
      </div>
    </CartProvider>
  );
}

export default MyApp;

