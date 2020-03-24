class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  // Renderer
  const canvas = document.getElementById('canvas-1');
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(640, 480);
  renderer.outputEncoding = THREE.sRGBEncoding;

  // GUI
  const gui = new dat.GUI();
  
  // Camera
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
  camera.position.set(-1, 1, 1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  const guiCameraPosition = gui.addFolder('Camera Position');
  guiCameraPosition.add(camera.position, 'z', 0, 1).name('Z')
  
  // Controls
  const controls = new THREE.OrbitControls(camera, canvas);
  
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x999999);
  
  // Lighting
  const guiLighting = gui.addFolder('Lighting');
  const ambientLight = new THREE.AmbientLight(0x666666);
  scene.add(ambientLight);
  gui.add(ambientLight, 'intensity', 0, 10);
  guiLighting
    .addColor(new ColorGUIHelper(ambientLight, 'color'), 'value')
    .name('AmbientLight');
  
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);
  directionalLight = new THREE.DirectionalLight(0x005500, .5);
  scene.add(directionalLight);
  
  console.log(directionalLight.color)
  guiLighting
    .addColor(new ColorGUIHelper(directionalLight, 'color'), 'value')
    .name('DirectionalLight');
  
  // Loaders
  let ipad;
  const loader = new THREE.GLTFLoader();
  loader.load(
    '/design-system-pgm/assets/models/ipad.glb',
    gltf => {
      // console.log(gltf.scene);
      scene.add(gltf.scene);
      ipad = gltf.scene.getObjectByName('Cube');
     },
    xhr => {
      console.info(`${xhr.loaded / xhr.total * 100}% loaded`);
    },
    error => {
      console.error(error);
    }
  );
    
  let speed = { increment: .01 };
  gui
    .add(speed, 'increment', 0, 1, .01)
    .name('Rotation Speed');
  
  function rotate_ipad() {
    if (typeof ipad == 'object') {
      speed 
      ipad.rotation.y += speed.increment;
      ipad.rotation.x += speed.increment;
    }
  }
  
  // Animation Loop
  (function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    rotate_ipad();
  })();
  