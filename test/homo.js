/*jshint esversion: 6 */
var width = window.innerWidth;
var height = window.innerHeight;
var x = width/2;
var y = height/2;

const bulletCapacity = 3000;

var stage = new PIXI.Sprite();
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
    bulletStore.moveBullet();
    time++;
    if( time == 5 ){
        gunPoint[0].addobj(obj_shot);
        // o *= 1.02;
        time=0;
    }

    renderer.render(stage);
}

var circle=[];
var obj_shot=60;
var o=1;



function Bullet() {
    this.obj = new PIXI.Graphics();
    this.speed = 0;
    this.rad = 0;
    this.dx = 0;
    this.dy = 0;

    this.clear = function(){
        this.obj.clear();
    }

    this.moving = function (){
        this.bullet[i].obj.x += dx;
        this.bullet[i].obj.y += dy;
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
        if( this.number == bulletCapacity ) this.number = 0;
        // this.bullet[this.number].clear();
        return this.bullet[this.number++];
    }

    // 弾を動かす。いとおしい
    this.moveBullet = function(){
        textobj.text = 0;
        for (let i = 0; i < this.bullet.length; i++) {
            if( this.bullet[i].speed == 0 ) continue;
            if( isScreenOut(this.bullet[i].obj) ) {
                this.bullet[i].speed = 0;
                stage.removeChild(this.bullet[i].obj);
            }else {
                textobj.text++;
                this.bullet[i].obj.x += this.bullet[i].speed * Math.cos(this.bullet[i].rad);
                this.bullet[i].obj.y += this.bullet[i].speed * Math.sin(this.bullet[i].rad);
            }
        }
    }
}
var bulletStore = new BulletStore();

function GunPoint(x,y){

    // 銃口の位置
    this.x = x;
    this.y = y;

    // 発射！あとは勝手に動くはず
    this.addobj = function( n ){
        for(var i=0;i<n;i++){
            var tmpBullet;
            tmpBullet = bulletStore.quota();
            stage.addChild( tmpBullet.obj );
            tmpBullet.obj.beginFill("0xff000", 1);
            tmpBullet.obj.drawCircle(0,0,5);
            // tmpBullet.obj.globalCompositeOperation = 'destination-over';
            tmpBullet.obj.endFill();
    
            tmpBullet.obj.x=this.x;
            tmpBullet.obj.y=this.y;

            tmpBullet.speed = 5;
            tmpBullet.rad = 2*Math.PI*i/n;

            tmpBullet.dx = tmpBullet.speed * Math.cos(tmpBullet.rad);
            tmpBullet.dy = tmpBullet.speed * Math.sin(tmpBullet.rad);

        }
    }
};

var gunPoint = new Array(20);
for (let index = 0; index < gunPoint.length; index++) {
    gunPoint[index] = new GunPoint(x,y);
}

function isScreenOut( e ){
    return ! ( e.x < width && e.x > 0 && e.y < height && e.y > 0 ); 
}


var word = "0";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var textobj = new PIXI.Text(word, style);
stage.addChild(textobj);

animate();