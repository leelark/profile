import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BufferGeometry,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TorusGeometry,
  WebGLRenderer
} from "three";

export default function ArchitectScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x120c18, 0.18);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const group = new Group();
    scene.add(group);

    const colors = [0xc47aff, 0x5babff, 0x34d399, 0xfacc15];
    const nodes: Mesh[] = [];
    const nodeGeometry = new IcosahedronGeometry(0.38, 1);

    const positions = [
      [-2.2, 1.1, 0],
      [0, 1.45, -0.35],
      [2.15, 0.85, 0.2],
      [-1.45, -0.65, 0.25],
      [0.75, -1.05, -0.15]
    ];

    positions.forEach((position, index) => {
      const material = new MeshStandardMaterial({
        color: colors[index % colors.length],
        roughness: 0.34,
        metalness: 0.42,
        emissive: colors[index % colors.length],
        emissiveIntensity: 0.08
      });
      const mesh = new Mesh(nodeGeometry, material);
      mesh.position.set(position[0], position[1], position[2]);
      group.add(mesh);
      nodes.push(mesh);
    });

    const lineMaterial = new LineBasicMaterial({ color: 0x9f6fff, transparent: true, opacity: 0.46 });
    const linePairs = [
      [0, 1],
      [1, 2],
      [0, 3],
      [3, 4],
      [4, 2],
      [1, 4]
    ];

    linePairs.forEach(([start, end]) => {
      const points = [nodes[start].position, nodes[end].position];
      const geometry = new BufferGeometry().setFromPoints(points);
      group.add(new Line(geometry, lineMaterial));
    });

    const platform = new Mesh(
      new TorusGeometry(2.65, 0.018, 10, 96),
      new MeshBasicMaterial({ color: 0x5babff, transparent: true, opacity: 0.36 })
    );
    platform.rotation.x = Math.PI / 2.5;
    platform.position.y = -0.12;
    group.add(platform);

    scene.add(new AmbientLight(0xffffff, 0.85));
    const light = new PointLight(0xc47aff, 2.4, 10);
    light.position.set(1.6, 2.4, 3);
    scene.add(light);

    const resize = () => {
      const width = container.clientWidth || 420;
      const height = container.clientHeight || 320;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (reduceMotion) renderer.render(scene, camera);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let frame = 0;
    let animationId = 0;
    const animate = () => {
      frame += 0.01;
      if (!reduceMotion) {
        group.rotation.y = Math.sin(frame * 0.7) * 0.18;
        group.rotation.x = Math.cos(frame * 0.45) * 0.05;
        nodes.forEach((node, index) => {
          node.rotation.x += 0.008 + index * 0.001;
          node.rotation.y += 0.01;
          node.position.z = Math.sin(frame + index) * 0.18;
        });
        platform.rotation.z += 0.004;
      }
      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      renderer.dispose();
      nodeGeometry.dispose();
      lineMaterial.dispose();
      platform.geometry.dispose();
      nodes.forEach((node) => {
        const material = node.material;
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else {
          material.dispose();
        }
      });
      container.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      className="h-[280px] w-full md:h-[340px]"
      aria-label="Animated 3D architecture network showing Appian, AI, plugins, workflows, and governance layers"
    />
  );
}
