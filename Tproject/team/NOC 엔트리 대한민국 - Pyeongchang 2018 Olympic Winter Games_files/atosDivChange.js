$(function(){
	var competitionUrl = [
		{url:"/nordic-combined/",						class:"nordic-combined"},
		{url:"/combine-nordique/",						class:"nordic-combined"},
		{url:"/luge/",									class:"luge"},
		{url:"/biathlon/",								class:"biathlon"},
		{url:"/bobsleigh/",								class:"bobsleigh"},
		{url:"/short-track-speed-skating/",				class:"short-track-speed-skating"},
		{url:"/patinage-de-vitesse-sur-piste-courte/",	class:"short-track-speed-skating"},
		{url:"/snowboard/",								class:"snowboard"},
		{url:"/skeleton/",								class:"skeleton"},
		{url:"/ski-jumping/",							class:"ski-jumping"},
		{url:"/saut-a-ski/",							class:"ski-jumping"},
		{url:"/speed-skating/",							class:"speed-skating"},
		{url:"/patinage-de-vitesse/",					class:"speed-skating"},
		{url:"/ice-hockey/",							class:"ice-hockey"},
		{url:"/hockey-sur-glace/",						class:"ice-hockey"},
		{url:"/alpine-skiing/",							class:"alpine-skiing"},
		{url:"/ski-alpin/",								class:"alpine-skiing"},
		{url:"/curling/",								class:"curling"},
		{url:"/cross-country-skiing/",					class:"cross-country-skiing"},
		{url:"/ski-de-fond/",							class:"cross-country-skiing"},
		{url:"/freestyle-skiing/",						class:"freestyle-skiing"},
		{url:"/ski-acrobatique/",						class:"freestyle-skiing"},
		{url:"/figure-skating/",						class:"figure-skating"},
		{url:"/patinage-artistique/",					class:"figure-skating"}
	];

	var prefix = "result";

	$(window).ready(function(){
		//console.log("atosReady");
		setAtosDivClass();
	});

	$(window).load(function(){
		//console.log("atosLoad");
		setAtosTag();
	});
	
	$(window).bind("ajaxComplete", function(){
		setAtosTag()
	});
	
	function setAtosDivClass(){
		// WARP IN WRAP
		$("#mainContainer").length ? $(".wrap .wrap").removeClass("wrap") : null;

		// COLUMN RIGHT 
		if($(".section-crop .column-right").length < 1){
			$(".column-right").appendTo(".section-crop");
			googletag.cmd.push(function() { googletag.pubads().refresh(); });
		}
	}

	function setAtosTag(){
		// RESULT TABLE ALL WARP OVERFLOW-X
		$(".ResTableFull, .ResTablefull").wrap('<div class="overflow-x-auto"></div>');
		$("#mainBodyContent-left").css("overflow-x", "inherit");
	}

	function setAtosTag(){
		// RESULT TABLE ALL WARP OVERFLOW-X
		$(".ResTableFull, .ResTablefull").each(function(i, el){
			if($(this).parent(".overflow-x-auto").length < 1){
				$(this).wrap('<div class="overflow-x-auto"></div>');
			}
		});
		$("#mainBodyContent-left").css("overflow-x", "inherit");

		// ADD WRAP CLASS FOR COMPETITION
		var pathName = window.location.pathname;
		var className;

		for(var i=0; i<competitionUrl.length; i++){
			if(pathName.indexOf(competitionUrl[i].url) > -1){
				className = competitionUrl[i].class;
				break;
			}
		}
		if(pathName.indexOf("/general/competition") > -1){
			className = "competition";
		}
		className ? $("#mainBodyContent").addClass(className) : null;
	}
});
