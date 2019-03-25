import React from 'react'
import ErrorComp from '../components/common/Error'
import Sentry from '../utils/sentryUtil'
/**
 * Send an error event to Sentry.
 *
 * Server-side:
 * Next.js captures SSR errors and never passes them to the Sentry
 * middleware. It does, however, render the _error.js component, so
 * we can manually fire Sentry events here.
 *
 * Client-side:
 * Unhandled client exceptions will always bubble up to the _error.js
 * component, so we can manually fire events here.
 */
const notifySentry = (err, req, statusCode) => {
  Sentry.configureScope((scope) => {
    if (!req) {
      scope.setTag(`ssr`, false);
    } else {
      scope.setTag(`ssr`, true);
      scope.setExtra(`url`, req.url);
      scope.setExtra(`params`, req.params);
      scope.setExtra(`query`, req.query);
      scope.setExtra(`statusCode`, statusCode);
      scope.setExtra(`headers`, req.headers);

      if (req.user) {
        scope.setUser({ id: req.user.id, email: req.user.email });
      }
    }
  });

  Sentry.captureException(err);
};



class Error extends React.Component {
  static getInitialProps({ req, res, err }) {
    let statusCode;
    if (res) {
      ({ statusCode } = res);
    } else if (err) {
      ({ statusCode } = err);
    } else {
      statusCode = null;
    }
    notifySentry(err, req, statusCode);
    const messege = err;
    return { statusCode, messege }
  }

  render() {
    const {statusCode, messege} = this.props;
    return (
      <p>
        <ErrorComp statusCode={statusCode} messege={messege}/>
      </p>
    )
  }
}

export default Error
