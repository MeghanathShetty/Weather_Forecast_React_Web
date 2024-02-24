import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

import { Analytics } from '@vercel/analytics/react';

// styles
import "../styles/topNav.css"
import "../styles/midPart.css"
import "../styles/main.css"
import "../styles/sideBar.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <style>
          {`
     @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Roboto+Slab:wght@100..900&display=swap')
          `}
        </style>
      </Helmet>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
