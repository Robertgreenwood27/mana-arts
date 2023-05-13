import { useState, useEffect } from "react";
import Image from "next/image";

const SpinningLogoStyles = () => (
  <style jsx global>{`
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
  `}</style>
);

export default function SpinningLogo() {
  const [logoSpin, setLogoSpin] = useState(false);

  useEffect(() => {
    const delay = 500; // delay in milliseconds
    setTimeout(() => {
      setLogoSpin(true);
      setTimeout(() => setLogoSpin(false), 1000);
    }, delay);
  }, []);

  const handleLogoClick = () => {
    setLogoSpin(true);
    setTimeout(() => setLogoSpin(false), 1000);
  };

  return (
    <div className="text-white text-center items-center">
      <h1 className="text-4xl font-bold mb-4">Mana Arts</h1>
      <div className={logoSpin ? "spin" : ""} onClick={handleLogoClick}>
        <div>
          <Image src="/logo.png" alt="Logo" width={200} height={200} />
        </div>
      </div>
      <SpinningLogoStyles />
    </div>
  );
}
