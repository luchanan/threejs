<template>
  <div>
    <div id="screen" class="overflow-hidden" />
  </div>
</template>

<script setup lang="ts">
// 按需引入写法
import { onMounted } from "vue";
import { getDom, setDomWidthHeight } from "@/utils/dom";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 定义变量
let scene, camera, renderer;
let axesHelper;
let hesLight, dirLight, sportLight;
let controls, loader, container;
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const init = () => {
  const parentDom = getDom();
  setDomWidthHeight(parentDom.width, parentDom.height);
  const screenDom = getDom(".main-content");
  setDomWidthHeight(screenDom.width, screenDom.height, "#screen");
  container = getDom("#screen");
  // 初始化场景
  initScene();
  // 初始化辅助轴
  initAxesHelper();
  // 初始化灯光
  initLight();
  // 初始化mesh
  initMesh();
  // 初始化相机
  initCamera();
  // 初始化渲染器
  initRenderer();
  // 循环动画
  animate();
  // 初始化轨道控制器
  initControls();
  animate();
  loadGlb();
};
const initScene = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
};
const initAxesHelper = () => {
  axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
};
const initLight = () => {
  hesLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hesLight.intensity = 0.6;
  scene.add(hesLight);
  dirLight = new THREE.DirectionalLight();
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);
  sportLight = new THREE.SpotLight(0xffffff);
  sportLight.position.set(0, 10, 10);
  scene.add(sportLight);
};
const initMesh = () => {};
const initCamera = () => {
  camera = new THREE.PerspectiveCamera(
    75,
    container.width / container.height,
    1,
    1000
  );
  camera.position.set(1.5, 1.5, 1.5);
  camera.lookAt(0, 0, 0);
};
const initRenderer = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.width, container.height);
  document.querySelector("#screen").appendChild(renderer.domElement);
};
const initControls = () => {
  controls = new OrbitControls(camera, renderer.domElement);
};
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
const loadGlb = () => {
  loader = new GLTFLoader();
  loader.load(
    "/glb/house.glb",
    function (gltf) {
      scene.add(gltf.scene);
    },
    xhr => {
      const percent = Math.floor((xhr.loaded / xhr.total) * 100); // 计算加载进度百分比
      if (percent === 100) {
        // loading消失
      }
      console.log(`模型加载进度：${percent}%`);
    }
  );
};
onMounted(() => {
  init();
});
</script>
