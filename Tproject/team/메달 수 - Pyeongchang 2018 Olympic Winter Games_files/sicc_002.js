/*
* 공통 자바스크립트 함수 정의
* 2017-07-14 create by ohjongsung
* 함수 목록
* - 각 항목 검색 후, 적절하게 사용
* 01. fn_SetHtmlData  : html객체의 값을 세팅한다.(input tag의 모든 타입)
* 02. fn_GetHtmlData  : html객체의 값을 가져온다.(input tag의 모든 타입)
* 03. fn_CallPopup    : Popup 호출 (스크롤 no, 팝업 위치 지정)
* 04. fn_CallPopup2   : Popup 호출 (스크롤 yes, 화면 중앙 위치)
* 05. fn_CallPopup3   : Popup 호출 (스크롤 no, 화면 중앙 위치)
* 06. fn_SetSelectBox : code||val@@code||val 형식의 optionList를 split해서 옵션을 만들어준다.
* 07. fn_SetOption    : optionValue, selectText로 하나의 옵션을 추가한다.
* 08. fn_DeleteOption : 옵션 모두 삭제
* 09. fn_Trim         : String 공백 제거
* 10. fn_StrReplace   : String 문자열 치환
* 11. fn_KeypressNumber : onkeypress 이벤트(숫자만입력)
* 12. fn_KeypressDotNumber : onkeypress 이벤트(숫자/dot만입력)
* 13. fn_KeypressNumberBar : onkeypress 이벤트(숫자/'-'만입력)
* 14. fn_KeyupNextTab : onkeyup 이벤트(입력값체크후다음입력필드로이동)
* 15. isNumeric(str) : 숫자체크
* 16. isAlpha(str) : 영문체크
* 17. isAlphaNumeric(str) : 영문/숫자체크
* 18. isHangul(str) : 한글체크(문자열에한글이외의값이있다면:false)
* 19. isHangulNumeric(str) : 한글/숫자체크
* 20. isBlank(str) : 공백문자체크(공백으로만된경우:true)
* 21. isWithBlank(str) : 공백포함체크(문자열에공백이포함된경우:true)
* 22. isValidEmail : 이메일 체크
* 23. isValidExtension : 파일 확장자 체크
* 24. isSelectedOption : select box 옵션 선택 유무 체크
* 25. isEmptyValue : input type text 의 값 유무 체크 (비어있으면:true)
* 26. isEmptyValueComment : input type text 의 값 유무 체크 (비어있으면 true), 경고창으로 메시지 보여준다.
* 27. fn_GetCookie : 쿠키값을 가져온다.
* 28. fn_SetCookie : 쿠키값을 세팅한다.
* 29. fn_DelCookie : 쿠키를 삭제한다.
* 30. doAjax : Ajax 통신을 한다. doAjax_params_default 형식의 파라미터가 필요하다.
* 31. comma : 문자열에 컴마를 붙인다.
* 32. uncomma : 문자열에 컴마를 제거한다.
*/

/*
 * 상수정의
 * */

/*
 * ajax 통신을 위한 파라미터
 * example
 * $('.button').on('click', function() {
 *      var params = doAjax_params_default;
 *      params.url = `your url`;
 *      params.data = `your data`;
 *      params.successCallbackFunction = `your success callback function`
 *      doAjax(params);
 * });
 * */

var doAjax_params_default = {
    'url': null,
    'requestType': "POST",
    'contentType': 'application/x-www-form-urlencoded; charset=UTF-8',
    'dataType': 'json',
    'data': {},
    'beforeSendCallbackFunction': null,
    'successCallbackFunction': null,
    'completeCallbackFunction': null,
    'errorCallBackFunction': null,
};

/*
 * html객체의 값을 setting
 * id : 객체 id
 * value : 입력될 값
 * */
function fn_SetHtmlData(id, value){
    var obj = document.getElementById(id);
    if(typeof(obj) == "undefined"){
        alert("객체가 없습니다.");
        return;
    }
    var type = obj.type;
    if (type == undefined){
    	type = obj.tagName.toLowerCase();
    }
    if(type == "radio"){
        var arrObj = document.getElementsByName(id);
        for(var loop=0; loop<arrObj.length; loop++){
            if(arrObj[loop].value == value){
                arrObj[loop].checked = true;
                break;
            }
        }
    }else if(type == "select-one"){
        for(var loop=0; loop<obj.options.length; loop++){
            if(obj.options[loop].value == value){
                obj.selectedIndex = loop;
                break;
            }else{
                obj.selectedIndex = -1;
            }
        }
    }else if(type == "checkbox"){
        if(value);
        if(value == "Y"){
            obj.checked = true;
        }else{
            obj.checked = false;
        }
    }else if(type == "text"){
        obj.value = value;
    }else if(type == "textarea"){
        obj.value = value;
    }else if(type == "hidden"){
        obj.value = value;
    }else if(type == "span"){
        obj.textContent = value;
    }
}

/*
 * html객체의 값을 가져온다
 * id : 객체 id
 * return String
 * */
function fn_GetHtmlData(id){
    var obj = document.getElementById(id);
    var type = obj.type;
    if (type == undefined){
    	type = obj.tagName.toLowerCase();
    }
    if(type == "radio"){
        var arrObj = document.getElementsByName(id);
        for(var loop=0; loop<arrObj.length; loop++){
            if(arrObj[loop].checked){
                return arrObj[loop].value;
            }
        }
        return "";
    }else if(type == "select-one"){
        return obj.value;
    }else if(type == "checkbox"){
        if(obj.checked){
            return "Y";
        }else{
            return "N";
        }
    }else if(type == "text"){
        return obj.value;
    }else if(type == "textarea"){
            return obj.value;
    }else if(type == "hidden"){
        return obj.value;
    }else if(type == "span"){
    	return  obj.textContent;
    }
}

/*
 * Popup 호출
 * url : url
 * name : 창이름
 * width : 넓이
 * height : 높이
 * posTop,posLeft : 창위치
 * */
function fn_CallPopup(url,popupName,width,height,posTop,posLeft){
    returnValue = null;
    if(callback != "" && typeof(callback) != "undefined"){
        callbackFunction = callback;
    }else{
        callbackFunction = "";
    }
    // default
    if ( height == '' || height == 'undefined' ) height = 550;
    if ( width == '' || width == 'undefined' ) width = 600;

    x = (screen.availWidth - width) / 2;
    y = (screen.availHeight - height) / 2;
    window.open(url,popupName,'scrollbars=no,toolbar=no,resizable=no,status=yes,menubar=no,location=no,width='+width+',height='+height+',left='+posLeft+',top='+posTop+'');
}
function fn_CallPopup2(url,popupName,width,height,posTop,posLeft){
    returnValue = null;
    if(callback != "" && typeof(callback) != "undefined"){
        callbackFunction = callback;
    }else{
        callbackFunction = "";
    }
    // default
    if ( height == '' || height == 'undefined' ) height = 550;
    if ( width == '' || width == 'undefined' ) width = 600;

    x = (screen.availWidth - width) / 2;
    y = (screen.availHeight - height) / 2;
    window.open(url,popupName,'scrollbars=yes,toolbar=no,resizable=no,status=yes,menubar=no,location=no,width='+width+',height='+height+',left='+x+',top='+y+'');
}
function fn_CallPopup3(url,popupName,width,height,posTop,posLeft){
    returnValue = null;
    if(callback != "" && typeof(callback) != "undefined"){
        callbackFunction = callback;
    }else{
        callbackFunction = "";
    }
    // default
    if ( height == '' || height == 'undefined' ) height = 550;
    if ( width == '' || width == 'undefined' ) width = 600;

    x = (screen.availWidth - width) / 2;
    y = (screen.availHeight - height) / 2;
    window.open(url,popupName,'scrollbars=no,toolbar=no,resizable=no,status=yes,menubar=no,location=no,width='+width+',height='+height+',left='+x+',top='+y+'');
}

/*
 * optionList 형식 : code||val@@code||val
 * objId : select id
 *
 **/
function fn_SetSelectBox(objId, optionList){
    obj = document.getElementById(objId);
    obj.options.length = 0;

    var rowData = optionList.split("@@");
    for(var loop=0; loop<rowData.length; loop++){
        var data = rowData[loop].split("||");
        if(data.length == 2){
            //obj.add(new Option(data[1],data[0]));
            fn_SetOption(obj, data[0], data[1]);
        }
    }
}
function fn_SetOption(selectObject, optionValue, selectText) {
    var newOption = new Option(selectText, optionValue, false, false);
    selectObject.options[selectObject.length] = newOption;
}
function fn_DeleteOption(selectObject) {
    if (selectObject != null) {
        for(var i = selectObject.options.length; i > 0; i--){
            selectObject.options.remove(i-1);
        }
    }
}

/*
 * String 공백 제거
 **/
function fn_Trim(st) {
    //return st.replace(/[^\s]+|[\s+]$/g,"");
    st = fn_LTrim(st);
    st = fn_RTrim(st);
    return st;
}
function fn_LTrim(st) {
    return st.replace(/^\s+/,"");
}
function fn_RTrim(st) {
    return st.replace(/\s+$/,"");
}
/*
 * String 문자열 치환
 * args : 문자열
 * ch1  : 기존 문자
 * ch2  : 치환 문자
 **/
function fn_StrReplace ( args, ch1, ch2 ) {
    if (ch1 == ch2)  {  return args;  }
    while(args.indexOf(ch1) != -1) {
        args = args.replace(ch1,ch2);
    }
    return args;
}

/*
 * - onkeypress 이벤트(숫자만입력)
 **/
function fn_KeypressNumber() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) event.returnValue = false;
}
/*
 * - onkeypress 이벤트(숫자/dot만입력)
 */
function fn_KeypressDotNumber() {
    if (((event.keyCode < 48) || (57 < event.keyCode)) && (46 != event.keyCode)) event.returnValue=false;
}
/*
 * - onkeypress 이벤트(숫자/'-'만입력)
 */
function fn_KeypressNumberBar(){
    if ((48<=event.keyCode && event.keyCode<=57) || (event.keyCode==45)) event.returnValue=false;
}
/*
 * - onkeyup 이벤트(입력값체크후다음입력필드로이동)
 *
 * input    : input element
 * next     : next input element
 * inputlen : input value length
 */
function fn_KeyupNextTab(input, next, inputlen) {
    if (input.value.length == inputlen) {
        next.focus();
        return;
    }
}

/*
* isNumeric(str)
* - 숫자체크
*/
function isNumeric(str) {
    var regExp = /\D/i;
    if (regExp.test(str)) return false;
    else return true;
}
/*
 * isAlpha(str)
 * - 영문체크
 *
 * @param str
 * @return
 */
function isAlpha(str) {
    var regExp = /[^a-z]/i;
    if (regExp.test(str)) return false;
    else return true;
}
/*
 * isAlphaNumeric(str)
 * - 영문/숫자체크
 *
 * @param str
 * @return
 */
function isAlphaNumeric(str) {
    var regExp = /[^a-z0-9]/i;
    if (regExp.test(str)) return false;
    else return true;
}
/*
 * isHangul(str)
 * - 한글체크(문자열에한글이외의값이있다면:false)
 *
 * @param str
 * @return
 */
function isHangul(str) {
    if (str.length > 0 ) {
        for (var i = 0; i < str.length; i++)
            if (str.charCodeAt(i) < 128 )
                return false;
    }
    return true;
}
/*
 * isHangulNumeric(str)
 * - 한글/숫자체크
 *
 * @param str
 * @return
 */
function isHangulNumeric(str) {
    for (var i = 0; i < str.length; i++) {
        var chr = str.substr(i, 1);
        if (!(chr < '0' || chr > '9')) continue; // 숫자
        chr = escape(chr);
        if (chr.charAt(1) == 'u') {
            chr = chr.substr(2, (chr.length - 1));
            if((chr < 'AC00') || (chr > 'D7A3'))
                return false;
        } else return false;
    }
    return true;
}
/*
 * isBlank(str)
 * - 공백문자체크(공백으로만된경우:true)
 *
 * @param str
 * @return
 */
function isBlank(str) {
    var regExp = /^[\s]+$/i;
    if (regExp.test(str) || str.length == 0) return true;
    else return false;
}
/*
 * isWithBlank(str)
 * - 공백포함체크(문자열에공백이포함된경우 :false)
 *
 * @param str
 * @return
 */
function isWithBlank(str) {
    var regExp = /\s/i;
    if (regExp.test(str)) return true;
    else return false;
}
/*
 * isValidEmail(str)
 * - 이메일체크
 */
function isValidEmail(str) {
    //var regExp = /^[a-z0-9]{2,}@([a-z0-9-]+){2,}(\.[a-z]{2,}){1,}$/i;
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regExp.test(str)) return true;
    else return false;
}
/*
 * isValidExtension(String strFileName, String strExtension, boolean allowDeny) - input file 확장자 체크
 *
 * strFileName
 * strExtension - 확장자스트링 (구분자 '|')
 * isDeny - false : strExtension 에 등록된 확장자만 허용, true : strExtension 에 등록된것을 제외한 확장자만 허용
 */
function isValidExtension(strFileName, strExtension, isDeny) {
    var extension = "";
    var isMatches = isDeny;
    var index = strFileName.lastIndexOf('.');
    var arrayExtension = strExtension.split("|");

    if (index != -1) extension = strFileName.substring(index + 1, strFileName.length);
    if (extension.lastIndexOf('\\') != -1) extension = "";
    if (extension == "") return false;

    for (i = 0; i < arrayExtension.length; i++) {
        if (extension.toLowerCase() == arrayExtension[i]) {
            isMatches = !isMatches;
            break;
        }
    }
    return isMatches;
}
/*
 * isSelectedOption(id)
 * - select box 0번째 옵션이 선댁되었는지 체크
 *
 * id
 */
function isSelectedOption(id) {
	var obj = document.getElementById(id);
    if (obj.selectedIndex == 0) {
    	obj.focus();
        return false;
    }
    return true;
}
/*
 * isEmptyValue(id)
 * - input type text 의 값 유무 체크 (비어있으면 true)
 *
 * id
 */
function isEmptyValue(id) {
	var obj = document.getElementById(id);
    if (isBlank(obj.value)) {
        return true;
    }
    return false;
}
/*
 * isEmptyValueComment(id, comment)
 * - input type text 의 값 유무 체크 , 경고창으로 메시지 보여준다.
 *
 * id
 * comment
 */
function isEmptyValueComment(id, comment) {
	var obj = document.getElementById(id);
    if (isBlank(obj.value)) {
    	alert(comment);
    	obj.focus();
        return true;
    }
    return false;
}
/*
 * fn_GetCookie
 * 쿠키 값을 가져온다.
 */
function fn_GetCookie(name) {
    var name = name + "=";
    var nLen = name.length;
    var cLen = document.cookie.length;
    var i = 0;

    while ( i < cLen ) {
        var j = i + nLen;
        if (document.cookie.substring(i, j) == name) {
            var end = document.cookie.indexOf(";", j);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(j, end)); //쿠키값 반환
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) {
            break;
        }
    }
    return "";
}
/*
* fn_SetCookie
* 쿠키 값을 세팅한다.
*/
function fn_SetCookie(name, value) {
    var expires = new Date();
    var path, domain, secure;
    var arg = setCookie.arguments;
    var aLen = setCookie.arguments.length;

    if (aLen > 2) {
        expires.setTime(expires.getTime() + (1000*60*arg[2]));  // arg[2] : 분단위로 호출
    } else {
        expires = null;
    }
    path = (aLen > 3)   ? arg[3] : null;
    domain = (aLen > 4) ? arg[4] : null;
    secure = (aLen > 5) ? arg[5] : false;

    document.cookie = name + "=" + escape(value) +
        ((expires == null) ? "" : (";expires=" + expires.toGMTString())) +
        ((path == null) ? "" : (";path=" + path)) +
        ((domain == null) ? "" : (";domain=" + domain)) +
        ((secure == true) ? " ;secure" : "" );
}
/*
 * fn_DelCookie
 * 쿠키를 삭제한다.
 */
function fn_DelCookie(name) {
    var expires = new Date();
    expires.setDate(expires.getDate() - 1);
    document.cookie = name + "=" + (";expires=" + expires.toGMTString()) + (";path=/");
}

function doAjax(doAjax_params) {

    var url = doAjax_params['url'];
    var requestType = doAjax_params['requestType'];
    var contentType = doAjax_params['contentType']; 
    var dataType = doAjax_params['dataType'];
    var data = doAjax_params['data'];
    var beforeSendCallbackFunction = doAjax_params['beforeSendCallbackFunction'];
    var successCallbackFunction = doAjax_params['successCallbackFunction'];
    var completeCallbackFunction = doAjax_params['completeCallbackFunction'];
    var errorCallBackFunction = doAjax_params['errorCallBackFunction'];

    $.ajax({
        url: url,
        crossDomain: true,
        type: requestType,
        contentType: contentType, 
        dataType: dataType,
        data: data,
        beforeSend: function(jqXHR, settings) {
            if (typeof beforeSendCallbackFunction === "function") {
                beforeSendCallbackFunction();
            }
        },
        success: function(data, textStatus, jqXHR) {
            if (typeof successCallbackFunction === "function") {
                successCallbackFunction(data);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (typeof errorCallBackFunction === "function") {
                errorCallBackFunction(errorThrown);
            }

        },
        complete: function(jqXHR, textStatus) {
            if (typeof completeCallbackFunction === "function") {
                completeCallbackFunction();
            }
        }
    });
}

/*
* comma
* 문자열에 컴마를 붙인다.
*/
function comma(str) {
    str = String(str);
    var reg = /(^[+-]?\d+)(\d{3})/;

    while (reg.test(str)) {
    	str = str.replace(reg, '$1' + ',' + '$2');
    }

    return str;
}

/*
* uncomma
* 문자열에 컴마를 제거한다.
*/
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d.]+/g, '');
}

function replaceHrefwidget(param) {
	$(param).each(function() {
		var $linkVar = $(this);
		var linkHref = $linkVar.attr("href");
		linkHref = page_prefix + linkHref;
		$linkVar.attr("href", linkHref);
	});
}