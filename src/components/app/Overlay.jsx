import clsx from "clsx";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const Overlay = ({ children, title, width, onClose, zIndex = "z-40" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
      setTimeout(() => onClose(false), 200);
    }
  };

  return (
    <div
      onClick={handleClose}
      className={clsx(
        "fixed inset-0 overflow-y-auto bg-black/30 transition-opacity duration-200", zIndex,
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex items-center justify-center min-h-screen py-10 px-4">
        <div
          className={clsx(
            "relative bg-primary border border-primary rounded-lg w-full max-w-5xl transform transition-all duration-300",
            width && width,
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <div className="relative p-6 flex items-center justify-center border-b border-primary pb-4">
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(() => onClose(false), 200);
              }}
              className="absolute top-2 right-2 transition p-2 border border-transparent hover:border-primary rounded-full"
            >
              <FaTimes size={18} className="text-primary" />
            </button>
          </div>

          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
