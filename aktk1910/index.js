/*jshint esversion: 6 */
//pixi
var width = window.innerWidth;
var height = window.innerHeight;
var x = width/2;
var y = height/2;
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(width, height,{
    resolution: 1,
    antialias: true,
    transparent: true,
});
document.getElementById("pixiview").appendChild(renderer.view);
window.onresize = function () {
    location.reload();
};

var time=0;
function animate(){
    requestAnimationFrame(animate);
    textobj.text++;
    effectmain();
    renderer.render(stage);
}

var word = "0";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var textobj = new PIXI.Text(word, style);
stage.addChild(textobj);

//three
// レンダラーを作成
const canvas = document.querySelector('canvas');
const rendererThree = new THREE.WebGLRenderer({
	canvas: canvas
});
rendererThree.setPixelRatio(window.devicePixelRatio);
rendererThree.setSize(width, height);
// シーンを作成
const scene = new THREE.Scene();
// カメラを作成
const camera = new THREE.PerspectiveCamera(60, width / height);
camera.position.set(1000, 1000, 1000);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var light=[];
var lightHelper=[];
var lig_num=5;
for(var i=0;i<lig_num;i++){
    light[i] = new THREE.DirectionalLight(0xffffff);
    var x = Math.floor(Math.random()*500)-250;
    var y = Math.floor(Math.random()*500)-250;
    var z = Math.floor(Math.random()*500)-250;
    light[i].position.set(x,y,z);
    scene.add(light[i]);
    lightHelper[i] = new THREE.PointLightHelper(light[i]);
    scene.add(lightHelper[i]);
}

//軸の長さ１０００
var axis = new THREE.AxisHelper(1000);
//sceneに追加
scene.add(axis);

var geometry = new THREE.CubeGeometry(100, 100, 100);
// var edges = new THREE.EdgesGeometry(geometry);

var box=[];
var box_num=10;
const meshList = [];
for(var i=0;i<box_num;i++){
    var material = new THREE.MeshStandardMaterial( { color: 0x008888 } );
    box[i] = new THREE.Mesh(geometry,material);
    var x = Math.floor(Math.random()*500);
    var y = Math.floor(Math.random()*500);
    var z = Math.floor(Math.random()*500);
    box[i].position.set(x,y,z);
    scene.add(box[i]);
    meshList.push(box[i]);
}

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
document.getElementById("pixiview").addEventListener('mousemove', handleMouseMove);
function handleMouseMove(event) {
    const element = event.currentTarget;
    // canvas要素上のXY座標
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    // canvas要素の幅・高さ
    const w = width;
    const h = height;
    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = (x / w) * 2 - 1;
    mouse.y = -(y / h) * 2 + 1;
  }
  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    raycaster.setFromCamera(mouse, camera);
    // その光線とぶつかったオブジェクトを得る
    const intersects = raycaster.intersectObjects(meshList);
    meshList.map(mesh => {
      // 交差しているオブジェクトが1つ以上存在し、
      // 交差しているオブジェクトの1番目(最前面)のものだったら
      if (intersects.length > 0 && mesh === intersects[0].object) {
        // 色を赤くする
        mesh.material.color.setHex(0xff0000);
      } else {
        // それ以外は元の色にする
        mesh.material.color.setHex(0x008888);
      }
    });
}

function effectmain() {
    for(var i=0;i<lig_num;i++){
        lightHelper[i].update();
    }
    for(var i=0;i<box_num;i++){
        box[i].rotation.y+=0.01;
    }
    tick();
    rendererThree.render(scene, camera);
}

animate();
