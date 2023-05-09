import Link from 'next/link';

const RequestSent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center">Thank you!</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Your request has been sent. I will send an email to you shortly with a link to your page. We can refine your request via the email you provided.</p>
      <Link href="/" legacyBehavior>
        <a className="text-lg text-rose-950 hover:text-rose-900 text-center">Go back to the homepage</a>
      </Link>
    </div>
  );
};

export default RequestSent;
