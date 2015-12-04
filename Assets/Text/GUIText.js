#pragma strict

//i初期の画面サイズを設定　Phone5sで設定
var fixWidth  : float = 640.0;		//横幅
var fixHeight  : float = 1136.0;	//縦幅
//縦横補正用 倍率で指定 1.2倍等
var corTall : float = 1.0;
var corWide : float = 1.0;
 
var fixFontSize : int ;	//フォントサイズ
var pixX : float;	//pixeloffset取得
var pixY : float;	//pixeloffset取得
 
 
 
function Start () {
	//初期で設定したフォントサイズを取得	
	fixFontSize = GetComponent.<UnityEngine.GUIText>().fontSize;
	pixX = GetComponent.<UnityEngine.GUIText>().pixelOffset.x;
	pixY = GetComponent.<UnityEngine.GUIText>().pixelOffset.y;
}
 
function Update () {
	//フォントサイズ変更用関数呼び出し
	fontResize ();
}
 
function fontResize (){
	//現在のscreen Size取得
	var scWidth : float = Screen.width;
	var scHeight : float= Screen.height;
	var winAspect : float = scWidth / scHeight;
	
	//初期の画面サイズと現在の画面サイズの比率を計算 	
	var wdRatio : float = 100.0 / (fixWidth / scWidth);
	var heRatio : float = 100.0 / (fixHeight / scHeight);
 
	//縦横時の判別
	var ratio : float;//倍率
	if(scWidth < scHeight){
		//tallの場合は横で比率を合わせる
		ratio = wdRatio * corTall;
	}else{
		//wideの場合は縦で比率を合わせる
		ratio = heRatio * corWide;
	}
	
	//リサイズするフォントサイズ
	var reFontSize : int = fixFontSize *  (ratio / 100);
	//リサイズフォント位置
	var rePixOffsetX : int = pixX *  (ratio / 100);
	var rePixOffsetY : int = pixY *  (ratio / 100);
	
	//フォントサイズ変更
	GetComponent.<UnityEngine.GUIText>().fontSize = reFontSize;
	GetComponent.<UnityEngine.GUIText>().pixelOffset.x = rePixOffsetX;
	GetComponent.<UnityEngine.GUIText>().pixelOffset.y = rePixOffsetY;
}