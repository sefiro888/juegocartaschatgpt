import React, { useEffect, useMemo, useRef } from 'react';
import { Sparkles, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { resolvePublicAsset } from '../../core/publicAssets';
import type { WorldPoint } from '../../core/boardVisualLayout';

const EMBER_HOUND_URL = resolvePublicAsset('/assets/creatures/sanctuary-spectators/ember-hound.glb');
const CALDERA_DRAKE_URL = resolvePublicAsset('/assets/creatures/sanctuary-spectators/caldera-drake.glb');

interface GuardianPerchProps {
  radius: number;
  accent: string;
  glow: string;
}

const GuardianPerch: React.FC<GuardianPerchProps> = ({ radius, accent, glow }) => (
  <group>
    <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius * 0.88, radius, 0.34, 24]} />
      <meshStandardMaterial color="#33444f" roughness={0.94} metalness={0.05} />
    </mesh>
    <mesh position={[0, 0.055, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius * 0.78, radius * 0.86, 0.12, 24]} />
      <meshStandardMaterial color="#718591" roughness={0.88} metalness={0.08} />
    </mesh>
    <mesh position={[0, 0.122, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius * 0.74, 0.035, 8, 64]} />
      <meshStandardMaterial color={accent} roughness={0.42} metalness={0.68} />
    </mesh>
    <mesh position={[0, 0.125, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius * 0.58, 0.025, 6, 48]} />
      <meshStandardMaterial
        color={accent}
        emissive={glow}
        emissiveIntensity={0.78}
        roughness={0.38}
        metalness={0.58}
      />
    </mesh>
    <mesh position={[0, 0.132, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}>
      <circleGeometry args={[radius * 0.55, 40]} />
      <meshBasicMaterial
        color={glow}
        transparent
        opacity={0.08}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
    {Array.from({ length: 8 }, (_, index) => {
      const angle = (index / 8) * Math.PI * 2;
      return (
        <mesh
          key={index}
          position={[Math.cos(angle) * radius * 0.68, 0.13, Math.sin(angle) * radius * 0.68]}
          rotation={[0, -angle, 0]}
          castShadow
        >
          <boxGeometry args={[0.09, 0.035, radius * 0.18]} />
          <meshStandardMaterial
            color={accent}
            emissive={glow}
            emissiveIntensity={0.22}
            roughness={0.5}
            metalness={0.62}
          />
        </mesh>
      );
    })}
  </group>
);

interface AnimatedGuardianProps {
  url: string;
  animationName: string;
  position: WorldPoint;
  rotationY: number;
  scale: WorldPoint;
  phase: number;
  tint: string;
  emissive: string;
  emissiveIntensity: number;
  perchRadius: number;
  accent: string;
  glow: string;
  sparkleColor: string;
  lightIntensity: number;
  lightDistance: number;
}

const AnimatedGuardian: React.FC<AnimatedGuardianProps> = ({
  url,
  animationName,
  position,
  rotationY,
  scale,
  phase,
  tint,
  emissive,
  emissiveIntensity,
  perchRadius,
  accent,
  glow,
  sparkleColor,
  lightIntensity,
  lightDistance,
}) => {
  const gltf = useGLTF(url, false, true);
  const creatureRef = useRef<THREE.Group>(null);
  const { model, ownedMaterials } = useMemo(() => {
    const nextModel = cloneSkeleton(gltf.scene);
    const nextMaterials: THREE.Material[] = [];

    nextModel.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = true;

      const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material];
      const clonedMaterials = sourceMaterials.map((sourceMaterial) => {
        const material = sourceMaterial.clone();
        nextMaterials.push(material);
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.multiply(new THREE.Color(tint));
          material.emissive.set(emissive);
          material.emissiveIntensity = emissiveIntensity;
          material.roughness = Math.max(material.roughness, 0.76);
          material.metalness = Math.min(material.metalness, 0.08);
          material.envMapIntensity = 0.72;
          if (material.map) {
            material.map.colorSpace = THREE.SRGBColorSpace;
            material.map.anisotropy = 8;
          }
          material.needsUpdate = true;
        }
        return material;
      });

      child.material = Array.isArray(child.material) ? clonedMaterials : clonedMaterials[0];
    });

    return { model: nextModel, ownedMaterials: nextMaterials };
  }, [emissive, emissiveIntensity, gltf.scene, tint]);
  const { actions } = useAnimations(gltf.animations, model);

  useEffect(() => {
    const idleAction = actions[animationName];
    idleAction?.reset().setEffectiveTimeScale(0.72).fadeIn(0.7).play();

    return () => {
      idleAction?.fadeOut(0.25);
    };
  }, [actions, animationName]);

  useEffect(() => () => {
    ownedMaterials.forEach((material) => material.dispose());
  }, [ownedMaterials]);

  useFrame((state) => {
    if (!creatureRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    creatureRef.current.position.y = 0.14 + Math.sin(elapsed * 0.82 + phase) * 0.012;
    creatureRef.current.rotation.z = Math.sin(elapsed * 0.31 + phase) * 0.006;
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <GuardianPerch radius={perchRadius} accent={accent} glow={glow} />
      <group ref={creatureRef} position={[0, 0.14, 0]} scale={scale}>
        <primitive object={model} />
      </group>
      <pointLight
        position={[0, 0.85, 0]}
        color={glow}
        intensity={lightIntensity}
        distance={lightDistance}
        decay={2}
      />
      <Sparkles
        count={5}
        scale={[perchRadius * 1.5, 1.65, perchRadius * 1.5]}
        position={[0, 0.72, 0]}
        size={0.78}
        speed={0.12}
        color={sparkleColor}
        opacity={0.38}
      />
    </group>
  );
};

export const SanctuarySpectators: React.FC = () => (
  <group name="sanctuary-spectators">
    <AnimatedGuardian
      url={EMBER_HOUND_URL}
      animationName="Idle Alert"
      position={[-9.25, 1.32, 4.65]}
      rotationY={2.05}
      scale={[0.92, 0.84, 0.84]}
      phase={0.4}
      tint="#796c69"
      emissive="#35150d"
      emissiveIntensity={0.18}
      perchRadius={1.28}
      accent="#e2b36a"
      glow="#ec6b2d"
      sparkleColor="#ffd09a"
      lightIntensity={0.52}
      lightDistance={3.8}
    />
    <AnimatedGuardian
      url={CALDERA_DRAKE_URL}
      animationName="Idle"
      position={[9.12, 1.32, -4.28]}
      rotationY={-1.15}
      scale={[0.54, 0.54, 0.54]}
      phase={2.2}
      tint="#ae8580"
      emissive="#38140b"
      emissiveIntensity={0.14}
      perchRadius={1.48}
      accent="#d9a45d"
      glow="#e76327"
      sparkleColor="#ffc081"
      lightIntensity={0.54}
      lightDistance={4}
    />
  </group>
);

useGLTF.preload(EMBER_HOUND_URL, false, true);
useGLTF.preload(CALDERA_DRAKE_URL, false, true);
