import { Button } from "@components";
import { FaTimes } from "react-icons/fa";

const Overlay = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 top-[10%] lg:left-[20%]  w-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative bg-white border lg:right-[10%] border-gray-200 rounded-md p-6 max-w-[90%] max-h-[90%] ">
        <Button
          onClick={onClose}
          className="absolute top-2 right-2  text-black hover:text-white transition bg-transparent border-0 p-1"
        >
          <FaTimes size={20} />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
