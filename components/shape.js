import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";

function useWobble(factor = 1, fn = "sin", cb) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math[fn](t) * factor;
    if (cb) cb(t, ref.current);
  });
  return ref;
}

export function Box(props) {
  const [hovered, set] = useState(false);
  const ref = useWobble(0.5, "cos");
  useFrame(
    () =>
      (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01)
  );
  return (
    <mesh
      ref={ref}
      {...props}
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "white"}
      />
    </mesh>
  );
}

export function FunkyBox(props) {
  const [hovered, set] = useState(false);
  const ref = useWobble(0.5, "cos");
  useFrame(
    () =>
      (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01)
  );
  return (
    <mesh
      ref={ref}
      {...props}
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}
    >
      <boxBufferGeometry attach="geometry" />
      <MeshWobbleMaterial attach="material" color="lightpink" />
    </mesh>
  );
}

export function Shapes() {
  const {
    viewport: { width, height },
  } = useThree();
  const ringSize = Math.max(3, width / 2);
  const crossSize = 0.7;
  return (
    <>
      <Ring
        position={[-width * 0.8, height * -3, -5]}
        scale={[ringSize, ringSize, 1]}
      />
      <Cross
        position={[-width / 2.5, height / 8, -1]}
        scale={[crossSize, crossSize, 1]}
        rotation={[0, 0, Math.PI / 4]}
      />
      <Minus
        position={[width / 3, -height / 3.5, -2]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, 0, Math.PI / 10]}
      />
      <group
        rotation={[Math.PI / 8, 0, 0]}
        position={[-width / 4, -height / 6, 0]}
      >
        <Box scale={[0.8, 0.8, 0.8]} />
        <Box position={[width / 1.5, height / 4, -3]} scale={[0.5, 0.5, 0.5]} />
        <Lights />
      </group>
    </>
  );
}

function Ring(props) {
  return (
    <mesh {...props}>
      <ringBufferGeometry attach="geometry" args={[1, 1.4, 64]} />
      <meshBasicMaterial
        attach="material"
        color="#FFF9BE"
        transparent
        opacity={1}
        toneMapped={false}
      />
    </mesh>
  );
}

function Cross(props) {
  const inner = useRef();
  const ref = useWobble(0.1, "sin", () => (inner.current.rotation.z += 0.001));
  return (
    <group ref={ref}>
      <group ref={inner} {...props}>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[2, 0.5]} />
          <meshBasicMaterial
            attach="material"
            color="#FFEDDD"
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, -0.625, 0]}>
          <boxBufferGeometry attach="geometry" args={[0.5, 0.75]} />
          <meshBasicMaterial
            attach="material"
            color="#FFEDDD"
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.625, 0]}>
          <boxBufferGeometry attach="geometry" args={[0.5, 0.75]} />
          <meshBasicMaterial
            attach="material"
            color="#FFEDDD"
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function Minus(props) {
  const ref = useWobble(0.1, "sin");
  return (
    <group ref={ref}>
      <group {...props}>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[0.2, 0.7, 0.7]} />

          <meshBasicMaterial
            attach="material"
            color="#DEF5FF"
            toneMapped={false}
            /*      opacity={0.7} */
          />
        </mesh>
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      {/*       <ambientLight intensity={0.2} />
      <pointLight
        position={[7, -5, 10]}
        intensity={1}
        angle={0.3}
        penumbra={1}
      />
      <pointLight position={[1, -1, -5]} intensity={0.5} /> */}
      <ambientLight intensity={0.3} />
      {/* Our main source of light, also casting our shadow */}
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      {/* A light to help illumnate the spinning boxes */}
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
    </>
  );
}
