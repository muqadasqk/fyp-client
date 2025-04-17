const Overlay = ({ children }) => {
    return (
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-20">
        <div>{children}</div>
      </div>
    );
  };
  
  export default Overlay;
  