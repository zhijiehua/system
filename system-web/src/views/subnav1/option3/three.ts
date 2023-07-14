/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-04-17 20:15:35
 * @LastEditTime: 2023-06-01 10:28:50
 * @LastEditors: huazj
 */
import * as THREE from 'three';
// 动画库
import gsap from 'gsap';
// 调试
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import img from '@/assets/images/login/images_bg.png'

export const threeRender = () => {
  const box = document.getElementById('box');
  let width = (box?.offsetWidth || 0);
  let height = (box?.offsetHeight || 0);
  console.log(width, height)
  // 创建场景
  const scene = new THREE.Scene();
  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  // 灯光
  // 环境光
  // const light = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(light);
  // // 直线光
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  // directionalLight.position.set(10, 10, 10);
  // scene.add(directionalLight);
  
  // 设置相机位置
  camera.position.set(5, 5, 5);
  scene.add(camera);

  // 导入纹理
  const textureLoader = new THREE.TextureLoader();
  const loginBg = textureLoader.load(img);
  // 设置偏移
  // loginBg.offset.x = 0.1;
  // loginBg.offset.y = 0.1;
  // loginBg.offset.set(0.1, 0.1);
  // 设置旋转
  loginBg.center.set(0.5, 0.5);
  loginBg.rotation = Math.PI / 4;
  // 设置重复
  loginBg.repeat.set(2, 3);
  loginBg.wrapS = THREE.RepeatWrapping;
  loginBg.wrapT = THREE.MirroredRepeatWrapping;

  
  // 添加物体
  // 长方体
  const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
  // 材质
  // 基础材质
  const cubeMaterial = new THREE.MeshBasicMaterial({
    map: loginBg,
    // color: 0xffff00,
  });
  // 标准材质
  // const cubeMaterial = new THREE.MeshStandardMaterial({
  //   map: loginBg,
  //   // color: 0xffff00,
  // });
  // 根据几何体和材质创建物体
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  
  //将几何体添加到场景中
  scene.add(cube);

  // gui调试工具
  const gui = new dat.GUI();
  // 设置位置
  gui.add(cube.position as unknown as Record<string, unknown>, 'x').min(0).max(5).step(0.01).name('移动X轴').onChange((value) => {

  }).onFinishChange(value => {

  });
  // 设置颜色
  const params = {
    color: '#fff',
    fn: () => {
      gsap.to(cube.position, {x: 5, duration: 2, yoyo: true, repeat: -1})
    }
  }
  gui.addColor({color: '#fff'}, 'color').onChange(value => {
    cube.material.color.set(value);
  })
  // 设置是否展示
  gui.add(cube as unknown as Record<string, unknown>, 'visible').name('是否显示');
  // 设置按钮
  gui.add(params, 'fn').name('立方体运动');
  // 设置文件夹
  const folder = gui.addFolder('设置立方体');
  folder.add(cube.material as unknown as Record<string, unknown>, "wireframe", )
  
  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  //设置渲染尺寸大小
  renderer.setSize(width, height);
  // 将canvas添加到dom
  document.getElementById('box')?.append(renderer.domElement);
  
  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，感觉有惯性
  controls.enableDamping = true;

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper);

  // 设置动画
  // const animate = gsap.to(cube.position, {
  //   x: 15,
  //   duration: 5,
  //   ease: 'power1.inOut',
  //   repeat: 1,
  //   yoyo: true,
  //   onComplete: () => {
  //     console.log('动画完成');
  //   },
  //   onStart: () => {
  //     console.log('动画开始');
  //   }
  // })
  // // 运动与否
  // box?.addEventListener('click', () => {
  //   if(animate.isActive()) {
  //     animate.pause();
  //   } else {
  //     animate.resume()
  //   }
  // })
  // 监听页面大小
  window.addEventListener('resize', () => {
    width = box?.offsetWidth || 0;
    height = box?.offsetHeight || 0;
    // 更新摄像头
    camera.aspect = width / height;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(width, height);
    // 设置像素宽高比
    renderer.setPixelRatio(window.devicePixelRatio);
  })

  // 双击全屏
  box?.addEventListener('dblclick', () => {
    if(document.fullscreenElement) {
      setTimeout(() => {
        width = box?.offsetWidth || 0;
        height = box?.offsetHeight || 0;
        // 更新摄像头
        camera.aspect = width / height;
        // 更新摄像机的投影矩阵
        camera.updateProjectionMatrix();
        // 更新渲染器
        renderer.setSize(width, height);
        // 设置像素宽高比
        renderer.setPixelRatio(window.devicePixelRatio);
        console.log(111)
      }, 100)
      document.exitFullscreen();
    } else {
      renderer.domElement.requestFullscreen();
    }
  })

  const render = (time:number) => {
    controls.update();
    // 渲染场景
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render(0);
}

