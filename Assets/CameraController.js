#pragma strict

function Awake () {
	Screen.sleepTimeout = SleepTimeout.NeverSleep;
}

function Start () {
		Input.gyro.enabled = true;
}

function Update () {
	if(Application.platform == RuntimePlatform.Android){
		var gyro:Quaternion = Input.gyro.attitude;
		transform.localRotation = Quaternion.Euler( 90, 0, 0) * (new Quaternion(-gyro.x, -gyro.y, gyro.z, gyro.w));
		
	}
	else if(Application.platform == RuntimePlatform.WindowsEditor){
		if(Input.GetKey(KeyCode.UpArrow)){
			transform.Rotate(Vector3.right, -1);
		}
		if(Input.GetKey(KeyCode.DownArrow)){
			transform.Rotate(Vector3.right, 1);
		}
		if(Input.GetKey(KeyCode.RightArrow)){
			transform.Rotate(Vector3.up, 1, Space.World);
		}
		if(Input.GetKey(KeyCode.LeftArrow)){
			transform.Rotate(Vector3.up, -1, Space.World);
		}
		if(Input.GetKey(KeyCode.Space)){
			transform.rotation = Quaternion.Euler(0, 0, 0);
		}
	}
//	Debug.Log(transform.rotation.y);
}