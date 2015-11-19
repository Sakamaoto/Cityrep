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
   Box.gameObject.SetActive(false);
}

function ButtonPush(){


//	var bs: BoxScript = GameObject.Find("box").GetComponent("BoxScript");
//	bs.moveLoc();
	
	if(modeCamera){
		Debug.Log("Button Push !!");
		Box.gameObject.SetActive(true);
		BackgroundCamera.gameObject.SetActive(false);
		modeCamera = false;
	}else{
		Box.gameObject.SetActive(false);
		BackgroundCamera.gameObject.SetActive(true);
		modeCamera = true;
	}
}

