import React, { useEffect, useState } from "react";

const texts = [
  "Plan your journey today",
  "Book trusted tour guides",
  "Travel with comfort & safety",
];

const TypeWriter = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(texts[index].slice(0, i++));
      if (i > texts[index].length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % texts.length);
          setText("");
        }, 1500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [index]);

  return <p className="text-lg font-medium italic">{text}|</p>;
};

export default TypeWriter;
