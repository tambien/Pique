webpackJsonp([3],{

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(51), __webpack_require__(50), __webpack_require__(1), __webpack_require__(19), __webpack_require__(26), __webpack_require__(104)], __WEBPACK_AMD_DEFINE_RESULT__ = function (MediaElement, Context, $, Mediator, TWEEN, PIXIFilters) {

	// var texture = PIXI.Texture.fromVideo(MediaElement.video);
	var texture = new PIXI.VideoBaseTexture.fromUrl("./assets/video.mp4");

	var dropShadow = new PIXIFilters.DropShadowFilter();

	var pixelate = new PIXIFilters.PixelateFilter();

	window.pixelate = pixelate;
	/*pixelate.size.x = MediaElement.height / 40;
	pixelate.size.y = MediaElement.height / 40;*/


	var Box = function(index){

		this.index = index;

		this.width = 0;

		this.height = 1/3;

		/**
		 *  which video it's playing
		 *  @type  {Number}
		 */
		this.position = 0;

		/**
		 *  the overall container
		 */
		this.container = new PIXI.Container();

		this.container.filters = [dropShadow];


		this.video = new PIXI.Sprite(texture);
		this.container.addChild(this.video);

		this.text = new PIXI.Text("CLICK HERE", {
			font : "50px sans-serif", 
			fill : 0xffffff, 
			align : "center",
			dropShadow : true,
			dropShadowColor: 0x00ff00
		});
		this.text.alpha = 0;
		this.container.addChild(this.text);		

		this.mask = new PIXI.Graphics();
		this.container.addChild(this.mask);
		
		// this.video.texture.crop.width = MediaElement.width;

		this.container.mask = this.mask;

		Context.addChild(this.container);

		//make it interactive
		this.mask.interactive = true;
		this.mask.mousedown = this.mousedown.bind(this);
		this.mask.touchstart = this.mousedown.bind(this);
		this.mask.mouseup = this.mouseup.bind(this);
		this.mask.touchend = this.mouseup.bind(this);
		this.mask.mouseover = this.hover.bind(this);
		this.mask.mouseout = this.out.bind(this);

		this.size();
		this.draw();

		Mediator.on("first", this.first.bind(this));
		Mediator.on("resize", this.resize.bind(this));
	};

	var controlHeight = 70;

	/**
	 *  size and position the box
	 */
	Box.prototype.size = function(){
		var width = 0.9;
		if (Context.width < 500){
			width = 0.95;
		}
		this.container.width = Context.width * width;
		var ratio = MediaElement.width / MediaElement.height;
		var height = this.container.width * (1 / ratio);
		var scale = (Context.width * width) / MediaElement.width;
		if (Context.width / (Context.height - controlHeight) > ratio){
			width *= ratio / (Context.width / (Context.height - controlHeight));
			this.container.width = Context.width * width;
			height = this.container.width * (1 / ratio);
		}
		this.container.position.x = Context.width * ((1 - width) / 2);
		this.container.scale.x = this.container.scale.y= this.container.width / MediaElement.width;
		var top = ((Context.height - controlHeight) / 2) - height / 2 + this.index * 5;
		this.container.position.y = Math.max(top, 10);
	};

	Box.prototype.resize = function(){
		this.size();
		this.draw();
	};

	/**
	 *  height is normalized between 0-1
	 */
	Box.prototype.draw = function(){
		this.mask.clear();
		this.mask.beginFill(0x000000, 1);
		var top = 0;
		var left = 0;
		if (this.index === 1){
			top = (MediaElement.height - this.height * MediaElement.height) / 2;
			left = MediaElement.width - MediaElement.width * this.width;
		} else if (this.index === 2){
			top = (MediaElement.height - this.height * MediaElement.height);
		} 
		this.mask.drawRect(left, top, MediaElement.width * this.width, this.height * MediaElement.height);
		this.text.position.y = top + (this.height / 2) * MediaElement.height - this.text.height / 2;
		this.text.position.x = this.width / 2 * MediaElement.width - this.text.width / 2;
	};

	Box.prototype.mousedown = function(){
		this.container.filters = [dropShadow];
		this.video.filters = [pixelate];
		this.position++;
		this.position = this.position % 3;
		this.video.position.x = - MediaElement.width * this.position;
		this.draw();
	};

	Box.prototype.mouseup = function(){
		this.video.filters = null;
	};

	Box.prototype.hover = function(){
		$("body").css("cursor", "pointer");
		if (this.onhover){
			this.onhover();			
		}
	};

	Box.prototype.out = function(){
		this.mouseup();
		$("body").css("cursor", "initial");
		if (this.onout){
			this.onout();			
		}
	};

	Box.prototype.first = function(){

		var text = this.text;

		var close = new TWEEN.Tween({"opacity" : 1})
			.to({"opacity" : 0}, 200)
			.onUpdate(function(){
				text.alpha = this.opacity;
			})
			.delay(700);


		var open = new TWEEN.Tween({"opacity" : 0})
			.to({"opacity" : 1}, 200)
			.onUpdate(function(){
				text.alpha = this.opacity;
			})
			.delay(this.index * 300 + 500)
			.chain(close)
			.start();
	};

	return Box;

}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(51), __webpack_require__(217), __webpack_require__(26), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function (MediaElement, VideoBox, TWEEN, Mediator) {
	
	var box0 = new VideoBox(0);

	var box1 = new VideoBox(1);

	var box2 = new VideoBox(2);

	var boxes = [box0, box1, box2];

	window.box = box2;
/*
	box0.onhover = expandBox.bind(window, 0);
	box1.onhover = expandBox.bind(window, 1);
	box2.onhover = expandBox.bind(window, 2);

	box0.onout = returnToNormal;
	box1.onout = returnToNormal;
	box2.onout = returnToNormal;*/

	var tween = new TWEEN.Tween();

	function returnToNormal(){
		tween.stop();
		tween = new TWEEN.Tween({
			box0 : box0.height,
			box1 : box1.height,
			box2 : box2.height,
		}).to({
			box0 : 1/3,
			box1 : 1/3,
			box2 : 1/3,
		}, 1000).onUpdate(function(){
			box0.height = this.box0;
			box0.draw();
			box1.height = this.box1;
			box1.draw();
			box2.height = this.box2;
			box2.draw();
		}).start();
	}

	function expandBox(index){
		tween.stop();
		tween = new TWEEN.Tween({
			box0 : box0.height,
			box1 : box1.height,
			box2 : box2.height,
		}).to({
			box0 : 0.5,
			box1 : 0.25,
			box2 : 0.25,
		}, 1000).onUpdate(function(){
			box0.height = this.box0;
			box0.draw();
			box1.height = this.box1;
			box1.draw();
			box2.height = this.box2;
			box2.draw();
		}).start();
	}

	Mediator.on("start", function (){
		var openTween = new TWEEN.Tween({
			width : 0
		}).to({
			width : 1
		}, 700).onUpdate(function(){
			for (var i = 0; i < boxes.length; i++){
				boxes[i].width = this.width;
				boxes[i].draw();
			}
		}).start().easing(TWEEN.Easing.Quadratic.InOut);
	});

	Mediator.on("stop", function (){
		var openTween = new TWEEN.Tween({
			width : 1
		}).to({
			width : 0
		}, 400).onUpdate(function(){
			for (var i = 0; i < boxes.length; i++){
				boxes[i].width = this.width;
				boxes[i].draw();
			}
		}).start().easing(TWEEN.Easing.Quadratic.InOut);
	});
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

});
//# sourceMappingURL=3.js.map