import React from 'react';
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = () => {
    return (
        <div>
            <div className="relative z-10 flex items-center h-full px-10 text-left text-white">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Hire Our Best{" "}
                        <span className="text-success">
                        <Typewriter
                            words={["React Developer", "JS Developer", "Laravel Developer"]}
                            loop
                            cursor
                            cursorStyle="|"
                            typeSpeed={80}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                        </span>
                    </h1>
                    <p className="text-lg max-w-lg">
                        Crafting beautiful interfaces and experiences with React and Tailwind CSS.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TypeWriter;