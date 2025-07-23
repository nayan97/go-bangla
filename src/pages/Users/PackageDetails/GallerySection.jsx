import React from "react";

const GallerySection = ({ images = [] }) => {
  const spans = [
    [1, 1], // 0
    [2, 1], // 1
    [1, 1], // 2
    [2, 1], // 3
    [1, 1], // 4
    [1, 1], // 5
  ];

  return (
    <section className="bg-[#d9d7d0] py-10 flex justify-center">
      <div className="bg-white shadow-xl p-2 md:p-10 w-full max-w-5xl">
        <h2 className="mb-8 text-2xl md:text-3xl font-semibold tracking-wide flex items-center">
          <span className="inline-block w-10 h-px bg-black mr-4" />
          GALLERY
        </h2>

        <div
          className="grid grid-flow-dense gap-4 auto-rows-[140px] md:auto-rows-[180px]"
          style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        >
          {images
          .slice(0,6).map((src, i) => {
            let col = 1;
            let row = 1;

            // 👉 Custom span rules:
            if (images.length === 5 && i === 4) {
              col = 4; // last image full width for 5 images
            } else if (spans[i]) {
              [col, row] = spans[i];
            }

            return (
              <div
                key={i}
                className={`col-span-${col} row-span-${row} shadow-2xl overflow-hidden rounded-lg`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={src}
                  alt={`Gallery ${i + 1}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
