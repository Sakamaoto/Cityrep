//#pragma strict
//
////var resultNum: int = 0;
//	public var layout:TextAsset;
//	public var objs:GameObject[];
//    
//function Start (){
//	this.readMap();
//}
//
//	private var guitxt:String = "";
//	
//	// Update is called once per frame
//	void Update () {
//		// スペースキーを押したらファイル読み込みする
//
//		}   
//
//	// 読み込んだ情報をGUIとして表示
//	void OnGUI()
//	{
//		GUI.TextArea (new Rect (5, 5, Screen.width, 50), guitxt);
//	}
//	
//	// 読み込み関数
//	void ReadFile(){
//		// FileReadTest.txtファイルを読み込む
//		var FileInfo fi = new FileInfo(Application.dataPath + "/" + "FileReadTest.txt");
//		try {
//			// 一行毎読み込み
//			using (StreamReader sr = new StreamReader(fi.OpenRead(), Encoding.UTF8)){
//				guitxt = sr.ReadToEnd();
//			}
//		} catch (Exception e){
//			// 改行コード
//			guitxt += SetDefaultText();
//		}
//	}
//	
//	// 改行コード処理
//	string SetDefaultText(){
//		return "C#あ\n";
//	}
//    
//        
//function getObj(objType){
//    switch (intelligence){
//    case "A":resultNum = 0;
//		break;
//    case "B":resultNum = 1;
//		break;
//    case "C":resultNum = 2;
//		break;
//    case "D":resultNum = 3;
//		break;
//    default:resultNum = 0;
//		break;
//    }
//}
//
//function createObj(obj,pos){
//	var go:GameObject = Instantiate(obj,new Vector3 (pos.x, pos.y, 0),obj.transform.rotation) as GameObject;
//}
//
//function readMap(){
//	var kugiri:char[]  = {'\r', '\n'};
//	string[] layoutInfo = _layout.text.Split(kugiri);
//	
//	string[] eachInfo;
//	for (int i = 0; i < layoutInfo.Length; i++) {
//		eachInfo = layoutInfo[i].Split(","[0]);
//		int objNumber = getObj(eachInfo[0]);
//		GameObject obj = _objs[objNumber];
//		Vector2 pos = new Vector2(int.Parse (eachInfo[1]),int.Parse(eachInfo[2]));
//		this.createObj(obj, pos);
//	}
//}
//
//
//
//function Update () {
//		if (Input.GetKeyDown (KeyCode.Space)) {
//			ReadFile ();
//}