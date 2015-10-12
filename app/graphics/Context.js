define(["jquery", "main.scss", "pixi.js", "tweenjs"], function($, mainStyle, PIXI, TWEEN){

	var renderer = new PIXI.WebGLRenderer($("body").width(), $("body").height());

	renderer.view.id = "PIXI";

	$("body").append(renderer.view);

	var mainContainer = new PIXI.Container();

	function loop(time){
		requestAnimationFrame(loop);
		renderer.render(mainContainer);
		TWEEN.update(time);
	}
	loop();

	var Context = {
		addChild : function(object){
			mainContainer.addChild(object);
		},
		width: $("body").width(),
		height: $("body").height()
	};

	return Context;
});