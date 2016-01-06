#pragma strict
import System.IO; //FileInfo, StreamWriter, StreamReader
private var inputFilename:String = 'List0.txt';//テキストファイル名
private	var r:double  = 6378.137; // 赤道半径[km]
private var photoNumber:int = 0; //写真の枚数
private var ci:int = 5; //Contents information
public var obj:GameObject;
//GetLoc()
public var longitude:double;
public var latitude:double;
public var latitude0:double;
public var longitude0:double;
var locDone:boolean = false;

//写真情報
public var na:String;
public var la:double;
public var ln:double;
public var p_r:double;
public var tx:String;
 
//function Awake(){
//	print("Start");
//	var box:GameObject = GameObject.Find("box");
//	print("DDD");
//	var bs:BoxScript = box.GetComponent("BoxScript");
//	print("EEE");
//	bs.Start();
//	print("FFF");
//	print(bs.latitude);
//	print(bs.longitude);
//	readFile(bs.latitude, bs.longitude);
//}

function Start () {
	if(Application.platform == RuntimePlatform.Android){
		//Updatelocation()で位置を取得
		StartCoroutine(Updatelocation());
		GetLoc();
		readFile(latitude,longitude);
//		latitude = 40.826568;
//		longitude = 140.739838;
//		readFile(latitude,longitude);
	}else if(Application.platform == RuntimePlatform.WindowsEditor){
		//BoxScriptから位置を取得
		var box:GameObject = GameObject.Find("box");
		var bs:BoxScript = box.GetComponent("BoxScript");
		bs.Start();
		print(bs.latitude);
		print(bs.longitude);
		readFile(bs.latitude, bs.longitude);
	}
}

// 読み込み関数
function readFile(lat:double,lng:double){
	if(Application.platform == RuntimePlatform.Android){
		var path:String = "jar:file://" + Application.dataPath + "!/assets" + "/" + inputFilename;
		var www:WWW = new WWW(path);
		yield www;
		var txt:String = www.text;
//		var lines0 = new Array();
		var photodata0 = new Array();
		var th:String[] = txt.ToString().Split("\n"[0]);
		photoNumber = th.length;
		for(var i0 = 1;i0 < photoNumber;i0++){
			for(var j0 = 0;j0 < ci;j0++){
				photodata0[j0] = th[i0].ToString().Split(","[0])[j0]; 
			}
			na = photodata0[0];
			la = double.Parse(photodata0[1]);
			ln = double.Parse(photodata0[2]);
			p_r = double.Parse(photodata0[3]);
			tx = photodata0[4];
			Photolocation(na,la,ln,p_r,lat,lng,tx);
		}
		
	}else if(Application.platform == RuntimePlatform.WindowsEditor){
		var fi:FileInfo;
		fi = new FileInfo(Application.dataPath + "/StreamingAssets/"+ inputFilename);
			var sr:StreamReader = new StreamReader(fi.OpenRead());
		var lines = new Array();
		var photodata = new Array();
		var p:String = sr.ReadLine();
		while( ! sr.EndOfStream){
			lines.Push(sr.ReadLine());
			photoNumber++;
		}
		for(var i = 0;i < photoNumber;i++){
			for(var j = 0;j < ci;j++){
				photodata[j] = lines[i].ToString().Split(","[0])[j]; 	
			}
			na = photodata[0];
			la = double.Parse(photodata[1]);
			ln = double.Parse(photodata[2]);
			p_r = double.Parse(photodata[3]);
			tx = photodata[4];
			Photolocation(na,la,ln,p_r,lat,lng,tx);
		}
	}
	longitude0 = lat;
    latitude0 = lng;

	//lines[行].ToString().Split(","[0])[文]);
//	for(var i = 0;i < photoNumber;i++){
//		for(var j = 0;j < ci;j++){
//			photodata[j] = lines[i].ToString().Split(","[0])[j]; 	
//		}
//		na = photodata[0];
//		la = double.Parse(photodata[1]);
//		ln = double.Parse(photodata[2]);
//		p_r = double.Parse(photodata[3]);
//		tx = photodata[4];
//		Photolocation(na,la,ln,p_r,lat,lng,tx);
//	}
	sr.Close();
}
function SetDefaultTxt():String{
	return '\n';
}

//写真の配置と生成
function Photolocation(name:String, lat1:double, lng1:double, photo_r:double, lat0:double, lng0:double, text:String){
	
	//planeを子として生成
	var plane:GameObject = GameObject.CreatePrimitive(PrimitiveType.Plane);
//	yield plane;
	//obj = GameObject.Find("Plane");
	//var plane:GameObject = Instantiate (obj, geoDistance(lat0,lng0,lat1,lng1), Quaternion.identity);
	plane.transform.position = new geoDistance(lat0,lng0,lat1,lng1);
	plane.transform.parent = this.transform;
	plane.name = name;
	plane.tag = "Photo";
	plane.transform.localScale = new Vector3(3,3,3);
	plane.AddComponent(CameraBillboard);
	plane.AddComponent(GUIText);
	if(Application.platform == RuntimePlatform.Android){
//		print(name);
//		var path:String = "jar:file://" + Application.dataPath + "!/assets/" + name+".jpg";
//		var www:WWW = new WWW(path);
//		yield www;
//		print("AAA");
//		plane.GetComponent(Renderer).material.mainTexture = www.texture;
//		print("BBB");
		var st0:String = "Texture1/"+name;
		var p_texture0:Texture2D = Resources.Load(st0);
		plane.GetComponent(Renderer).material.mainTexture = p_texture0;
	}else if(Application.platform == RuntimePlatform.WindowsEditor){
		var st:String = "Texture1/"+name;
		var texture:Texture2D = Resources.Load(st);
		plane.GetComponent(Renderer).material.mainTexture = texture;
	}
	plane.GetComponent(GUIText).text = text;

} 

//
// 球面三角法による緯度・経度から距離の算出
//
function geoDistance(lat1:double, lng1:double, lat2:double, lng2:double) {
	var distance:double;
	//緯度・経度から距離の計算
	if (((lat1 - lat2) * (lat1 - lat2) < 0.000000001) && ((lng1 - lng2) * (lng1 - lng2) < 0.000000001)) {
   		distance = 0;
 	}
	else {
   		lat1 = lat1 * Mathf.PI / 180;
   		lng1 = lng1 * Mathf.PI / 180;
   		lat2 = lat2 * Mathf.PI / 180;
   		lng2 = lng2 * Mathf.PI / 180;

 	  	var delta_sigma:double = lat1 - lat2;
   		var delta_lambda:double = lng1 - lng2;
   		var right_1st:double = Mathf.Sin(delta_sigma / 2) * Mathf.Sin(delta_sigma / 2);
   		var right_2nd:double = Mathf.Cos(lat1) * Mathf.Cos(lat2) * Mathf.Sin(delta_lambda / 2) * Mathf.Sin(delta_lambda / 2);
   		var left:double = right_1st + right_2nd;
   		distance = Mathf.Asin(Mathf.Sqrt(left)) * 2 * 6370000;
 	}
 	//写真のPositionの計算
 	var A:double = lat2-lat1;
 	var B:double = (lng2-lng1)*Mathf.Cos((lat1+lat2)/2*Mathf.PI/180);
 	var theta:double = Mathf.Atan(B/A);
 	var x:double = distance*Mathf.Sin(theta);
 	var z:double = distance*Mathf.Cos(theta);
 	print(x);
 	print(z);
 	return Vector3(x, 0, z);
 	
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

function Updatelocation(){
	var Photo:GameObject = GameObject.Find("Photo");
	while(true){
		yield WaitForSeconds (60);
		GetLoc();
		while(!locDone){
			yield WaitForSeconds (1.0);
		}
		Photo.transform.position -= geoDistance(latitude0,longitude0,latitude, longitude);
		latitude0 = latitude;
		longitude0 = longitude;
	}
}

function Update () {
	
}