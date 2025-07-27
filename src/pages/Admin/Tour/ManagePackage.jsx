
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useAxios from "../../../hooks/useAxios";
import Spinner from "../../../components/Spinner";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManagePackage = () => {
 const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 6;

  const axiosSecure = useAxios();
    const queryClient = useQueryClient();


  const fetchPackages = async () => {
    const res = await axiosSecure.get("/api/packages");
    return res.data?.data || []; // returns the sorted list
  };

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  //   Sort: Latest first (assuming packages have a createdAt or updatedAt field)
  //   const sortedPackages = [...packages].sort(
  //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //   );

      // ✅ Calculate pagination info
      const totalPages = Math.ceil(packages.length / cardPerPage);
      const startIdx = (currentPage - 1) * cardPerPage;
      const currentData = useMemo(() => {
        return packages.slice(startIdx, startIdx + cardPerPage);
      }, [packages, startIdx]);
  
    const deletePlan = async (id) => {
      return await axiosSecure.delete(`/api/packages/${id}`);
    };

      const mutation = useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries(["packages"]);
      Swal.fire("Deleted!", "Story has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Failed!", "Story could not be deleted.", "error");
    },
  });

      const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover this story!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            mutation.mutate(id);
          }
        });
      };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow">
      <div>
        <h1 className="text-xl font-semibold">Our Packages</h1>
      </div>

      {isLoading ? (
       <Spinner></Spinner>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-4"
        >
          {currentData.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-xl shadow-md p-4">
              <img
                src={pkg.images?.[0] || "/placeholder.jpg"}
                alt={pkg.title}
                className="rounded-md h-40 w-full object-cover"
              />
              <div className="mt-3">
                <p className="text-sm text-gray-500">{pkg.type}</p>
                <h3 className="text-lg font-bold">{pkg.title}</h3>
                <p className="text-blue-600 font-semibold mt-1">${pkg.price}</p>
          
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/dashboard/edit-package/${pkg._id}`}
                      className="btn btn-outline btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="btn btn-error btn-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
        {/* ✅ Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {startIdx + 1} -{" "}
          {Math.min(startIdx + cardPerPage, packages.length)} of{" "}
          {packages.length}
        </span>

        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${
                currentPage === i + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="join-item btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
export default ManagePackage;
