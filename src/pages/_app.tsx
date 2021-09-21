/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/lexend/latin.css";
import "@fontsource/inter";

import defaultSEOConfig from "../../next-seo.config";
import Layout from "components/layout";
import createEmotionCache from "styles/createEmotionCache";
import customTheme from "styles/customTheme";
import "styles/globals.css";
import { defaultState, QuestionsProvider } from "utils/questionsContext";
import React, { useState } from "react";
import { AuthProvider } from "utils/AuthProvider";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "utils/firebase-config";

const clientSideEmotionCache = createEmotionCache();

const app = initializeApp(firebaseConfig);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  const [questionsContext, setQuestionsContext] = useState(defaultState);

  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        <AuthProvider>
          <Layout>
            <QuestionsProvider
              value={{
                questionState: questionsContext,
                updateQuestionState: setQuestionsContext,
              }}
            >
              <Component {...pageProps} />
            </QuestionsProvider>
          </Layout>
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;
