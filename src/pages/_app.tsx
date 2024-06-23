// }

import dynamic from "next/dynamic";
// const Layout = dynamic(() => import("@/components/themes"));
import "@/styles/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { LoadingApp } from "@/components";
import { useRouter } from "next/router";

const Layout = dynamic(() => import("@/components/themes"), {
  suspense: true
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";
  return (
    <RecoilRoot>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>License Management System</title>
      </Head>

      <Suspense fallback={<LoadingApp />}>
        {isLoginPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Suspense>
    </RecoilRoot>
  );
}
