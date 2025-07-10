import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

const JoinAsGuide = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    // 🔥 Show success popup
    Swal.fire({
      icon: 'success',
      title: 'Application Submitted!',
      text: 'Thank you for applying as a tour guide. We’ll contact you soon.',
      confirmButtonColor: '#16a34a'
    });

    reset(); // Reset form after submit
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Join as Tour Guide</h2>

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
          {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        {/* Reason */}
        <div>
          <label className="label font-medium">Why do you want to be a tour guide?</label>
          <textarea
            rows={4}
            placeholder="Your motivation..."
            {...register("reason", { required: "This field is required" })}
            className="textarea textarea-bordered w-full"
          />
          {errors.reason && <p className="text-red-500 mt-1">{errors.reason.message}</p>}
        </div>

        {/* CV Link */}
        <div>
          <label className="label font-medium">CV Link</label>
          <input
            type="url"
            placeholder="https://your-cv.com/link"
            {...register("cvLink", {
              required: "CV link is required",
              pattern: {
                value: /^https?:\/\/.+$/,
                message: "Enter a valid URL"
              }
            })}
            className="input input-bordered w-full"
          />
          {errors.cvLink && <p className="text-red-500 mt-1">{errors.cvLink.message}</p>}
        </div>

        <div className="text-center pt-2">
          <button type="submit" className="btn btn-success w-full">Submit Application</button>
        </div>
      </form>
    </div>
  );
};

export default JoinAsGuide;
