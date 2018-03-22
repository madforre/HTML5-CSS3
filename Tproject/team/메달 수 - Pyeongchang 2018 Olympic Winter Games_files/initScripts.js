/**
 * Funciones que se ejecutan cuando el HTML_Document está cargado y el DOM está listo para usarse
 */
$(document).ready(function() {
	/** Shadowbox.init();* */
	$.ajaxSetup({
		// Disable caching of AJAX responses
		cache : false
	});
	retrievePreferedCountry();
	initCurrentDayIndicator();
	initClickableScheduleRows();
	initCurrentPageLink();
	cleanCookies();

});

// Called after all ajax executions
$(document).ajaxStop(function () {


	// Restore cookies to show/hide divs 
	restoreDivs();
	
});

/**
 * Indicador de día actual
 */
initCurrentDayIndicator = function() {
	var currentTime = new Date();
	var mm = currentTime.getMonth() + 1;
	var dd = currentTime.getDate();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	var currentDay = currentTime.getFullYear() + "-" + mm + "-" + dd;
	$("#TopSchedule" + currentDay).addClass("CurrentDay");
};
/**
 * Iniciador de eventos para las capas de splits de todos los deportes. Al llevar parámetros se debe inicialiar en las páginas de deporte y no de manera general finishStatus puede traer varios estados
 * a controlar separados por comas
 */
initCurrentSplit = function(currentSplit, finishStatus, isOnlyNumeric) {
	var iCurrentSplit;
	isOnlyNumeric = (typeof isOnlyNumeric == "undefined") ? true : isOnlyNumeric;
	if (isOnlyNumeric) {
		iCurrentSplit = 0;
		try {
			iCurrentSplit = parseInt(currentSplit);
		} catch (e) {
			iCurrentSplit = -1;
		}
	} else {
		iCurrentSplit = currentSplit;
	}
	$('.split_box[number="' + iCurrentSplit + '"] .split_box_header').addClass("split_box_header_start");
	
	// Abrimos todos los splits
	/*
	  var statusArray = finishStatus.split(',');
	  if (isOnlyNumeric) {
		if ((iCurrentSplit > -1) && (jQuery.inArray(currentSplit, statusArray) == -1)) {
			showAllSplits($('.split_all_button'));
			//showAllSplits($parent(this).children($('.split_all_button')));
		}
	} else {
		if ((currentSplit != '') && (jQuery.inArray(currentSplit, statusArray) == -1)) {
			showAllSplits($('.split_all_button'));
			//showAllSplits($parent(this).children($('.split_all_button')));a
		}
	}*/
	// inicializamos el botón de mostrar todo si hay otros botones mostrar en la página
	setTimeout(function() {
		initShowAllSplitButton();
		restoreDivs();
	}, 200);
	
	
	
	
	
};
/**
 * Busca todos los botones "show" y activa el botón "show all" si encuentra alguno
 */
initShowAllSplitButton = function() {
	var n_buttons = 0;
	$('.split_button').each(function() {
		if ($(this).attr('split') != undefined) {
			n_buttons++;
		}
	});
	if (n_buttons > 0) {
		$('.split_all_button').show();
	}
};
/**
 * posiciona el scroll del navegador de event units para que la unita actual sea visible en pantalla
 */
scrollThumbnailToActualEventUnit = function() {
	var href = $(location).attr('href');
	var link = href.substr(href.lastIndexOf('/') + 1);
	var $event_unit_link = $('.UnitNavigatorContainer a[href*="' + link + '"]');
	var $scrollerObject = $('#ts2');
	var $scroller = $scrollerObject.children(".jTscrollerContainer").children(".jTscroller");
	var $scrollerPrevButton = $scrollerObject.children(".jTscrollerPrevButton");
	var $scrollerNextButton = $scrollerObject.children(".jTscrollerNextButton");
	var totalWidth = $scrollerObject.outerWidth(true);
	$event_unit_link.parent().parent().addClass("UnitNavigatorCurrent");
	$scrollerObject.thumbnailScroller({
	    scrollerType : "clickButtons",
	    scrollerOrientation : "horizontal",
	    scrollEasingAmount : 100,
	    scrollSpeed : 700
	});
	var n_scrolls = 0; // para evitar deadlocks
	var pix_to_scroll = 0; // nº de pixels a desplazar el slider
	isVisible = function() {
		try {
			var element_x = $event_unit_link.position().left;
			var element_width = $event_unit_link.width() / 2; // que al menos se vea la mitad de la caja
			return (((element_x + element_width) - pix_to_scroll) <= totalWidth);
		} catch (e) {
			return true;
		}
	};
	scrollNext = function() {
		if (n_scrolls == 0) {
			$scrollerPrevButton.stop().show("fast");
		}
		n_scrolls++;
		pix_to_scroll += $scrollerObject.width();
		if (pix_to_scroll > ($scroller.width() - totalWidth)) {
			pix_to_scroll = $scroller.width() - totalWidth;
		}
		if (!isVisible() && (n_scrolls < 50)) {
			scrollNext();
		} else {
			$scroller.stop().animate({
				left : "-=" + pix_to_scroll
			}, function() {
				var scroll_x = $scroller.position().left;
				var scroll_w = $scroller.width();
				if ((scroll_w + scroll_x) <= totalWidth) {
					$scrollerNextButton.stop().hide("fast");
				}
			});
		}
	};
	if (!isVisible()) {
		scrollNext();
	}
};
initClickableScheduleRows = function() {
	// clickable rows
	$("tr.clickable-schedule-row").click(function() {
		var url = $(this).data("url");
		if (url) {
			window.document.location = url;
		}
	});
	$("tr.clickable-schedule-row").hover(function() {
		var url = $(this).data("url");
		$(this).parent().find("tr.clickable-schedule-row[data-url='" + url + "']").addClass("clickable-schedule-row-hover");
	}, function() {
		var url = $(this).data("url");
		$(this).parent().find("tr.clickable-schedule-row[data-url='" + url + "']").removeClass("clickable-schedule-row-hover");
	});
	// alert('load');
}
initClickableEvents = function() {
	// clickable rows
	$(".LinksList .LinkEventBox").click(function() {
		var url = $(this).children().find("a").attr("href");
		if (url) {
			window.document.location = url;
		}
	});
	$(".LinksList .LinkEventBox").hover(function() {
		$(this).css("cursor", "pointer");
		$(this).css("cursor", "hand");
	}, function() {
	});
}
initShowLiveMatchStats = function() {
	$(".liveMatchContainer").click(function() {
		var statDiv = $(this).children(".liveMatchStats");
		if (statDiv.css("display") === "none") {
			statDiv.show();
			$(this).children(".liveMatchMoreInformation").html("-");
		} else {
			statDiv.hide();
			$(this).children(".liveMatchMoreInformation").html("+");
		}
	});
}
initColumnMyTime = function(competition) {
	var timeZone = "";
	if (competition == "CG2018-") {
		timeZone = "Australia/Brisbane";
	} else if (competition == "OWG2018") {
		timeZone = "Asia/Seoul";
	} else if (competition == "PWG2018") {
		timeZone = "Asia/Seoul";
	}else if (competition == "ECG2018") {
		timeZone = "Europe/London";
	}
	var clientTimeZone = moment.tz.guess();
	if (timeZone == clientTimeZone) {
		$('.ScheduleMyTime').hide();
	}
}
initPopovers = function() {
	$('[data-toggle="popover"]').popover();
}
initCurrentPageLink = function(){
	var pathName = window.location.href;
	var link = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
	$('li a[href$="' + link + '"]').each(function() {
		$(this).addClass("current");
	});	
}

initImgSrc = function(){
	var hostname = $(location).attr('host'); 
	var protocol = $(location).attr('protocol');
	var port = $(location).attr('port');
	var context = 'irs/';
	$('img').each(function() {
		var $img = $(this);
	    var imgsrc = $img.attr('src');
	    if (!imgsrc.indexOf(hostname)){
	    	imgsrc = protocol +'//'+ hostname+ '/' + context + imgsrc;
	    	$img.attr('src',imgsrc);
	    }
	    
	});
}

restoreDivs = function(){
	var pathName = window.location.href;
	var athlete = "";
	pathName = pathName.substring(pathName.lastIndexOf('page')+5, pathName.length);
	$('.split_button').each(function(){
	    var index =$(this).attr('split');
	    athlete = $(this).closest('tr').find('.nameLine').find('a').attr('href');
	    if (athlete!=undefined)
	    	athlete = athlete.substring(athlete.lastIndexOf('page')+5, athlete.length);
	    var val = $.cookie(pathName+';'+athlete);
	    var all = $.cookie(pathName+'all');
	    // Primero se ejecutan los generales
	    if ( all == '-' ){
	    	$('#splits_'+index).css("display", "table-row");
	    	$(this).attr("Value", "-");
	    }else if( all == '+'){
	    	$('#splits_'+index).css("display", "none");
	    	$(this).attr("Value", "+");
	    }
	    
	    //...y luego los particulares
	    if ( val == 's'  ){
	    	$('#splits_'+index).css("display", "table-row");
	    	$(this).attr("Value", "-");
	    }else if( val == 'h'){
	    	$('#splits_'+index).css("display", "none");
	    	$(this).attr("Value", "+");
	    }
		
	});
	
	$('.split_all_button').attr("Value",$.cookie(pathName+'all'));
	
	// Keep status div in cookies
	$('.split_button').click(function(){
		//var index = $(this).attr('split');
		
		var athlete = "";
		athlete = $(this).closest('tr').find('.nameLine').find('a').attr('href');
		athlete = athlete.substring(athlete.lastIndexOf('page')+5, athlete.length);
	    var v=$(this).attr("Value");
	    if ( v == '+' )
		{
			$.cookie(pathName+";"+ athlete, 'h');
	        
		}
		else
		{
			$.cookie(pathName+";"+ athlete, 's');			
		}
	});
	
	// Creamos un controlador del botton all
	$('.split_all_button').click(function(){
		// Limpiamos las cookies que hubiera
		cleanCookies();
		// Recogemos el valor del botón: + o -
		var v=$(this).attr("Value");
		
		// Guardamos una cookie del botón general.
		$.cookie(pathName+"all", v);
	});
}

cleanCookies = function(){
	var pathName = window.location.href;
	pathName = pathName.substring(pathName.lastIndexOf('page')+5, pathName.length);
	var date = new Date();
	date.setTime(date.getTime());
	
	$.each($.cookie(), function(i, v) {
		if (i.indexOf(pathName)>=0)
			$.cookie(i, null, { expires: date });
	});

}


initWidgetImg = function(){
	var context = 'https://web.pyeongchang2018.com/results/OWG2018/resOWG2018/';

	$('img.widgetLink').each(function() {
		var $img = $(this);
	    var imgsrc = $img.attr('src');
	    if (!imgsrc.indexOf(hostname)){
	    	imgsrc = context + imgsrc;
	    	$img.attr('src',imgsrc);
	    }
	    
	});
	
}

/*
initTimeline = function(){
	
}*/

