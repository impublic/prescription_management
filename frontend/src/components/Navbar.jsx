import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const [showmenu, setshowmenu] = useState(false);
  const { token, settoken, userData } = useContext(AppContext);

  const logout = () => {
    settoken(false);
    localStorage.removeItem("token");
  };
  return (
    <div className="flex items-center text-sm justify-between py-4 mb-5">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
      />
      <ul className=" hidden md:flex  items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden " />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex-item-center gap-4 ">
        {token && userData ? (
          <div className=" flex items-center gap-2 cursor-pointer relative group">
            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt="image"
            />

            <img className="w-2.5" src={assets.dropdown_icon} />
            <div className="absolute top-0 right-0 z-20 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">
              <div className="min-w-48  bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer">My profile</p>
                <p
                  onClick={() => navigate("/my-appointment")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                {/* <p onClick = {()=>settoken(false)} className='hover:text-black cursor-pointer'>Logout</p>  */}
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setshowmenu(true)}
          className="w-6 md:hidden "
          src={assets.menu_icon}
        />
        {/* mobile menu */}
        <div
          className={`${
            showmenu ? "fixed w-full" : "h-0 w-0"
          }md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} />
            <img
              className="w-7"
              onClick={() => setshowmenu(false)}
              src={assets.cross_icon}
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setshowmenu(false)} to="/">
              <p className="px-4 py-2 rounded-full inline-block">Home</p>
            </NavLink>

            <NavLink onClick={() => setshowmenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">All Doctors</p>
            </NavLink>

            <NavLink onClick={() => setshowmenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>

            <NavLink onClick={() => setshowmenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
