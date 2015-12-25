#pragma strict
private var Box:GameObject;
private var Photo:GameObject;
private var Button:GameObject;
private var BackgroundCamera:GameObject;
private var modeCamera:boolean;

modeCamera = true;
function Start () {
   Box = GameObject.Find("box");
   Photo = GameObject.Find("Photo");
   Button = GameObject.Find("Move");
   Button.SetActive(false);
   Box.gameObject.SetActive(false);
   BackgroundCamera = GameObject.Find("BackgroundCamera");
}

function ButtonPush(){
	if(modeCamera){
		Debug.Log("Button Push !!");
		Box.gameObject.SetActive(true);
		Button.gameObject.SetActive(true);
		BackgroundCamera.gameObject.SetActive(false);
		modeCamera = false;
	}else{
		Box.gameObject.SetActive(false);
		Button.SetActive(false);
		BackgroundCamera.gameObject.SetActive(true);
		modeCamera = true;
	}
}

