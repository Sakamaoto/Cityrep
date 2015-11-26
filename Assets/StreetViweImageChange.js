#pragma strict
private var Box:GameObject;
private var Photo:GameObject;
private var BackgroundCamera:GameObject;
private var modeCamera:boolean;

modeCamera = true;
function Start () {
   Box = GameObject.Find("box");
   Photo = GameObject.Find("Photo");
   BackgroundCamera = GameObject.Find("BackgroundCamera");
}

function ButtonPush(){
	var bs: BoxScript = GameObject.Find("box").GetComponent("BoxScript");
	bs.moveLoc();
}