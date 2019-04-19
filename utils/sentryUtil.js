import * as Sentry from '@sentry/browser';
import getConfig from 'next/config';

const { SENTRY_DSN } = getConfig().publicRuntimeConfig;

Sentry.init({ dsn: SENTRY_DSN });

export default Sentry;
