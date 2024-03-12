import React from "react";

const Navbar = ({ setShowFeature }) => {
  return (
    <>
      <div
        className="navbar p-1 bg-gray-900 glass rounded-xl "
        data-theme="light"
      >
        <div className="flex-1">
          <p className="m-4 font-bold text-2xl text-white font-mono">
            PDF Page Extractor
          </p>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <div className="flex m-1">
              <div
                className="btn btn-ghost m-1 text-white font-bold font-mono text-base  rounded-full"
                onClick={() => setShowFeature(false)}
              >
                Home
              </div>
              <div
                className="btn btn-ghost m-1 text-white font-bold font-mono text-base    rounded-full"
                onClick={() => setShowFeature(true)}
              >
                PDF Extractor{" "}
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white text-black  rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
