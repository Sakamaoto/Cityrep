#pragma strict
var width:int = 1920;//解像度横
var height:int = 1080;//解像度縦
var fps:int = 20;
	
	
function Start () {
	width = Screen.width;
	height = Screen.height;
	var webcamTexture: WebCamTexture = new WebCamTexture(width,height,fps);
	var renderer: Renderer = GetComponent.<Renderer>();
	renderer.material.mainTexture = webcamTexture;
	webcamTexture.Play();
}
