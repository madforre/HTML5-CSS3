function sendSns(sns, url, txt)
{
	var hashSns = location.hash;
	var hashSnsUrl="";
	if(hashSns != ""){
		var hashSns_array = hashSns.split("#!");
		if(hashSns_array[1] != ""){
			hashSnsUrl="#!"+hashSns_array[1];
		}
		if(hashSnsUrl == "" || hashSnsUrl == "#!undefined"){
			var hashSns_arr = hashSns.split("#");
			if(hashSns_arr[1] != ""){
				hashSnsUrl="#"+hashSns_arr[1];
			}
		}
		
	}
	url = url+hashSnsUrl;
	
	var o;
    
    var _url = encodeURIComponent(url);
    var _txt = encodeURIComponent(txt);
    var _br  = encodeURIComponent('\r\n');
 
    switch(sns)
    {
        case 'facebook':
            o = {
                method:'popup',
                url:'http://www.facebook.com/sharer/sharer.php?u=' + _url
            };
            break;
 
        case 'twitter':
            o = {
                method:'popup',
                url:'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url
            };
            break;

        case 'google':
            o = {
                method:'popup',
                url:'https://plus.google.com/u/0/share?url=' + _url
            };
            break;

        case 'pinterest':
            o = {
                method:'popup',
                url:'http://pinterest.com/pin/create/button/?url=' + _url
            };
            break;

        case 'linkedin':
            o = {
                method:'popup',
                url:'https://www.linkedin.com/cws/share?url=' + _url
            };
            break;

        case 'kakao':
            o = {
                method:'mobile',
                url:_url
            };
            break;
            
        case 'bandWeb':
            o = {
                method:'popup',
                url:'http://band.us/plugin/share?route' + _url
            };
            break;

        case 'band':
            o = {
                method:'mobile',
                url:'bandapp://create/post?route' + _url
            };
            break;

        case 'line':
            o = {
                method:'popup',
                url:'http://line.me/R/msg/text/?' + _url
            };
            break;

        case 'kakaostory':
            o = {
                method:'popup',
                url:'https://story.kakao.com/share?url=' + _url
            };
            break;
            
        case 'weibo':
            o = {
                method:'popup',
                url:'http://service.weibo.com/share/share.php?url=' + _url
            };
            break;
 
        default:
            alert('Not supported.');
            return false;
    }
 
    switch(o.method)
    {
        case 'popup':
            window.open(o.url);
            break;

        case 'mobile':
        	alert('Only available for mobile.');
            break;
    }
}