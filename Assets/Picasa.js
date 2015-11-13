#pragma strict
        private var userID:String='tadokoro';
        private var alubumID:String='5560743918853662497';
function Start () {

}
function GetLoc(){
	// First, check if user has location service enabled
    if (!Input.location.isEnabledByUser)
        return;
    // Start service before querying location
    Input.location.Start ();
    // Wait until service initializes
    var maxWait : int = 120;
    while (Input.location.status
           == LocationServiceStatus.Initializing && maxWait > 0) {
        yield WaitForSeconds (1);
        maxWait--;
    }
    // Service didn't initialize in 20 seconds
    if (maxWait < 1) {
        print ("Timed out");
        return;
    }
    // Connection has failed
    if (Input.location.status == LocationServiceStatus.Failed) {
        print ("Unable to determine device location");
        return;
    }
    // Access granted and location value could be retrieved
    else {
        print ("Location: " + Input.location.lastData.latitude + " " +
               Input.location.lastData.longitude + " " +
               Input.location.lastData.altitude + " " +
               Input.location.lastData.horizontalAccuracy + " " +
               Input.location.lastData.timestamp);
        longitude = Input.location.lastData.longitude;
        latitude = Input.location.lastData.latitude;
        locDone = true;
    }
    // Stop service if there is no need to query location updates continuously
    Input.location.Stop ();
}

function GetStreetViewImage(latitude, longitude, heading, pitch) {
	// Boxオブジェクト
	//transform.parent.GetComponent(Get).longitude;
	
	var url:String = "http://maps.googleapis.com/maps/api/streetview?" + "size=" + width + "x" + height + "&location=" + latitude + "," + longitude + "&heading=" + heading + "&pitch=" + pitch + "&fov=90&sensor=false";
		
	var www:WWW = new WWW(url);
	yield www;
		
	GetComponent(Renderer).material.mainTexture = www.texture;
}

   public class Main extends Sprite {
        //ユーザIDとアルバムIDを指定

 
        public function Main() {
            //クロスドメインポリシーファイルの読み込み
            Security.loadPolicyFile("http://photos.googleapis.com/data/crossdomain.xml");
            init();
        }
        private function init():void {
            //Picasa APIのサービスを新規に生成
            var service : PicasaService = new PicasaService();
            //使用可能な画像サイズ一覧 (Pixel)
            //32, 48, 64, 72, 144, 160, 200, 288, 320, 400, 512, 576, 
            //640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600
 
            //最大の幅
            service.imgmax="912";
            //サムネイルのサイズ
            service.thumbsize="64";
            //最大読込枚数
            service.max_results=100;
            //ユーザIDとアルバムIDを指定して、情報を読み込み
            var responder:PicasaResponder=service.photos.list(userID,alubumID);
            //情報の読込みが完了した際に発生するイベントリスナーの登録
            responder.addEventListener(PicasaDataEvent.DATA, onCompleteHandler);
        }
 
        //情報を読込み
        private function onCompleteHandler(picsData:PicasaDataEvent):void {
            trace('写真データ :' + picsData.data );
            trace('エントリー :' + picsData.data.entries);
            trace('写真総数 :' + picsData.data.entries.length);
 
            //個別の写真のデータを取得する
            for (var i:int = 0; i < picsData.data.entries.length; i++) {
                trace('-------------------------------------------------------');
                trace('写真NO : ' + i);
                trace('写真ID : ' + picsData.data.entries[i].id);
                trace('メディア : ' + picsData.data.entries[i].media);
                trace('写真のURL : ' + picsData.data.entries[i].media.content.url);
                trace('サムネイルURL : ' + picsData.data.entries[i].media.thumbnails[0].url);
                trace('写真のURL : ' + picsData.data.entries[i].media.content.url);
                trace('写真の幅 : ' + picsData.data.entries[i].gphoto.width);
                trace('写真の高さ : ' + picsData.data.entries[i].gphoto.height);
            }
        }
    }
}

function Update () {

}