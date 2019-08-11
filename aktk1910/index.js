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
var cam_x = 1000;
var cam_y = 1000;
var cam_z = 1000;
camera.position.set(cam_x,cam_y,cam_z);
camera.lookAt(new THREE.Vector3(0, 0, 0));

//var controls = new THREE.TrackballControls(camera);

var light=[];
var lightHelper=[];
var lig_num=10;
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
var box_num=5;
const meshList = [];
var linegeometry=[];
var line=[];
var count=[];
for(var i=0;i<box_num;i++){
    var material = new THREE.MeshStandardMaterial( { color: 0x000000 } );
    box[i] = new THREE.Mesh(geometry,material);
    var x = Math.floor(Math.random()*700);
    var y = Math.floor(Math.random()*700);
    var z = Math.floor(Math.random()*700);
    box[i].position.set(x,y,z);
    scene.add(box[i]);

    meshList.push(box[i]);

    linegeometry[i] = new THREE.Geometry();
    linegeometry[i].vertices.push( new THREE.Vector3( x, y, z) );
    linegeometry[i].vertices.push( new THREE.Vector3( x, y, z) );
    linegeometry[i].vertices.push( new THREE.Vector3( x, y, z) );
    line[i] = new THREE.Line( linegeometry[i], new THREE.LineBasicMaterial( { color: 0x990000} ) );
    scene.add( line[i] );

    count[i]=0;
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
var n=2;
function tick() {
    // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    raycaster.setFromCamera(mouse, camera);
    // その光線とぶつかったオブジェクトを得る
    const intersects = raycaster.intersectObjects(meshList);
    meshList.map(mesh => {
      // 交差しているオブジェクトが1つ以上存在し、
      // 交差しているオブジェクトの1番目(最前面)のものだったら
      if (intersects.length > 0 && mesh === intersects[0].object) {
        for(const i in box){
          if(mesh==box[i]){
            if(150>n*count[i]){
              menu_bar_dia(1,i);
            }else if(300>n*count[i]){
              menu_bar_str(1,i);
            }
          }
        }

        mesh.material.color.setHex(0x0000ff);
      } else {
        for(const i in box){
          if(mesh==box[i]){
              if(150<n*count[i]){
                menu_bar_str(-1,i);
              }else if(0<n*count[i]){
                menu_bar_dia(-1,i);
              }
          }
        }
        mesh.material.color.setHex(0x00ff00);
      }
    });
}

function menu_bar_dia(sn,i){
  linegeometry[i].vertices[1].x+=sn*n*Math.cos(45);
  linegeometry[i].vertices[1].y+=sn*n;
  linegeometry[i].vertices[1].z-=sn*n*Math.cos(45);
  linegeometry[i].vertices[2].x+=sn*n*Math.cos(45);
  linegeometry[i].vertices[2].y+=sn*n;
  linegeometry[i].vertices[2].z-=sn*n*Math.cos(45);
  count[i]+=sn;
}
function menu_bar_str(sn,i){
  linegeometry[i].vertices[2].x+=sn*n*Math.cos(45);
  linegeometry[i].vertices[2].z-=sn*n*Math.cos(45);
  count[i]+=sn;
}


function effectmain() {
    for(var i=0;i<lig_num;i++){
        lightHelper[i].update();
    }
    for(var l=0;l<box_num;l++){
        box[l].rotation.y+=0.01;
    }
    tick();

    for(const i in box){
      linegeometry[i].verticesNeedUpdate = true;
      linegeometry[i].elementNeedUpdate = true;
      linegeometry[i].computeFaceNormals();
    }

    //controls.update();
    rendererThree.render(scene, camera);
}

animate();