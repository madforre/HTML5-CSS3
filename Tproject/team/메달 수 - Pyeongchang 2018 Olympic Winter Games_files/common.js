var deviceChecker = function(){
	var device;
	var width = window.innerWidth ? window.innerWidth : document.body.clientWidth;
	if(width >= 1025){
		device = "pc";
	}else if(width >= 768){
		device = "tablet";
	}else{
		device = "mobile";
	}
	return device;
};

$(window).resize(function(e){
	if(typeof window.device == "undefined"){
		window.device = deviceChecker();
	}else{
		curDevice = deviceChecker();
		if(curDevice !== window.device){//디바이스가 변경되었을시
			// console.log(curDevice,window.device);
			$(window).trigger("deviceChange",[curDevice]);
			window.device = curDevice;
		}
	}
}).resize();

$.cachedScript = function( url, options ) {
 	// Allow user to set any option except for dataType, cache, and url
	options = $.extend( options || {}, {
		dataType: "script",
		cache: false,
		url: url
	});

	// Use $.ajax() since it is more flexible than $.getScript
	// Return the jqXHR object so we can chain callbacks
	return $.ajax( options );
};

$(function(){
	$(".skip").click(function(event){
		 var skipTo="#"+this.href.split('#')[1];
        $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
            $(this).removeAttr('tabindex');
        }).focus();
    });

	$("svg:not(.map)").attr("focusable","false");

    $(".list-layer-box").each(function(i, el){
        $(this).listLayerBox();
    });

    if($(".gnb").length){
		setNavigation();
	}

    if($(".footer").length){
        $(".footer").slideAction();
    }

	if($(".slide-action").length){
		$(".slide-action").slideAction();
	}

	if($(".over-action").length){
		$(".over-action").overAction();
	}

	if($(".original-view").length){
		$(".original-view").each(function(i){
			$(this).originalView();
		});
	}

	if($(".img-resize").length){
		$(".img-resize").imgResize();
		$(".img-resize").on({
			"imgResize" : function(e){
				$(this).imgResize();
			}
		});
	}

	if($(".countdown-wrap").length){
		var ariaLive = (function(){
			/* 2018-01-09 삭제
			$(".countdown-wrap").find(".count-title").attr("tabindex",0).end().find(".clock").find("span").css("position","relative").attr({
				"aria-live":"off",
				"aria-busy":"true",
				"aria-atomic":"false",
				"aria-relevant":"all",
				"tabindex":"0"
			}).children("em").attr("aria-hidden",true);

			$(".countdown-wrap").find(".clock > span").each(function(i,e){
				var str = $(this).children(".number").text() + " " + $(this).children(".name").text();
				var tag = "<span class='count-time' style='position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;'><em class='hidden'>"+ str +"</em></span>";
				$(this).children(".number").after(tag);
			});
			*/

			// $("span[aria-live='polite']").on({
			// 	"focusin":function(e){
			// 		$(this).attr({
			// 			"aria-live":"polite",
			// 			"aria-busy":"false"
			// 		});
			// 	},
			// 	"focusout":function(e){
			// 		$(this).attr({
			// 			"aria-live":"off",
			// 			"aria-busy":"true"
			// 		});
			// 	}
			// });
		})();
	}

	if($(".newsletter-wrap").length){
		$(".newsletter-form").attr({
			"aria-live":"polite",
			"aria-busy":"false",
			"aria-atomic":"false",
			"aria-relevant":"all"
		});
	}

	if($(".sns-list").length){
		// $(".sns-list").find(".more").on("click",function(e){
		// 	var layerpop = $(this).siblings(".layerpop");
		// 	layerpop.show();
		// 	layerpop.find('.pop-wrap').attr('tabindex', -1).on('blur focusout', function () {
	    //         $(this).removeAttr('tabindex');
	    //     }).focus();
		// 	layerpop.find(".pop-close").on("click",function(e){
		// 		layerpop.hide();
		// 		e.preventDefault();
		// 	});
		// 	e.preventDefault();
		// });

		var layerpopController = (function(){
			$(".layerpop").keyup(function(e) {
			    var keyCode = e.keyCode || e.which; // 키보드 코드값
			    if (keyCode == 27) { // ESC 키
					$(".layerpop").hide();

					$(".layerpop").attr("aria-hidden", "true");
			        $(".sns.more").attr("tabindex", "0");
			        $(".sns.more").focus();
			    }
			});

			// $(".sns.more").keyup(function(e) {
			//     var keyCode = e.keyCode || e.which;
			//     if (keyCode == 13 || keyCode == 32) { // 엔터키또는 스페이바키
			// 		$("#layer").show();
			//         $("#layer").attr("aria-hidden", "false");
			//         $(".sns.more").attr("tabindex", "-1");
			// 		$("#layer .pop-head").focus();
			//
			// 		e.preventDefault();
			//     }
			// });
			// $(".pop-close").keyup(function(e) {
			//     var keyCode = e.keyCode || e.which;
			//     if (keyCode == 13) { // 엔터키
			// 		$("#layer").hide();
			//         $("#layer").attr("aria-hidden", "true");
			//         $(".sns.more").attr("tabindex", "0");
			//         $(".sns.more").focus();
			// 		e.preventDefault();
			//     }
			// });

			$(".pop-close").keydown(function(e) {
			    var keyCode = e.keyCode || e.which;
			    if (e.shiftKey && keyCode == 9) { // shift+tab 키
			        $(this).prev().focus(); // 이전 링크로 커서이동
			    } else if (keyCode == 9) { // 탭키
			        e.preventDefault(); // 탭키의 기본기능 삭제
			        $(".layerpop .pop-head").focus(); // 첫번째 링크로 이동
			    }
			});

			$(".layerpop .pop-head").keydown(function(e) {
			    var keyCode = e.keyCode || e.which;
			    if (keyCode == 9 && e.shiftKey) { // shift+tab 키
			        e.preventDefault();
					$(".layerpop").hide();

			        $(".layerpop").attr("aria-hidden", "true");
			        $(".sns.more").attr("tabindex", "0");
			        $(".sns.more").focus();
			    }
			});
			$(".sns.more").click(function(e) {
			    $(".layerpop").show();
				$(".layerpop").attr("aria-hidden", "false");
				$(".sns.more").attr("tabindex", "-1");
				$(".layerpop .pop-head").focus();

				e.preventDefault();
			});
			$(".pop-close").click(function(e) {
			    $(".layerpop").hide();
				$(".layerpop").attr("aria-hidden", "true");
				$(".sns.more").attr("tabindex", "0");
				$(".sns.more").focus();

				e.preventDefault();
			});
		})();
	}

	$(".modal").each(function(i){
		$(this).attr("aria-hidden", true);
	});

	$("[rel='modal:open'], [data-rel='modal:open']").on("click", function(e){
		var selStr = $(this).attr("href") ? $(this).attr("href") : $(this).data("modal-open");
		if($(this).hasClass("btn-tooltip") && !isMobile){
			openModal(selStr, {left:$(this).offset().left, top:$(this).offset().top});
		}else{
			openModal(selStr);
		}

		$(this).addClass("modal-focus-back");
		e.preventDefault();
	});

	var $btnTop = $(".btn-mobile-top");
	$btnTop.hide();
	$btnTop.on("click",function(e){
		$(document, window).scrollTop(0);
		e.preventDefault();
	});

	$(document, window).on({
		"scroll" : function(){
			if(window.device != "pc"){
				if($(this).scrollTop() > 100){
					if(!$btnTop.is(":visible")) $btnTop.fadeIn();
				}else{
					if($btnTop.is(":visible")) $btnTop.fadeOut();
				}
			}
		}
	});

	// hash 개발에서 따로 사용함 20170913 주석
	// $(window).on({
	// 	"load" : function(){
	// 		var hash = window.location.hash;
	// 		if(hash !== "" && hash !== "#"){
	// 			var hashObj ={
	// 				idx : parseInt(window.location.hash.replace(/[^\d.]/g,'')),
	// 				con : window.location.hash.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]/gi,"")
	// 			};
	// 			openHashModal(hashObj);
	// 		}
	// 	},
	// 	"hashchange" : function(){
	// 		var hash = window.location.hash;
	// 		if(hash !== "" && hash !== "#"){
	// 			var hashObj ={
	// 				idx : parseInt(window.location.hash.replace(/[^\d.]/g,'')),
	// 				con : window.location.hash.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]/gi,"")
	// 			};
	// 			openHashModal(hashObj);
	// 		}else{
	// 			closeHashModal();
	// 		}
	// 	}
	// });

	// $(".gallery-board").find("a").first().click(function(e){
	// 	window.location.hash = "hash";
	// 	e.preventDefault();
	// });
});

function openModal(selStr, tooltipOptions){
	var modal = $(selStr);
	if(tooltipOptions){
		var left = Math.max(tooltipOptions.left - parseInt(modal.width() / 2) + 20, 0);
		modal.css({"left":left+"px", "top":tooltipOptions.top+20+"px"});
	}else{
		if(modal.data("modal-top")){
			modal.css({"padding-top":modal.data("modal-top")+"px"});
		}

		// $(".wrap").css({"height":window.innerHeight+"px", "overflow":"hidden"});
		// modal.css({"left":0+"px", "top":0+"px"});
	}
	// modal.find(".modal-header").attr("tabindex", "0").focusin(function(e){
	// 	if(e.target == e.currentTarget)
	// 	//
	// 	$(document).keyup(function (e) {
	// 		if (e.which === 9 && e.shiftKey) {
	// 			closeModal(selStr);
	// 			$(document).unbind("keyup");
	// 		}else if (e.which === 9) {
	// 			$(document).unbind("keyup");
	// 			// modal.find(".modal-header").unbind("focusin");
	// 		}
	// 	});
	// 	if(modal.hasClass("tooltip")){
	// 		$(".wrap").click(function (e) {
	// 			//console.log("tooltip.length:"+$(e.target).parents(".tooltip").length);
	// 			if(!$(e.target).parents(".tooltip").length){
	// 				modal.css("display", "none");
	// 				$(".wrap").unbind("click");
	// 			}
	// 		});
	// 	}
	// });
	// setTimeout(function(){modal.find(".modal-header").focus();}, 100);

	// modal.find(".modal-header").attr('tabindex', -1).on('blur focusout', function () {
	// 	$(this).removeAttr('tabindex');
	// }).focus();
	modal.css("display", "block").attr("aria-hidden", false);
	modal.find(".modal-header .title").attr("tabindex", "0");
	modal.find(":visible").find("a, button, input, textarea, *[tabindex]").first().focus();
	modal.focusCycle();
	modal.find("a.close").on("click", function(e){
		closeModal(selStr);
		e.preventDefault();
	});
}

function closeModal(selStr){
	//
	$(".wrap").css({"height":"", "overflow":""});
	var modal = $(selStr);
	modal.css("display", "none").attr("aria-hidden", true);
	modal.find("a.close").unbind("click");
	$(".modal-focus-back").focus().removeClass("modal-focus-back");

	//tooltip event unbind
	$(".wrap").unbind("click");
}

/*
function openHashModal(obj){
	var $modal = $(".hash-modal");
	var $modalCon = $(".modal-content");
	var $btnClose = $modal.find(".modal-controls .btn-close");
	var $btnNext = $modal.find(".modal-controls .btn-next");
	var $btnPrev = $modal.find(".modal-controls .btn-prev");

	if(obj.con !== "video"){
		$modalCon.find(".modal-video").hide();
		$modalCon.find(".modal-caption").hide();
		$modalCon.find(".modal-photo").show();
	}else{
		$modalCon.find(".modal-photo").hide();
		$modalCon.find(".modal-video").show();
		$modalCon.find(".modal-caption").show();
	}

	$modalCon.css("top",$(window).scrollTop()+50);
	$modal.fadeIn(300).attr("aria-hidden", false);
	// $(".modal-body").attr("tabindex",0).focus();
	$(".modal-body").attr('tabindex', -1).on('blur focusout', function () {
		$(this).removeAttr('tabindex');
	}).focus();

	$modal.focusCycle();

	$btnClose.on("click",function(e){
		window.location.hash = "";
		// console.log("click");
		e.preventDefault();
	});

	$btnNext.on("click", function(e){
		e.preventDefault();
	});

	$btnPrev.on("click", function(e){
		e.preventDefault();
	});
}

function closeHashModal(){
	var $modal = $(".hash-modal");
	$modal.fadeOut(300).attr("aria-hidden", true);
}
*/
function setNavigation(){
	var margnetMainNav = new mwUI.magnet(".header");
    var $allMenu = $(".all-menu-wrap");
    var $allMenuBtn = $(".btn-allMenu");
	var $allMenuCloseBtn = $(".btn-close-all-menu");
    var $hamburger = $allMenuBtn.find(".hamburger");
	var $snsMore = $(".header").find(".sns-wrap");
	//$allMenuBtn.attr("title",$allMenuBtn.data("status-text").split("|")[0]);
	$allMenuBtn.append("<span class='hidden'>"+$allMenuBtn.data("status-text").split("|")[0]+"</span>");

    $allMenuBtn.on("click",function(e){
		if(window.device == "pc"){
			$hamburger.toggleClass("is-active");
			if($hamburger.hasClass("is-active")){
				$allMenu.slideDown(500, "easeInOutQuint");
				//$allMenuBtn.attr("title",$allMenuBtn.data("status-text").split("|")[1]);
				$allMenuBtn.find("span.hidden").text($allMenuBtn.data("status-text").split("|")[1]);
			}
			else{
				$allMenu.slideUp(500, "easeInOutQuint");
				//$allMenuBtn.attr("title",$allMenuBtn.data("status-text").split("|")[0]);
				$allMenuBtn.find("span.hidden").text($allMenuBtn.data("status-text").split("|")[0]);
			}
		}
		else{
			// $("body").css("overflow","hidden").on("touchmove", function(e){
		    // 	e.preventDefault();
		    // });

			$allMenu.addClass("on");
			// $allMenu.children(".all-menu").touchControl();
			// var allMenuHeight = $(window).innerHeight() - $allMenu.find(".menu-top-mobile").outerHeight();
			// $allMenu.find(".all-menu").outerHeight(allMenuHeight);
			$allMenuCloseBtn.focus();
			//$allMenuBtn.attr("title",$allMenuBtn.data("status-text").split("|")[1]);
			$allMenuBtn.find("span.hidden").text($allMenuBtn.data("status-text").split("|")[1]);
			$allMenu.focusCycle();

			ariaHiddenAttr(true);
		}
		e.preventDefault();
    });

	$allMenuCloseBtn.on("click",function(e){
		// $('body').removeAttr('style').off('touchmove');

		$allMenu.removeClass("on");
		$allMenuBtn.focus();
		//$allMenuBtn.attr("title",$allMenuBtn.data("status-text").split("|")[0]);
		$allMenuBtn.find("span.hidden").text($allMenuBtn.data("status-text").split("|")[0]);
		$("body").removeAttr("style");
		ariaHiddenAttr(false);
		e.preventDefault();
	});

	$snsMore.children("a").on({
		// "mouseenter focusin" : function(e){
		// 	$(this).addClass("open");
		// 	$(this).children("ul").addClass("open");
		// },
		// "mouseleave" : function(e){
		// 	$(this).removeClass("open");
		// 	$(this).children("ul").removeClass("open");
		// },

		"click" : function(e){
			var $this = $(this).parent();
			var statusEl = $(this).children("span");
			if($this.hasClass("open")){
				$this.removeClass("open").children("ul").removeClass("open");
				statusEl.text(statusEl.data("status-text").split("|")[0]);
			}else{
				$this.children("ul").addClass("open").end().addClass("open");
				statusEl.text(statusEl.data("status-text").split("|")[1]);

				$this.children("ul").on({
					"focusout":function(e){
						var $elem = $(this);
						setTimeout(function() {
					        var hasFocus = ($elem.find(":focus").length > 0);
					        if (! hasFocus) {
								$this.removeClass("open").children("ul").removeClass("open");
								statusEl.text(statusEl.data("status-text").split("|")[0]);
					        }
					    }, 10);
					}
				});
			}
			e.preventDefault();
		}
	});

	var $sportsBtn = $(".btn-sports");
	var $picto = $(".picto-wrap");
	var $pictoBtns = $picto.find("ul > li > a");
	var $pictoCloseBtn = $(".btn-close-picto > a");
	// var pictoBgArr = ["#f08c39","#28a0b0","#e5586e","#28a0b0","#28a0b0","#9965ab","#f08c39","#0090d4","#e5586e","#28a0b0","#9965ab","#e5586e","#e5586e","#e5586e","#9965ab"];

	var pictoBgArr = ["venue01","venue02","venue03","venue02","venue02","venue04","venue01","venue05","venue03","venue02","venue04","venue03","venue03","venue03","venue04"];
	// .picto-icon.hue-venue01 && .picto-title.hue-venue01

	$sportsBtn.on("click",function(e){
		$picto.addClass("on");
		$pictoCloseBtn.focus();
		$picto.focusCycle();
		// $picto.touchControl();
		ariaHiddenAttr(true);
		e.preventDefault();
	});

	$pictoCloseBtn.on("click",function(e){
		$picto.removeClass("on");
		$sportsBtn.focus();
		ariaHiddenAttr(false);
		e.preventDefault();
	});

	function pictoController($boolean){
		if($boolean){
			// $pictoBtns.find(".picto").css("fill","#0090d4");
			$pictoBtns.find(".picto-icon").addClass("hue-normal");
			$pictoBtns.find(".picto-title").hide();
			$pictoBtns.find(".icon-triangle1-up").hide();
			$pictoBtns.on({
				"mouseenter focusin":function(e){
					var idx = $(this).closest("li").index();
					// $(this).find(".picto").css({"fill":pictoBgArr[idx],transition: "0.2s"});
					// $(this).find(".picto-title").css("color",pictoBgArr[idx]).fadeIn(200);
					$(this).find(".picto-icon").addClass("hue-" + pictoBgArr[idx]);
					$(this).find(".picto-title").addClass("bg-" + pictoBgArr[idx]).stop().fadeIn(300);
					$pictoBtns.not($(this)).find(".picto-title").hide();
					$(this).find(".icon-triangle1-up").addClass("hue-" + pictoBgArr[idx]).stop().fadeIn(300);
					$pictoBtns.not($(this)).find(".icon-triangle1-up").hide();
				},
				"mouseleave focusout":function(){
					// $(this).find(".picto").css({"fill":"#0090d4",transition: "0.2s"});
					var idx = $(this).closest("li").index();
					$(this).find(".picto-icon").removeClass("hue-" + pictoBgArr[idx]);
					$(this).find(".picto-title").hide();
					$(this).find(".icon-triangle1-up").hide();
				}
			});
		}else{
			$pictoBtns.find(".picto-icon").removeClass("hue-normal");
			$pictoBtns.find(".picto-title").each(function(i){
				$(this).removeAttr("class").addClass("picto-title").css("display","block");
			});
			// $pictoBtns.find(".picto").css("fill","#fff");
			// $pictoBtns.find(".picto-title").css({"color":"#fff","display":"block"});
			$pictoBtns.off("mouseenter mouseleave focusin focusout");
		}
	}

	var $floatHeader = $(".floatHeader");
	var $contents = $(".contents");
	var lastScrollTop = 0;
	var delta = 15;
	$floatHeader.insertAfter(".wrap > .inner");
	//2018-01-04 수정 | 접근성
	//푸터 영역을 지난 이후 키보드 초점이 헤더의 GNB 영역에 한 번 더 키보드 초점이 이동되고 있습니다.
	//$floatHeader.attr("tabindex","-1");
	$(document, window).on("scroll", function(e){
		if(window.device != "pc") return;
		var st = $(this).scrollTop();
		var standardTop = $contents.offset().top;
		if(st > standardTop){
			if(Math.abs(lastScrollTop - st) <= delta) return;
			if ((st > lastScrollTop) && (lastScrollTop>0)){
				$floatHeader.find("a").css("display","none").attr("tabindex","-1");//2018-01-04 수정
				$floatHeader.stop().animate({"top":"-100px"}, 200, "linear");
			} else {
				$floatHeader.find("a").css("display","table").attr("tabindex","0");//2018-01-04 수정
				$floatHeader.stop().animate({"top":"-0"}, 200, "linear");
			}
			lastScrollTop = st;
		}else{
			$floatHeader.find("a").css("display","none").attr("tabindex","-1");//2018-01-04 수정
			$floatHeader.stop().animate({"top":"-100px"}, 200, "linear");
		}
	});

	function ariaHiddenAttr($boolean){
		var objArr = [
			{id:$("#contents"),value:$boolean},
			{id:$(".gnb"),value:$boolean},
			{id:$(".gnb-mobile"),value:$boolean},
			{id:$(".sponsor-list"),value:$boolean},
			{id:$(".footer"),value:$boolean}
		];

		var i = 0;
		for(;i<objArr.length;i++){
			objArr[i].id.attr("aria-hidden", objArr[i].value);
		}
	}

	$(window).on("deviceChange",function(e, device){
		if(device == "pc"){
			$("body").removeAttr("style");
			if($allMenu.is(":visible") === false){
				$allMenu.removeClass("on");
				$allMenu.find(".all-menu").removeAttr("style");
			}
			if($picto.hasClass("on")){
				$picto.removeClass("on");
			}
			pictoController(true);
		}else{
			if($allMenu.is(":visible")){
				$allMenu.hide();
				$(".hamburger").removeClass("is-active");
			}
			$allMenu.removeAttr("style");
			pictoController(false);
		}

		if(device != "pc" && $allMenu.is(":visible")){
			// var allMenuHeight = $(window).innerHeight() - $allMenu.find(".menu-top-mobile").outerHeight();
			// $allMenu.find(".all-menu").outerHeight(allMenuHeight);
		}
		//2018-01-26 추가
		setOnlyClassAria(device);
	});

	if(window.device == "pc"){
		pictoController(true);
	}
}

//2018-02-06 변경
$(window).ready(function(){
	setOnlyClassAria(window.device);

	// WATCH-LIVE
	$(".btn-watch-live").click(function(e){
		var url = $(this).data("watch-live-url");

		$.ajax({
			url : url,
			type : 'POST',
	    	dataType : 'HTML',
	        contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        success : function (data) {
	        	if(data != null){
		        	$("body").append('<div class="watch-live-modal"><div class="dimmed"></div>'+data+'</div>');
		        	$(".watch-live-modal").hide().fadeIn(700);
		        	setTimeout(function(){
						initAjaxTabs();
					}, 400);
	        	}
	        },
	        error : function (){
	        	//
	        }
	    });
		e.preventDefault();
	});
});
// END 2018-02-06 변경

// 2018-02-21 변경
$(window).load(function(){
	// GOOGLE AD FOCUS EVENT
	$("iframe[title='3rd party ad content']").contents().each(function(i, el){
		$(this).find("a").focus(function(e){
			$(this).find("> img").css({"box-sizing":"border-box", "border":"1px dotted gray"});
			//var container = $(this).parents("div").first();
			//container.prepend('<div class="border-box" style="position:absolute;left:0;top:0;width:100%;height:100%;border:2px dotted gray;box-sizing:border-box;"></div>');
		}).blur(function(e){
			$(this).find("> img").css({"border":"1px dotted transparent"});
			//var container = $(this).parents("div").first();
			//container.find(".border-box").remove();
		});
	});
});
// END 2018-02-21 변경


function setOnlyClassAria(device){
	console.log("device::"+device);
	if(device == "pc"){
		$(".only-pc").attr("aria-hidden", false);
		$(".only-pc-view").attr("aria-hidden", false);
		$(".only-mobile").attr("aria-hidden", true);
		$(".only-mobile-view").attr("aria-hidden", true);

	}else if(device == "tablet"){
		$(".only-pc").attr("aria-hidden", true);
		$(".only-pc-view").attr("aria-hidden", false);
		$(".only-mobile").attr("aria-hidden", true);
		$(".only-mobile-view").attr("aria-hidden", false);

	}else{
		$(".only-pc").attr("aria-hidden", true);
		$(".only-pc-view").attr("aria-hidden", true);
		$(".only-mobile").attr("aria-hidden", false);
		$(".only-mobile-view").attr("aria-hidden", false);
	}
};
// END 2018-01-26 추가




var ImgSet = function(el){
	this.$el = $(el);
};

ImgSet.prototype.view = function(){
	var $el = this.$el;
	// var imgInt = null;
	$el.closest("div").css("overflow","hidden");
	if($el.prop("naturalWidth") === 0 && $el.prop("naturalHeight") === 0){
		// imgInt = setInterval(function(){
		// 	if($el.prop("naturalWidth") > 0 && $el.prop("naturalHeight") > 0){
		// 		clearInterval(imgInt);
		// 		imgView();
		// 	}
		// },20);
		imageLoad();
	}else{
		lazyCheck();
	}

	function lazyCheck(){
		if($el.hasClass("lazy")){
			imgView();
			imageLoad();
		}else{
			imgView();
		}
	}

	function imgView(){
		var containerRatio =  $el.closest("div").outerWidth()/$el.closest("div").outerHeight();
		var targetRatio = $el.prop("naturalWidth")/$el.prop("naturalHeight");
		// console.log(containerRatio,targetRatio);
		if(targetRatio > 1){
			if(targetRatio > containerRatio){
				$el.css({
					"width":"auto",
					"height":"100%",
					"display":"inline-block" //접근성 수정
				});
			}else{
				$el.css({
					"width":"100%",
					"height":"auto",
					"display":"inline-block" //접근성 수정
				});
			}
		}else{
			$el.css({
				"width":"100%",
				"height":"auto",
				"display":"inline-block" //접근성 수정
			});
		}
		$el.show();
	}

	function imageLoad(){
		$el.on("load", function(e){
			// if(imgInt !== null){
			// 	clearInterval(imgInt);
			// }
			imgView();
		});
	}
};

$.fn.extend({

	imgResize : function(){
		var $this = $(this);
		var $imgs = $this.find("img");
		$imgs.each(function(i,e){
			var imgSet = new ImgSet($imgs.eq(i));
			imgSet.view();
		});
	},

	overAction : function(){
		var $this = $(this);
		var $imgs = $this.find("img");
		var $btns = $imgs.closest("a");
		$imgs.parent().css("overflow","hidden");
	},

	slideAction : function(){
		var $this = $(this);
		var btns = $this.find(".link > li > a:not(.only-pc-view,.only-pc)");

		btns.each(function(i,e){
			var $tg = $(this);
			var statusEl = $tg.find("span");
			if($tg.closest("li").hasClass("on") && $tg.siblings("ul").length){
				$tg.siblings("ul").css("display","block");
				statusEl.text(statusEl.data("status-text").split("|")[1]);
			}
		});

		btns.on("click", function(e){
			var $tg = $(this);
			var statusEl = $tg.find("span");
			var $list = $tg.closest("li");
			var speed = 300;

			if($tg.attr("target") !== "_blank"){
				if($list.hasClass("on")){
					$list.removeClass("on");
					if($tg.siblings("ul").length){
						$tg.siblings("ul").slideUp(speed, "easeOutQuint");
						statusEl.text(statusEl.data("status-text").split("|")[0]);
					}
				}else{
					$list.addClass("on");
					if($tg.siblings("ul").length){
						$tg.siblings("ul").slideDown(speed, "easeOutQuint");
						statusEl.text(statusEl.data("status-text").split("|")[1]);
					}
				}
			}

			if($tg.attr("href") == "#"){
				e.preventDefault();
			}
		});

		$(window).on("deviceChange",function(e, device){
			if(device != "mobile"){
				if($this.hasClass("mobile-action")){
					$this.find(".link").find("ul").removeAttr("style").end().children("li").removeClass("on");
				}
				if($this.hasClass("footer") && device == "pc"){
					$this.find(".link").find("ul").removeAttr("style").end().children("li").removeClass("on");
				}
			}
		});
	},

	listLayerBox : function(){
		/*
		data-active-label="true"/"false"	:: set label from active element text
		data-active-index="0"~				:: active index
		*/
		var $el = $(this);
		var $label = $el.find(".title");
		var $bt = $el.find(".btn-layer-toggle");
		var $listContainer = $el.find(".list-layer");
		var $listItems = $el.find(".list-layer > * > a");
		var activeLabel = $el.data("active-label");
		var activeIndex = $el.data("active-index") > -1 ? $(el).data("active-index") : -1;
		var timer;


		if(activeIndex > -1){
			//$listContainer.find("> *").eq(activeIndex).css("border", "1px solid red");
			$listContainer.find("> *").removeClass("active").eq(activeIndex).addClass("active").trigger("change");
		}

		if(activeLabel){
			var label = $listContainer.find(".active a") ? $listContainer.find(".active a").text() : "";
			$label.text(label);
		}

		$bt.click(function(e){
			var statusEl = $(this).siblings("span");
			if($el.hasClass("open")){
				$(".list-layer-box").removeClass("open");
				if(statusEl.length){
					statusEl.text(statusEl.data("status-text").split("|")[0]);
				}
			}else{
				$(".list-layer-box").removeClass("open");
				$el.addClass("open");
				if(statusEl.length){
					statusEl.text(statusEl.data("status-text").split("|")[1]);
				}
			}
		});

		$listItems.click(function(e){
			$el.removeClass("open");
		});

		$el.find("button, a").each(function(i){
			$(this).focusin(function(e){
				clearTimeout(timer);
			}).focusout(function(e){
				timer = setTimeout(function(){
					$el.removeClass("open");
					var statusEl = $el.find("span");
					if(statusEl.length){
						statusEl.text(statusEl.data("status-text").split("|")[0]);
					}
				}, 50);
			});
		});

		$(".wrap").on("click", function(e){
			if(!$(e.target).parents(".list-layer-box").length){
				if(window.device == "pc"){
					//e.preventDefault();
				} else {
					$el.removeClass("open");
					var statusEl = $el.find("span");
					if(statusEl.length){
						statusEl.text(statusEl.data("status-text").split("|")[0]);
					}
				}
			}
		});
	},

	focusCycle : function(){
		var $this = $(this);
		var $list = $this.find(":visible").find("a, button, input, textarea, *[tabindex]");
		$list.each(function(i,e){
			$list.eq(i).data("num",i);
		});
		$list.on({
			"keydown" : function(e){
				if (e.which === 9 && e.shiftKey) {
					var idx = $(this).data("num") < 1 ? $list.length-1 : $(this).data("num") - 1;
					$list[idx].focus();
					e.preventDefault();
				}else{
				}
			}
		}).last().on({
			"keydown" : function(e){
				if (e.which === 9 && e.shiftKey) {
				}else if (e.which === 9) {
					$list.first().focus();
					e.preventDefault();
				}else{
				}
			}
		});
	},

	originalView : function(){
		var $this = $(this);
		var img = $this.children("img");
		var alt = img.attr("alt");
		var src = img.attr("src");
		var srcOri = img.attr("data-original");
		var srcPdf = img.attr("data-pdf");

		var root;
		var widget = $this.siblings(".plaza-widget");

		if(widget.length){
			widget.find("a.expand").on("click", function(e){
				root = ((srcOri != undefined) ? location.protocol + '//' + location.host + srcOri : location.protocol + '//' + location.host + src);
				var windowObjectReference = window.open(root, "_blank");
				setTimeout(function(){
					windowObjectReference.document.images[0].alt = alt;
				}, 500);
				e.preventDefault();
			});
			widget.find("a.print").on("click", function(e){
				root = ((srcOri != undefined) ? location.protocol + '//' + location.host + srcOri : location.protocol + '//' + location.host + src);
				$("body").append("<div class='print-div'><style type='text/css'>.print-div{display:none;} @media print{ body>div{display:none;}body>div.print-div{display:block;} }</style><img src='"+root+"' /></div>");
				var timer = window.setTimeout(function(){
					window.print();
					$(".print-div").remove();
				}, 600);
				e.preventDefault();
			});
			widget.find("a.download").on("click", function(e){
				root = ((srcPdf != undefined) ? ( /static.pyeongchang2018.com/.test(srcPdf) ? srcPdf : location.protocol + '//' + location.host + srcPdf ) : location.protocol + '//' + location.host + src);
				$(this).attr({
					href: root,
					download: alt,
					target: "_blank"
				});
				//e.preventDefault();
			});
		} else {
			$this.on("click",function(e){
				root = ((srcOri != undefined) ? location.protocol + '//' + location.host + srcOri : location.protocol + '//' + location.host + src);
				window.open(root,"_blank");
				e.preventDefault();
			});
		}
	},

	touchControl : function(){
		var $this = $(this);
		var maxY = null;
		var minY = null;
		var posY = function(){
			$this.children().each(function(i,e){
				var h = $(this).position().top + $(this).outerHeight();
				if(maxY === null && minY === null){
					maxY = h;
					minY = $(this).position().top;
				}else{
					if(maxY < h){
						maxY = h;
					}
					if(minY > $(this).position().top){
						minY = $(this).position().top;
					}
				}
			});
		};

		var isAction = function(){
			posY();
			if(maxY > $(window).innerHeight()){
				return true;
			}else{
				return false;
			}
		};

		var touchAction = function(){
			$this.css({"overflow":"hidden"}).children().css({"transform":"translate(0px,0px) translateZ(0px)"});
			// $this.css({"overflow":"hidden","transform":"translate3d(0,0,0)"}).children().css({"transform":"translate3d(0,0,0)","backface-visibility":"hidden","perspective":"1000"});
			var moveY = maxY - $(window).innerHeight();
			var defaultY = null;
			var distance = null;
			var endY = 0;
			$("body").css("overflow","hidden").on({
				"touchstart" : function(e){
					defaultY = event.touches[0].screenY;
				},
				"touchmove" : function(e){
					var event = e.originalEvent;
					distance = (defaultY - event.touches[0].screenY);
					if(distance > 0){
						distance *= -1;
						$this.children().each(function(i,e){
							var move = endY + distance;
							if(move < (moveY*-1)) move = (moveY*-1);
							$(this).css({
								// "transform":"translate3d(0,"+move+"px,0)"
								"transform":"translate(0px,"+move+"px) translateZ(0px)"
							});
							// translateZ(0px);
						});
					}else{
						distance *= -1;
						$this.children().each(function(i,e){
							var move = endY + distance;
							if(move > 0) move = 0;
							$(this).css({
								// "transform":"translate3d(0,"+move+"px,0)"
								"transform":"translate(0px,"+move+"px) translateZ(0px)"
							});
						});
					}

					e.preventDefault();
				},
				"touchend" :function(e){
					var matrix = $this.children().css('transform');
					var splits = matrix.replace(/[^0-9\-.,]/g, '').split(',');
					var x = splits[12] || splits[4];
					var y = splits[13] || splits[5];
					endY = parseInt(y);
					// e.preventDefault();
				}
			});
			// function getValues(){
			// 	var matrix = $('#element').css('transform').replace(/[^0-9\-.,]/g, '').split(',');
			// 	var x = matrix[12] || matrix[4];
			// 	var y = matrix[13] || matrix[5];
			// }
		};

		if(isAction()){
			touchAction();
		}else{
			$("body").css("overflow","hidden").on({
				"touchmove" : function(e){
					e.preventDefault();
				}
			});
		}

		$(window).on({
			"resize" : function(){
			},
			"orientationchange":function(){
				if(isAction()){
					touchAction();
				}else{
					$this.removeAttr("style").children().removeAttr("style");
					$("body").off("touchstart touchmove touchend");
				}
			}
		});
	}
});
