import { useState } from 'react'
import firebase from '../firebase'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sign In</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <label htmlFor="email" className="block mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md w-full p-2 mb-4"
        required
      />
      <label htmlFor="password" className="block mb-2">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md w-full p-2 mb-4"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Sign In
      </button>
    </form>
  )
}

export default SignInForm
