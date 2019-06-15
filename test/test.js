/*jshint esversion: 6 */
var width = window.innerWidth;
var height = window.innerHeight;
var x = width/2;
var y = height/2;
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
    time++;
    if(time==3){
        addobj(obj_shot*o,obj_shot*(o+1),5,"0xff000",x,y,circle);
        for(var a=obj_shot*o;a<obj_shot*(o+1);a++){
            for(var b=0;b<circle[a].length;b++){
                stage.addChild(circle[a][b]);
            }
        }
        o++;
        time=0;
    }

    var l = 0;
    var count=0;
    for(var t=0;t<circle.length/obj_shot;t++){
        count=0;
        for(var i=0;i<360;i+=(360/obj_shot)){
            if(circle[l][0]!=""){
                var sx = circle[l][0].x;
                var sy = circle[l][0].y;
                xmove = sx+Math.cos(i*(Math.PI/180))*(5);
                ymove = sy+Math.sin(i*(Math.PI/180))*(5);
                objset(l,xmove,ymove,circle);
                if(circle[l][0].x>x*2 || circle[l][0].x<0 || circle[l][0].y>y*2 || circle[l][0].y<0){
                    circle[l][0].clear();
                    circle[l][0]="";
                    count++;
                }
            }else{count++;}
            l++;
        }
        if(count==obj_shot){
            circle.splice(0, obj_shot);
            o--;
            textobj.text--;
        }
    }
    renderer.render(stage);
}

var circle=[];
var obj_shot=60;
var o=0;
function addobj(mas,num,rad,color,x,y,obj){
    for(var i=mas;i<num+mas;i++){
        obj[i] = [];
        obj[i][0] = new PIXI.Graphics();
        obj[i][0].beginFill(color, 1);
        obj[i][0].drawCircle(0,0,rad);
        obj[i][0].globalCompositeOperation = 'destination-over';
        obj[i][0].endFill();

        obj[i][0].x=x;
        obj[i][0].y=y;
    }
    textobj.text++;
}

function objset(num,x,y,obj){
    obj[num][0].x=x;
    obj[num][0].y=y;
}

var word = "0";
var style = {fontFamily : 'Arial',fontSize : '40px', fill:'white', fontWeight : "bold"};
var textobj = new PIXI.Text(word, style);
stage.addChild(textobj);
animate();