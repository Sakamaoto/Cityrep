#pragma strict
import System.IO; //FileInfo, StreamWriter, StreamReader
private var outputFilename:String = 'List.txt';//テキストファイル名
private	var r:double  = 6378.137; // 赤道半径[km]
private var photoNumber:int = 0; //写真の枚数
private var ci:int = 4; //Contents information


function Start () {
  
  Photolocation();
	// 新町　アスパム通り 原点
	var lat1:double = 40.826568 ;
	var lng1:double = 140.739838 ;

	// 菊屋デパート（現　さくら野）写真の位置
	var lat2:double = 40.826744 ;
	var lng2:double =  140.739128 ;
//　経度緯度で距離を求める
	var gd:double = geoDisTance(lat1,lng1,lat2,lng2,1);
	Debug.Log(gd);		
}

//写真の配置と生成
function Photolocation(){
	readFile("");
//	geoDisTance(lat1, lng1, lat2, lng2, 1) //lat1:原点 lng1:原点　lat2:写真の位置　lng2:写真の位置　１：精度？ 
	for (var i = 0; i < photoNumber; i++) {
		//planeを子として生成
		var plane:GameObject = GameObject.CreatePrimitive(PrimitiveType.Plane);
		plane.transform.position = new Vector3(3, 0, 3);
		plane.transform.parent = this.transform;
		plane.name = "Photo"+i;
		plane.transform.localScale = new Vector3(0.5,0.5,0.5);
//		var texture:string = "ファイル名";
//		plane.GetComponent<Renderer>().material.mainTexture = "ダウンロードしてきたやつか、ファイル指定"
 	}
} 



// 読み込み関数
function readFile(inputStr:String):String {
  var fi:FileInfo = new FileInfo(Application.dataPath +'/'+"Text"+'/'+outputFilename);
  var sr:StreamReader = new StreamReader(fi.OpenRead());
  while( ! sr.EndOfStream){
	for (var i = 0; i < ci; i++) {
	    inputStr += sr.ReadLine();//一行
	    inputStr += SetDefaultTxt();//開業
    }
    photoNumber++;
  }
  sr.Close();
  Debug.Log(photoNumber);
  return inputStr;
}
function SetDefaultTxt():String{
  return '\n\r';
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