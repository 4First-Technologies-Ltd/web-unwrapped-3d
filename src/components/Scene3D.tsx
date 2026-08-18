import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Ambient 3D field: a slowly rotating wireframe icosahedron core wrapped in a
 * particle shell, reacting to pointer movement and scroll.
 */
export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.055);

    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Core: faceted solid
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const core = new THREE.Mesh(
      coreGeo,
      new THREE.MeshStandardMaterial({
        color: 0x0b1620,
        metalness: 0.9,
        roughness: 0.25,
        flatShading: true,
      }),
    );
    group.add(core);

    // Wireframe shell
    const shell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.05, 1)),
      new THREE.LineBasicMaterial({ color: 0xe05a2b, transparent: true, opacity: 0.55 }),
    );
    group.add(shell);

    const shell2 = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.OctahedronGeometry(3.9, 0)),
      new THREE.LineBasicMaterial({ color: 0x8ea6b8, transparent: true, opacity: 0.25 }),
    );
    group.add(shell2);

    // Particle field
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xff9a5a,
        size: 0.045,
        transparent: true,
        opacity: 0.7,
      }),
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0x6a4a3a, 1.1));
    const key = new THREE.PointLight(0xff6a2a, 90, 40);
    key.position.set(6, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0xff3a1a, 55, 40);
    rim.position.set(-8, -4, -6);
    scene.add(rim);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!mount.clientWidth) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;

      group.rotation.y = t * 0.12 + pointer.x * 0.5;
      group.rotation.x = Math.sin(t * 0.2) * 0.15 + pointer.y * 0.3;
      shell.rotation.y = -t * 0.25;
      shell2.rotation.x = t * 0.18;
      shell2.rotation.z = -t * 0.1;
      particles.rotation.y = t * 0.03;
      group.position.y = -scrollY * 0.002;
      camera.position.z = 9 + Math.sin(t * 0.35) * 0.4;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
