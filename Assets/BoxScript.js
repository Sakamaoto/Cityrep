#pragma strict
public var longitude:double;
public var latitude:double;
var locDone:boolean = false;
private var earth:double = 40000000;
public var mCamera:Camera; 

function Start () {
	if(Application.platform == RuntimePlatform.Android){
		StartCoroutine(GetLoc());
		mCamera = Camera.main;
//      GPSで貼り付け
		while(!locDone){
			yield WaitForSeconds (1.0);
		}
	}else if(Application.platform == RuntimePlatform.WindowsEditor){
		mCamera = Camera.main;
		longitude = 140.739838;
		latitude = 40.826568;
	}
}

function moveLoc() {
	longitude += 5*360/earth*Mathf.Sin(mCamera.transform.rotation.y)/Mathf.Cos(latitude*Mathf.PI/180);
	latitude += 5*360/earth*Mathf.Cos(mCamera.transform.rotation.y);
	//Debug.Log(Mathf.Sin(mCamera.transform.rotation.y));
	//Debug.Log(Mathf.Cos(latitude*Mathf.PI/180));
	//Debug.Log(Mathf.Cos(mCamera.transform.rotation.y));
	// Plane?のmoveスクリプトのupdatePlane()を呼び出す
	var ms: move = gameObject.transform.FindChild("Planefront").gameObject.GetComponent("move");
	ms.UpdatePlane();
	 ms = gameObject.transform.FindChild("Planetop").gameObject.GetComponent("move");
	ms.UpdatePlane();
	 ms = gameObject.transform.FindChild("Planeright").gameObject.GetComponent("move");
	ms.UpdatePlane();
	 ms = gameObject.transform.FindChild("Planeleft").gameObject.GetComponent("move");
	ms.UpdatePlane();
	 ms = gameObject.transform.FindChild("Planeback").gameObject.GetComponent("move");
	ms.UpdatePlane();
	 ms = gameObject.transform.FindChild("Planebottom").gameObject.GetComponent("move");
	ms.UpdatePlane();
	
//	gameObject.transform.FindChild("Planefront").gameObject.GetComponent("move").UpdatePlane();
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
//        Debug.Log("Location: " + Input.location.lastData.latitude + " " +
//               Input.location.lastData.longitude + " " +
//               Input.location.lastData.altitude + " " +
//               Input.location.lastData.horizontalAccuracy + " " +
//               Input.location.lastData.timestamp);
        longitude = Input.location.lastData.longitude;
        latitude = Input.location.lastData.latitude;
        locDone = true;
    }
    // Stop service if there is no need to query location updates continuously
    Input.location.Stop ();
}


function Update () {

}