import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router";

const PendingGuides = () => {
  const axiosdata = useAxiosSecure();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosdata
      .get("api/guides/pending")
      .then((res) => {
        const data = res.data;
        console.log("Fetched Guides:", data);

        const guides = Array.isArray(data) ? data : data.guides || [];
        setGuides(guides);
      })
      .catch((error) => {
        console.error("Error fetching pending guides:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = (id) => {
    console.log("Approve clicked for ID:", id);
    // You can call an approve API here
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Guides</h2>

      {loading ? (
        <Spinner></Spinner>
      ) : guides.length === 0 ? (
        <p>No pending guides found.</p>
      ) : (
        <div>
          <div className="overflow-x-auto min-h-[650px] pt-6 border border-amber-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Marks</th>
                  <th>Student Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {guides.map((guide, index) => (
                  <tr key={guide._id} className="text-left">
                    <td className="">{index + 1}</td>
                    <td className="">{guide.name || "N/A"}</td>
                    <td className="">{guide.email || "N/A"}</td>
                    <td className=" text-yellow-600 font-medium">
                      {guide.status}
                    </td>
                    <td>
                      <Link>
                        <button className="btn btn-warning btn-sm mx-1">
                          Approve
                        </button>
                      </Link>
                      <button className="btn btn-error btn-sm mx-1">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingGuides;
