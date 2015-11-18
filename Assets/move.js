#pragma strict
#pragma strict

var heading:double = 0.0;
var pitch:double = 0.0;
var move:MonoScript;

private var width:int = 640;
private var height:int = 480;

var locDone:boolean = false;

function Start(){
//	if(Application.platform == RuntimePlatform.Android){
//		StartCoroutine(GetLoc());

//      GPSで貼り付け
//		while(!locDone){
//			yield WaitForSeconds (1.0);
//		}
//	}else if(Application.platform == RuntimePlatform.WindowsEditor){
//		longitude = 140.739838;
//		latitude = 40.826568;
//	}
	UpdatePlane();
}

function UpdatePlane () {
	var bs: BoxScript = this.transform.parent.GetComponent("BoxScript");
	StartCoroutine(GetStreetViewImage(bs.latitude, bs.longitude, heading, pitch));
}

function GetStreetViewImage(latitude, longitude, heading, pitch) {
	// Boxオブジェクト
	//transform.parent.GetComponent(Get).longitude;
	
	var url:String = "http://maps.googleapis.com/maps/api/streetview?" + "size=" + width + "x" + height + "&location=" + latitude + "," + longitude + "&heading=" + heading + "&pitch=" + pitch + "&fov=90&sensor=false";
		
	var www:WWW = new WWW(url);
	yield www;
		
	GetComponent(Renderer).material.mainTexture = www.texture;
}


