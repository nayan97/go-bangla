import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookingForm = ({ packageData}) => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState("");

  const axiosdata = useAxiosSecure();
  // console.log(packageData.guideIds);

const handleBooking = async () => {



  const bookingInfo = {
    packageName: packageData?.title,
    touristName: user.displayName,
    touristEmail: user.email,
    touristImage: user.photoURL,
    price: packageData?.price,
    tourDate: date,
    tourGuide: selectedGuide,
    status: "pending",
  };
  


  try {
    const response = await axiosdata.post("/api/bookings", bookingInfo);

    if (response.data.success) {
      Swal.fire({
        title: "Confirm your Booking",
        text: 'View your booking in "My Bookings"',
        icon: "success",
        confirmButtonText: "Go to My Bookings",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/dashboard/my-bookings";
        }
      });
    } else {
      Swal.fire("Error", response.data.message || "Booking failed", "error");
    }
  } catch (error) {
    console.error("Axios Error:", error);
    Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
  }
};


  return (
    <div className="p-6 bg-white rounded shadow-lg space-y-4 border border-amber-100">
      <h2 className="text-2xl font-bold">Book This Tour</h2>

      <div className="space-y-2">
        <input
          type="text"
          value={packageData?.title}
          readOnly
          className="input w-full"
        />
        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="input w-full"
        />
        <input
          type="email"
          value={user?.email}
          readOnly
          className="input w-full"
        />
        <input
          type="text"
          value={user?.photoURL}
          readOnly
          className="input w-full"
        />
        <input
          type="text"
          value={`$${packageData?.price}`}
          readOnly
          className="input w-full"
        />

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="input w-full"
          minDate={new Date()}
        />

        <select
          className="select w-full"
          value={selectedGuide}
          onChange={(e) => setSelectedGuide(e.target.value)}
        >
          <option value="" disabled>
            Select Tour Guide
          </option>
          {packageData.guideIds.map((guide, idx) => (
            <option key={idx} value={guide}>
              {guide}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary w-full"
          onClick={handleBooking}
          disabled={!user}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
