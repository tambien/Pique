define(["video/MediaElement", "video/VideoBox", "tween.js", "controller/Mediator"], 
	function (MediaElement, VideoBox, TWEEN, Mediator) {
	
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
});