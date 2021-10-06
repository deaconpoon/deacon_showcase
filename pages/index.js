import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Block } from "../components/blocks";
import { Shapes, Categories, Box } from "../components/shape";
import state from "../components/store";

import About from "../components/about";
import Work from "../components/work";
import Contact from "../components/contact";

//fixed css
function HtmlContent({ className, style, children, portal }) {
  const { size } = useThree();
  return (
    <Html
      portal={portal}
      style={{
        position: "absolute",
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height,
      }}
    >
      <div className={className} style={style}>
        {children}
      </div>
    </Html>
  );
}

function AnimatedTitle({ time = 3000 }) {
  const [index, set] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => set((index + 1) % 2), time);
    return () => clearInterval(interval);
  }, [index]);
  const subTitle = useMemo(
    () => [
      {
        adjective: "Empathetic",
        title: "Product Designer 🎨",
      },
      {
        adjective: "Inquisitive",
        title: "UX Engineer 💻",
      },
    ],
    []
  );

  return (
    <>
      {subTitle.map(({ title }, i) => (
        <span
          key={i}
          hidden={i !== index || undefined}
          className="transition horizontal subTitle"
          style={{ width: "100%", left: 0 }}
        >
          {title}
        </span>
      ))}
    </>
  );
}

export default function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Canvas
        style={{ height: `100vh` }}
        colorManagement
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl, events }) => {
          gl.setClearColor("white");
          gl.toneMappingExposure = 2.5;
          gl.toneMappingWhitePoint = 1;
          // Export canvas events, we will put them onto the scroll area
          setEvents(events);
        }}
      >
        <Block factor={1.5} offset={0}>
          {/*           <Shapes /> */}
          <HtmlContent portal={domContent}>
            <div className="menu left" style={{ top: "2.55rem" }}>
              <h2 style={{ fontSize: "2em", top: "4rem" }}>buerli.</h2>
            </div>
            {/*          <div className="menu right">
              <span>Login</span>
              <span>Sign up</span>
            </div> */}

            <div className="jumbo">
              <h1>
                Hello! This is Deacon 👋
                <br />
                I am a
                <br />
                <AnimatedTitle />
              </h1>
            </div>
          </HtmlContent>
        </Block>

        <Block factor={1.5} offset={1}>
          {/*           <Box /> */}
          <Html center portal={domContent}>
            <About></About>
          </Html>
        </Block>

        <Block factor={1.5} offset={2}>
          {/*    <Box /> */}
          <Html center portal={domContent}>
            <Work></Work>
          </Html>
        </Block>

        <Block factor={-2} offset={4}>
          {/*    <Box scale={[2, 2, 2]} /> */}
          <Html center portal={domContent}>
            <Contact></Contact>
          </Html>
        </Block>
      </Canvas>

      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}
