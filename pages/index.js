import Link from "next/link";
import SpinningLogo from "../components/SpinningLogo"
import Carousel from "../components/Carousel"
import client from "../sanity.config"; // import client

export default function Home({ categories }) {
  return (
    <div className="flex flex-col @container">
      <section className="intro-section section flex flex-col justify-center items-center">
          <SpinningLogo />
      </section>
      <section className="services-section @lg:py-6 m-6">
        <div className="grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-4 gap-4">
    <div className="service-card">
      <img src="customprint.png" alt="service 1" className="rounded"/>
      <h3 className="text-center text-xl mt-4">Custom Printing</h3>
      <p className="text-center">High-quality and efficient services are available for a variety of products.</p>
    </div>
    <div className="service-card">
      <img src="customlogos.png" alt="service 2" className="rounded"/>
      <h3 className="text-center text-xl mt-4">Logo Design</h3>
      <p className="text-center">Unique and impactful logos to represent your brand.</p>
    </div>
    <div className="service-card">
      <img src="imagemanipulation.png" alt="service 3" className="rounded"/>
      <h3 className="text-center text-xl mt-4">Image Manipulation</h3>
      <p className="text-center">Professional-grade image manipulation to enhance your visuals.</p>
    </div>
    <div className="service-card">
      <img src="webdev.png" alt="service 4" className="rounded"/>
      <h3 className="text-center text-xl mt-4">Web Development</h3>
      <p className="text-center">Responsive and user-friendly websites.</p>
    </div>
  </div>
</section>


      <Carousel categories={categories} style={{backgroundImage: "url('/redgrey.png')", backgroundSize: "cover", backgroundPosition: "center"}}/>
      <section className="request-section min-h-screen flex items-center justify-center" style={{backgroundImage: "url('/green.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
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
    </div>
  );
}

export async function getStaticProps() {
  const categories = await client.fetch(
    `*[_type == "category"]{
      _id,
      name,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }`
  );
  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
}