import "./App.css";
import { Provider } from "react-redux";
import store from "./reducer/reducer";
import { MyRouter } from "./routes/routes";
import { ThemeWrapper } from "./components/ThemeWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ToasterService } from "./services/ToasterService";
import { GlobalConfiguration } from "./components/GlobalConfiguration";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const query = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 5 * (60 * 1000), // 5 mins
        // cacheTime: 10 * (60 * 1000), // 10 mins
        // keepPreviousData: true,
        retry: false,
        // retryDelay: 4000,

        refetchOnWindowFocus: false
      }
    }
  });
  return (
    <GlobalConfiguration>
      <Provider store={store}>
        <div>
          <ToastContainer {...ToasterService.toastConfig} />
        </div>
        <ThemeWrapper>
          <QueryClientProvider client={query}>
            <MyRouter />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeWrapper>
      </Provider>
    </GlobalConfiguration>
  );
}

export default App;
