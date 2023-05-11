import "../styles.css";
import 'react-masonry-css';
import Header from "../components/Header";
import { CartProvider } from "../components/CartContext";
import Footer from "../components/Footer";


function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header/>
      <div  className="bg-zinc-900 text-zinc-300">
      <Component {...pageProps}  className="p-8"/>
      </div>
      <Footer/>
    </CartProvider>
  );
}

export default MyApp;

