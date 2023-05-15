import Link from "next/link";
import SpinningLogo from "../components/SpinningLogo"


export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="intro-section section flex flex-col justify-center items-center">
          <SpinningLogo />
      </section>
      <section className="request-section min-h-screen flex items-center justify-center" style={{backgroundImage: "url('/redgrey.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <Link href="/request" legacyBehavior>
          <a className="bg-black text-white py-6 px-8 rounded-lg shadow-lg cursor-pointer border border-white text-center">
            <p className="text-3xl font-bold mb-2">Request something</p>
          </a>
        </Link>
      </section>
      <section className="signin-section min-h-screen flex items-center justify-center" style={{backgroundImage: "url('/purple.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <Link href="/signIn" legacyBehavior>
          <a className="bg-black text-white py-6 px-8 rounded-lg shadow-lg cursor-pointer mt-8 border border-white text-center">
            <p className="text-3xl font-bold mb-2">See your stuff</p>
          </a>
        </Link>
      </section>
      <section className="lookaround-section min-h-screen flex items-center justify-center" style={{backgroundImage: "url('/green.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <Link href="/general" legacyBehavior>
          <a className="bg-black text-white py-6 px-8 rounded-lg shadow-lg cursor-pointer mt-8 border border-white text-center">
            <p className="text-3xl font-bold mb-2">Look around</p>
          </a>
        </Link>
      </section>
    </div>
  );
}
