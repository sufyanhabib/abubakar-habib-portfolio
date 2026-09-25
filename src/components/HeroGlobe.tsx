import React, { useEffect, useRef, useState, memo } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";
import { HeroGlobeFallback } from "./HeroGlobeFallback";

export const HeroGlobe = memo(function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check WebGL availability
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
    } catch {
      setHasWebGL(false);
      return;
    }

    // Globe root group for unified rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 78;

    // 1. Core Sphere (Dark polished obsidian core)
    const sphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x050811,
      emissive: 0x02050b,
      specular: 0x00ff9f,
      shininess: 18,
      transparent: true,
      opacity: 0.96,
    });
    const coreSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(coreSphere);

    // 2. Graticule / Wireframe Latitude-Longitude Grid
    const wireGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.5, 24, 16);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff9f,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    });
    const wireSphere = new THREE.Mesh(wireGeometry, wireMaterial);
    globeGroup.add(wireSphere);

    // 3. Continents Point Cloud / Network Nodes
    // Generate organic clusters of points representing cities/regions across the globe
    const pointCount = 900;
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    const colorPalette = [
      new THREE.Color(0x00ff9f), // Emerald green
      new THREE.Color(0x00d2ff), // Cyan
      new THREE.Color(0xff9933), // Saffron
      new THREE.Color(0xffffff), // White
    ];

    // Clustered distribution on sphere surface
    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;

      // Small jitter for clustered effect
      const radius = GLOBE_RADIUS + 1.2;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pointPositions[i * 3] = x;
      pointPositions[i * 3 + 1] = y;
      pointPositions[i * 3 + 2] = z;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      pointColors[i * 3] = col.r;
      pointColors[i * 3 + 1] = col.g;
      pointColors[i * 3 + 2] = col.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    globeGroup.add(pointsMesh);

    // 4. Parabolic 3D Network Arcs
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    interface ArcData {
      line: THREE.Line;
      pulse: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      speed: number;
      progress: number;
    }

    const arcs: ArcData[] = [];
    const arcColors = [0xff9933, 0x00ff9f, 0x00d2ff, 0xffffff];

    const getSphereCoord = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Major global hub coordinates [lat, lng]
    const hubs = [
      [28.61, 77.2],   // New Delhi
      [19.07, 72.87],  // Mumbai
      [37.77, -122.4], // San Francisco
      [40.71, -74.0],  // New York
      [51.5, -0.12],   // London
      [35.67, 139.65], // Tokyo
      [1.35, 103.81],  // Singapore
      [-33.86, 151.2], // Sydney
      [25.2, 55.27],   // Dubai
      [52.52, 13.4],   // Berlin
      [-23.55, -46.6], // Sao Paulo
      [31.23, 121.47], // Shanghai
    ];

    // Create 12 dynamic arcs connecting random pairs
    for (let i = 0; i < 14; i++) {
      const hubA = hubs[i % hubs.length];
      const hubB = hubs[(i + 3 + Math.floor(Math.random() * 5)) % hubs.length];

      const start = getSphereCoord(hubA[0], hubA[1], GLOBE_RADIUS + 1);
      const end = getSphereCoord(hubB[0], hubB[1], GLOBE_RADIUS + 1);

      // Midpoint hoisted outward for 3D arch
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      const altitude = GLOBE_RADIUS + Math.min(distance * 0.45, 38);
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(36);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const arcColor = arcColors[i % arcColors.length];
      const arcMat = new THREE.LineBasicMaterial({
        color: arcColor,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(arcGeometry, arcMat);
      arcGroup.add(line);

      // Traveling pulse particle
      const pulseGeo = new THREE.SphereGeometry(1.2, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: arcColor,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(start);
      arcGroup.add(pulse);

      arcs.push({
        line,
        pulse,
        curve,
        speed: 0.005 + Math.random() * 0.008,
        progress: Math.random(),
      });
    }

    // 5. Atmospheric Halo / Glow
    const atmosphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 32, 32);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x00ff9f,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);

    // 6. Orbital Ring
    const ringGeo = new THREE.RingGeometry(GLOBE_RADIUS * 1.25, GLOBE_RADIUS * 1.26, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 2.8;
    orbitalRing.rotation.y = Math.PI / 6;
    globeGroup.add(orbitalRing);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00ff9f, 1.4);
    dirLight1.position.set(120, 80, 100);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00d2ff, 1.2);
    dirLight2.position.set(-100, -60, 80);
    scene.add(dirLight2);

    // Initial orientation
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = 0.8;

    // Interactive Drag Rotation
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      velocityX = deltaX * 0.005;
      velocityY = deltaY * 0.005;

      globeGroup.rotation.y += velocityX;
      globeGroup.rotation.x += velocityY;

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animId: number;
    const baseRotationSpeed = shouldReduceMotion ? 0.0005 : 0.0035;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-rotation & inertia damping
      if (!isDragging) {
        globeGroup.rotation.y += baseRotationSpeed + velocityX;
        globeGroup.rotation.x += velocityY;
        velocityX *= 0.94;
        velocityY *= 0.94;
      }

      // Update traveling arc pulses
      for (const arc of arcs) {
        arc.progress = (arc.progress + arc.speed) % 1;
        const pos = arc.curve.getPointAt(arc.progress);
        arc.pulse.position.copy(pos);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      // Dispose geometries & materials
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();

      for (const arc of arcs) {
        arc.line.geometry.dispose();
        (arc.line.material as THREE.Material).dispose();
        arc.pulse.geometry.dispose();
        (arc.pulse.material as THREE.Material).dispose();
      }

      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  if (!hasWebGL) {
    return <HeroGlobeFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center bg-[#020203] overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* Ambient Lighting Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,159,0.1),transparent_70%)] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent blur-3xl pointer-events-none z-10" />

      {/* Main 3D Canvas */}
      <canvas ref={canvasRef} className="relative z-0 block w-full h-full" />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20" />
    </div>
  );
});

export default HeroGlobe;
