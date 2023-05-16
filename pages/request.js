
//\pages\request.js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';




export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [city, setCity] = useState('');
const [state, setState] = useState('');
const [zipCode, setZipCode] = useState('');

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');


  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      mailingAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      description,
    }),
  });

  if (response.ok) {
    router.push('/requestSent');
  } else {
  }

  // Reset form fields
  setFirstName('');
  setLastName('');
  setEmail('');
  setMailingAddress('');
  setCity('');
  setState('');
  setZipCode('');
  setPhoneNumber('');
  setDescription('');
};
  
  

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('/redgrey.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
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
      <div className="mb-4">
        <label htmlFor="mailing_address" className="block text-zinc-200 font-bold mb-2">Mailing Address:</label>
        <input
          type="text"
          name="mailing_address"
          id="mailing_address"
          value={mailingAddress}
          onChange={(e) => setMailingAddress(e.target.value)}
          className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
          required
        />
        <div className="mb-4">
  <label htmlFor="city" className="block text-zinc-200 font-bold mb-2">City:</label>
  <input
    type="text"
    name="city"
    id="city"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
    required
  />
</div>
<div className="mb-4">
  <label htmlFor="state" className="block text-zinc-200 font-bold mb-2">State:</label>
  <input
    type="text"
    name="state"
    id="state"
    value={state}
    onChange={(e) => setState(e.target.value)}
    className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
    required
  />
</div>
<div className="mb-4">
  <label htmlFor="zip_code" className="block text-zinc-200 font-bold mb-2">Zip Code:</label>
  <input
    type="text"
    name="zip_code"
    id="zip_code"
    value={zipCode}
    onChange={(e) => setZipCode(e.target.value)}
    className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
    required
  />
</div>

      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-zinc-200 font-bold mb-2">Email Address:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone_number" className="block text-zinc-200 font-bold mb-2">Phone Number:</label>
        <input
          type="tel"
          name="phone_number"
          id="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
  <label htmlFor="description" className="block text-zinc-200 font-bold mb-2">Description:</label>
  <textarea
    name="description"
    id="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full px-3 py-2 border-2 border-zinc-600 rounded-md text-zinc-200 bg-zinc-900 focus:border-rose-950 focus:outline-none"
    required
  ></textarea>
</div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full bg-rose-950 hover:bg-black text-zinc-200 font-bold py-2 px-4 rounded-md focus:outline-none"
          >
            Send Request
          </button>
          <Link href="/signIn" legacyBehavior>
            <a className="text-purple-500 hover:text-purple-400 text-sm font-semibold ml-4">
              Already have a request? Click here.
            </a>
          </Link>
        </div>
      </form>
    </div>
  </div>


    );
  }
  
