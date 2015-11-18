#pragma strict
private var obj1:GameObject;
private var obj2:GameObject;
private var obj3:GameObject;
private var modeCamera:boolean;

modeCamera = true;
function Start () {
   obj1 = GameObject.Find("box");
   obj2 = GameObject.Find("Foto");
   obj3 = GameObject.Find("Quad");
   obj1.gameObject.SetActive(true);
}

function ButtonPush(){


	var bs: BoxScript = GameObject.Find("box").GetComponent("BoxScript");
	bs.moveLoc();
	
//	if(modeCamera){
//		Debug.Log("Button Push !!");
//		obj1.gameObject.SetActive(true);
//		obj3.gameObject.SetActive(false);
//		modeCamera = false;
//	}else{
//		obj1.gameObject.SetActive(false);
//		obj3.gameObject.SetActive(true);
//		modeCamera = true;
//	}
}