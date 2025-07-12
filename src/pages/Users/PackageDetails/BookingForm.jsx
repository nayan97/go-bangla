import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const BookingForm = ({ packageData, guides = [], onBooking }) => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState('');

  const handleBooking = () => {
    if (!user) {
      Swal.fire('Error', 'You must be logged in to book.', 'error');
      return;
    }

    const bookingInfo = {
      packageName: packageData?.name,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: packageData?.price,
      tourDate: date,
      tourGuide: selectedGuide,
      status: 'pending',
    };

    // Save to DB here (onBooking callback or axios/fetch)
    onBooking?.(bookingInfo);

    Swal.fire({
      title: 'Confirm your Booking',
      text: 'View your booking in "My Bookings"',
      icon: 'success',
      confirmButtonText: 'Go to My Bookings',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/dashboard/my-bookings';
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Book This Tour</h2>

      <div className="space-y-2">
        <input type="text" value={packageData?.name} readOnly className="input w-full" />
        <input type="text" value={user?.displayName} readOnly className="input w-full" />
        <input type="email" value={user?.email} readOnly className="input w-full" />
        <input type="text" value={user?.photoURL} readOnly className="input w-full" />
        <input type="text" value={`$${packageData?.price}`} readOnly className="input w-full" />

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
          {guides.map((guide) => (
            <option key={guide._id} value={guide.name}>
              {guide.name}
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
