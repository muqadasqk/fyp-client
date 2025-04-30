import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import Routes from "@routes";
import { useDispatch } from "react-redux";
import { verifyToken } from "@features";
import { useTheme } from "@components";
function App() {
  const dispatch = useDispatch();
  const {theme} = useTheme()

  useEffect(() => {
    dispatch(verifyToken());
  }, []);



  return (
    <div className={theme}>
      <HelmetProvider >
      <Routes />
      <Toaster position="top-right" />
    </HelmetProvider>
    </div>
  );
}

export default App;
