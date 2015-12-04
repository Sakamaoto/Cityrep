#pragma strict
var heading:double = 0.0;
var pitch:double = 0.0;

private var width:int = 640;
private var height:int = 640;


function Start(){
	var bs: BoxScript = this.transform.parent.GetComponent("BoxScript");
	bs.Start();
	UpdatePlane();
}

function UpdatePlane () {
	var bs: BoxScript = this.transform.parent.GetComponent("BoxScript");
//	Debug.Log(bs.latitude);
//	Debug.Log(bs.longitude);
	GetStreetViewImage(bs.latitude, bs.longitude, heading, pitch);
}

function GetStreetViewImage(latitude, longitude, heading, pitch) {
	// Boxオブジェクト
	//transform.parent.GetComponent(Get).longitude;
	
	var url:String = "http://maps.googleapis.com/maps/api/streetview?" + "size=" + width + "x" + height + "&location=" + latitude + "," + longitude + "&heading=" + heading + "&pitch=" + pitch + "&fov=90&sensor=false"+"&key=AIzaSyA66akeGMXD5BucA-tbk9b4p9uA1dGqG3E";
	Debug.Log("http://maps.googleapis.com/maps/api/streetview?" + "size=" + width + "x" + height + "&location=" + latitude + "," + longitude + "&heading=" + heading + "&pitch=" + pitch + "&fov=90&sensor=false");
	var www:WWW = new WWW(url);
	yield www;
		
	GetComponent(Renderer).material.mainTexture = www.texture;
}


