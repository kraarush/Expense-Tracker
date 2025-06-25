import { Link } from "react-router-dom";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <Frown className="text-gray-600 w-20 h-20 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mt-2">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Button
          asChild
          className="mt-6 px-6 py-2 text-lg bg-blue-700 hover:bg-blue-600"
        >
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;