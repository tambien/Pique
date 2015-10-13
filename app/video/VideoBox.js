define(["video/MediaElement", "graphics/Context", "jquery", "controller/Mediator", "tweenjs"], 
	function (MediaElement, Context, $, Mediator, TWEEN) {

	// var texture = PIXI.Texture.fromVideo(MediaElement.video);
	var texture = new PIXI.Texture.fromVideo(MediaElement.video);

	var dropShadow = new PIXI.filters.DropShadowFilter();

	var pixelate = new PIXI.filters.PixelateFilter();

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
			font : "45px sans-serif", 
			fill : 0xffffff, 
			align : "center",
			dropShadow : true,
			dropShadowColor: 0x00ff00
		});
		this.text.alpha = 0;
		this.container.addChild(this.text);		

		this.mask = new PIXI.Graphics();
		this.container.addChild(this.mask);
		
		this.video.texture.crop.width = MediaElement.width;

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

	/**
	 *  size and position the box
	 */
	Box.prototype.size = function(){
		var width = 0.9;
		if (Context.width < 500){
			width = 0.95;
		}
		this.container.width = Context.width * width;
		var height = this.container.width * (MediaElement.height / MediaElement.width);
		this.container.position.x = Context.width * ((1 - width) / 2);
		this.container.scale.x = this.container.width / MediaElement.width;
		this.container.scale.y = this.container.scale.x;
		var top = ((Context.height - 70) / 2) - height / 2 + this.index * 5;
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
			.delay(500);


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

});