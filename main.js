import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// --- Scene setup ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f4f8);
scene.fog = new THREE.Fog(0xf0f4f8, 15, 45);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const controls = new PointerLockControls(camera, document.body);
const moveState = { forward: false, backward: false, left: false, right: false };
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const SPEED = 0.12;
const GRAVITY = -0.001;
let canJump = false;
const playerBox = new THREE.Box3(new THREE.Vector3(-0.3, 0, -0.3), new THREE.Vector3(0.3, 1.7, 0.3));

// --- Collision meshes (invisible, for ray/box checks)
const collisionMeshes = [];
const CONCIERGE_ZONE_RADIUS = 2.2;
const CONCIERGE_POSITION = new THREE.Vector3(0, 0, -6);

function createFloor() {
  const w = 24, d = 20;
  const geo = new THREE.PlaneGeometry(w, d);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.3,
    metalness: 0.1,
  });
  const floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  collisionMeshes.push({ mesh: floor, box: new THREE.Box3().setFromObject(floor), isFloor: true });
  return floor;
}

function createWalls() {
  const height = 6;
  const halfW = 12, halfD = 10;
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0 });
  const walls = new THREE.Group();

  const left = new THREE.Mesh(new THREE.PlaneGeometry(height, halfD * 2), mat);
  left.position.set(-halfW, height / 2, 0);
  left.rotation.y = Math.PI / 2;
  walls.add(left);

  const right = new THREE.Mesh(new THREE.PlaneGeometry(height, halfD * 2), mat);
  right.position.set(halfW, height / 2, 0);
  right.rotation.y = -Math.PI / 2;
  walls.add(right);

  const back = new THREE.Mesh(new THREE.PlaneGeometry(halfW * 2, height), mat);
  back.position.set(0, height / 2, -halfD);
  walls.add(back);

  const front = new THREE.Mesh(new THREE.PlaneGeometry(halfW * 2, height), mat);
  front.position.set(0, height / 2, halfD);
  front.rotation.y = Math.PI;
  walls.add(front);

  walls.traverse(c => {
    if (c.isMesh) {
      c.receiveShadow = true;
      collisionMeshes.push({ mesh: c, box: new THREE.Box3().setFromObject(c) });
    }
  });
  scene.add(walls);
  return walls;
}

function createCeiling() {
  const geo = new THREE.PlaneGeometry(24, 20);
  const mat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.95 });
  const ceiling = new THREE.Mesh(geo, mat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 6;
  scene.add(ceiling);
  return ceiling;
}

function createReceptionDesk() {
  const group = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, metalness: 0.05 });
  const shape = new THREE.Shape();
  const rx = 3.2, ry = 0.9;
  for (let i = 0; i <= 32; i++) {
    const t = (i / 32) * Math.PI * 2;
    const x = Math.cos(t) * rx;
    const y = Math.sin(t) * ry;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const deskGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.95, bevelEnabled: false });
  const desk = new THREE.Mesh(deskGeo, white);
  desk.position.set(0, 0.475, -6);
  desk.castShadow = true;
  desk.receiveShadow = true;
  group.add(desk);
  scene.add(group);
  collisionMeshes.push({ mesh: desk, box: new THREE.Box3().setFromObject(desk) });
  return group;
}

function createConciergeFigure() {
  const group = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xf5d0c5, roughness: 0.8 });
  const cyan = new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x0e7490, emissiveIntensity: 0.4 });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 0.9, 16), white);
  body.position.y = 0.45;
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), skin);
  head.position.y = 1;
  head.castShadow = true;
  group.add(head);

  const badge = new THREE.Mesh(new THREE.CircleGeometry(0.06, 16), cyan);
  badge.position.set(0.12, 0.55, 0.26);
  badge.rotation.y = -0.2;
  group.add(badge);

  group.position.set(0, 0, -6);
  scene.add(group);
  return group;
}

function createConciergeSign() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 128;
  ctx.fillStyle = '#0e7490';
  ctx.font = 'bold 72px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CONCIERGE', 256, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    side: THREE.DoubleSide,
    emissive: 0x0e7490,
    emissiveMap: tex,
    emissiveIntensity: 0.6,
  });
  const geo = new THREE.PlaneGeometry(4, 1);
  const sign = new THREE.Mesh(geo, mat);
  sign.position.set(0, 2.8, -6);
  sign.rotation.y = Math.PI;
  scene.add(sign);
  return sign;
}

function createWindowWall(side) {
  const group = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const sky = new THREE.MeshBasicMaterial({
    color: 0xbae6fd,
    side: THREE.BackSide,
  });
  const frameW = 4, frameH = 5;
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(frameW + 0.3, frameH + 0.3), white);
  const windowGeo = new THREE.PlaneGeometry(frameW, frameH);
  const windowMesh = new THREE.Mesh(windowGeo, sky);
  const x = side === 'left' ? -8 : 8;
  frame.position.set(x, 3, -9.8);
  windowMesh.position.set(x, 3, -9.85);
  frame.rotation.y = side === 'left' ? -Math.PI / 2 : Math.PI / 2;
  windowMesh.rotation.y = frame.rotation.y;
  group.add(frame);
  group.add(windowMesh);
  scene.add(group);
  return group;
}

function createSofa(x) {
  const group = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 0.9), white);
  seat.position.set(x, 0.25, -4);
  seat.castShadow = true;
  seat.receiveShadow = true;
  const back = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.8, 0.15), white);
  back.position.set(x, 0.65, -4.45);
  back.castShadow = true;
  group.add(seat);
  group.add(back);
  scene.add(group);
  collisionMeshes.push({ mesh: seat, box: new THREE.Box3().setFromObject(seat) });
  collisionMeshes.push({ mesh: back, box: new THREE.Box3().setFromObject(back) });
  return group;
}

function createCoffeeTable(x, z) {
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.52, 0.06, 32), white);
  top.position.set(x, 0.33, z);
  top.castShadow = true;
  scene.add(top);
  collisionMeshes.push({ mesh: top, box: new THREE.Box3().setFromObject(top) });
  return top;
}

function createTree(x, z) {
  const group = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.2, 8), white);
  trunk.position.set(x, 0.6, z);
  const foliage = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 6), white);
  foliage.position.set(x, 1.6, z);
  group.add(trunk);
  group.add(foliage);
  scene.add(group);
  collisionMeshes.push({ mesh: foliage, box: new THREE.Box3().setFromObject(foliage) });
  collisionMeshes.push({ mesh: trunk, box: new THREE.Box3().setFromObject(trunk) });
  return group;
}

function createLights() {
  const amb = new THREE.AmbientLight(0xc4d4e8, 0.6);
  scene.add(amb);
  const sun = new THREE.DirectionalLight(0xffffff, 0.9);
  sun.position.set(5, 12, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 50;
  sun.shadow.camera.left = -15;
  sun.shadow.camera.right = 15;
  sun.shadow.camera.top = 15;
  sun.shadow.camera.bottom = -15;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xbae6fd, 0.3);
  fill.position.set(-3, 4, -5);
  scene.add(fill);
}

// --- Build scene ---
createFloor();
createWalls();
createCeiling();
createReceptionDesk();
createConciergeFigure();
createConciergeSign();
createWindowWall('left');
createWindowWall('right');
createSofa(-5);
createSofa(5);
createCoffeeTable(-5, -3.2);
createCoffeeTable(5, -3.2);
createTree(-6.5, -2.5);
createTree(6.5, -2.5);
createLights();

// --- Collision (simple AABB with floor) ---
function updatePlayerBox() {
  const p = camera.position;
  playerBox.min.set(p.x - 0.3, p.y, p.z - 0.3);
  playerBox.max.set(p.x + 0.3, p.y + 1.7, p.z + 0.3);
}

function resolveCollisions() {
  updatePlayerBox();
  // Keep player inside room bounds
  camera.position.x = THREE.MathUtils.clamp(camera.position.x, -11, 11);
  camera.position.z = THREE.MathUtils.clamp(camera.position.z, -9, 9);
  camera.position.y = 1.6;
  updatePlayerBox();

  collisionMeshes.forEach(({ mesh, box: b, isFloor }) => {
    if (isFloor) return;
    b.setFromObject(mesh);
    if (!playerBox.intersectsBox(b)) return;
    const dx = Math.min(playerBox.max.x - b.min.x, b.max.x - playerBox.min.x);
    const dz = Math.min(playerBox.max.z - b.min.z, b.max.z - playerBox.min.z);
    if (dx < dz) {
      const push = camera.position.x < b.min.x + (b.max.x - b.min.x) / 2 ? -dx : dx;
      camera.position.x += push;
    } else {
      const push = camera.position.z < b.min.z + (b.max.z - b.min.z) / 2 ? -dz : dz;
      camera.position.z += push;
    }
    updatePlayerBox();
  });
}

// --- Concierge trigger ---
let conversationOpen = false;
function checkConciergeZone() {
  const dist = camera.position.distanceTo(CONCIERGE_POSITION);
  if (dist <= CONCIERGE_ZONE_RADIUS && !conversationOpen) {
    openConversation();
  }
}

function openConversation() {
  conversationOpen = true;
  document.getElementById('conversation-module').classList.add('open');
  document.getElementById('instructions').style.display = 'none';
  controls.unlock();
}

function closeConversation() {
  conversationOpen = false;
  document.getElementById('conversation-module').classList.remove('open');
  document.getElementById('instructions').style.display = 'block';
  controls.lock();
}

// --- Conversation UI (voice + text) ---
const messagesEl = document.getElementById('chat-messages');
const inputEl = document.getElementById('chat-input');
const btnSend = document.getElementById('btn-send');
const btnVoice = document.getElementById('btn-voice');
const btnClose = document.getElementById('btn-close-chat');

function addMessage(text, isUser) {
  const div = document.createElement('div');
  div.className = 'msg ' + (isUser ? 'user' : 'concierge');
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function sendUserMessage() {
  const text = inputEl.value.trim();
  if (!text) return;
  addMessage(text, true);
  inputEl.value = '';
  const reply = getConciergeReply(text);
  setTimeout(() => addMessage(reply, false), 600 + Math.random() * 400);
}

function getConciergeReply(input) {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) return "Hello! Welcome. How may I assist you today?";
  if (lower.includes('help')) return "Of course. I can help with directions, recommendations, or any questions about your stay.";
  if (lower.includes('thank')) return "You're welcome. Is there anything else?";
  if (lower.includes('bye') || lower.includes('goodbye')) return "Goodbye. Have a wonderful day.";
  return "I understand. Is there something specific you'd like help with?";
}

btnSend.addEventListener('click', sendUserMessage);
inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendUserMessage(); });
btnClose.addEventListener('click', closeConversation);

let recognition = null;
try {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (e) => {
      const last = e.results.length - 1;
      const text = e.results[last][0].transcript;
      if (text) {
        addMessage(text, true);
        setTimeout(() => addMessage(getConciergeReply(text), false), 600 + Math.random() * 400);
      }
      btnVoice.classList.remove('listening');
    };
    recognition.onend = () => btnVoice.classList.remove('listening');
    recognition.onerror = () => btnVoice.classList.remove('listening');
  }
} catch (_) {}

btnVoice.addEventListener('click', () => {
  if (!recognition) {
    addMessage('(Voice not supported in this browser)', false);
    return;
  }
  if (btnVoice.classList.contains('listening')) {
    recognition.stop();
    return;
  }
  btnVoice.classList.add('listening');
  recognition.start();
});

// --- Controls ---
document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveState.forward = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveState.backward = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveState.left = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveState.right = true;
      break;
  }
});
document.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveState.forward = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveState.backward = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveState.left = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveState.right = false;
      break;
  }
});

container.addEventListener('click', () => {
  if (!conversationOpen && !controls.isLocked) controls.lock();
});

// --- Game loop ---
function animate() {
  requestAnimationFrame(animate);
  if (controls.isLocked && !conversationOpen) {
    velocity.x -= velocity.x * 0.08;
    velocity.z -= velocity.z * 0.08;
    direction.z = Number(moveState.forward) - Number(moveState.backward);
    direction.x = Number(moveState.right) - Number(moveState.left);
    direction.normalize();
    if (moveState.forward || moveState.backward) velocity.z -= direction.z * SPEED;
    if (moveState.left || moveState.right) velocity.x -= direction.x * SPEED;
    controls.moveRight(-velocity.x);
    controls.moveForward(-velocity.z);
    camera.position.y = 1.6;
    resolveCollisions();
    checkConciergeZone();
  }
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
