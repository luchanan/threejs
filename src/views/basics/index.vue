<template>
  <div>
    <el-button @click="rebuild">销毁重新创建</el-button>
    <div id="screen"></div>
  </div>
</template>

<script setup lang="ts">
// 按需引入写法
import { onMounted } from "vue";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from "three";
defineOptions({
  name: "Welcome"
});
const create = () => {
  let width: number = 300;
  let height: number = 300;
  let fov: number = 75;
  // 创建场景
  const scene = new Scene();
  // 创建相机
  const camera = new PerspectiveCamera(fov, width / height, 0.1, 1000);
  // 创建渲染器
  const renderer = new WebGLRenderer();
  renderer.setSize(width, height);
  document.querySelector("#screen").appendChild(renderer.domElement);
  // 创建立方体
  createBox(scene, camera, renderer);
};
function animate(params) {
  const { cube, renderer, scene, camera } = params;
  requestAnimationFrame(() => animate(params));
  // 立方体旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
const createBox = (scene, camera, renderer) => {
  // 创建立方体BoxGeometry
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  // animate
  animate({
    cube,
    renderer,
    scene,
    camera
  });
};
const rebuild = () => {
  document.querySelector("#screen").innerHTML = "";
  create();
};
onMounted(() => {
  create();
});
</script>
