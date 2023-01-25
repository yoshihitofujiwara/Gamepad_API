
import EventEmitter from 'eventemitter3';

/*
MEMO:
https://modernroboticsinc.com/fusion_docs/Py_usbGamepad/

*/
/*
NOTE:
- Gamepadごとに、割り当てられる入力が違う
- Gamepadデバイス判定は作ったほうがよさそう
- マウスカーソル制御できない(DOM操作できない)
 */

export class Gamepad extends EventEmitter{
	constructor(){
		super();

		this.gamepadData = {};
		this.fps = 120; // max252?
		this._uId = null;
	}

	/**
	 * setup
	 */
	setup(){
		window.addEventListener("gamepadconnected", (e) => {
			this.add(e.gamepad);
			
			if(this.isConnected() && !this._isUpdate){
				this._isUpdate = true;
				this._update();
			}
			this.emit("connected", e);
		});
		
		window.addEventListener("gamepaddisconnected", (e) => {
			this.remove(e.gamepad);

			if(!this.isConnected()){
				this._isUpdate = false;
			}
			this.emit("disconnected", e);
		});
	}

	/**
	 * add
	 * @param {*} gamepad 
	 */
	add(gamepad){
		if(!this.gamepadData[gamepad.id]){
			this.scan();
		}
	}

	/**
	 * remove
	 * @param {*} gamepad 
	 */
	remove(gamepad){
		if(this.gamepadData[gamepad.id]){
			delete this.gamepadData[gamepad.id];
		}
	}

	/**
	 * connectedLength
	 * @returns 
	 */
	connectedLength(){
		return Object.keys(this.gamepadData).filter((key) => this.gamepadData[key].connected).length;
	}

	/**
	 * isConnected
	 * @returns 
	 */
	isConnected(){
		return 0 < this.connectedLength();
	}

	/**
	 * scan
	 */
	scan(){
		const gamepads = navigator.getGamepads();
	
		gamepads.forEach(gp => {
			if(gp && gp.id){
				this.gamepadData[gp.id] = gp;
			}
		});
	}

	
	_update(){
		if(!this._isUpdate) return;
		clearTimeout(this._uId);
		this.scan();
		// this.emit("update", this.gamepadData);
		
		Object.keys(this.gamepadData).forEach((id) => {
			this.emit("update:" + id , this.gamepadData[id]);
		});
		this._uId = setTimeout(this._update.bind(this), 1000/this.fps);
	}
}
