
#pragma strict

var heading:double = 0.0;
var pitch:double = 0.0;

private var width:int = 640;
private var height:int = 480;
private var longitude:double;
private var latitude:double;

var locDone:boolean = false;

function Start () {
	if(Application.platform == RuntimePlatform.Android){
		StartCoroutine(GetLoc());
	var box: GameObject = tranform.parent.gameObject;
	while(!box.GetComponent(GetLocation).locDone){
		yield WaitForSeconds (1.0);
	}
	StartCoroutine(GetStreetViewImage(box.GetComponent(GetLocation).latitude, box.GetComponent(GetLocation).longitude, heading, pitch));
//      GPSで貼り付け
		while(!locDone){
			yield WaitForSeconds (1.0);
		}
		StartCoroutine(GetStreetViewImage(latitude, longitude, heading, pitch));
	}else if(Application.platform == RuntimePlatform.WindowsEditor){
		longitude = 140.739838;
		latitude = 40.826568;
		StartCoroutine(GetStreetViewImage(latitude, longitude, heading, pitch));
	}
}
function GetLoc(){
	// First, check if user has location service enabled
    if (!Input.location.isEnabledByUser)
        return;
    // Start service before querying location
    Input.location.Start ();
    // Wait until service initializes
    var maxWait : int = 120;
    while (Input.location.status
           == LocationServiceStatus.Initializing && maxWait > 0) {
        yield WaitForSeconds (1);
        maxWait--;
    }
    // Service didn't initialize in 20 seconds
    if (maxWait < 1) {
        print ("Timed out");
        return;
    }
    // Connection has failed
    if (Input.location.status == LocationServiceStatus.Failed) {
        print ("Unable to determine device location");
        return;
    }
    // Access granted and location value could be retrieved
    else {
        print ("Location: " + Input.location.lastData.latitude + " " +
               Input.location.lastData.longitude + " " +
               Input.location.lastData.altitude + " " +
               Input.location.lastData.horizontalAccuracy + " " +
               Input.location.lastData.timestamp);
        longitude = Input.location.lastData.longitude;
        latitude = Input.location.lastData.latitude;
        locDone = true;
    }
    // Stop service if there is no need to query location updates continuously
    Input.location.Stop ();
}

function GetStreetViewImage(latitude, longitude, heading, pitch) {
	// Boxオブジェクト
	//transform.parent.GetComponent(Get).longitude;
	
	var url:String = "http://maps.googleapis.com/maps/api/streetview?" + "size=" + width + "x" + height + "&location=" + latitude + "," + longitude + "&heading=" + heading + "&pitch=" + pitch + "&fov=90&sensor=false";
		
	var www:WWW = new WWW(url);
	yield www;
		
	GetComponent(Renderer).material.mainTexture = www.texture;
}
