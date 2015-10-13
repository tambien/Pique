define(["jquery", "controller/Mediator", "video/Loading"], function($, Mediator, Loading){

	var videoWidth = 1280;
	var videoHeight = 720;

	var video  = $("<video autostart='0'>").get(0);

	video.src = "./assets/video.mp4";
	video.preload = "auto";
	video.load();
	$(video).on("canplaythrough", function(){
		video.pause();
		setTimeout(function(){
			Loading.resolve();
			Mediator.trigger("loaded");
		}, 500);
	});

	Mediator.on("start", function(){
		video.play();
	});

	Mediator.on("stop", function(){
		video.pause();
	});

	$(video).on("ended", function(){
		Mediator.trigger("ended");
	});
	
	return {
		width : videoWidth,
		height : videoHeight,
		video : video,
		start : function(){
			// video.play();
		}
	};
});