// import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { client } from "@app";
import { Toaster } from "react-hot-toast";
import Routes from "@routes";
import { useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";

function App() {
  // const dispatch = useDispatch();
  const location = useLocation();

  // useEffect(() => {
  //   dispatch(verifyToken());
  // }, []);

  return (
    <QueryClientProvider client={client}>
      <HelmetProvider>
        <Routes key={location.pathname} />
        <Toaster position="top-right" />
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
