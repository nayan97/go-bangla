import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const PendingGuides = () => {
    const axiosdata =  useAxiosSecure();
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


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Guides</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : guides.length === 0 ? (
        <p>No pending guides found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((guide, index) => (
                <tr key={guide._id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{guide.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{guide.email || "N/A"}</td>
                  <td className="px-4 py-2 border">
                    <span className="text-yellow-600 font-medium">{guide.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingGuides;
