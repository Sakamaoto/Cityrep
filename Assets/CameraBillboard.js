#pragma strict

// ゲームオブジェクトをビルボード化させる対象のカメラ
public var m_Camera:Camera;
// true の場合ゲームオブジェクトはクリッピング平面のカメラの前に配置されます。
public var PositionInFrontOfCamera:boolean;
// PositionInFrontOfCamera が true の場合のオブジェクトのオフセット幅
public var Offset:float = 0.001f;

function Awake(){
	// カメラが指定されてない場合はメインカメラを使用
	if (m_Camera == null)
		m_Camera = Camera.main;
}
function Start () {

}

function PhotoMove(){
}

function Update () {
		// カメラの forward ベクトルを取得して正規化
		var vec = m_Camera.transform.forward;
		vec.Normalize();
		// ゲームオブジェクトのポジションをカメラのクリッピング平面のすぐ内側にセットしてカメラビューをブロックするようにする
		if (this.PositionInFrontOfCamera) this.transform.position = m_Camera.transform.position + (vec * (m_Camera.nearClipPlane + this.Offset));
		// ゲームオブジェクトの向きがカメラの方へ向くようにする
		//this.transform.LookAt(this.transform.position +  m_Camera.transform.rotation * Quaternion.Euler(-90,0,0) * Vector3.back, m_Camera.transform.rotation * Vector3.up);
		this.transform.LookAt(m_Camera.transform.position,Vector3.up);
		this.transform.Rotate (new Vector3 (90, 0, 0));
}