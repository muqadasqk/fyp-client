import clsx from "clsx";
import { FaTimes } from "react-icons/fa";

const Overlay = ({ children, title, width, dasboardSpecific, onClose }) => {
  const defaultStyle = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4 overflow-y-auto";
  // const dashboardStyle = "absolute inset-0 h-100 w-100 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4 overflow-y-auto -m-5";

  const hadleClose = (e) => {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    // <div className={dasboardSpecific ? dashboardStyle : defaultStyle}>
    <div className={defaultStyle} onClick={hadleClose}>
      <div className={clsx("relative bg-primary border border-primary rounded-lg w-[70%] max-w-43xl mx-auto", { [width]: width })}>
        {/* Header */}
        <div className="relative p-6 flex items-center justify-center border-b border-primary pb-4 mb-4">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 transition p-2 border border-transparent hover:border-primary rounded-full"
          >
            <FaTimes size={18} className="text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Overlay;
