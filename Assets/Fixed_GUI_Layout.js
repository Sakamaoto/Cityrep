#pragma strict


var x : float = 0.0f;                               // 表示位置（X座標）
var y : float = 0.0f;                               // 表示位置（Y座標）
var width : float = 1.0f;                           // 横幅
var height : float = 1.0f;                          // 縦幅

function Update()
{
    var texture : GUITexture;

    texture = GetComponent(GUITexture);
       texture.pixelInset.x = 2/ Screen.width;
       texture.pixelInset.y = 2/ Screen.height;
       texture.pixelInset.width = 0;
       texture.pixelInset.height = 0;

}