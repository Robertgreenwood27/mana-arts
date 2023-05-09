import { useState } from 'react'
import Router from 'next/router'


const SignIn = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const slug = `${firstName}-${lastName}`.toLowerCase()
    Router.push(`/customers/${slug}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('/purple.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <div className="bg-zinc-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-zinc-200 font-bold mb-2">First Name:</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-zinc-200 font-bold mb-2">Last Name:</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-rose-950 hover:bg-rose-black text-zinc-200 font-semibold rounded-md shadow-md transition duration-300 ease-in-out">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
