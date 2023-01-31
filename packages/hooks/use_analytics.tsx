import { useRouter } from "next/router";
import { createContext, ReactElement, useContext, useEffect } from "react";
import posthog, { PostHogConfig } from "posthog-js";
import * as Sentry from "@sentry/nextjs";

interface useAnalyticsReturnType {
  posthog: typeof posthog;
}

const analyticsContext = createContext<useAnalyticsReturnType>(
  {} as useAnalyticsReturnType
);

export function ProvideAnalytics({
  children,
  analyticsConfig,
}: {
  children: ReactElement;
  analyticsConfig: UseAnalyticsParams;
}) {
  const analytics = useProvideAnalytics(analyticsConfig);

  return (
    <analyticsContext.Provider value={analytics}>
      {children}
    </analyticsContext.Provider>
  );
}

export const useAnalytics = (): useAnalyticsReturnType => {
  return useContext(analyticsContext);
};

interface UseAnalyticsParams {
  posthogApiUrl: string;
  postHogPubliKey: string;
}

export const useProvideAnalytics = ({
  posthogApiUrl,
  postHogPubliKey,
}: UseAnalyticsParams) => {
  // auto tracking
  const router = useRouter();

  useEffect(() => {
    // Init PostHog
    posthog.init(postHogPubliKey, {
      api_host: posthogApiUrl,
      loaded: (posthog) => {
        // disable on dev
        if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
      },
    });

    const posthogClient = new Sentry.BrowserClient({
      integrations: [
        new posthog.SentryIntegration(
          posthog,
          "legends-6t",
          "4504600179507200"
        ),
      ],
    });

    Sentry.getCurrentHub().bindClient(posthogClient);

    // Track page views
    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return {
    posthog,
  };
};
