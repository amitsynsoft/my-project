import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/controls/OrbitControls.js";

export function renderCubeWithFabricTexture(fabricDataUrl) {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);

  // Camera setup (closer look)
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.5, 2); // Move the camera closer to the object

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    precision: "highp",
    antialias: true,
    powerPreference: "high-performance",
    depth: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // HDR rendering
  renderer.toneMappingExposure = 0.8; // Adjust exposure to avoid brightness

  // Create a wrapper for the canvas to cover the full screen
  const canvasWrapper = document.createElement("div");
  canvasWrapper.style.position = "fixed";
  canvasWrapper.style.top = "0";
  canvasWrapper.style.left = "0";
  canvasWrapper.style.width = "100%";
  canvasWrapper.style.height = "100%";
  canvasWrapper.style.zIndex = "10";
  document.body.appendChild(canvasWrapper);
  canvasWrapper.appendChild(renderer.domElement);

  // Add close button (X)
  const closeButton = document.createElement("div");
  closeButton.innerText = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "20px";
  closeButton.style.right = "20px";
  closeButton.style.fontSize = "30px";
  closeButton.style.fontWeight = "bold";
  closeButton.style.color = "white";
  closeButton.style.cursor = "pointer";
  closeButton.style.zIndex = "11";
  canvasWrapper.appendChild(closeButton);

  // Lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Adjust intensity for subtle lighting
  directionalLight.position.set(0, 2, 5); // Lighting from above
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Subtle ambient light
  scene.add(ambientLight);

  // Additional light for better scene illumination
  const pointLight = new THREE.PointLight(0xffffff, 1, 10);
  pointLight.position.set(2, 2, 2);
  scene.add(pointLight);

  // Camera controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 1;
  controls.maxDistance = 5; // Closer zooming
  controls.target.set(0, 0.5, 0);
  controls.update();

  // Cube geometry
  const geometry = new THREE.BoxGeometry(1, 1, 0.1); 

  // Load the Fabric.js texture
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(fabricDataUrl, (fabricTexture) => {
    fabricTexture.wrapS = THREE.ClampToEdgeWrapping;
    fabricTexture.wrapT = THREE.ClampToEdgeWrapping;
    fabricTexture.needsUpdate = true;


    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x8B4513, 
        roughness: 0.8,
        metalness: 0.1,
      }), 
      new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.8,
        metalness: 0.1,
      }), 
      new THREE.MeshStandardMaterial({
        color: 0x8B4513, 
        roughness: 0.8,
        metalness: 0.1,
      }), 
      new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.8,
        metalness: 0.1,
      }), 
      new THREE.MeshStandardMaterial({
        map: fabricTexture, 
        roughness: 0.2,
        metalness: 0.1,
      }), 
      new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.8,
        metalness: 0.1,
      }),
    ];

    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(0, 0.5, 0);
    scene.add(cube);

   
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  closeButton.addEventListener("click", () => {
    canvasWrapper.style.display = "none";
  });
}
