define(["controller/Mediator", "video/MediaElement", "graphics/Context", "tweenjs", "jquery", "controls.scss"], 
	function (Mediator, MediaElement, Context, TWEEN, $, controlStyle) {

	var controls = $("<div>", {
		"id" : "Controls"
	}).appendTo("body");

	horizontal = $("<div>", {
		"id" : "Horizontal"
	}).appendTo(controls);

	playButton = $("<div>", {
		"id" : "PlayButton",
		"text" : "▶"
	}).appendTo(controls);

	var dragged = false;
	var mousedown = false;
	var margin = 10;
	var playPosition = 0;
	var playing = false;
	var over = false;
	var firstClicked = false;


	playButton.on("mouseup touchend", function(e){
		if (!dragged){
			if (playButton.hasClass("Playing")){
				Mediator.trigger("stop");
			} else {
				Mediator.trigger("start");
			}
		} 
	});

	Mediator.on("stop", function(){
		playButton.addClass("Transition");
		playing = false;
		setTimeout(function(){
			playButton.removeClass("Transition");
			playButton.removeClass("Playing");
		}, 100);
	});

	Mediator.on("start", function(){
		if (over){
			MediaElement.video.currentTime = 0;
			over = false;
		}
		playButton.addClass("Transition");
		playing = true;
		setTimeout(function(){
			playButton.removeClass("Transition");
			playButton.addClass("Playing");
		}, 100);
		if (!firstClicked){
			firstClicked = true;
			Mediator.trigger("first");
		}
	});

	$(document).on("mouseup touchend", function(){
		if (dragged){
			playButton.removeClass("Dragging");
		}
		dragged = false;
		mousedown = false;
	});

	playButton.on("mousedown touchstart", function(){
		mousedown = true;
	});

	$(MediaElement.video).on("canplaythrough", function(){
		if (playing){
			playButton.removeClass("Buffering");
			MediaElement.video.play();
		}
	});

	Mediator.on("ended", function(){
		over = true;
		if (playing){
			Mediator.trigger("stop");
		}
		// controls.removeClass("Expand");
	});

	Mediator.on("restart", function(){
		controls.addClass("Expand");
	});

	controls.on("mousemove touchmove", function(e){
		if (e.type === "touchmove"){
			e.clientX = e.originalEvent.touches[0].clientX;
		}
		if (mousedown){
			over = false;
			if (!dragged && playing){
				playButton.addClass("Buffering");
				MediaElement.video.pause();
			}
			playButton.addClass("Dragging");
			dragged = true;
			var controlsLeft = controls.position().left;
			var controlWidth = controls.width() - margin * 2 - playButton.width();
			var percent = (e.clientX - controlsLeft - margin * 2 - playButton.width()) / controlWidth;
			percent = Math.max(percent, 0);
			percent = Math.min(percent, 1);
			playPosition = percent;
			MediaElement.video.currentTime = percent * MediaElement.video.duration;
		}
	});

	Mediator.on("loaded", function(){
		controls.addClass("Expand");
		loop();
	});

	function loop(){
		requestAnimationFrame(loop);
		//listen for changes
		var width = controls.width() - margin * 3 - playButton.width();
		if (playing){
			playPosition = MediaElement.video.currentTime / MediaElement.video.duration;
		}
		var position = playPosition * width + margin;
		// console.log(position);
		playButton.css("left", position);
	}

});