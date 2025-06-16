import clsx from "clsx";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

export let closeModal = null;
const Overlay = ({ children, title, width = "max-w-2xl", onClose, zIndex = "z-30", dismisible = true, hasHeader = true }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
      setTimeout(() => onClose(false), 200);
    }
  };

  return (
    <div
      onClick={dismisible ? closeModal : undefined}
      className={clsx(
        "fixed inset-0 flex items-center justify-center px-4 py-6 transition-opacity duration-200",
        zIndex,
        visible ? "opacity-100" : "opacity-0",
        "bg-[rgba(250,250,250,0.75)] dark:bg-[rgba(34,34,34,0.7)]"
      )}
    >
      <div
        className={clsx(
          "w-full",
          width,
          "bg-primary rounded-lg border border-primary shadow-xl transition-all duration-300",
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Header */}
        {hasHeader && (
          <div className="relative px-6 py-4 border-b border-primary flex items-center justify-center">
            <h3 className="text-lg font-semibold text-primary m-0">{title}</h3>
            {onClose && (
              <button
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => onClose(false), 200);
                }}
                title="Close"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-primary-hover transition"
              >
                <FaTimes size={18} className="text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Overlay;
