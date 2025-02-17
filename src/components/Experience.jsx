/* eslint-disable react/no-unknown-property */
import {
  Float,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Text,
  useScroll,
} from "@react-three/drei";
import Background from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
export const Experience = () => {
  const LINE_NB_POINTS = 12000;
  const curvDistane = 250;
  const curve_ahead_camera = 0.008;
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.5);
    shape.lineTo(0, -0.5);
    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    const scrolloffset = Math.max(0, scroll.offset);
    const curPoint = curve.getPoint(scrolloffset);
    cameraGroup.current.position.lerp(curPoint, delta * 24);
    const lookAtPoint = curve.getPoint(Math.min(scrolloffset+curve_ahead_camera,1));
    const currentLookAt =  cameraGroup.current.getWorldDirection(new THREE.Vector3());
    // todo 10:00
    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);
    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angleRotation
      )
    );
    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.y
      )
    );
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

  });
  const airplane = useRef();
  return (
    <>
      {/* <OrbitControls /> */}
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        <group ref={airplane}>
          <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
            <Airplane
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
              position-y={0.1}
            />
          </Float>
        </group>
      </group>
      {/* Text */}
      <group position={[-3, 0, -100]}>
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY={"center"}
          fontSize={0.22}
          maxWidth={2.5}
          font={"./fonts/Inter-Regular.ttf"}
        >
          Welcome to rushiii {"\n"}
          Have a seat and enjoy
        </Text>
      </group>
      <group position={[-10, 1, -200]}>
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.52}
          maxWidth={2.5}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          Services
        </Text>
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY={"top"}
          position-y={-0.66}
          fontSize={0.22}
          maxWidth={2.5}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          Do you want a drink?{"\n"}
          We have a wide range of beverages
        </Text>
      </group>

      {/* Line */}
      <group position-y={-2}>
        <Line
          points={linePoints}
          color={"white"}
          opacity={0.7}
          transparent
          lineWidth={16}
        />
      </group>
      <mesh>
        <extrudeGeometry
          args={[
            shape,
            {
              steps: LINE_NB_POINTS,
              bevelEnabled: false,
              extrudePath: curve,
            },
          ]}
        />
        <meshStandardMaterial color={"white"} opacity={0.7} transparent />
      </mesh>
      <Cloud opacity={0.5} scale={[1, 1, 1.5]} position={[-2, 2, -3]} />
      <Cloud opacity={0.5} scale={[0.2, 0.3, 0.4]} position={[1.5, -0.5, -2]} />
      <Cloud
        opacity={0.7}
        scale={[0.3, 0.3, 0.4]}
        rotation-y={Math.PI / 9}
        position={[2, -0.2, -2]}
      />
      <Cloud
        opacity={0.7}
        scale={[0.4, 0.4, 0.4]}
        rotation-y={Math.PI / 9}
        position={[2, -0.2, -12]}
      />
      <Cloud opacity={0.7} scale={[0.5, 0.5, 0.5]} position={[-1, 1, -53]} />
    </>
  );
};
