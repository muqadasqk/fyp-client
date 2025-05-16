import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import Routes from "@routes";
import { useDispatch } from "react-redux";
import { retrieveUsers, setTheme, verifyToken } from "@features";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
    dispatch(retrieveUsers({}))

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const switchTheme = (e) => {
      dispatch(setTheme(e.matches ? 'dark' : 'light'));
    };

    media.addEventListener('change', switchTheme);

    return () => {
      media.removeEventListener('change', switchTheme);
    };
  }, []);


  return (
    <HelmetProvider >
      <Routes />
      <Toaster position="top-right"
        toastOptions={{
          className: "bg-primary"
        }}
      />
    </HelmetProvider>
  );
}

export default App;
