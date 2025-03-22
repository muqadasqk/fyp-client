import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import Routes from "@routes";
import { useDispatch } from "react-redux";
import { verifyToken } from "@features";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  return (
    <HelmetProvider>
      <Routes />
      <Toaster position="top-right" />
    </HelmetProvider>
  );
}

export default App;
