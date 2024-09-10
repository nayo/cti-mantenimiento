// Configuración de Three.js para WebGL animado de fondo
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bgCanvas')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Geometría de esferas (representando ideas en movimiento)
const geometry = new THREE.SphereGeometry(1, 24, 24);
const material = new THREE.MeshStandardMaterial({ color: 0xffc107 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Luz
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Función para añadir más esferas (representando ideas)
function addIdea() {
    const geometry = new THREE.SphereGeometry(0.5, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    const idea = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    idea.position.set(x, y, z);
    scene.add(idea);
}

Array(150).fill().forEach(addIdea);

// Animación de la esfera principal
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();

// Ajuste de la pantalla al redimensionar ventana
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
