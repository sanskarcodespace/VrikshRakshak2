"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  MeshDistortMaterial, 
  Sphere, 
  Float, 
  Stars, 
  PerspectiveCamera,
  ContactShadows,
  Environment
} from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#4F46E5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          emissive="#7C3AED"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 15;
        p[i * 3 + 1] = (Math.random() - 0.5) * 15;
        p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#06B6D4"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

function Forest() {
  return (
    <group position={[0, -3.5, 0]}>
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        const scale = 0.5 + Math.random();
        return (
          <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5} position={[x, 0, z]}>
            <mesh scale={[scale * 0.2, scale, scale * 0.2]}>
              <cylinderGeometry args={[0.5, 1, 2, 8]} />
              <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.2} />
            </mesh>
            <mesh position={[0, scale * 0.6, 0]} scale={scale * 0.6}>
              <coneGeometry args={[1.5, 3, 8]} />
              <meshStandardMaterial color="#059669" />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06B6D4" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#7C3AED" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedSphere />
        <Particles />
        <Forest />
        
        <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
