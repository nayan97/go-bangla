import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useAxiosSecure from '../hooks/useAxiosSecure';

const BookingSuccessCelebration = ({ user }) => {
     const axiosdata = useAxiosSecure();
  const [showCongrats, setShowCongrats] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
//   console.log(user);
  

  useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        const res = await axiosdata.get(`/api/bookings/count/${user.email}`);
        console.log(res);
        
        if (res.data.count > 3) {
          setShowCongrats(true);
                // Hide the message after 3 seconds
        setTimeout(() => {
          setShowCongrats(false);
        }, 5000);
        }
      } catch (error) {
        console.error('Error fetching booking count:', error);
      }
    };

    fetchBookingCount();

    // Handle screen resize for confetti
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [user.email]);

  return (
    <>
      {showCongrats && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={500} recycle={false} />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center space-y-2 animate-bounce border-4 border-blue-500">
              <h2 className="text-3xl font-bold text-green-600">🎉 Congratulations! 🎉</h2>
              <p className="text-lg text-gray-700">You’ve booked more than 3 tours with us!</p>
              <p className="text-blue-500 font-medium">Thanks for being a valued traveler 🧳</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookingSuccessCelebration;
