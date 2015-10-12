define(["jquery"], function ($) {

	//the loading text

	var dotCount = 0;

	var loadingText = $("<div>", {
		"id" : "Loading",
		"text" : "loading"
	}).appendTo($("body"));

	var interval = setInterval(function(){
		var text = "loading";
		for (var i = 0; i < dotCount; i++){
			text+=".";
		}
		loadingText.text(text);
		dotCount++;
		dotCount = dotCount % 4;
	}, 500);

	return {
		resolve : function(){
			//remove it
			loadingText.remove();
			clearInterval(interval);
		},
		load : function(cb){
			var img = new Image();
			img.onload = cb;
			img.src = "./assets/bg.jpg";
		}
	};
});