#pragma strict
		var r:double  = 6378.137; // 赤道半径[km]




function Start () {
			// 新町　アスパム通り
		var lat1:double = 40.826568 * Mathf.PI / 180;
		var lng1:double = 140.739838 * Mathf.PI / 180;

		// 菊屋デパート（現　さくら野）
		var lat2:double = 40.826744 * Mathf.PI / 180;
		var lng2:double =  140.739128 * Mathf.PI / 180;

		// 2点間の距離[km]
		var distance:double = r * Mathf.Acos(Mathf.Sin(lat1) * Mathf.Sin(lat2) + Mathf.Cos(lat1) * Mathf.Cos(lat2) * Mathf.Cos(lng2 - lng1));
		Debug.Log("position:"+distance+"m");
		Debug.Log("position:"+r+"km");
		Debug.Log("position:"+lat1+"km");
		Debug.Log("position:"+lng1+"km");
		Debug.Log("position:"+lat2+"km");
		Debug.Log("position:"+lng2+"km");
		Debug.Log("position:"+Mathf.Acos(Mathf.Sin(lat1) * Mathf.Sin(lat2) + Mathf.Cos(lat1) * Mathf.Cos(lat2) * Mathf.Cos(lng2 - lng1))+"°");
		Debug.Log("position:"+Mathf.Sin(lat1)+"m");
		Debug.Log("position:"+Mathf.Sin(lat2)+"m");
		Debug.Log("position:"+Mathf.Sin(lat1) * Mathf.Sin(lat2)+"m");
		Debug.Log("position:"+Mathf.Cos(lat1)+"m");
		Debug.Log("position:"+Mathf.Cos(lat2)+"m");
		Debug.Log("position:"+Mathf.Cos(lat1) * Mathf.Cos(lat2)+"m");
		Debug.Log("position:"+Mathf.Cos(lng2 - lng1)+"m");
		
}

function Update () {

}