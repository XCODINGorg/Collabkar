'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface ParticleData {
  position: [number, number, number];
  speed: number;
  offset: number;
  color: string;
  intensity: number;
}

function seeded(index: number, seed: number) {
  const value = Math.sin((index + 1) * 127.1 + seed * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function SceneContent() {
  const outerGroup = useRef<THREE.Group | null>(null);
  const sphereGroup = useRef<THREE.Group | null>(null);
  const innerCore = useRef<THREE.Mesh | null>(null);
  const particleRefs = useRef<THREE.Mesh[]>([]);
  const { mouse } = useThree();

  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const theta = seeded(i, 1) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(i, 2) - 1);
      const radius = 2.35;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const isIndigo = seeded(i, 3) < 0.72;
      return {
        position: [x, y, z],
        speed: 0.3 + seeded(i, 4) * 0.6,
        offset: seeded(i, 5) * Math.PI * 2,
        color: isIndigo ? '#5D66F5' : '#10C78F',
        intensity: 0.6 + seeded(i, 6) * 0.6,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (sphereGroup.current) {
      sphereGroup.current.rotation.y += 0.0015;
      sphereGroup.current.rotation.x = Math.sin(elapsed * 0.2) * 0.05;
    }

    if (outerGroup.current) {
      const targetRotationY = (mouse.x * Math.PI) * 0.08;
      const targetRotationX = (mouse.y * Math.PI) * 0.05;
      outerGroup.current.rotation.y += (targetRotationY - outerGroup.current.rotation.y) * 0.05;
      outerGroup.current.rotation.x += (targetRotationX - outerGroup.current.rotation.x) * 0.05;
    }

    if (innerCore.current) {
      const material = innerCore.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(elapsed * 1.2) * 0.15;
    }

    particleRefs.current.forEach((mesh, index) => {
      const data = particles[index];
      if (!mesh || !data) return;
      const baseY = data.position[1];
      mesh.position.y = baseY + Math.sin(elapsed * data.speed + data.offset) * 0.003;
    });
  });

  return (
    <group ref={outerGroup} position={[0.2, -0.16, 0]} scale={0.72}>
      <group ref={sphereGroup}>
        <mesh>
          <sphereGeometry args={[1.58, 64, 64]} />
          <meshStandardMaterial color="#161A63" metalness={0.88} roughness={0.14} emissive="#3F4AD8" emissiveIntensity={0.14} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.61, 24, 24]} />
          <meshBasicMaterial color="#4E59E0" wireframe opacity={0.22} transparent />
        </mesh>
        <mesh ref={innerCore}>
          <sphereGeometry args={[0.99, 32, 32]} />
          <meshStandardMaterial color="#0B0F40" emissive="#3A45D2" emissiveIntensity={0.2} transparent opacity={0.08} />
        </mesh>
      </group>

      {particles.map((particle, index) => (
        <mesh
          key={`particle-${index}`}
          ref={(node) => {
            if (node) particleRefs.current[index] = node;
          }}
          position={particle.position}
        >
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#0B0E36" emissive={particle.color} emissiveIntensity={particle.intensity * 0.7} />
        </mesh>
      ))}

    </group>
  );
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.35], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.22} />
          <pointLight position={[4, 4, 4]} color="#6A74FF" intensity={3.2} />
          <pointLight position={[-4, -3, -2]} color="#0FC98E" intensity={1.35} />
          <pointLight position={[0, -4, 2]} color="#E7EBFF" intensity={0.4} />
          <SceneContent />
          <EffectComposer>
            <Bloom luminanceThreshold={0.16} luminanceSmoothing={0.92} intensity={0.88} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
