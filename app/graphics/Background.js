define(["pixi.js", "graphics/Context", "controller/Mediator", "tweenjs", "jquery"], 
function (PIXI, Context, Mediator, TWEEN, $) {

	window.sprite = new PIXI.Sprite.fromImage("./assets/bg.jpg");

	window.filter = new PIXI.filters.RGBSplitFilter();

	Mediator.on("resize", function(){
		sprite.width = Context.width;
		sprite.height = Context.height;
	});

	sprite.width = Context.width;
	sprite.height = Context.height;

	sprite.filters = [filter];

	var animationFrame;

	Mediator.on("loaded", function(){
		cancelAnimationFrame(animationFrame);
		var tween = new TWEEN.Tween({
			"gx" : filter.green.x,
			"gy" : filter.green.y,
			"rx" : filter.red.x,
			"ry" : filter.red.y,
			"bx" : filter.blue.x,
			"by" : filter.blue.y,
		}).to({
			"gx" : 0,
			"gy" : 0,
			"rx" : 0,
			"ry" : 0,
			"bx" : 0,
			"by" : 0,
		}, 1000).onUpdate(function(){
			filter.green.x = this.gx;
			filter.green.y = this.gy;
			filter.red.x = this.rx;
			filter.red.y = this.ry;
			filter.blue.x = this.bx;
			filter.blue.y = this.by;
		}).onComplete(function(){
			sprite.filters = null;
		}).start().easing(TWEEN.Easing.Elastic.Out);
	});

	function loop(time){
		animationFrame = requestAnimationFrame(loop);
		var timeVal = time * 0.005;
		var scalingMult = 0.8;
		filter.green.x = 20 * Math.sin(timeVal) * scalingMult;
		filter.green.y = 30 * Math.cos(timeVal / 3) * scalingMult;
		filter.red.x = 50 * Math.sin(timeVal + 0.4) * scalingMult;
		filter.red.y = 10 * Math.cos(timeVal + 0.4) * scalingMult;
		filter.blue.x = 20 * Math.sin(timeVal + 3) * scalingMult;
		filter.blue.y = 10 * Math.cos(timeVal + 4) * scalingMult;
	}
	loop();

	Context.addChild(sprite);
});