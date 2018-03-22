//Just for Venue Activity Monitor (VAM)
function VamPeriodicalUpdater(URL, name, period) {
	var loadingClass = 'loadingDivLarge';
	var ncall = 0;
	$.PeriodicalUpdater(URL, {
	    minTimeout : period * 1000,
	    maxTimeout : period * 1000 * 5,
	    method : 'get',
	    cache : true,
	    type : 'text',
	    multiplier : 1,
	    maxCalls : 0,
	    autoStop : 0,
	    verbose : 0,
	    runatonce : true
	}, function(remoteData, success, xhr, handle) {
		// ignoramos las páginas cacheadas
		if (xhr.status == 304) { return; }
		// La primera vez mostramos el 'Loading...'
		if (ncall == 0) {
			$('#' + name).addClass(loadingClass);
			setTimeout(function() {
				$('#' + name).empty().html(remoteData).removeClass(loadingClass);
			}, 500);
		} else {
			$('#' + name).empty().html(remoteData);
		}
		ncall++;
		// $('#'+name).effect("highlight", {}, 3000);
	});
}
/*
 * function loadPageToDiv(name,URL,period,callBack) { loadPageToDiv(name,URL,period,callBack, "Medium") }
 */
function loadPageToDiv(name, URL, period, callBack, animationSize) {	
	var loadingClass = 'loadingDiv';
	if ((typeof animationSize == 'undefined') || (animationSize == '')) {
		// loadingClass += 'Small';
		loadingClass = '';
	} else {
		loadingClass += animationSize;
	}
	// creamos un nuevo objeto ajax
	if (period == 0) {
		$.ajaxSetup({ cache: true });
		$('#' + name).addClass(loadingClass);
		$('#' + name).load(URL, function() {
			$('#' + name).removeClass(loadingClass);
			if (callBack) {
				callBack(name);
			}
		});
	} else {
		// USING : jquery.periodicalupdater
		// Para indicar que el contenido es dinámico si es la
		// primera llamada se muestran las capas de carga
		var ncall = 0;
		$.PeriodicalUpdater(URL, {
		    minTimeout : period * 1000,
		    maxTimeout : period * 1000 * 5,
		    method : 'get',
		    cache : true,
		    type : 'text',
		    multiplier : 1.1,
		    maxCalls : 200,
		    autoStop : 0,
		    verbose : 0,
		    runatonce : true
		}, function(remoteData, success, xhr, handle) {
			// ignoramos las páginas cacheadas
			if (xhr.status == 304) { return; }
			// los marcadores pequeños se actualizan "silenciosamente"
			if ((ncall == 0) && (loadingClass != 'loadingDivSmall')) {
				$('#' + name).addClass(loadingClass);
				setTimeout(function() {
					$('#' + name).empty().html(remoteData).removeClass(loadingClass);
				}, 500);
			} else {
				$('#' + name).empty().html(remoteData);
			}
			ncall++;
			if (callBack) {
				setTimeout(function() {
					callBack(name);
				}, 500);
			}
		});
	}
}
function setHeaderVisible(name, label) {
	var menuObj = $("#" + name);
	if (menuObj.is(":visible")) {
		menuObj.fadeOut(200);
	} else {
		$("div[id^='menuLayer']").fadeOut(200);
		// var offset = $(label).offset();
		var offset = $(label).position();
		var height = $(label).parent().parent().height();
		var newLeft = offset.left;
		var newTop = offset.top + height;
		menuObj.offset({
			top : newTop
		});
		menuObj.slideDown(300);
	}
}
function setSportVisible(name, button) {
	var menuObj = $("#" + name);
	var buttonObj = $("#" + button);
	if (menuObj.is(":visible")) {
		menuObj.fadeOut(200);
	} else {
		// Posicionado
		var cssobj = {
			left : buttonObj.position().left - 3
		};
		menuObj.css(cssobj);
		menuObj.slideDown(300);
	}
}
/*
 * Damos por supuesto que si hay enlace hay foto en disco, el CompetitorTag realiza la comprobaci�n
 */
function showPlayerPhoto(obj, URL) {
	var jObj = $(obj);
	var popupImg = $("<img src='" + URL + "'  style='width:45px;border:1px solid #FFFFFF;'></img>");
	var popupDiv = $("<div id='" + obj.id + "_div' style='position:absolute; z-index:1000000; width:45px;background-color:#FFF;'></div>");
	popupDiv.append(popupImg);
	var offset = jObj.offset();
	offset.left = jQuery(obj).offset().left + jQuery(obj).width();
	offset.top = jQuery(obj).offset().top - 22;
	popupDiv.offset(offset);
	jQuery(popupDiv).appendTo('body');
}
function hidePlayerPhoto(obj) {
	var divObj = $('#' + obj.id + '_div');
	if (divObj) {
		divObj.remove();
	}
}
function loadScheduleUnitFrames(RSC, LINE, LEV) {
	// DDSEEEPUU
	// ZZS158A_CCCCCCHB@@@@@@@ENG
	// 123456789012345678
	var JspID = "S058R_";
	var posit = RSC.search(JspID) + 13;
	var end = RSC.substring(posit + 8);
	var linkReportsEvent = RSC.substring(0, posit + 5);
	var linkReportsUnit = RSC;
	linkReportsEvent += "@@@" + end;
	loadPageToDiv("DIVSUBMENU" + LINE + "_1", linkReportsEvent, 0);
	if (LEV == "U") {
		loadPageToDiv("DIVSUBMENU" + LINE + "_2", linkReportsUnit, 0);
	}
	// Move result Box
	// moveResultBox(LINE);
}
function loadPageFrames(boxId, link) {
	// DDSEEEPUU
	// ZZS158A_CCCCCCHB@@@@@@@ENG
	// 123456789012345678
	var JspID = "S058R_";
	var posit = link.search(JspID) + 13;
	var end = link.substring(posit + 8);
	var linkReportsEvent = link.substring(0, posit + 5);
	linkReportsEvent += "@@@" + end;
	var linkReportsUnit = link;
	$('div[id^="DIVMENU"]').hide(0);
	// Posicionado
	if ($(document).innerWidth() >= 915) {
		var cssobj = {
		    top : $("#button_" + boxId).position().top,
		    left : $("#button_" + boxId).parent().position().left + $("#button_" + boxId).parent().width() + 10
		};
	} else {
		var cssobj = {
		    top : $("#button_" + boxId).position().top,
		    left : $("#button_" + boxId).parent().position().left + $("#button_" + boxId).parent().width() - 250
		};
	}
	$("#DIVMENU_" + boxId).css(cssobj);
	loadPageToDiv("DIVSUBMENU1_" + boxId, linkReportsEvent, 0);
	loadPageToDiv("DIVSUBMENU2_" + boxId, linkReportsUnit, 0);
	$("#DIVMENU_" + boxId).animate({
	    width : ['toggle', 'swing'],
	    height : ['toggle', 'swing'],
	    opacity : 'toggle'
	}, 200);
}
/*
 * Esta función mueve la caja de resultados a la linea de calendario seleccionada y cambia los estilos de la misma. si no se le pasa un valor, resetea su posici�n y estilo y hace scroll de la página
 * para que el elemento aparezca al principio de la p�gina
 */
function moveResultBox(sLine) {
	$('div[id^="DIVTITLE"]').show(0);
	$('div[id^="DIVMENU"]').hide(0);
	$("#DIVTITLE" + sLine).hide(0);
	$("#DIVMENU" + sLine).animate({
	    width : ['toggle', 'swing'],
	    height : ['toggle', 'swing'],
	    opacity : 'toggle'
	}, 400);
}
function slideDiv(name,e) {

	var code = (e.keyCode ? e.keyCode : e.which);
	if(e.keyCode==undefined || code == 13) { //another event or Enter keycode
		// Ocultamos/mostramos la capa destino
		$("#" + name).slideToggle(600, 'swing');
		$("#" + name + "-linkUp").toggle(0);
		$("#" + name + "-linkDown").toggle(0);
		$("#" + name).focus();
	}
}
/**
 * Función para mostar/ocultar todas las capas de Daily Competition Schedule, simula un slideDiv de todas las disciplinas del dia
 */
function showAllUp(e) {
	var code = (e.keyCode ? e.keyCode : e.which);

	if(e.keyCode==undefined || code == 13) { //another event or Enter keycode
		$('[id$=linkUp]').each(function() {
			$("#" + $(this).attr('id').split('-')[0] + "-" + $(this).attr('id').split('-')[1] + "-" + $(this).attr('id').split('-')[2]).hide();
			$("#" + $(this).attr('id')).hide();
			$("#" + $(this).attr('id').split('-')[0] + "-" + $(this).attr('id').split('-')[1] + "-" + $(this).attr('id').split('-')[2] + "-linkDown").show();
			
		});
	}
}
function showAllDown(e) {
	var code = (e.keyCode ? e.keyCode : e.which);

	if(e.keyCode==undefined || code == 13) { //another event or Enter keycode
		$('[id$=linkDown]').each(function() {
			$("#" + $(this).attr('id').split('-')[0] + "-" + $(this).attr('id').split('-')[1] + "-" + $(this).attr('id').split('-')[2]).show();
			$("#" + $(this).attr('id')).hide();
			$("#" + $(this).attr('id').split('-')[0] + "-" + $(this).attr('id').split('-')[1] + "-" + $(this).attr('id').split('-')[2] + "-linkUp").show();
		});
	}
}
function bioIPCButtons(name) {
	$("div[id^='BioData']").hide(0);
	$("#BioData" + name).show(200);
	$("div[id^='BioButton']").removeClass("BioButtonRed");
	$("#BioButton" + name).addClass("BioButtonRed");
}
function hideBegining(prefix) {
	$("div[id^='" + prefix + "']").hide(0);
}
function setDivName(label, destName) {
	var destObj = $("#" + destName);
	var textObj = $(label);
	destObj.text(textObj.text());
}
function chageSizeStyleSheet(css, save) {
	$("#linkSizeStyle").attr("href", css);
	if (save == 'true') {
		$.cookie('infoSizeStyleCookie', css, {
			expires : 7
		});
	}
}
function chageColorStyleSheet(css, save) {
	$("#linkColorStyle").attr("href", css);
	if (save == 'true') {
		$.cookie('infoColorStyleCookie', css, {
			expires : 7
		});
	}
}
function retrieveColorSizeCookies() {
	var sizeCookie = $.cookie('infoSizeStyleCookie');
	var colorCookie = $.cookie('infoColorStyleCookie');
	if (sizeCookie != undefined) {
		$("#linkSizeStyle").attr("href", sizeCookie);
	}
	if (colorCookie != undefined) {
		$("#linkColorStyle").attr("href", colorCookie);
	}
}
function retrievePreferedCountry() {
	var preferedCountry = $.cookie('infoWRPreferedCountry');
	if (preferedCountry != null) {
		$("#PreferedCountry").html(preferedCountry);
	}
}
function refreshPreferedCountry() {
	var preferedCountry = $.cookie('infoWRPreferedCountry');
	if (preferedCountry != null) {
		$("[attrCountryCode=" + preferedCountry + "]").addClass('cssPreferedCountry');
	}
}
function cleanPreferedCountry() {
	$("[class*=cssPreferedCountry]").removeClass('cssPreferedCountry');
}
function changePreferedCountry(country, save) {
	if (save == 'true') {
		$.cookie('infoWRPreferedCountry', country, {
			expires : 7
		});
	}
	cleanPreferedCountry();
	retrievePreferedCountry();
	refreshPreferedCountry();
}

function disableSelfLink() {
	var pathName = window.location.href;
	var link = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
	$('#SportAdditionalMenu .TopMenuLinks a[href*="' + link + '"]').each(function() {
		$(this).parent().prev('.TopMenuLinksSep').hide();
		$(this).parent().hide();
	});
}
function changeLinkReportStyle() {
	var pathName = window.location.href;
	var link = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
	/*
	 * $('#SportAdditionalMenu .TopMenuLinks a[href*="'+link+'"]').each(function(){ $(this).parent().addClass("TopMenuLinksSel"); });
	 */
	// Para que encuentre enlaces de url que estén sobreescritas
	// la condición pasa de "contiene el" a "la url acaba con"
	$('#SportAdditionalMenu .TopMenuLinks a[href$="' + link + '"]').each(function() {
		$(this).parent().addClass("TopMenuLinksSel");
	});
}
/*
 * function changeLinkReportStyle() { var pathName = window.location.href.toUpperCase(); var link = pathName.substring(pathName.lastIndexOf('/')+1, pathName.length); $('#SportAdditionalMenu
 * .TopMenuLinks a').each( function(){ var link =$(this).attr("href"); link=link.substring(link.lastIndexOf('/')+1, link.length).toUpperCase(); if (pathName.indexOf(link) > -1) {
 * $(this).parent().removeClass("TopMenuLinks").addClass("TopMenuLinksSel"); } } ); }
 */
function scrollTop(opciones) {
	var config = {
	    color : "rgba(255,0,0,0.8)",
	    altura : 400,
	    time : 400,
	    position : "middle",
	    speed : 500
	};
	$.extend(config, opciones);
	var scrollElem = scrollableElement('html', 'body');
	function scrollableElement(els) {
		for (var i = 0, argLength = arguments.length; i < argLength; i++) {
			var el = arguments[i];
			$scrollElement = $(el);
			if ($scrollElement.scrollTop() > 0) {
				return el;
			} else {
				$scrollElement.scrollTop(1);
				var isScrollable = $scrollElement.scrollTop() > 0;
				$scrollElement.scrollTop(0);
				if (isScrollable) { return el; }
			}
		}
		return [];
	}
	var capa = $("body");
	switch (config.position) {
		case "top":
			config.position = "90%";
			break;
		case "middle":
			config.position = "50%";
			break;
		case "bottom":
			config.position = "10%";
			break;
	}
	$(window).scroll(function() {
		if ($(window).scrollTop() > config.top) {
			capa.trigger("activa_flecha")
		} else {
			$("#arriba").animate({
			    bottom : config.position,
			    opacity : 0
			}, config.time, function() {
				$(this).remove();
			});
			creado = 0;
		}
	});
	var creado = 0;
	capa.on("activa_flecha", function(e) {
		if (creado == 0) {
			$("<a href='#' id='arriba'><span></span></a>").insertAfter(capa).animate({
				opacity : 1
			}, config.time).on("click", function(e, obj) {
				e.preventDefault();
				retirar($(this));
				$(scrollElem).animate({
					scrollTop : 0
				}, config.speed, "swing");
			});
			creado = 1;
		}
	});
	function retirar(obj) {
		obj.animate({
		    bottom : config.position,
		    opacity : 0
		}, config.time);
	}
}
// marcar con un estilo distinto el elemento y desmarcar el resto del mismo parent
selectFromList = function(item) {
	$(item).parent().find('.selectedStyle').removeClass('selectedStyle');
	$(item).addClass('selectedStyle');
};
/**
 * Función para mostar/ocultar la capa de splits btn: objeto que hace la llamada action [optional]: forzamos una acción (show, hide)
 */
function showSplit(btn, action) {
	var index = $(btn).attr("split");
	var value = $(btn).attr("value");
	if (action != undefined) {
		eval('$("#splits_"+index).' + action + '(100)');
		value = (action == 'show') ? '+' : '-';
	} else {
		$("#splits_" + index).toggle(100);
	}
	if (value == "+") {
		$(btn).addClass("split_button_minus");
		$(btn).removeClass("split_button_plus");
		$(btn).attr("Value", "-");
		$(btn).attr("title", $(btn).attr("hidetext"));
		$(btn).attr("aria-expanded", "true");
		$(btn).attr("aria-label", $(btn).attr("hidetext"));
	} else {
		$(btn).addClass("split_button_plus");
		$(btn).removeClass("split_button_minus");
		$(btn).attr("Value", "+");
		$(btn).attr("title", $(btn).attr("showtext"));
		$(btn).attr("aria-expanded", "false");
		$(btn).attr("aria-label", $(btn).attr("showtext"));
	}
}
/**
 * Función para mostar/ocultar todas las capas de splits de una página btn: objeto que hace la llamada
 */
function showAllSplits(btn) {
	var action = '';
	var value = $(btn).attr("value");
	if (value == "+") {
		$(btn).addClass("split_button_minus");
		$(btn).removeClass("split_button_plus");
		$(btn).attr("Value", "-");
		$(btn).attr("title", $(btn).attr("hidetext"));
		$(btn).attr("aria-expanded", "true");
		$(btn).attr("aria-label", $(btn).attr("hidetext"));
		action = 'show';
	} else {
		$(btn).addClass("split_button_plus");
		$(btn).removeClass("split_button_minus");
		$(btn).attr("Value", "+");
		$(btn).attr("title", $(btn).attr("showtext"));
		$(btn).attr("aria-expanded", "false");
		$(btn).attr("aria-label", $(btn).attr("showtext"));
		action = 'hide';
	}
	// buscamos todos los botones de split
	
	$(btn).closest('tbody').find('.split_button').each(function() {

		showSplit($(this), action);
	});
	
	cleanCookies();
}
/**
 * Si la altura de la capa de contenido es mayor de 340px crea una capa con gradiente y añade un botón "mostrar más"
 */
function applyShowMoreContent(name) {
	var element = $('#' + name), container = element.parent(), box = container.parent(), sidebox_h = element.innerHeight();
	if (sidebox_h > 340) {
		container.css('height', '340');
		container.css('overflow', 'hidden');
		container.append('<div class="SideBarGradientContent"></div>');
		box.append('<div class="SideBarFooterButtons"><div class="SideBarButtonMore" onclick="showMoreContent(this)"> + </div></div></div>');
	}
};
/**
 * Expande la capa restringida por la función applyShowMoreContent
 */
function showMoreContent(btn) {
	var box = $(btn).parent().parent(), container = box.children('.SideBarContainer'), gradient = container.children('.SideBarGradientContent');
	$(btn).hide();
	gradient.hide();
	container.css('height', 'auto');
	container.css('overflow', 'auto');
}
function scrollSchedule(side) {
	if (side == "R") {
		$("#TopBoxScheduleContainer").animate({
			left : '+=60px'
		});
	} else {
		$("#TopBoxScheduleContainer").animate({
			left : '-=60px'
		});
	}
}
function showBracketTree(bracket, index, obj,e) {
	var code = (e.keyCode ? e.keyCode : e.which);

	if(e.keyCode==undefined || code == 13) { //another event or Enter keycode
		var bracketContainer = $("#Bracket_" + bracket + " .bracketPhaseNavigatorContainer");
		var bracketTable = $("#Bracket_" + bracket + " .bracketPhaseNavigatorContainer .bracketTable");
		var bracketPhaseHeader = $("#Bracket_" + bracket + " .bracketPhaseNavigatorContainer .bracketTable th");
		var offset = bracketTable.width() - bracketContainer.width();
		var pos = bracketPhaseHeader.width() * index;
		if (pos>offset){
			pos=offset;
		}
		var shiftpos = "";	
		if (pos < 0) {
			shiftpos = "+=" + (pos * -1) + "px";
		} else {
			shiftpos = "-=" + pos + "px";
		}
		bracketTable.animate({
			left : -pos
		});
		$("#Bracket_" + bracket + " .bracketPhaseNavigatorSlider .bracketPhaseSelected").removeClass("bracketPhaseSelected");
	$(obj).addClass("bracketPhaseSelected");
	}
}
function getMyTime(myTimeDiv, dateValue, timeValue, competition) {
	var ret = "";
	var timeZone = "";
	if (competition == "CG2018-") {
		timeZone = "Australia/Brisbane";
	} else if (competition == "OWG2018") {
		timeZone = "Asia/Seoul";
	} else if (competition == "PWG2018") {
		timeZone = "Asia/Seoul";
	} else if (competition == "ECG2018") {
		timeZone = "Europe/London";
	}
	var clientTimeZone = moment.tz.guess();
	var eventDate = moment.tz(dateValue + " " + timeValue, "YYYY-M-D H:mm", timeZone);
	var clientDate = eventDate.clone().tz(clientTimeZone);
	clientDateFormat = clientDate.format("YYYY-MM-DD");
	clientTimeFormat = clientDate.format("H:mm");
	if (clientTimeFormat == "Invalid date") {
		ret = " ";
	}
	else	
		ret+= clientTimeFormat;
	

	$("#" + myTimeDiv).html(ret);
}

/**
 * Show all medallist by sport
 * */
function showAllUpMedallist(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if(e.keyCode==undefined || code == 13) { //another event or Enter keycode
		$('[id$=linkUp]').each(function() {
			$("#" + $(this).attr('id').split('-')[0]).hide();
			$("#" + $(this).attr('id')).hide();
			$("#" + $(this).attr('id').split('-')[0]+"-linkDown").show();
		});
	}
}
/**
 * Hide all medallist by sport
 * */
function showAllDownMedallist(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if(e.keyCode==undefined || code == 13) { //another event or Enter keycode
		$('[id$=linkDown]').each(function() {
			$("#" + $(this).attr('id').split('-')[0]).show();
			$("#" + $(this).attr('id')).hide();
			$("#" + $(this).attr('id').split('-')[0]+"-linkUp").show();
		});
	}
}
