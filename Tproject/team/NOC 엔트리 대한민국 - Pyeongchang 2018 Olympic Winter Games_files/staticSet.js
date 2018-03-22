$(function(){
	//Main
	if($(".main-visual").length){
		var mainVisualWrap = $(".main-visual > .visual-inner");
		var mainSilderObj = {
			slideCon : ".main-visual > .visual-inner ul",
            mobile : false,
			option : {
				pager:true,
				controls:false,
				auto: true,
				autoControls: true,
				infiniteLoop: true,
				nextText: mainVisualWrap.attr("data-next-text"),
				prevText: mainVisualWrap.attr("data-prev-text"),
				startText : mainVisualWrap.attr("data-start-text"),
				stopText : mainVisualWrap.attr("data-stop-text"),
				onSliderLoad:function(){
					$(".main-visual").css("opacity",1);
				}
			}
		};
		var mainVisualSlider = new totalSlider(mainSilderObj);
	}

	//main schedule
	if($(".schedule-table").length){
		//create all the dialogue
		var scheduleWrap = $(".table-wrap");
		var scheduleOpton = {
			optionTitleColor: ((scheduleWrap.attr("data-site") != "pa") ? "#57b7e7" : "#f8b54d"),
			optionTextClose: ((scheduleWrap.attr("data-lang") != "ko") ? "close" : "닫기")
		};
		var scheduleMore = $(".schedule-table").find(".more");

		$(".dialog").dialog({
			autoOpen: false,
			resizable: false,
			draggable: false,
			width: 500,
			minHeight:"auto",
			closeText: scheduleOpton.optionTextClose
		});

		$(".ui-dialog .ui-dialog-titlebar").css("background", scheduleOpton.optionTitleColor);
		
		// 2018-01-09 추가
		$(".ui-dialog-titlebar-close .ui-icon-closethick").each(function(i, el){
			var replacement = $('<i>');
			var attributes = {};
			$.each($(this).get(0).attributes, function(index, attribute) {
				attributes[attribute.name] = attribute.value;
			});
			replacement.attr(attributes);
			replacement.data($(this).data());
			$(this).replaceWith(replacement);
		});
		// END 2018-01-09 추가






		//opens the appropriate dialog
		$(".opener").click(function () {
			//close all others
			$(".ui-dialog:visible").find(".dialog").dialog("close");
			//takes the ID of appropriate dialogue
			var id = $(this).data("id");
			//open dialogue
			$(id).dialog("open");
		});

		$(window).resize(function() {
			$(".dialog").dialog("option", "position", {my: "center", at: "center", of: window});
		});
	}

    if($(".thumb-list-full").length){
        $(".thumb-list-full").mThumbnailScroller({
            type:"click-50",
            theme:"buttons-out",
            callbacks:{
                onInit:function(){
                    // $(".section-full .thumb-list-full").addClass("on").find(".mTSButton").wrapAll("<div class='thumb-btn-wrap' />");
                    $(".section-full .thumb-list-full").addClass("on");
                    $(".section-full .thumb-list-full .mTSButton").insertAfter(".thumb-list-full").wrapAll("<div class='thumb-btn-wrap' />");

                    //ie9에서 특정한 이미지의 경우 container의 width 1px 적게 나옴 추후 해결문제
                    // if(navigator.userAgent.indexOf('9.0') != -1) {
                    //     $(".mTSContainer").css({
                    //         "width":$(".mTSContainer").outerWidth()+1
                    //     });
                    // }
                }
            }
        });
    }

	//faq toggle
	if($(".faq-list").length){
		var setClass = function($a){
			var $li = $a.closest('li');
			$li.hasClass("active") ?
			$li.removeClass('active') : $li.addClass('active').siblings('li').removeClass('active');
		};
		var setTitle = function($A, texts){
			$A.each(function(i,a){
				var $a = $(a);
				var $li = $a.closest('li');
				$li.hasClass("active") ? $a.attr("title", texts[1]) : $a.attr("title", texts[0]);
			})
		};
		$('.faq-list').each(function(i,e){
			var $e = $(e);
			var statusTexts = $e.data("statusText").split("|");
			var $A = $e.find(".question > a"); //2017-12-18 수정 | ".question > a"
			$e.on("click", "a", function(){
				setClass($(this));
				setTitle($A, statusTexts);
			});
			setTitle($A, statusTexts);
		});
	}

    // 뉴스 메인
    if($(".news-newlist").length){
        var newsSilderObj = {
            slideCon : ".news-newlist .bxslider",
            option : {
                auto:false,
    			autoControls: false,
    			controls: true,
    			nextText: 'Next',
    			prevText: 'Prev',
    			prevSelector: '#bxslider-prev',
    			nextSelector: '#bxslider-next',
    			startText: 'Start',
    			stopText: 'Stop',
    			pager: false
            }
        };
		var newMobileSilder = new MobileSlider(newsSilderObj);
    }

    //뉴스 포토
    if($(".bxslide-type01").length){
        var newsPhotoSilderObj = {
            slideCon : ".bxslide-type01 .bxslider",
            mobile: true,
            option : {
                controls:true,
                auto:false,
    			slideWidth:386,
    			slideMargin:20,
    			minSlides: 3,
    			maxSlides: 3,
    			moveSlides: 3,
    			startSlide:0,
    			nextText: 'Next',
    			prevText: 'Prev',
    			prevSelector: '#bxslider-prev',
    			nextSelector: '#bxslider-next',
    			infiniteLoop: false,
                hideControlOnEnd : true,
    			pager: false,
            },
            mobileOption : {
                auto:false,
                autoControls: false,
                slideMargin:10,
                minSlides: 1,
                maxSlides: 1,
                moveSlides: 1,
                nextText: 'Next',
                prevText: 'Prev',
                prevSelector: '#bxslider-prev',
                nextSelector: '#bxslider-next',
                infiniteLoop: false,
                hideControlOnEnd : true,
                pager: false,
            }
        };
        var newPhotoSilder = new totalSlider(newsPhotoSilderObj);
    }

	function totalSlider(obj){
        var slider = null;
        $(window).on("load",function(){

        });

        if(obj.mobile){
            if(window.device === "mobile"){
                slider = $(obj.slideCon).bxSlider(obj.mobileOption);
            }else{
                slider = $(obj.slideCon).bxSlider(obj.option);
            }

            $(window).on("deviceChange",function(e, device){
                if(device !== "mobile"){
                    slider.reloadSlider(obj.option);
                }else{
                    // slider = $(obj.slideCon).bxSlider(obj.option);
                    slider.reloadSlider(obj.mobileOption);
                }
            });
        }else{
            slider = $(obj.slideCon).bxSlider(obj.option);
        }

		if(slider !== null){
			$(obj.slideCon).on("focusin",function(){
				slider.stopAuto();
				// slider.goToSlide(0);
			});
		}
	}

	function MobileSlider(obj){
		var slider = null;
		if(window.device === "mobile") slider = $(obj.slideCon).bxSlider(obj.option);

        $(window).on("deviceChange",function(e, device){
            if(device !== "mobile"){
                if(slider !== null){
                    slider.destroySlider();
                }
            }else{
                slider = $(obj.slideCon).bxSlider(obj.option);
            }
        });

		if(slider !== null){
			$(obj.slideCon).on("focusin",function(){
				slider.stopAuto();
				// slider.goToSlide(0);
			});
		}
	}

    if($(".guidemap-wrap").length){
		var gaideMapController = (function(){
			var $guidemap = $(".guidemap-map");
			var $guidemapImg = $guidemap.find("img");
			var $menuList = $(".guidemap-menu");
			var $tabList = $menuList.find(".tab");
			var $btns = $menuList.find("a");
			var $pop = $menuList.find(".guidemap-popup");

			$tabList.find("button").on("click",function(){
				$(this).parent().addClass("open");
				$tabList.not($(this).parent()).removeClass("open");
				if($guidemapImg.length > 1){
					$guidemapImg.css("display","none").eq($(this).parents("li").index()).css("display","block");
				}
			});

			$btns.on("click",function(e){
				if($(this).siblings("ul").length){
					e.preventDefault();
					$(this).toggleClass("open");
					if($(this).hasClass("open")){
						$(this).find("span").text($(this).find("span").data("status-text").split("|")[1]); //접근성 수정
						$(this).siblings("ul").slideDown(300, "easeInOutQuint");
					}else{
						$(this).find("span").text($(this).find("span").data("status-text").split("|")[0]); //접근성 수정
						$(this).siblings("ul").slideUp(300, "easeInOutQuint");
					}
				}else if($(this).siblings(".guidemap-popup").length){
					e.preventDefault();
					$(this).toggleClass("open active");
					$btns.not($(this)).each(function(e){
						if($(this).hasClass("active")){
							$(this).removeClass("open active");
						}
					});
					if($(this).hasClass("active")){
						// if(window.device !== "mobile"){
						// 	$(this).siblings(".guidemap-popup").find(".popup-body").css("height",$map.outerHeight() - $(this).siblings(".guidemap-popup").find(".popup-head").outerHeight());
						// }
						var code = $(this).data("code");
						var map = $(this).data("map");
						var info = $(this).data("info");
						var selectNum = null;

						switch(code){
							case "JAL" : case "BSP" :
								selectNum = 0;
							break;
							case "YAL" :case "ACC" : case "ASJ" : case "POP" : case "ASL" : case "ABT" :
								selectNum = 1;
							break;
							case "GOP" : case "GCC" : case "GIA" : case "GHC" : case "KHC" : case "GOV":
								selectNum = 2;
							break;
						}
						//console.log(code,selectNum,map,info);

						//2017-11-06 수정
						//var $grapics = $(".traffic-graphic").children();
						//$grapics.not($(".traffic-graphic").eq(selectNum)).removeClass("on").addClass("off").end().eq(selectNum).removeClass("off").addClass("on");
						//2017-11-06 수정

						if($.isFunction(window.mapView)){
							window.mapView(code,map,info);
						}
					}
				}else{
					if($(this).parent().hasClass("popup-close") == true){
						e.preventDefault();
						if($(this).closest(".guidemap-popup").siblings("a").hasClass("active")){
							$(this).closest(".guidemap-popup").siblings("a").removeClass("open active");
						}
					}
				}
			});

			$(window).on({
				"load" : function(){
					// if(window.device !== "mobile"){
					// 	$tabList.siblings("ul").css("height",$map.outerHeight() - $tabList.outerHeight());
					// }
				},
				"resize" : function(){
					// if(window.device !== "mobile"){
					// 	$tabList.siblings("ul").removeAttr("style").css("height",$map.outerHeight() - $tabList.outerHeight());
					//
					// 	$btns.each(function(e){
					// 		if($(this).hasClass("active")){
					// 			$(this).siblings(".guidemap-popup").find(".popup-body").css("height",$map.outerHeight() - $(this).siblings(".guidemap-popup").find(".popup-head").outerHeight());
					// 		}
					// 	});
					// }

				},
                "deviceChange":function(e, device){
                    // if(device !== "mobile"){
                    // }else{
                    //     $tabList.siblings("ul").removeAttr("style");
                    //     $btns.siblings(".guidemap-popup").find(".popup-body").removeAttr("style");
                    // }
                }
			});
		})();
	}

	//엠블럼
	if($(".emblem-wrap").length){
		$(".tooltip").each(function(i, el){
			emblemTooltip[i] = new emblemTooltip(el);
		});
	}

	//비디오 자막영역
	if($(".video-area").length){
		$(".video-area").each(function(i, el){
			videoCaption[i] = new videoCaption(el);
		});
	}

	//photo view
	if($(".view-slide .slider-wrap").length){
		setPhotoSlide();
	}

    if($(".venues-cont.side-ver").length){
        tabController();
    }

	if($(".history-img-title").length){
		//동계올림픽역사(한국) more
		var $hostList = $(".host-list");
		var $divs = $hostList.find(".list-medal").children("div");
		$hostList.on ("click", "a" ,function(e){
			$(this).toggleClass('on');
			var $div = $(this).closest(".list-medal").children("div").eq(0);
			if($div.hasClass("block")){
				$divs.removeClass("block");
				$div.prev("a").focus();
			} else {
				$divs.removeClass("block");
				$div.addClass("block");
				$div.children("a").focus();
			}
			return false;
		});
	}

	if($(".hostcity-tour").length){
		var hostcityTourMap = (function(){
			var hostcityTour = $(".hostcity-tour");
			var hostcityTourBtn = hostcityTour.find(".tour-btn");
			var hostcityTourClose = hostcityTour.find(".close");

			hostcityTourBtn.on("click",function(){
				$(".tour-con").removeClass("active");
				$(this).next(".tour-con").addClass("active");
			});

			hostcityTourClose.on("click",function(){
				$(this).parent(".tour-con").removeClass("active").prev(".tour-btn").focus();
			});

			

		})();
	}

	//2018-01-05 수정 | ie 포커스이동
	if($(".anchor-wrap").length){
		var anchorFocus = (function(){
			var anchorBtns = $(".anchor-wrap a");
			var topBtns = $("a[href='#anchor-wrap']");

			anchorBtns.on("click", function(e){
				linkTo("#" + this.href.split('#')[1]);
				e.preventDefault();
			});

			topBtns.on("click", function(e){
				linkTo("#anchor-wrap .anchor-title");
				e.preventDefault();
			});

			function linkTo(anchorTo){
				$(anchorTo).css("position","relative").append("<a class='link' href='#none' style='position:absolute;top:0;left:0;width:100%;height:100%;'>&nbsp;</a>");
				$(anchorTo).find(".link").on('blur focusout', function () {
					$(this).remove().parent().removeAttr("style");
				}).focus();
			}

        })();
	}

	window.addEventListener("hashchange", function(event) {
		var element = document.getElementById(location.hash.substring(1));
		if (element) {
			if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
				element.tabIndex = -1;
			}
			element.focus();
		}
	}, false); 


	$(".skip").click(function(event){
		 var skipTo="#"+this.href.split('#')[1];
        $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
            $(this).removeAttr('tabindex');
        }).focus();
    });

	if($(".tab-acc").length){
		$(".tab-acc .tab-acc-btn").on("click", function(e){
			showTab($(this), $(".tab-acc-con"));
			e.preventDefault();
		});
	}

	//경기장소개
	if($('.venue-box').length){
		var bgContainer = $(".venue-box .title-img");
		var venueListBoxes = $(".venue-box .title-box .title-con > ul .venue-list-wrap");
		var mapContainer = $(".venue-box .venue-btn");
		var mapButtons = mapContainer.find(".btn-map");
		var venueButtons = mapContainer.find(".btn-venue");
		var tabButtons = venueListBoxes.find(".tab-btn");
		var infoItems = $(".venue-map-list > ul > li");

		mapButtons.click(function(e){
			var mapId = $(this).data("call-map-id");
			setMapUi(mapId);
		});

		venueButtons.click(function(e){
			var venueId = $(this).data("call-venue-id");
			var mapIndex = venueId.split("_")[1];
			var venueIndex = venueId.split("_")[2];
			setListScroll(mapIndex, venueIndex);
		});

		tabButtons.click(function(e){
			var mapId = $(this).data("call-map-id");
			setMapUi(mapId);
		});

		function setMapUi(mapId){
			var mapCodeArray = mapId.split("_");
			if(mapCodeArray.length >= 3){
				switch(mapCodeArray[1]){
					case "0":
						venueListBoxes.eq(0).addClass("on");
						venueListBoxes.eq(1).removeClass("on");
						venueListBoxes.eq(1).find(".venue-list > li").removeClass("on");
						infoItems.eq(0).addClass("active");
						infoItems.eq(1).removeClass("active");
					break;
					case "1":
						venueListBoxes.eq(0).removeClass("on");
						venueListBoxes.eq(1).addClass("on");
						venueListBoxes.eq(0).find(".venue-list > li").removeClass("on");
						infoItems.eq(0).removeClass("active");
						infoItems.eq(1).addClass("active");
					break;
				}
			}else{
				console.log("allMap");
			}
			bgContainer.attr("data-map-id", mapId);
		}

		function setListScroll(mapIndex, venueIndex){
			var vBox = venueListBoxes.eq(mapIndex);
			var listItems = vBox.find(".venue-list > li:not(.venue-label)");
			var tgScrollTop = Math.min(venueIndex * listItems.eq(0).innerHeight(), vBox.find(".venue-list")[0].scrollHeight - vBox.find(".venue-list").innerHeight());
			vBox.find(".venue-list").stop().animate({scrollTop:tgScrollTop}, {duration:600, easing:"easeOutCirc"});
			listItems.removeClass("on").eq(venueIndex).addClass("on");
		}
	}

	if($(".hero-wrap").length){
		var $anchorBtn = $(".cont-title02-wrap").find("h2").siblings("a");
		if($anchorBtn.length){
			$anchorBtn.on("click",function(e){
				var $obj = $($(this).attr("href"));
				if(window.device === "pc"){
					$(window).scrollTop($obj.offset().top - $(".floatHeader").outerHeight() - 20);
				}else{
					$(window).scrollTop($obj.offset().top - $(".header").outerHeight() - 15);
				}
				e.preventDefault();
			});
		}
	}

    //관중정보
    if($(".spectator-guide").length){
        var spectatorController = (function(){
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
            if(isMobile){
                $(".bg-movie").find("iframe").hide();
                $(".bg-movie").find("img").show();
            }

            if(/Android/i.test(navigator.userAgent)){
                $(".sg-app").find("a").first().hide();
            }else if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
                $(".sg-app").find("a").last().hide();
            }else{
            }

            $(".spectator-guide").find("a").on("click",function(e){
                if($(this).attr("href") == "#"){
                    e.preventDefault();
                }
            });

			if($(".pce-info-list").length){
				var btns = $(".pce-info-list").find(".link > li > a.btn-link01");
				btns.each(function(i,e){
					if($(this).attr("href") == "#"){
	                    $(this).css({
							"cursor":"default",
							"color":$(this).css("color")
						}).find("i").hide().end().siblings(".cont").find(".btn-link01").hide();
						
	                }
				});
			}

			if($(".plaza-info-list").length){
				var btns = $(".plaza-info-list").find(".link > li > a.btn-link01");
				btns.each(function(i,e){
					if($(this).attr("href") == "#"){
	                    $(this).css({
							"cursor":"default",
							"color":$(this).css("color")
						}).find("i").hide();
						
	                }
				});
			}

        })();
    }
	if($(".adp-diagram").length){
		var adpController = (function(){
			var $list;
			var listResize = function(){
				if(window.device !== "mobile"){
					$list  = $(".adp-diagram").find(".goals").find(".info-list").children().find("dl");

					var subDes = $(".adp-diagram").find(".goals").find(".info-list").find("em");
					subDes.removeAttr("style");
					(subDes.eq(0) > subDes.eq(1)) ? subDes.eq(1).outerHeight(subDes.eq(0).closest("span").outerHeight()) : subDes.eq(0).outerHeight(subDes.eq(1).closest("span").outerHeight());
				}else{
					$list  = $(".adp-diagram").find(".detailed2").find(".info-list").children().find("dl");
				}

				var h = 0;
				var cnt;
				$list.each(function(i,e){
					if($(this).outerHeight() > h){
						h = $(this).outerHeight();
						cnt = i;
					}
				});

				if(window.device !== "mobile"){
					$list.parent().outerHeight(h);
					$(".adp-diagram").find(".goals").find(".title").outerHeight(h);
				}else{
					if(cnt%2 > 0){
						$list.eq(cnt-1).parent().outerHeight(h);
					}else{
						$list.eq(cnt+1).parent().outerHeight(h);
					}
					$list.eq(cnt).parent().outerHeight(h);
				}
			};

			$(window).on({
				"load" :function(e){
					listResize();
				},
				"resize" : function(e){
					$list.parent().removeAttr("style");
					listResize();
				}
			});
		})();
	}

    if($(".map-area").find(".map-icon").length){
        var mapController = (function(){
            var $mapBtns = $(".map-area").find(".map-icon").find("svg").children();
			var $mapCon = $(".map-area").find(".map-icon").find("svg").find("path");
			var activeColor = ($(".wrap").hasClass("para")) ?  "#c3390f" : "#005794";
			var activeColor2 = ($(".wrap").hasClass("para")) ? "rgb(195, 57, 15)" : "rgb(0, 87, 148)";
			var overColor = ($(".wrap").hasClass("para")) ? "#f18f00" : "#0090d4";
            var selectNum;
            $mapCon.eq(4).css("fill",activeColor);
            $mapBtns.on({
                "mouseenter focusin" : function(e){
                    if(($(this).children().css("fill") !== activeColor2) && ($(this).children().css("fill") !== activeColor))
                    $(this).children().css("fill",overColor);
                },
                "mouseleave focusout" : function(e){
                    if(($(this).children().css("fill") !== activeColor2) && ($(this).children().css("fill") !== activeColor)) $(this).children().removeAttr("style");
                },
                "click" :function(e){
                    $(this).children().css("fill",activeColor);
                    $mapCon.not($(this).children()).removeAttr("style");

                    var str = $(this).children().attr("class").split("-");
                    // console.log(str[1]);
                    $('.countries').find('h2 > strong').text(str[1]);
					$('.countries').attr('tabindex', -1).on('blur focusout', function () {
			            $(this).removeAttr('tabindex');
			        }).focus();

					if($.isFunction(window.countriesSet)) window.countriesSet(str[1]);

					e.preventDefault();
                }
            });

            // $mapBtns.on({
            //     "mouseenter" : function(e){
            //
            //         if(!$(this).hasClass("hue-venue06")){
            //             $(this).removeClass("hue-normal").addClass("hue-venue05");
            //         }
            //
            //     },
            //     "mouseleave" : function(e){
            //
            //         if(!$(this).hasClass("hue-venue06")){
            //             $(this).addClass("hue-normal").removeClass("hue-venue05");
            //         }
            //
            //     },
            //     "click" :function(e){
            //
            //         if($(this).hasClass("hue-venue05")){
            //             $(this).removeClass("hue-venue05");
            //         }
            //
            //         $(this).addClass("hue-venue06");
            //         $mapBtns.not($(this)).addClass("hue-normal").removeClass("hue-venue06");
            //         selectNum = $(this).index();
            //
            //         e.preventDefault();
            //     }
            // });

            // var $mapBtns2 = $(".sample01").find(".map-icon");
            // $(".sample01").find(".map-icon").on({
            //     "mouseenter" : function(e){
            //         e.preventDefault();
            //         e.stopPropagation();
            //     },
            //     "mouseleave" : function(e){
            //     },
            //     "click" :function(e){
            //     }
            // });
            //
            // $(".sample01").find(".map-icon").find("svg").on({
            //     "mouseenter" : function(e){
            //         e.preventDefault();
            //         e.stopPropagation();
            //     },
            //     "mouseleave" : function(e){
            //     },
            //     "click" :function(e){
            //     }
            // });
        })();

    }

	if($(".social-video").length){
		var socialVideo = (function(){
			var commontBtn = $(".commont-btn");
			var commontPop = $(".commont-pop");
			commontBtn.on("click",function(){
				if (!commontPop.is(':visible')) {
					commontPop.attr("tabindex","0").on("blur focusout", function () {
						$(this).removeAttr("tabindex");
					}).show().focus();
				} else {
					commontPop.hide();
				}
				event.preventDefault();
			});
			commontPop.on("click","button.close",function(){
				commontPop.hide();
				event.preventDefault();
			});

			var videoInfo = $(".video-info");
			var videoTit = videoInfo.find(".title");
			var videoCon = videoInfo.find(".content");
			var videoConPadding = parseInt(videoCon.css("padding-top")) + parseInt(videoCon.css("padding-bottom"));
			
			var conHeight = (device != "mobile") ? videoInfo.outerHeight() - videoTit.outerHeight() - videoConPadding + "px" : "auto";
			videoCon.css("height",conHeight);

			$(window).on("resize",function(){
				if(device != "mobile"){
					conHeight = videoInfo.outerHeight() - videoTit.outerHeight() - videoConPadding + "px";
				} else {
					conHeight = "auto";
				}
				videoCon.css("height",conHeight);
			});
		})();
	}

	if($(".calendar-wrap").length){
		var calendarWrap = (function(){
			var calendar = $(".calendar-wrap");
			var calendarBtn = calendar.find(".calendar-btn");
			var calendarPop = calendar.find(".schedulePop");
			var calendarLeft = calendarPop.find(".leftSc");
			var calendarRight = calendarPop.find(".rightSc");

			var calendarDateLink = calendarLeft.find(".scTable td a");
			var calendarSortInput = calendarRight.find(".sortingScList input");
			var calendarSortList = calendarRight.find(".scTextList .inner");

			var conHeight;
			function conHeightInit() {
				conHeight = calendarLeft.outerHeight();
				calendarRight.css("height",conHeight+"px");
			}

			var listHeight;
			var scrollPaneWrap;
			function calendarScrollInit() {
				listWidth = calendarRight.outerWidth() - parseInt(calendarRight.css("padding-left")) - parseInt(calendarRight.css("padding-right"));
				if(device!="mobile"){
					listHeight = conHeight - parseInt(calendarRight.css("padding-top")) - $(".sortingScList").outerHeight();
				} else {
					listHeight = conHeight - parseInt(calendarRight.css("padding-top")) - $(".sortingScList").outerHeight() - $(".dateTit").outerHeight();
				}
				calendarSortList.css({"width":listWidth+"px","height":listHeight+"px"});
				scrollPaneWrap = calendarSortList;
				scrollPaneWrap.each(function(i,e){
					var scrollWrap = $(this).jScrollPane();
					var scrollApi = $(this).data('jsp');
					scrollApi.reinitialise();
				});
			}

			calendarBtn.on("click",function(){
				conHeightInit();
				if(device != "mobile"){
					calendarScrollInit();
				}
				event.preventDefault();
			});


			calendarDateLink.on("click",function(){
				calendarDateLink.not($(this)).removeClass("on");
				$(this).addClass("on");
				if (calendarRight.is(":visible") == false) {
					calendarRight.show();
					calendarScrollInit();
				}
				event.preventDefault();
			});

			calendarRight.on("click",".backBtn",function(){
				calendarRight.hide();
			})

			calendarSortInput.on("click",function(){
				if(calendarSortInput.not($(this)).is(":checked") == true){
					if($(this).is(":checked") == true){
						calendarSortList.find("." + $(this).data("color")).show();
					} else {
						calendarSortList.find("." + $(this).data("color")).hide();
					}
					calendarScrollInit();
				} else {
					event.preventDefault();
				}
			});
			
			$(window).on("resize",function(){
				conHeightInit();
				(device != "mobile") ? calendarRight.show() : calendarRight.hide();
				if (scrollPaneWrap != undefined) {
					calendarScrollInit();
				}
			});

		})();
	}

	//경기장목록
	if($(".location-wrap").length){
        locationController();
	}

	$(".image-slider").each(function(i, el){
		imageSlider[i] = new ImageSlider(el);
	});

	//2017-10-18 수정 | photo-list03
    if ($(".photo-list03").length){
        setPhotoStyle();
    }

    if((".tab-type2").length){
        setTabPosition();
    }

    $(window).resize(function(){
		//2017-10-18 수정 | photo-list03
        if ($(".photo-list03").length){
            setPhotoStyle();
        }

        if((".tab-type2").length){
            setTabPosition();
        }
    });

});

var locationController = function(){
    var locationList = $(".location-list");
    var locationIndex = locationList.find(".list-index");
    var locationItemWrap = locationList.find(".list-item");
    var locationItemCon = locationList.find(".list-item .item");
    var locationBtn = locationList.find(".list-button");

    var itemPos; //scroll posion array
    var itemWidth;
    var activePos; //scroll posion num :: 0,1,2,3
    var activeIndex; //index posion num :: 0,1,2

    var firstSet = false;
    var isScroll = false;
    var scrollPaneWrap = null;
    var scrollPaneApi = null;

    function locationListScroll(){
        itemPos = [0];
        itemWidth = 0;
        activePos = 0;
        activeIndex = 0;

        for(var i=0; i<locationItemCon.length; i++){
            var item = locationItemCon.eq(i);
            var itemColumn = locationItemCon.eq(i).find("dd");
            itemWidth += parseInt(item.css("margin-right")) + parseInt(item.css("border-right-width")) + (itemColumn.length * itemColumn.width());
            itemPos.push(itemWidth);
        }
        locationItemWrap.css("width",itemWidth +"px");

        scrollPaneWrap = locationList.find(".inner");
        scrollPaneWrap.jScrollPane({
            animateScroll: true,
            animateEase: "linear",
            autoReinitialise: true
        });
        scrollPaneWrap.bind('jsp-initialised',function(event, isScrollable){
            init();
        }).bind('jsp-scroll-x',function(event, scrollPositionX, isAtLeft, isAtRight){
        }).bind('jsp-user-scroll-x',function(event, destLeft, isAtLeft, isAtRight){
            userScroll(destLeft,isAtLeft,isAtRight);
        });
        scrollPaneApi = scrollPaneWrap.data("jsp");
        changePosIndex(activeIndex,activePos); //처음 한번 실행

        function userScroll(destLeft,isAtLeft,isAtRight){
            var prevBtn = locationBtn.find(".prev");
            var nextBtn = locationBtn.find(".next");
            isAtLeft ? prevBtn.css("display","none") : prevBtn.css("display","block");
            isAtRight ? nextBtn.css("display","none") : nextBtn.css("display","block");

            if(!isScroll){
                //스크롤이 움직였을때
                var currentIndex = activeIndex;
                if(destLeft > itemPos[2] -1){
                    activeIndex = 2;
                }else if(destLeft > itemPos[1] -1){
                    activeIndex = 1;
                }else if(destLeft > itemPos[0] -1){
                    activeIndex = 0;
                }
                if (currentIndex != activeIndex) {
                    changePosIndex(null, activeIndex);
                    activePos = activeIndex;
                }
            }else{
                isScroll = false;
            }
        }

        function init(){
            //이전, 다음 click
            locationBtn.on("click","button",function(event){
                isScroll = true;

                var $target = $(event.target);
                if ($target.hasClass("prev") && activePos > 0){
                    activePos--;
                    if(activePos != locationItemCon.length){
                        activeIndex = activePos;
                    }
                }
                if ($target.hasClass("next") && activePos < locationItemCon.length){
                    activePos++;
                    if(activePos != locationItemCon.length){
                        activeIndex = activePos; //스크롤 오른쪽 끝영역
                    }
                }
                changePosIndex(activePos,activeIndex);
                event.preventDefault();
            });

            //평창, 강릉, 기타 index click
            locationIndex.on("click","button",function(event){
                isScroll = true;

                var $this = $(this);
                activeIndex = $this.index();
                activePos = activeIndex;
                changePosIndex(activePos,activeIndex);
                event.preventDefault();
            });
        }

        //scroll to, active class, aria control
        function changePosIndex(pos,index){
            if (pos !== null) {
                scrollPaneApi.scrollTo(itemPos[pos],0);
            }
            locationIndex.find("button").removeClass("active").attr("aria-selected","flase");
            locationIndex.find("button").eq(index).addClass("active").attr("aria-selected","true");
            // console.log("activeIndex",activeIndex,"activePos",activePos);
        }
    }

    function locationListDestroy(){
        itemPos = null;
        itemWidth = 0;
        activeIndex = 0;
        activePos = 0;
        locationItemWrap.css("width","100%");

        if(scrollPaneApi != null){
            scrollPaneApi.destroy();
            scrollPaneApi = null;
            scrollPaneWrap = null;

            locationIndex.off("click","button");
            locationBtn.off("click","button");
        }
    }

    function locationSet(device){
        if(device != "mobile"){
            locationListScroll();
        }else{
            locationListDestroy();
        }
    }

    locationSet(window.device);

    $(window).on("deviceChange",function(e, device){
        locationSet(device);
    });
};

var tabController = function(){
    var $container = $(".venues-cont.side-ver");
    var $tabBtns = $container.find(".tab").find(".col-title");
    $tabBtns.on("click",function(){
        $(this).closest(".tab").addClass("on");
        $tabBtns.closest(".tab").not($(this).closest(".tab")).removeClass("on");
    });
};

//비디오 자막영역
var videoCaption = function videoCaption(el){
	var _this = this;
	var container = $(el);
	var captionOpen = container.find($(".caption-btn button.open"));
	var captionClose = container.find($(".caption-btn button.close"));
	var captionCon = container.find($(".caption-con"));

	captionOpen.on('click', function(e){
		container.removeClass("no-caption");
		captionCon.focus();
		e.preventDefault();
	});

	captionClose.on('click', function(e){
		container.addClass("no-caption");
		captionOpen.focus();
		e.preventDefault();
	});
};


//사용자기기 확인
function tour(event){
	var userAgent = navigator.userAgent;
	var visitedAt = (new Date()).getTime();
	//	alert(userAgent);
	if (userAgent.match(/Android/)) {
	    if (userAgent.match(/Chrome/)) {
	         setTimeout(function() {
	              location.href = 'intent://2016sc/#Intent;scheme=ictgwd;package=com.gwd.ict;end;';
	         }, 1000);
	    } else {
	        setTimeout(
	           function() {
	              if ((new Date()).getTime() - visitedAt < 2000) {
	                 location.href = 'intent://2016sc/#Intent;scheme=ictgwd;package=com.gwd.ict;end;';
	              }
	          }, 500);

	          var iframe = document.createElement('iframe');
	          iframe.style.visibility = 'hidden';
	          iframe.src = 'intent://2016sc/#Intent;scheme=ictgwd;package=com.gwd.ict;end;';
	          document.body.appendChild(iframe);
	          document.body.removeChild(iframe);
	     }
	}else if (userAgent.match(/iPhone|iPad|iPod/)) {
		location.href = 'https://itunes.apple.com/kr/app/tueo-gang-won/id1180418228?mt=8';
	}else{
		window.open("https://play.google.com/store/apps/details?id=com.gwd.ict&hl=ko", "_blank");
	}
	event.preventDefault();
}


//엠블럼
var emblemTooltip = function emblemTooltip(el){
	var _this = this;
	var container = $(el);
	var tooltipBtn = container.find($(".tooltip-btn button"));
	var tooltipCon = container.find($(".tooltip-con"));
	var tooltipState = false;

	tooltipBtn.on({
		"mouseover" : function(){
			tooltipState = true;
			tooltipActive(tooltipState);
		},
		"focusin" : function(){
			tooltipState = true;
			tooltipActive(tooltipState);

		},
		"mouseleave" : function(){
			tooltipState = false;
			tooltipActive(tooltipState);
		},
		"focusout" : function(){
			tooltipState = false;
			tooltipActive(tooltipState);
		}
	});


	tooltipBtn.keydown(function(event) {
		if ( event.which == 27 ) {
			tooltipState = false;
			tooltipActive(tooltipState);
			event.preventDefault();
		}
	});

	function tooltipActive(tooltipState){
		if (tooltipState == true) {
			tooltipCon.attr("aria-hidden","false").addClass("active");
		} else {
			tooltipCon.attr("aria-hidden","true").removeClass("active");
		}
	}

};

/* photo list */
function setPhotoStyle(){
	var photoWrap = $(".photo-list03");
	var widePhoto = photoWrap.find("li.wide-photo a");
	var widePhotoImg = photoWrap.find("li.wide-photo img");
	var normalPhoto = photoWrap.find("li:nth-child(2)");
	var normalHeight = normalPhoto.outerHeight();

	if($(window).width() >= 768){
		if ( normalPhoto.length > 0 ) {
			widePhoto.css("height",normalHeight-21+"px");
			// widePhotoImg.css("height",normalHeight-21+"px");
			//console.log("height");
		} else {
			widePhoto.css("height","auto");
			// widePhotoImg.css("height","100%");
			//console.log("auto");
		}
	}else{
		widePhoto.css("height","auto");
		// widePhotoImg.css("height","100%");
		//console.log("another");
	}
}

/* photo view */
function setPhotoSlide(){
	carousel = $('.bx-pager').bxSlider({
		slideWidth:240,
		minSlides:3,
		maxSlides:3,
		// moveSlides: 0,
		slideMargin:20,
		controls:true,
		infiniteLoop: false,
		pager: true,
		controlsInPager:true
	});

	slider = $('.bxslider').bxSlider({
		captions:false,
		controls:true,
		pager:false,
		onSlideBefore: function() {
			var slideQty = slider.getCurrentSlide();
			$('.bx-pager li').removeClass('selected').eq(slideQty).addClass('selected');
			var pageNum = parseInt(slideQty/carousel.getNumberSlidesShowing());
			carousel.goToSlide(pageNum);
			$(".bx-paging .page-active").text(slideQty+1);
		}
	});

	$(".bx-paging .page-num").text($('.bx-pager li').length);

	$('.bx-pager').find('li a').on('click',function(){
		var targetIdx = $(this).parent().index();
		$(this).parent().siblings().removeClass('selected');
		$(this).parent().addClass('selected');
		slider.goToSlide(targetIdx);
		return false;
	});
}
function showTab(obj, other){
	var $obj = $(obj);
	var target = $obj.attr("href");
	if(!$obj.closest("ul").parent().hasClass("tab-acc")){
		$(target).show().siblings("." + other).hide();
	}
	$obj.parent().siblings("li").removeClass("active");
	$obj.parent().addClass("active");
}
var setTabPosition = function(){
	$(".tab-acc").each(function(i,e){
		var $e = $(e);
		var $li = $e.find(".tab-title > li");
		var percent = 50;
		if(window.device == "mobile"){
			var max = 40;
			var paddingTop = Math.ceil($li.length/2);
			$li.each(function(n,el){
				var $el = $(el);
				$el.children("a").css({
					"margin-left" : percent*Math.ceil(n%2)+"%",
					"width" : percent+"%"
				});
				var height = $el.children("a").outerHeight();
				max = max > height ? max : height+1;
			});
			$li.each(function(n,el){
				var $el = $(el);
				$el.children("a").css({
					"top" : max*Math.floor(n/2)
				});
			});
			$li.parent(".tab-title").css("padding-top",paddingTop*max);
		} else {
			percent = Math.floor(100/$li.length);
			$li.each(function(n,el){
				var $el = $(el);
				$el.children("a").css({
					"margin-left" : percent*n+"%",
					"width" : percent+"%",
					"top" : 0
				});
			});
			$li.parent(".tab-title").removeAttr("style");
		}
	});
};
//IMAGE SLIDER
var imageSlider = [];

function ImageSlider(el, option){
	var opt = $.extend({
		"startPage" : 0,
		"addClass" : "on"
	}, option);

	var _this = this;
	var container = $(el);
	var showImageBox = container.find(".contents-group > *:first-child");
	var itemList = container.find(".item-frame > ul");
	var items = container.find(".item-frame > ul > li > a");
	var prevBt = container.find(".btn_prev_page");
	var nextBt = container.find(".btn_next_page");
	var prevBt_m = container.find(".btn-left");
	var nextBt_m = container.find(".btn-right");

	var pageItemNum = 8;
	var pageTotal = Math.ceil(items.length / pageItemNum);
	var curPage = parseInt(opt.startPage);
	this.curPage = curPage;
	var itemNum = 0;
	this.itemNum = itemNum;

	//console.log("pageTotal::"+pageTotal+" curPage::"+curPage);

	this.init = function(){
		if(window.device == "mobile"){
			pageItemNum = 3;
			pageTotal = Math.ceil(items.length / pageItemNum);
		}else{
			pageItemNum = 8;
			pageTotal = Math.ceil(items.length / pageItemNum);
		}
		this.setPage(curPage);
		this.curPage = curPage;
		//this.setImage(itemNum);
		$(window).trigger("imageSliderComplete");
	}

	this.setPage = function(num){
		if(num < 0){
			num = 0;
		}else if(num > pageTotal -1){
			num = pageTotal -1;
		}
		items.each(function(i){
			if(i >= num * pageItemNum && i < (num+1) * pageItemNum){
				$(this).parent("li").css("display", "block");
			}else{
				$(this).parent("li").css("display", "none");
			}
		});
		curPage = num;
		this.curPage = curPage;
		$(this).trigger("change");
	}

	prevBt.click(function(e){
		if(curPage > 0) _this.setPage(curPage-1);
		e.preventDefault();
	});
	nextBt.click(function(e){
		if(curPage < pageTotal -1) _this.setPage(curPage+1);
		e.preventDefault();
	});
	prevBt_m.click(function(e){
		if(curPage > 0) _this.setPage(curPage-1);
		e.preventDefault();
	});
	nextBt_m.click(function(e){
		if(curPage < pageTotal -1) _this.setPage(curPage+1);
		e.preventDefault();
	});

	this.setImage = function(itemNum){
		var activeItem = items.parent().eq(itemNum).find("img").clone();
		showImageBox.children().remove();
		showImageBox.html(activeItem);
	}

	items.click(function(e){
		itemNum = $(this).closest("li").index();
		_this.setImage(itemNum);
		e.preventDefault();
	});

	this.init();

    $(window).on("deviceChange",function(e, device){
        if(device == "mobile"){
            pageItemNum = 3;
            pageTotal = Math.ceil(items.length / pageItemNum);
        }else{
            pageItemNum = 8;
            pageTotal = Math.ceil(items.length / pageItemNum);
        }
        _this.setPage(curPage);
    });
}
