import { type AppType } from "next/app";

import { api } from "sintocheck/utils/api";

import "sintocheck/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
