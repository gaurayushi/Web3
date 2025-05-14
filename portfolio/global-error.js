// global-error.js
import * as Sentry from '@sentry/nextjs';

export function reportError(error) {
  Sentry.captureException(error);
}
