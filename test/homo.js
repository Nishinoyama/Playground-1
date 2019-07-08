/*jshint esversion: 6 */
var width = window.innerWidth;
var height = window.innerHeight;
var x = width/2;
var y = height/2;

const bulletCapacity = 5000;

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(width, height,{
    resolution: 1,
    antialias: true,
});
document.getElementById("pixiview").appendChild(renderer.view);
window.onresize = function () {
    location.reload();
};

var time=0;
function animate(){
    requestAnimationFrame(animate);
    moveObj();
    time++;
    if(time==2){
        o++;
        time=0;
    }

    var l = 0;
    var count=0;
    for(var t=0;t<circle.length/obj_shot;t++){
        count=0;
        for(var i=0;i<360;i+=(360/obj_shot)){
            circle[l][0].x += circle[l][0].speed * Math.cos(circle[l][0].rad);
            circle[l][0].y += circle[l][0].speed * Math.sin(circle[l][0].rad);
        }
        // if(count==obj_shot){
        //     circle.splice(0, obj_shot);
        //     o--;
        //     textobj.text--;
        // }
    }
    renderer.render(stage);
}

var circle=[];
var obj_shot=10;
var o=0;



function Bullet() {
    this.obj = new PIXI.Graphics();
    this.speed;
    this.rad;

    this.clear = function(){
        this.obj.clear();
    }
}

function BulletStore() {

    this.capa = bulletCapacity;
    this.bullet = new Array(bulletCapacity);
    for (let i = 0; i < bulletCapacity; i++) {
        this.bullet[i] = new Bullet();
    }
    
    this.number = 0;
    // 弾を割り当てる。かわいい
    this.quota = function(){
        this.bullet[this.number].clear();
        return this.bullet[this.number++];
    }
}
var bulletStore = new BulletStore();


function GunPoint(x,y){

    this.x = x;
    this.y = y;

    this.addobj = function( n ){
        for(var i=0;i<n;i++){
            this.bullet[i] = [];
            this.bullet[i][0] = bulletStore.quota();
            this.bullet[i][0].obj.beginFill("0xff000", 1);
            this.bullet[i][0].obj.drawCircle(0,0,3);
            this.bullet[i][0].obj.globalCompositeOperation = 'destination-over';
            this.bullet[i][0].obj.endFill();
    
            this.bullet[i][0].obj.x=this.x;
            this.bullet[i][0].obj.y=this.y;

            this.bullet[i][0].speed = 12;
            this.bullet[i][0].rad = i;

        }
        textobj.text++;
    }
};

var gunPoint = new Array(20);
for (let index = 0; index < gunPoint.length; index++) {
    gunPoint[index] = new GunPoint(x,y);
}

function moveObj(){
    for (let i = 0; i < bullet.length; i++) {
        bullet[i][0].x += bullet[i][0].speed * Math.cos(bullet[l][0].rad);
        bullet[i][0].y += bullet[i][0].speed * Math.sin(bullet[l][0].rad);
    }
}


var word = "0";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var textobj = new PIXI.Text(word, style);
stage.addChild(textobj);

animate();