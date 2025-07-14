import React from "react";

/**
 * colSpan / rowSpan pairs for the first 6 slots
 * 0 ▢  1 ████  2 ▢
 * 3 ▢  4 ████  5 ▢
 */
const spans = [
  [1, 1], // idx‑0  normal square
  [2, 1], // idx‑1  double‑wide
  [1, 1], // idx‑2  normal square
  [1, 1], // idx‑3  normal square
  [2, 1], // idx‑4  double‑wide
  [1, 1], // idx‑5  normal square
];

const GallerySection = ({ images = [] }) => {
  return (
    /* gray page background */
    <section className="bg-[#d9d7d0] py-10 flex justify-center">
      {/* white card */}
      <div className="bg-white shadow-xl p-6 md:p-10 w-full max-w-5xl">
        {/* heading */}
        <h2 className="mb-8 text-2xl md:text-3xl font-semibold tracking-wide flex items-center">
          <span className="inline-block w-10 h-px bg-black mr-4" />
          GALLERY
        </h2>

        {/* grid */}
        <div
          className="grid grid-flow-dense gap-4 auto-rows-[140px] md:auto-rows-[180px]"
          style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        >
          {images.slice(0, 6).map((src, i) => {
            const [col, row] = spans[i % spans.length];
            return (
              <div
                key={i}
                className={`relative overflow-hidden rounded-lg shadow 
                            col-span-${col} row-span-${row}`}
              >
                <img
                  src={src}
                  alt={`Place ${i + 1}`}
                  className="object-cover w-full h-full"
                />

                {/* optional caption overlay – remove if not needed */}
                <span className="absolute inset-x-0 bottom-0 text-white text-xs md:text-sm px-2 py-1
                                 bg-gradient-to-t from-black/60 to-transparent">
                  {/* put caption here if you have one */}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
