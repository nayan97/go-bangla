import React from "react";

const TourPlan = ({ faqs }) => {
  console.log(faqs);

  return (
    <div>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="collapse collapse-arrow bg-base-100 border border-base-300 shadow"
        >
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold"> <span className="pr-2 badge badge-outline badge-success">Event number {index +1}</span> {faq.question}</div>
          <div className="collapse-content text-sm">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default TourPlan;
