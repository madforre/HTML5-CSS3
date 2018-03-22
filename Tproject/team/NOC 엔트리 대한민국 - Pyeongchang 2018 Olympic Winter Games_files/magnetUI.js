/**
 * Magnet Component
 * @deps: jquery v2.1.1+
 * @example:
 * 		var margnetMainNav = new mwUI.magnet('#mainNav');
 * 		var margnetBestNav = new mwUI.magnet('.nav_best_cate', {
 * 			topSpacing: 44
 *    	});
 */
var mwUI = {};

mwUI.magnet = (function($) {
	'use strict';

	var $win = $(window);

	function Magnet(element, options) {
		this.$el = $(element);
		this.opts = $.extend({}, Magnet.defaults, options);

        this.initialize();
	}

	Magnet.prototype.initialize = function() {
		var ua = navigator.userAgent.toLowerCase(),
			AOSVersion = parseFloat(ua.slice(ua.indexOf("android") + 8));

		// 안드로이드 2,3에서는 고정기능 사용하지 않음(클릭이슈)
        if (AOSVersion <= 3) {
            return;
        }

        this.$elOffsetTop = this.$el.offset().top;
        this.$elMarginTop = this.$el.css('margin-top');
        this.$elHeight = this.$el.outerHeight();
        this.addHandler();
	};

	Magnet.prototype.featureTest = function(property, value, noPrefixes) {
        var prop = property + ':',
            el = document.createElement('test'),
            mStyle = el.style;

        if (!noPrefixes) {
            mStyle.cssText = prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(value + ';' + prop) + value + ';';
        } else {
            mStyle.cssText = prop + value;
        }
        return mStyle[property].indexOf(value) !== -1;
    };

    Magnet.prototype.isIOS = function() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
    };

    Magnet.prototype.wrapping = function(fnCallback) {
    	this.$el
            .css('margin-top', 0)
            .wrapAll($('<div class="' + this.opts.fixedWrapClassName + '"></div>').css({
                // height: this.$elHeight,
                'padding-top': this.$elMarginTop
            }));
        fnCallback();
    };

    Magnet.prototype.addHandler = function() {
    	if (this.featureTest('position', 'sticky') && this.isIOS()) {
            this.$el
                .addClass(this.opts.stickyClassName)
                .css('top', this.opts.topSpacing);

                //statusFunction 추가
                if(this.opts.statusFunction) (this.opts.statusFunction.on)();
            $win.on('load resize scroll', $.proxy(function() {
                if ($win.scrollTop() >= Math.max(this.$elOffsetTop - this.opts.topSpacing, 0)) {
                    this.$el.addClass(this.opts.stickyStatus);
                    //statusFunction 추가
                    if(this.opts.statusFunction) (this.opts.statusFunction.on)();
                } else {
                    this.$el.removeClass(this.opts.stickyStatus);
                    //statusFunction 추가
                    if(this.opts.statusFunction) (this.opts.statusFunction.off)();
                }
            }, this));
        } else {
            // position: fixed가 될 경우 영역을 잡기 위해 wrapping
            this.wrapping($.proxy(function() {
            	$win.on('load resize scroll', $.proxy(function() {
            		if (!this.$el.hasClass('mwUI_is_fixed') && this.$el.offset().top > 0 && this.$el.parent().css('display') === 'block') {
                        this.$elOffsetTop = this.$el.offset().top;
                    }

                    if ($win.scrollTop() > Math.max(this.$elOffsetTop - this.opts.topSpacing, 0)) {
                        this.$el
                            .addClass(this.opts.fixedClassName)
                            .css('top', this.opts.topSpacing);
                            //statusFunction 추가
                            /*console.log("$win.scrollTop()::"+$win.scrollTop());
                            console.log("this.$elOffsetTop - this.opts.topSpacing::"+(this.$elOffsetTop - this.opts.topSpacing));*/
                            if(this.opts.statusFunction) (this.opts.statusFunction.on)();
                    } else {
                        this.$el
                            .removeClass(this.opts.fixedClassName)
                            .css('top', 'auto');
                            //statusFunction 추가
                            if(this.opts.statusFunction) (this.opts.statusFunction.off)();
                    }
            	}, this))
            }, this));
        }
    };

	Magnet.defaults = {
		topSpacing: 0,
        stickyClassName: 'mwUI_is_sticky',         // position:sticky를 사용할 때 사용할 className
        stickyStatus: 'onSticky',                  // position:sticky로 고정되었을때 상태를 표현할 className
        fixedClassName: 'mwUI_is_fixed',           // position:fixed를 사용할 때 사용할 className
        fixedWrapClassName: 'mwUI_is_fixed_wrap',  // position:fixed를 사용할 때 wrapper className
        statusFunction: null                       // {on:Function, off:Function}
	};

	return Magnet;
}(jQuery));
