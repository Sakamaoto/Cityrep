#pragma strict
import System.IO; //FileInfo, StreamWriter, StreamReader
private var outputFilename:String = 'List.txt';//テキストファイル名
private	var r:double  = 6378.137; // 赤道半径[km]
private var photoNumber:int = 0; //写真の枚数
private var ci:int = 4; //Contents information


function Start () {
	// 新町　アスパム通り 原点
	var lat1:double = 40.826568 ;
	var lng1:double = 140.739838 ;
	// 菊屋デパート（現　さくら野）写真の位置
	var lat2:double = 40.826744 ;
	var lng2:double =  140.739128 ;
		Photolocation(lat1,lng1,lat2,lng2);
}

//写真の配置と生成
function Photolocation(lat1:double, lng1:double, lat2:double, lng2:double){
	readFile("");
	for (var i = 0; i < photoNumber; i++) {
		//planeを子として生成
		var plane:GameObject = GameObject.CreatePrimitive(PrimitiveType.Plane);
		plane.transform.position = new geoDistance(lat1,lng1,lat2,lng2);
		plane.transform.parent = this.transform;
		plane.name = "Photo"+i;
		plane.transform.localScale = new Vector3(0.5,0.5,0.5);
//		var texture:string = "ファイル名";
//		plane.GetComponent<Renderer>().material.mainTexture = "ダウンロードしてきたやつか、ファイル指定"
 	}
} 



// 読み込み関数
function readFile(inputStr:String){
	var fi:FileInfo = new FileInfo(Application.dataPath +'/'+"Text"+'/'+outputFilename);
	var sr:StreamReader = new StreamReader(fi.OpenRead());
	var data = new Array();
	while( ! sr.EndOfStream){
		data = sr.ReadLine();
		inputStr += sr.ReadLine();//一行
		photoNumber++;
	}
	Debug.Log("たぶんここ");
	for(var val in data){
		Debug.Log(value);
	}
	var elements = inputStr.Split(","[0]);
	for(var aString in elements){
	}
	sr.Close();
	Debug.Log(photoNumber);
	return inputStr;
}
function SetDefaultTxt():String{
	return '\n';
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
 	var theta:double = Mathf.Atan(A/B);
 	var x:double = distance*Mathf.Cos(theta);
 	var z:double = distance*Mathf.Sin(theta);
 	return Vector3(x, 0, z);
}
////
//// 測地線航海算法の公式
////
//function geoDisTance(lat1:double,lng1:double,lat2:double,lng2:double, precision) {
//  // 引数　precision は小数点以下の桁数（距離の精度）
//  var disTance:double = 0;
//	lat1 +=0.01;
////  if ((Mathf.Abs(lat1-lat2) < 0.00001) && (Mathf.Abs(lng1-lng2) < 0.00001)) {
//  if (((lat1-lat2) * (lat1-lat2) < 0.000000001) && ((lng1-lng2)*(lng1-lng2) < 0.000000001)) {
//    disTance = 0;
//   
//  } else {
//   Debug.Log("ここ");
//    lat1 = lat1 * Mathf.PI / 180;
//    lng1 = lng1 * Mathf.PI / 180;
//    lat2 = lat2 * Mathf.PI / 180;
//    lng2 = lng2 * Mathf.PI / 180;
//        Debug.Log(lat1);
//    Debug.Log(lng1);
//        Debug.Log(lat2);
//    Debug.Log(lng2);
// 
//    var A:double = 6378140;
//    var B:double = 6356755;
//    var F:double = (A - B) / A;
//    Debug.Log(F);
// 
//    var P1:double = Mathf.Atan((B / A) * Mathf.Tan(lat1));
//    var P2:double = Mathf.Atan((B / A) * Mathf.Tan(lat2));
//     Debug.Log(P1);
//    Debug.Log(P2);
//    Debug.Log("ここ");
//    Debug.Log(Mathf.Sin(P1) * Mathf.Sin(P2) + Mathf.Cos(P1) * Mathf.Cos(P2) * Mathf.Cos(lng1 - lng2));
//    var X:double = Mathf.Acos(Mathf.Sin(P1) * Mathf.Sin(P2) + Mathf.Cos(P1) * Mathf.Cos(P2) * Mathf.Cos(lng1 - lng2));
//    var L:double = (F / 8) * ((Mathf.Sin(X) - X) * Mathf.Pow((Mathf.Sin(P1) + Mathf.Sin(P2)), 2) / Mathf.Pow(Mathf.Cos(X / 2), 2) - (Mathf.Sin(X) - X) * Mathf.Pow(Mathf.Sin(P1) - Mathf.Sin(P2), 2) / Mathf.Pow(Mathf.Sin(X), 2));
// 	
//    disTance = A * (X + L);
//    Debug.Log(A);
//    Debug.Log(X);
//    Debug.Log(L);
//    
//    	Debug.Log(disTance); 
//    var decimal_no:double = Mathf.Pow(10, precision);
//    disTance = Mathf.Round(decimal_no * disTance / 1) / decimal_no;   // kmに変換するときは(1000で割る)
// 
//  }
//  return disTance;
//}

//function geoDirection(lat1, lng1, lat2, lng2) {
//  // 緯度経度 lat1, lng1 の点を出発として、緯度経度 lat2, lng2 への方位
//  // 北を０度で右回りの角度０～３６０度
//  var Y = Math.cos(lng2 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180 - lat1 * Math.PI / 180);
//  var X = Math.cos(lng1 * Math.PI / 180) * Math.sin(lng2 * Math.PI / 180) - Math.sin(lng1 * Math.PI / 180) * Math.cos(lng2 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180 - lat1 * Math.PI / 180);
//  var dirE0 = 180 * Math.atan2(Y, X) / Math.PI; // 東向きが０度の方向
//  if (dirE0 < 0) {
//    dirE0 = dirE0 + 360; //0～360 にする。
//  }
//  var dirN0 = (dirE0 + 90) % 360; //(dirE0+90)÷360の余りを出力 北向きが０度の方向
//  return dirN0;
//}

function Update () {

}