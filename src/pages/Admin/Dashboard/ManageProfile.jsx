import { useEffect, useState } from "react";
import EditProfileModal from "../../../components/EditProfileModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";

const ManageProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // You must already be using context or Firebase
  const [stats, setStats] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { role } = useUserRole();

  // console.log(role);

  useEffect(() => {
    axiosSecure
      .get("/api/admin-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.displayName}</h1>
      {/* Stats */}
      {role === "admin" && (
        <div className="pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Total Payment</h2>
                <p className="text-3xl font-bold">
                  {`৳${stats.totalPayment || 0}`}
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Total Tour Guides</h2>
                <p className="text-3xl font-bold">{stats.totalGuides || 0}</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Total Packages</h2>
                <p className="text-3xl font-bold">{stats.totalPackages || 0}</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Total Clients</h2>
                <p className="text-3xl font-bold">{stats.totalClients || 0}</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h2 className="card-title">Total Stories</h2>
                <p className="text-3xl font-bold">{stats.totalStories || 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={user?.photoURL || "/default-user.png"}
            alt="User"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-xl font-bold">{user?.displayName}</h2>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Role: {role}</p>
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ManageProfile;
