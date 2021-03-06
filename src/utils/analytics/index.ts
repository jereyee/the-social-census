import {
  AnalyticsCallOptions,
  getAnalytics,
  logEvent,
} from "firebase/analytics";

export const trackEvent = (
  eventName: string,
  eventParams?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  },
  options?: AnalyticsCallOptions
) => {
  if (typeof window === "undefined") return;
  const analytics = getAnalytics();
  if (options) logEvent(analytics, eventName, eventParams, options);
  else logEvent(analytics, eventName, eventParams);
};
