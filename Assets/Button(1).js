private var obj1:GameObject;
private var obj2:GameObject;
private var move:boolean;

function Start ()
{
    obj1 = GameObject.Find("box(1)");
    obj2 = GameObject.Find("box");
}

function ButtonPush(){
	if(move){
		Debug.Log("Move Push !!");
		obj1.gameObject.SetActive(false);
		obj2.gameObject.SetActive(true);
		move = false;
	}else{
		obj1.gameObject.SetActive(true);
		obj2.gameObject.SetActive(false);
		move = true;
	}
}