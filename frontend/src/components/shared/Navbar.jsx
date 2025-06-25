import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [navOpen, setNavOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const logout = async () => {
    try {
      dispatch(setUser(null));
      await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      toast.success("You have been logged out successfully!!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleNav = () => setNavOpen(!navOpen);

  return (
    <div className="bg-white border-b border-gray-200 ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer"
        >
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold">
            <span className="text-[#1248b2]">Ex</span>pensio
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex font-semibold gap-5 md:text-lg mr-4">
            <li>
              <Link to="/" className="cursor-pointer hover:text-gray-600">
                Home
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/dashboard"
                  className="cursor-pointer hover:text-gray-600"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-4">
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="border-[#1248b2] hover:text-[#1247b2d9]"
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-[#1248b2] hover:bg-[#4f5b8a]">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-12 h-12 cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                    <User size={30} className="text-gray-500" />
                  </div>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="flex mx-2 flex-col items-start w-96 text-lg">
                <div className="flex">
                  <div className="w-[30%] mr-6">
                    <Avatar className="w-14 h-14">
                      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full">
                        <User size={40} className="text-gray-500" />
                      </div>
                    </Avatar>
                  </div>
                  <div className="flex items-center w-full">
                    <h1 className="font-medium text-lg">
                      {user?.fullname || "username"}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-col m-4 w-full text-gray-600 gap-2">
                  <div className="flex items-center w-full ">
                    <User size={27} />
                    <Button
                      variant="link"
                      className="text-lg px-6 py-2 text-gray-600 pt-1"
                      tabIndex={-1}
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </Button>
                  </div>
                  <div className="flex items-center w-full">
                    <LogOut size={25} />
                    <Button
                      variant="link"
                      className="text-lg px-6 py-2 text-gray-600 pt-1"
                      tabIndex={-1}
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div onClick={handleNav} className="md:hidden cursor-pointer">
          {!navOpen ? (
            <AiOutlineMenu size={24} />
          ) : (
            <AiOutlineClose size={24} />
          )}
        </div>

        <div
          className={
            navOpen
              ? " fixed left-0 top-0 w-[70%] h-full border-r  rounded-md border-gray-300 bg-white ease-in-out duration-500 z-50"
              : "fixed left-[-250%] "
          }
        >
          <h1 className="text-3xl font-bold w-full m-4">
            <span className="text-[#1248b2]">Ex</span>pensio
          </h1>

          <div className="flex flex-col gap-4 items-center p-4">
            <Avatar className="w-14 h-14">
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                <User className="w-10 h-10 text-gray-500" />
              </div>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="font-medium text-lg">
                {user?.fullname || "username"}
              </h1>
            </div>
          </div>

          <ul>
            <li className="p-4 border-b border-gray-200">
              <Link
                to="/"
                onClick={handleNav}
                className="text-gray-600 hover:text-black"
              >
                Home
              </Link>
            </li>
            {user && (
              <li className="p-4 border-b border-gray-200">
                <Link
                  to="/dashboard"
                  onClick={handleNav}
                  className="text-gray-600"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col mt-4 items-center">
              <Link
                to="/signup"
                onClick={handleNav}
                className="w-full flex justify-center"
              >
                <Button variant="outline" className="border-[#1248b2]  w-3/4">
                  Sign Up
                </Button>
              </Link>
              <Link
                to="/login"
                onClick={handleNav}
                className="w-full flex justify-center"
              >
                <Button className="bg-[#1248b2] mt-2 w-3/4">Login</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col ">
              <Link
                to="/profile"
                onClick={handleNav}
                className="text-gray-600 p-4 hover:bg-gray-100 border-b border-gray-200 "
              >
                Profile
              </Link>
              <Link
                to="/logout"
                onClick={handleNav}
                className="text-gray-600 p-4 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>

        {navOpen && (
          <div
            className="fixed inset-0 w-full h-full"
            onClick={handleNav}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
