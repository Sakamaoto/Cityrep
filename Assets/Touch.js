#pragma strict
//var guiTexture.enabled = false;
private var decoy:GameObject;
var texture:GUITexture;

function Start(){
   texture.enabled = false;
   decoy = GameObject.Find("decoy");
   decoy.gameObject.SetActive(false);
}


function Update () {
    texture.pixelInset.x = Screen.width / 2;
    texture.pixelInset.y = Screen.height / 2;
	if(0 < Input.touchCount){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
			var hit0: RaycastHit;
			var ray0 = Camera.main.ScreenPointToRay(Input.mousePosition);
			//var fwd = transform.TransformDirection (Vector3.forward);
			if (Physics.Raycast (ray0, hit0)) {
				var obj0 = hit0.collider.gameObject;
				Debug.Log(obj0.name);
				if(obj0.tag == "Photo"){
					var st0:String = "Texture/"+obj0.name;
					var p_texture0:Texture2D = Resources.Load(st0);
					GetComponent(GUITexture).texture = p_texture0;
					texture.enabled = true;
					decoy.gameObject.SetActive(true);
				}
				else{
					texture.enabled = false;
					decoy.gameObject.SetActive(false);
				}
					//var rend:Renderer;
					//GetComponent(Renderer).material.mainTexture = Ligss
				//print ("There is something in front of the object!");
			}//タッチ/タップした
		}
	}
	//if(Input.GetTouch
	if(Input.GetMouseButtonDown(0)){
		//Debug.Log("Pressed left click.");
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		//var fwd = transform.TransformDirection (Vector3.forward);
		if (Physics.Raycast (ray, hit)) {
			var obj = hit.collider.gameObject;
			Debug.Log(obj.name);
			if(obj.tag == "Photo"){
				var st:String = "Texture0/"+obj.name;
				var p_texture:Texture2D = Resources.Load(st);
				GetComponent(GUITexture).texture = p_texture;
				texture.enabled = true;
				decoy.gameObject.SetActive(true);
			}
			else{
				texture.enabled = false;
				decoy.gameObject.SetActive(false);
			}
			//print ("There is something in front of the object!");
		}
	}
}