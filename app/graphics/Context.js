define(["jquery", "main.scss", "pixi.js", "tweenjs", "controller/Mediator"], 
	function($, mainStyle, PIXI, TWEEN, Mediator){

	var renderer = new PIXI.WebGLRenderer($("body").width(), $("body").height());

	renderer.autoResize = true;

	$(window).on("resize", function(){
		Context.width = $("body").width();
		Context.height = $("body").height();
		renderer.resize(Context.width, Context.height);
		console.log(Context.width, Context.height);
		Mediator.trigger("resize");
	});

	window.renderer = renderer;

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