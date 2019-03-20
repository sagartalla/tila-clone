import App,{Container} from 'next/app';
import React from 'react';
//import Loader from '../components/common/Loader/skeletonLoader';
import WithLoadingBar from '../lib/hoc'
import sentry from '../utils/sentry'

const { Sentry, captureException } = sentry({ release: process.env.SENTRY_RELEASE })

class MyApp extends App {

  constructor() {
    super(...arguments)
    this.state = {
      hasError: false,
      errorEventId: undefined
    }
  }

  static async getInitialProps(initArgs) {
    try {
      const { Component, router, ctx } = initArgs;
      const { query } = ctx;
      let pageProps = {}
      if(Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      pageProps = {
        ...pageProps,
        url: {
            query,
        }
      }

      return { pageProps  }
    } catch (error) {
      const errorEventId = captureException(error, ctx)
      return {
        hasError: true,
        errorEventId
      }
    }

  }

  static getDerivedStateFromProps (props, state) {
    // If there was an error generated within getInitialProps, and we haven't
    // yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined
    }
  }

  static getDerivedStateFromError () {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    const errorEventId = captureException(error, { errorInfo })

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    this.setState({ errorEventId })
  }

  render() {
    const {Component,pageProps} = this.props
    return this.state.hasError ? (
      <section>
        <h1>There was an error!</h1>
        <p>
          <a
            href='#'
            onClick={() => Sentry.showReportDialog({ eventId: this.state.errorEventId })}
          >
            📣 Report this error
          </a>
        </p>
        <p>
          <a
            href='#'
            onClick={() => { window.location.reload(true) }}
          >
            Or, try reloading the page
          </a>
        </p>
      </section>
    ) : (
      // Render the normal Next.js page
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default WithLoadingBar(MyApp)
