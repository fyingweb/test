;(function($, window, document, undefined){
    let Touch = function(ele, options){
        this.ele = ele;
        this.defaults = {
            distance: 70
        };
        this.opts = $.extend({}, this.defaults, options);
        this.startY = 0;
        this.currentY = 0;
        this.status = false;
        this.init();
    }
    Touch.prototype = {
        init: function(){
            let _this = this,
                callback = _this.opts.callback,
                distance = _this.defaults.distance;

            _this.ele.on('touchstart', _this.handleTouchStart);
            _this.ele.on('touchmove', { distance: distance }, _this.handleTouchMove);
            _this.ele.on('touchend',{ fn: callback }, _this.handleTouchEnd);
        },

        handleTouchStart: function(e) {
            let _this = this,
                _touch = e.originalEvent.targetTouches[0];
            _this.startY = _touch.clientY;
            _this.status = false;

            _this.style.transition = '';
        },

        handleTouchMove: function(e) {
            let _this = this,
                _touch = e.originalEvent.targetTouches[0];

            if ($(window).height() < $('.loadMoreContent').offset().top + $('.loadMoreContent').outerHeight()) {
                return;
            }

            _this.currentY = _touch.clientY;
            let distance = _this.currentY - _this.startY;

            if(distance < 0)
            _this.style.transform = 'translate3d(0, '+ distance +'px, 0)';
            
            if(Math.abs(distance) > e.data.distance)
            _this.status = true;

        },

        handleTouchEnd: function(e) {
            let _this = this,
                _touch = e.originalEvent.targetTouches[0];

            _this.style.transform = 'translate3d(0, 0, 0)';
            _this.style.transition = 'all .5s';

            if(_this.status) {
                if(typeof e.data.fn =="function"){
                    e.data.fn();
                }; 
            }
        }
    }

    $.fn.touch = function(options){
        let touch = new Touch(this, options);
        return this;
    }
})(jQuery, window, document);