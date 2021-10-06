import React from "react";

const About = () => {
  return (
    <>
      <h1>
        i am passionate about how
        <span className="highlight">design</span>
        come to life and i strive to
        <span className="highlight">create</span>
        accessible products for all.
      </h1>
      <h1>
        feel free to check out my
        <a href={"https://www.linkedin.com/in/deaconpoon/"}>experience</a>,
        <a
          href={
            "https://drive.google.com/file/d/1X4JXqkCUs2zioVqFmlB2QCoxfP3dJ_0o/view?usp=sharing"
          }
        >
          resume
        </a>
        and
        <a href={"https://github.com/deaconpoon"}>code</a>.
      </h1>
    </>
  );
};

export default About;
