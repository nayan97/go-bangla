import React from "react";

const GallerySection = ({ images = [] }) => {
  return (
    <section className="bg-[#d9d7d0] py-10 flex justify-center">
      <div className="bg-white shadow-xl p-2 md:p-10 w-full max-w-5xl">
        <h2 className="mb-8 text-2xl md:text-3xl font-semibold tracking-wide flex items-center">
          <span className="inline-block w-10 h-px bg-black mr-4" />
          GALLERY
        </h2>

        <div className="grid grid-cols-4 gap-4">
          {images && images[0] && (
            <div className="col-span-1">
              <img
                src={images[0]}
                alt="Story"
                className="mt-4 rounded-lg max-h-48 min-h-48 object-cover w-full"
              />
            </div>
          )}
          {images && images[1] && (
            <div className="col-span-2">
              <img
                src={images[1]}
                alt="Story"
                className="mt-4 rounded-lg max-h-48 min-h-48 object-cover w-full"
              />
            </div>
          )}
          {images && images[2] && (
            <div className="col-span-1">
              <img
                src={images[2]}
                alt="Story"
                className="mt-4 rounded-lg max-h-48 min-h-48 object-cover w-full"
              />
            </div>
          )}
          {images && images[3] && (
            <div className="col-span-2">
              <img
                src={images[3]}
                alt="Story"
                className="mt-4 rounded-lg max-h-48 min-h-48 object-cover w-full"
              />
            </div>
          )}
          {images && images[4] && (
            <div className="col-span-1">
              <img
                src={images[4]}
                alt="Story"
                className="mt-4 rounded-lg max-h-48 min-h-48 object-cover w-full"
              />
            </div>
          )}
          {images && images[5] && (
            <div className="col-span-1">
              <img
                src={images[5]}
                alt="Story"
                className="mt-4 rounded-lg max-h-48 min-h-48 object-cover w-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;


// import React from "react";

// const GallerySection = ({ images = [] }) => {
//   return (
//     <section className="bg-[#d9d7d0] py-10 flex justify-center">
//       <div className="bg-white shadow-xl p-2 md:p-10 w-full max-w-5xl">
//         <h2 className="mb-8 text-2xl md:text-3xl font-semibold tracking-wide flex items-center">
//           <span className="inline-block w-10 h-px bg-black mr-4" />
//           GALLERY
//         </h2>

//         <div className="grid grid-cols-4 gap-4">
//           {images.map((image, index) => {
//             const isLast = index === images.length - 1;
//             const spanFull = isLast && images.length < 6;

//             return (
//               <div
//                 key={index}
//                 className={`col-span-${spanFull ? 4 : (index === 1 || index === 3 ? 2 : 1)}`}
//               >
//                 <img
//                   src={image}
//                   alt={`Gallery ${index}`}
//                   className="mt-4 rounded-lg max-h-48 min-h-48 object-cover w-full"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GallerySection;

