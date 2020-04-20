import React from 'react';
import NProgress from '../lib/nprogress';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <NProgress />
    </React.Fragment>
  );
}