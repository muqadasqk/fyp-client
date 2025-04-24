import { Button } from "@components";
import { FaTimes } from "react-icons/fa";

const Overlay = ({ children, title, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4 overflow-y-auto">
      <div className="relative bg-white border left-10 border-gray-200 rounded-md p-6 w-[40%] max-w-43xl mx-auto">
        {/* Header */}
        <div className="relative flex items-center justify-center border-b border-gray-300 pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 transition border-0 p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes size={18} className="text-gray-700" />
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Overlay;
