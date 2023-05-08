import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [logoSpin, setLogoSpin] = useState(false);

  const handleLogoClick = () => {
    setLogoSpin(true);
    setTimeout(() => setLogoSpin(false), 1000); // stop spinning after 1 second
  };

  return (
    <div className="flex flex-col">
      <section className="intro-section section flex flex-col justify-center items-center">
        <div className="text-white text-center items-center">
          <h1 className="text-4xl font-bold mb-4">Mana Arts</h1>
          <div className={logoSpin ? "spin" : ""} onClick={handleLogoClick}>
            <Image src="/logo.png" alt="Logo" width={200} height={200} />
          </div>
        </div>
      </section>
      <section className="request-section section-alt min-h-screen flex items-center justify-center">
        <Link href="/request" legacyBehavior>
          <a className="bg-black text-white py-6 px-8 rounded-lg shadow-lg cursor-pointer border border-white text-center">
            <p className="text-3xl font-bold mb-2">Request something</p>
          </a>
        </Link>
      </section>
      <section className="signin-section section min-h-screen flex items-center justify-center">
        <Link href="/signin" legacyBehavior>
          <a className="bg-black text-white py-6 px-8 rounded-lg shadow-lg cursor-pointer mt-8 border border-white text-center">
            <p className="text-3xl font-bold mb-2">See your stuff</p>
          </a>
        </Link>
      </section>
      <section className="lookaround-section section-alt min-h-screen flex items-center justify-center">
        <Link href="/signin" legacyBehavior>
          <a className="bg-black text-white py-6 px-8 rounded-lg shadow-lg cursor-pointer mt-8 border border-white text-center">
            <p className="text-3xl font-bold mb-2">Look around</p>
          </a>
        </Link>
      </section>

      <style jsx>{`
        .spin {
          animation: spin 1s;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .section {
          clip-path: polygon(0% 6%, 100% 0%, 100% 94%, 0% 100%);
          margin-bottom: -30%;
          padding-top: 6%;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .section {
            clip-path: polygon(0% 4%, 100% 0%, 100% 96%, 0% 100%);
            margin-bottom: -15%;
            padding-top: 4%;
          }
          .section-alt {
            clip-path: polygon(0% 0%, 100% 4%, 100% 100%, 0% 96%);
            margin-bottom: -15%;
            padding-top: 4%;
          }
          .intro-section {
            margin-top: -1.5%;
            padding-top: 4%;
            padding-bottom: 15%;
          }
        }
        .request-section {
          background-image: url('/redgrey.png');
          background-size: cover;
          background-position: center;
          padding-top: 1%;
        }
        .signin-section {
          background-image: url('/purple.png');
          background-size: cover;
          background-position: center;
          padding-top: 1%;
        }
        .lookaround-section {
          background-image: url('/green.png');
          background-size: cover;
          background-position: center;
          clip-path: polygon(0% 0%, 100% 6%, 100% 100%, 0% 100%);
          padding-top: 1%;
        }
        
        
        
      `}</style>
    </div>
  );
}
