import React from "react";

const About = () => {
  return (
    <>
      <div className="container">
        <div className="container__wrapper">
          <p>
            i am passionate about how{" "}
            <span className="highlight__yellow">design </span>
            come to life and i strive to{" "}
            <span className="highlight__orange">create </span>
            accessible products for all.
          </p>
          <p>
            feel free to check out my{" "}
            <span className="highlight__green">
              <a href={"https://www.linkedin.com/in/deaconpoon/"}>experience</a>
            </span>
            ,
            <span className="highlight__blue">
              <a
                href={
                  "https://drive.google.com/file/d/1X4JXqkCUs2zioVqFmlB2QCoxfP3dJ_0o/view?usp=sharing"
                }
              >
                resume
              </a>
            </span>{" "}
            and{" "}
            <span className={"highlight__pink"}>
              <a href={"https://github.com/deaconpoon"}>code</a>.
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
