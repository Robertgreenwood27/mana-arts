import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className='bg-zinc-900'>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Amarante&display=swap" rel="stylesheet" />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCadyehzkGXRqxLlwtxkDQVoqfWNRJ2I8I"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

