#pragma strict
import System.IO; //FileInfo, StreamWriter, StreamReader
private var outputFilename:String = 'List.txt';//テキストファイル名
private	var r:double  = 6378.137; // 赤道半径[km]
private var photoNumber:int = 0; //写真の枚数
private var ci:int = 5; //Contents information
public var obj:GameObject;
//写真情報
public var na:String;
public var la:double;
public var ln:double;
public var p_r:double;
public var tx:String;
 
function Awake(){
	var box:GameObject = GameObject.Find("box");
	var bs:BoxScript = box.GetComponent("BoxScript");
	bs.Start();
	readFile(bs.latitude, bs.longitude);
}


function Start () {


}

// 読み込み関数
function readFile(lat:double,lng:double){
	var fi:FileInfo = new FileInfo(Application.dataPath +'/'+"Text"+'/'+outputFilename);
	var sr:StreamReader = new StreamReader(fi.OpenRead());
	var lines = new Array();
	var photodata = new Array();
	sr.ReadLine();
	while( ! sr.EndOfStream){
		lines.Push(sr.ReadLine());
		photoNumber++;
	}
	//確認
	Debug.Log("たぶんここ");
	//lines[行].ToString().Split(","[0])[文]);
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
	sr.Close();
	return photodata;
}
function SetDefaultTxt():String{
	return '\n';
}

//写真の配置と生成
function Photolocation(name:String, lat1:double, lng1:double, photo_r:double, lat0:double, lng0:double, text:String){
	//planeを子として生成
	var plane:GameObject = GameObject.CreatePrimitive(PrimitiveType.Plane);
	//obj = GameObject.Find("Plane");
	//var plane:GameObject = Instantiate (obj, geoDistance(lat0,lng0,lat1,lng1), Quaternion.identity);
	plane.transform.position = new geoDistance(lat0,lng0,lat1,lng1);
	plane.transform.parent = this.transform;
	plane.name = name;
	plane.tag = "Photo";
	plane.transform.localScale = new Vector3(0.8,0.8,0.8);
	var st:String = "Texture/"+name;
	var texture:Texture2D = Resources.Load(st);
	plane.AddComponent(CameraBillboard);
	plane.AddComponent(GUIText);
	plane.GetComponent(GUIText).text = text;
	plane.GetComponent(Renderer).material.mainTexture = texture;
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
 	return Vector3(x, 0, z);
}


function Update () {

}