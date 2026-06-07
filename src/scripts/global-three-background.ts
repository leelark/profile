import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer
} from "three";
import type { Material } from "three";

type BackgroundWindow = Window & {
  __GLOBAL_THREE_BACKGROUND_ERROR__?: string;
  __GLOBAL_THREE_BACKGROUND_STATUS__?: string;
};

const backgroundWindow = window as BackgroundWindow;
document.documentElement.dataset.threeBackgroundStatus = "module-loaded";
backgroundWindow.__GLOBAL_THREE_BACKGROUND_STATUS__ = "module-loaded";

type ColorRole = "accent" | "blue" | "border" | "green";

type ThemeColors = Record<ColorRole, Color>;

function cssRgbColor(name: string, fallback: [number, number, number]) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const channels = value
    .split(/\s+/)
    .map((channel) => Number.parseFloat(channel))
    .filter((channel) => Number.isFinite(channel));

  const [red, green, blue] = channels.length >= 3 ? channels : fallback;
  return new Color(red / 255, green / 255, blue / 255);
}

function tagColor<T extends Group | Line | LineSegments | Mesh>(object: T, role: ColorRole) {
  object.userData.colorRole = role;
  return object;
}

function lineSegments(points: number[], color: Color, opacity: number) {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(points, 3));

  const material = new LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false
  });

  return new LineSegments(geometry, material);
}

function createPerspectiveGrid(color: Color) {
  const points: number[] = [];
  const width = 10;
  const near = 2.8;
  const far = -8.6;
  const y = -2.2;

  for (let x = -width; x <= width; x += 2.4) {
    points.push(x, y, near, x * 0.44, y, far);
  }

  for (let z = near; z >= far; z -= 2.2) {
    const scale = MathUtils.mapLinear(z, near, far, 1, 0.44);
    points.push(-width * scale, y, z, width * scale, y, z);
  }

  return lineSegments(points, color, 0.12);
}

function createDepthFrames(color: Color) {
  const points: number[] = [];
  const depths = [-2.4, -4.6, -7.2];

  depths.forEach((z, index) => {
    const width = 8.6 - index * 1.55;
    const height = 3.8 - index * 0.55;
    const y = 0.12 + index * 0.16;
    const left = -width / 2;
    const right = width / 2;
    const top = y + height / 2;
    const bottom = y - height / 2;

    points.push(
      left, bottom, z, right, bottom, z,
      right, bottom, z, right, top, z,
      right, top, z, left, top, z,
      left, top, z, left, bottom, z
    );

    if (index > 0) {
      const previousWidth = 8.6 - (index - 1) * 1.55;
      const previousHeight = 3.8 - (index - 1) * 0.55;
      const previousY = 0.12 + (index - 1) * 0.16;
      const previousZ = depths[index - 1];
      points.push(
        -previousWidth / 2, previousY - previousHeight / 2, previousZ, left, bottom, z,
        previousWidth / 2, previousY - previousHeight / 2, previousZ, right, bottom, z,
        previousWidth / 2, previousY + previousHeight / 2, previousZ, right, top, z,
        -previousWidth / 2, previousY + previousHeight / 2, previousZ, left, top, z
      );
    }
  });

  return lineSegments(points, color, 0.18);
}

function createGlassPanel(
  width: number,
  height: number,
  color: Color,
  role: ColorRole,
  opacity: number,
  position: [number, number, number],
  rotation: [number, number, number]
) {
  const group = new Group();

  const plane = tagColor(
    new Mesh(
      new PlaneGeometry(width, height),
      new MeshBasicMaterial({
        color,
        depthWrite: false,
        opacity,
        side: DoubleSide,
        transparent: true
      })
    ),
    role
  );
  plane.position.set(...position);
  plane.rotation.set(...rotation);

  const edge = tagColor(
    new LineSegments(
      new EdgesGeometry(plane.geometry),
      new LineBasicMaterial({
        color,
        depthWrite: false,
        opacity: opacity * 2.8,
        transparent: true
      })
    ),
    role
  );
  edge.position.copy(plane.position);
  edge.rotation.copy(plane.rotation);

  group.add(plane, edge);
  return group;
}

function createOrbitalRing(color: Color, role: ColorRole, radius: number, position: [number, number, number], rotation: [number, number, number]) {
  const ring = tagColor(
    new Mesh(
      new TorusGeometry(radius, 0.012, 8, 112),
      new MeshBasicMaterial({
        color,
        depthWrite: false,
        opacity: 0.38,
        transparent: true
      })
    ),
    role
  );
  ring.position.set(...position);
  ring.rotation.set(...rotation);
  return ring;
}

function createSignalNode(color: Color, role: ColorRole, size: number, position: [number, number, number]) {
  const group = new Group();
  const solid = tagColor(
    new Mesh(
      new OctahedronGeometry(size, 0),
      new MeshBasicMaterial({
        color,
        depthWrite: false,
        opacity: 0.16,
        transparent: true
      })
    ),
    role
  );
  const edge = tagColor(
    new LineSegments(
      new EdgesGeometry(solid.geometry),
      new LineBasicMaterial({
        color,
        depthWrite: false,
        opacity: 0.46,
        transparent: true
      })
    ),
    role
  );
  group.add(solid, edge);
  group.position.set(...position);
  group.userData.baseY = position[1];
  return group;
}

function flowLine(points: Vector3[], color: Color, opacity: number) {
  const curve = new CatmullRomCurve3(points);
  const geometry = new BufferGeometry().setFromPoints(curve.getPoints(56));
  const material = new LineBasicMaterial({
    color,
    depthWrite: false,
    opacity,
    transparent: true
  });

  return new Line(geometry, material);
}

function createSignalRails(color: Color, opacity: number) {
  const group = new Group();

  group.add(
    flowLine(
      [
        new Vector3(-7.6, 1.15, -5.8),
        new Vector3(-2.8, 0.58, -3.4),
        new Vector3(2.4, 0.78, -4.1),
        new Vector3(7.8, 0.12, -6.4)
      ],
      color,
      opacity
    ),
    flowLine(
      [
        new Vector3(-6.8, -0.92, -4.2),
        new Vector3(-1.8, -0.46, -2.6),
        new Vector3(3.2, -0.72, -3.8),
        new Vector3(7.1, -1.1, -6.2)
      ],
      color,
      opacity * 0.68
    ),
    flowLine(
      [
        new Vector3(-4.6, 2.22, -7.2),
        new Vector3(0.4, 1.6, -5.2),
        new Vector3(5.7, 1.9, -7.4)
      ],
      color,
      opacity * 0.5
    )
  );

  return group;
}

function createSideCluster(colors: ThemeColors) {
  const left = new Group();
  const right = new Group();
  const rails: Group[] = [];
  const rings: Mesh[] = [];
  const nodes: Group[] = [];

  left.rotation.set(0.12, -0.22, -0.04);
  right.rotation.set(-0.08, 0.24, 0.05);

  const leftFrames = createDepthFrames(colors.blue);
  tagColor(leftFrames, "blue");
  leftFrames.scale.set(0.52, 0.52, 0.52);
  leftFrames.position.set(-0.25, 0.2, -0.8);
  leftFrames.rotation.set(0.05, -0.18, 0.04);

  const rightFrames = createDepthFrames(colors.blue);
  tagColor(rightFrames, "blue");
  rightFrames.scale.set(0.48, 0.48, 0.48);
  rightFrames.position.set(0.4, -0.05, -1.0);
  rightFrames.rotation.set(-0.02, 0.2, -0.04);

  const leftRing = createOrbitalRing(colors.accent, "accent", 0.94, [-0.8, 1.05, -2.1], [0.72, 0.22, -0.28]);
  const rightRing = createOrbitalRing(colors.green, "green", 0.72, [0.62, -0.75, -1.55], [0.86, -0.26, 0.34]);
  rings.push(leftRing, rightRing);

  const leftNode = createSignalNode(colors.green, "green", 0.26, [0.78, -0.7, -1.4]);
  const rightNode = createSignalNode(colors.accent, "accent", 0.22, [-0.72, 0.85, -1.35]);
  nodes.push(leftNode, rightNode);

  const leftRails = createSignalRails(colors.blue, 0.18);
  leftRails.scale.set(0.38, 0.38, 0.38);
  leftRails.position.set(-0.34, 0.08, -1.2);
  leftRails.userData.baseX = leftRails.position.x;
  leftRails.userData.baseY = leftRails.position.y;

  const rightRails = createSignalRails(colors.green, 0.16);
  rightRails.scale.set(0.36, 0.36, 0.36);
  rightRails.position.set(0.24, 0.18, -1.18);
  rightRails.userData.baseX = rightRails.position.x;
  rightRails.userData.baseY = rightRails.position.y;
  rails.push(leftRails, rightRails);

  left.add(
    leftFrames,
    createGlassPanel(2.0, 3.1, colors.blue, "blue", 0.078, [-1.18, 0.16, -2.25], [0.18, -0.42, 0.08]),
    createGlassPanel(1.46, 2.36, colors.accent, "accent", 0.066, [0.62, -0.52, -1.9], [-0.12, 0.34, -0.08]),
    leftRails,
    leftRing,
    leftNode
  );

  right.add(
    rightFrames,
    createGlassPanel(2.28, 2.84, colors.blue, "blue", 0.074, [1.04, 0.5, -2.2], [-0.12, 0.48, -0.06]),
    createGlassPanel(1.52, 2.26, colors.green, "green", 0.064, [-0.58, -0.08, -1.86], [0.18, -0.28, 0.1]),
    rightRails,
    rightRing,
    rightNode
  );

  const root = new Group();
  root.add(left, right);
  return { left, nodes, rails, right, rings, root };
}

function setLineColor(line: Line | LineSegments, color: Color) {
  (line.material as LineBasicMaterial).color.copy(color);
}

function applyRoleColors(root: Group, colors: ThemeColors) {
  root.traverse((object) => {
    const role = object.userData.colorRole as ColorRole | undefined;
    const color = role ? colors[role] : undefined;
    const material = (object as Mesh | Line | LineSegments).material;
    if (!color || !material) return;

    const updateMaterial = (item: Material) => {
      const colorMaterial = item as MeshBasicMaterial | LineBasicMaterial;
      colorMaterial.color?.copy(color);
    };

    if (Array.isArray(material)) {
      material.forEach(updateMaterial);
    } else {
      updateMaterial(material);
    }
  });
}

function setGroupLineColor(group: Group, color: Color) {
  group.children.forEach((line) => setLineColor(line as Line, color));
}

function setGroupOpacity(group: Group, opacity: number) {
  group.children.forEach((line, index) => {
    const material = (line as Line).material as LineBasicMaterial;
    material.opacity = opacity * (index === 0 ? 1 : index === 1 ? 0.68 : 0.5);
  });
}

function disposeScene(scene: Scene, renderer: WebGLRenderer) {
  scene.traverse((object) => {
    const renderable = object as Line | LineSegments;
    renderable.geometry?.dispose();
    const material = renderable.material;
    if (Array.isArray(material)) {
      material.forEach((item: Material) => item.dispose());
    } else {
      material?.dispose();
    }
  });
  renderer.dispose();
}

function initializeGlobalThreeBackground() {
  document.documentElement.dataset.threeBackgroundStatus = "initializing";
  backgroundWindow.__GLOBAL_THREE_BACKGROUND_STATUS__ = "initializing";
  const canvas = document.querySelector<HTMLCanvasElement>("[data-three-background]");
  if (!canvas) {
    document.documentElement.dataset.threeBackgroundStatus = "missing-canvas";
    backgroundWindow.__GLOBAL_THREE_BACKGROUND_STATUS__ = "missing-canvas";
    return;
  }
  if (canvas.dataset.threeReady === "true") {
    document.documentElement.dataset.threeBackgroundStatus = "already-ready";
    backgroundWindow.__GLOBAL_THREE_BACKGROUND_STATUS__ = "already-ready";
    return;
  }
  const activeCanvas = canvas;
  activeCanvas.dataset.threeReady = "true";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const readThemeColors = () => ({
    accent: cssRgbColor("--color-accent", [178, 103, 239]),
    blue: cssRgbColor("--color-blue-signal", [91, 171, 255]),
    border: cssRgbColor("--color-border", [55, 61, 82]),
    green: cssRgbColor("--color-verified", [52, 211, 153])
  });
  const colors = readThemeColors();

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: activeCanvas,
    powerPreference: "low-power"
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.25, 7.5);

  const root = new Group();
  root.rotation.x = -0.04;
  scene.add(root);

  const grid = createPerspectiveGrid(colors.border);
  const sideCluster = createSideCluster(colors);

  root.add(grid, sideCluster.root);

  function positionSideClusters() {
    const sideX = camera.aspect > 1.62 ? 5.45 : 4.86;
    sideCluster.left.position.set(-sideX, 0.24, -3.75);
    sideCluster.right.position.set(sideX, 1.62, -3.72);
  }

  function applyThemeColors() {
    const nextColors = readThemeColors();
    setLineColor(grid, nextColors.border);
    setGroupLineColor(sideCluster.rails[0], nextColors.blue);
    setGroupLineColor(sideCluster.rails[1], nextColors.green);
    applyRoleColors(sideCluster.root, nextColors);
  }

  const themeObserver = new MutationObserver(applyThemeColors);
  themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"], attributes: true });

  let frameId = 0;
  let disposed = false;
  const startedAt = performance.now();

  function resize() {
    const width = activeCanvas.clientWidth || window.innerWidth;
    const height = activeCanvas.clientHeight || window.innerHeight;
    const size = renderer.getSize(new Vector2());

    if (size.width !== width || size.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      positionSideClusters();
    }
  }

  function render() {
    if (disposed) return;

    resize();
    const time = (performance.now() - startedAt) / 1000;
    root.rotation.y = Math.sin(time * 0.07) * 0.035;
    root.rotation.x = -0.05 + Math.sin(time * 0.06) * 0.012;
    sideCluster.left.rotation.y = -0.22 + Math.sin(time * 0.12) * 0.075;
    sideCluster.left.rotation.x = 0.12 + Math.cos(time * 0.1) * 0.028;
    sideCluster.right.rotation.y = 0.24 + Math.cos(time * 0.11) * 0.075;
    sideCluster.right.rotation.x = -0.08 + Math.sin(time * 0.09) * 0.028;
    sideCluster.rings.forEach((ring, index) => {
      ring.rotation.z += index === 0 ? 0.0028 : -0.0022;
      ring.rotation.y += index === 0 ? 0.0014 : -0.0012;
    });
    sideCluster.nodes.forEach((node, index) => {
      node.rotation.y += index === 0 ? 0.004 : -0.0034;
      node.position.y = Number(node.userData.baseY) + Math.sin(time * 0.38 + index) * 0.045;
    });
    sideCluster.rails.forEach((rail, index) => {
      rail.position.x = Number(rail.userData.baseX) + Math.sin(time * (0.12 + index * 0.02)) * 0.08;
      rail.position.y = Number(rail.userData.baseY) + Math.cos(time * (0.1 + index * 0.02)) * 0.055;
      setGroupOpacity(rail, index === 0 ? 0.17 + Math.sin(time * 0.26) * 0.036 : 0.14 + Math.cos(time * 0.22) * 0.028);
    });


    renderer.render(scene, camera);

    if (!reducedMotion.matches) {
      frameId = window.requestAnimationFrame(render);
    }
  }

  function start() {
    window.cancelAnimationFrame(frameId);
    render();
  }

  function destroy() {
    disposed = true;
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resize);
    reducedMotion.removeEventListener("change", start);
    themeObserver.disconnect();
    disposeScene(scene, renderer);
    delete activeCanvas.dataset.threeReady;
  }

  window.addEventListener("resize", resize);
  reducedMotion.addEventListener("change", start);
  window.addEventListener("beforeunload", destroy, { once: true });
  start();
  document.documentElement.dataset.threeBackgroundStatus = "ready";
  backgroundWindow.__GLOBAL_THREE_BACKGROUND_STATUS__ = "ready";
}

function startGlobalThreeBackground() {
  try {
    initializeGlobalThreeBackground();
  } catch (error) {
    document.documentElement.dataset.threeBackgroundStatus = "error";
    document.documentElement.dataset.threeBackgroundError = error instanceof Error ? error.message : String(error);
    backgroundWindow.__GLOBAL_THREE_BACKGROUND_STATUS__ = "error";
    backgroundWindow.__GLOBAL_THREE_BACKGROUND_ERROR__ = error instanceof Error ? error.message : String(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startGlobalThreeBackground, { once: true });
} else {
  startGlobalThreeBackground();
}
