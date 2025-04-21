import { Link } from "react-router-dom";

const NotFound = () => {
  return (
   
    <div className="flex flex-col flex-1 min-h-screen  justify-center  text-center p-24 bg-gray-100 ">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={-1}>Return Back</Link>
    </div>
   
)};

export default NotFound;
