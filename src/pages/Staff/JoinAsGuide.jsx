import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const JoinAsGuide = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);

    const guideApplicationData = {
      ...data, // includes: title, reason, cvLink
      createdAt: new Date().toISOString(),
      status: "pending",
      approved: false,
      user: {
        name: user?.displayName || "Unknown",
        email: user?.email || "unknown@example.com",
        uid: user?.uid || "anonymous",
      },
    };

    console.log("Guide Application Submitted:", guideApplicationData);
    Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to apply as a rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        // POST the rider data to the backend
        axiosSecure
          .post("/api/guide/apply", guideApplicationData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Application Submitted!",
                text: "Thank you for applying as a tour guide. We’ll contact you soon.",
                confirmButtonColor: "#16a34a",
              });
              reset();
            } else {
              Swal.fire("Error", "Could not submit your application.", "error");
            }
          })
          .catch((error) => {
            console.error("Submission failed", error);
            Swal.fire("Error", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Join as Tour Guide
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Application Title */}
        <div>
          <label className="label font-medium">Application Title</label>
          <input
            type="text"
            placeholder="Ex: Tour Guide Application"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="label font-medium">Experience</label>
          <input
            type="text"
            placeholder="Ex: 3 years"
            {...register("experience", { required: "Experience is required" })}
            className="input input-bordered w-full"
          />
          {errors.experience && (
            <p className="text-red-500 mt-1">{errors.experience.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="label font-medium">Location</label>
          <input
            type="text"
            placeholder="Ex: Dhaka, Bangladesh"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="label font-medium">
            Why do you want to be a tour guide?
          </label>
          <textarea
            rows={4}
            placeholder="Your motivation..."
            {...register("reason", { required: "This field is required" })}
            className="textarea textarea-bordered w-full"
          />
          {errors.reason && (
            <p className="text-red-500 mt-1">{errors.reason.message}</p>
          )}
        </div>

        {/* CV Link */}
        <div>
          <label className="label font-medium">
            Google Drive Link of your CV
          </label>
          <input
            type="url"
            placeholder="https://your-cv.com/link"
            {...register("cvLink", {
              required: "CV link is required",
              pattern: {
                value: /^https?:\/\/.+$/,
                message: "Enter a valid URL",
              },
            })}
            className="input input-bordered w-full"
          />
          {errors.cvLink && (
            <p className="text-red-500 mt-1">{errors.cvLink.message}</p>
          )}
        </div>

        <div className="text-center pt-2">
          <button
            type="submit"
            className="btn bg-[#CAEB66] w-full"
            disabled={loading}
          >
            {loading ? "Submitting…" : "Apply Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinAsGuide;
