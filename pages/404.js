import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Sorry, this page isn't available yet.</h1>
      <p className="text-lg text-gray-600 mb-8">But don't worry, I'm working hard to bring you cool stuff!</p>
      <Link href="/" legacyBehavior>
        <a className="text-lg text-rose-950 hover:text-rose-900">Go back to the homepage</a>
      </Link>
    </div>
  )
}

export default NotFound
