import { Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import EditProfileModal from '../../components/EditProfileModal'

const Navbar = ({ toggleSidebar }) => {
  const { user, logoutUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // console.log(user);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar bg-black border-b justify-between px-4 text-white">
      <button onClick={toggleSidebar} className="btn btn-ghost">
        <Menu />
      </button>
      {/* <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="/img/avatar5.png" alt="Avatar" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 text-black rounded-box w-52"
        >
          <li>
            <a>Settings</a>
          </li>
          <li>
            {" "}
            <a href="/login" className="" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div> */}
<div className="navbar-end space-x-2">
  {user && (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img src={user.photoURL} alt="User Avatar" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <span className="justify-between hover:bg-blue-950">{user.displayName}</span>
          </li>
          <li>
            <span className="justify-between hover:bg-blue-950">{user.email}</span>
          </li>
          <li>
            <button
              className="justify-between hover:bg-blue-950 text-left w-full"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Profile
            </button>
          </li>
          <li>
            <a
              className="justify-between hover:bg-blue-950"
              href="/login"
              onClick={handleLogout}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>

      {isEditModalOpen && (
        <EditProfileModal user={user} onClose={() => setIsEditModalOpen(false)} />
      )}
    </>
  )}
</div>

    </div>
  );
};

export default Navbar;
