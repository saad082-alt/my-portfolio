import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CyberBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer with deep obsidian fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060c, 0.0022);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 70;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 1. Mature Constellation Neural Network (Nodes + Dynamic Connecting Lines)
    const particleCount = 280;
    const maxDistance = 14;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];

    // Initialize node coordinates in a balanced 3D space
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 110;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.035,
          (Math.random() - 0.5) * 0.035,
          (Math.random() - 0.5) * 0.02
        )
      );
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // High precision glowing dot texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.8)');
      gradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const dotTexture = new THREE.CanvasTexture(canvas);

    const nodeMaterial = new THREE.PointsMaterial({
      size: 2.4,
      map: dotTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // Dynamic Line segments connecting nearby nodes
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 2. Calm Celestial Background Dust (Adds subtle depth)
    const dustCount = 800;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 180;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 140;
      dustPositions[i3 + 2] = (Math.random() - 0.5) * 120;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // Mouse movement listeners with damped interpolation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      camera.position.x = targetX * 8;
      camera.position.y = targetY * 6;
      camera.lookAt(0, 0, 0);

      // Update positions of nodes
      const pos = nodeGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i].x;
        pos[i3 + 1] += velocities[i].y;
        pos[i3 + 2] += velocities[i].z;

        // Soft bounce within boundary limits
        if (Math.abs(pos[i3]) > 55) velocities[i].x *= -1;
        if (Math.abs(pos[i3 + 1]) > 40) velocities[i].y *= -1;
        if (Math.abs(pos[i3 + 2]) > 30) velocities[i].z *= -1;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Calculate connecting lines between nearby constellation nodes
      let lineIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Compute alpha opacity based on closeness
            const alpha = 1.0 - dist / maxDistance;

            linePositions[lineIndex++] = pos[i * 3];
            linePositions[lineIndex++] = pos[i * 3 + 1];
            linePositions[lineIndex++] = pos[i * 3 + 2];

            linePositions[lineIndex++] = pos[j * 3];
            linePositions[lineIndex++] = pos[j * 3 + 1];
            linePositions[lineIndex++] = pos[j * 3 + 2];

            // Indigo to Cyan subtle gradient
            lineColors[colorIndex++] = 0.38 * alpha; // R
            lineColors[colorIndex++] = 0.40 * alpha; // G
            lineColors[colorIndex++] = 0.95 * alpha; // B

            lineColors[colorIndex++] = 0.05 * alpha; // R
            lineColors[colorIndex++] = 0.72 * alpha; // G
            lineColors[colorIndex++] = 0.85 * alpha; // B
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Slow elegant background drift
      dustPoints.rotation.y = elapsedTime * 0.01;
      dustPoints.rotation.x = targetY * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      dotTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};
