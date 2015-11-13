private var obj1:GameObject;
private var obj2:GameObject;

function Start ()
{
    obj1 = GameObject.Find("box");
    obj2 = GameObject.Find("");
 
    obj1.gameObject.SetActive(false);
    obj2.gameObject.SetActive(false);
}
function Update () {
 if (Input.GetButtonDown ("Fire1")){
     obj1.gameObject.SetActive(true);
    obj2.gameObject.SetActive(true);
 
}}