/**
 * Created by wty 
 * QQ:759743719
 */
(function (w,$) {
      if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
          value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
              throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
              var nextSource = arguments[index];

              if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
              }
            }
            return to;
          },
          writable: true,
          configurable: true
        });
      }
      function tuya(opt) {
          this.configs=Object.assign({
              canvas:"draw",
              color:["#00b7ee","#009944","#00479d","#601986","#e60012","#f39800","#fff","#000"],
              colorBox:"#color",
              raduis:"#pen",
              prev:"back",
              // reset:"reset",
              finish:"save",
              Base64ck:function (data) {}
          },opt);
          this.ratio = window.devicePixelRatio;
          this.canvas=document.getElementById(this.configs.canvas);
          this.using = false;
          this.colorBox=$(this.configs.colorBox);
          this.raduis=$(this.configs.raduis);
          this.prev=document.getElementById(this.configs.prev);
          this.resetBtn=document.getElementById(this.configs.reset);
          this.finish=document.getElementById(this.configs.finish);
          this.ctx=this.canvas.getContext("2d");
          this.drawDataArr=[];
          this.lineWidth=8;
          this.lineColor= this.configs.color[0];
          this.drawStep=0;
          this.init();
      }
    tuya.prototype={
          init:function () {
              var H = $(window).height()-$('header').height()-$('footer').height();
              this.canvas.width=$(window).width();
              this.canvas.height= H;
              var width = this.canvas.width,height=this.canvas.height;
       
              // console.log(this.ratio)
              this.canvas.style.width = width + "px";
              this.canvas.style.height = height + "px";

              this.canvas.height = height * this.ratio;
              this.canvas.width = width * this.ratio;

              this.ctx.fillStyle = "#fff";
              this.ctx.fillRect (0, 0, this.canvas.width, this.canvas.height);

              this.firstDraw=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)
              this.drawDataArr.push(this.firstDraw);
              this.createListener();
          },
        createListener:function () {
            var self=this;
            if(document.body.ontouchstart !== undefined){

              this.canvas.addEventListener('touchstart', function(e){
                  var p = self.getTouchPos(e);
                  self.ctx.beginPath();
                  self.ctx.moveTo(p.x, p.y);
              })
              this.canvas.addEventListener('touchmove', function (e) {
                  e.preventDefault();
                  window.requestAnimationFrame(function () {
                      var p = self.getTouchPos(e);
                      self.freeLine(p);
                  });
              })
              this.canvas.addEventListener("touchend",function (e) {
                  self.drawDataArr.push(self.ctx.getImageData(0, 0, self.canvas.width, self.canvas.height));
                  self.drawStep += 1;
              })
            }else{
              this.canvas.onmousedown = function(e){
                  var p = self.getPos(e);
                  self.using = true;
                  self.ctx.beginPath();
                  self.ctx.moveTo(p.x, p.y);
              }
              this.canvas.onmousemove = function (e) {
                  e.preventDefault();
                  if (!self.using) {return}
                  window.requestAnimationFrame(function () {
                      var p = self.getPos(e);
                      self.freeLine(p);
                  });
              }
              this.canvas.onmouseup = function (e) {
                  self.using = false;
                  self.drawDataArr.push(self.ctx.getImageData(0, 0, self.canvas.width, self.canvas.height));
                  self.drawStep += 1;
                  
              }
            }
            this.prev.addEventListener("click",function () {
                if(self.drawStep>0){
                    self.reDo(--self.drawStep);
                    self.drawDataArr.pop();
                    // console.log(self.drawStep)
                    // console.log(self.drawDataArr)
                }
            });
            // this.resetBtn.addEventListener("click",function () {
            //       self.reset();
            //       self.drawDataArr=[];
            //       self.drawDataArr.push(self.firstDraw);
            //       self.drawStep=0;
            // })
            this.finish.addEventListener("click",function () {
                // var imgdata = self.canvas.toDataURL(this.imgType);
                var imgdata = self.canvas.toDataURL("image/jpeg",0.6)
                console.log(imgdata);

                $.ajax({ 
                  type: 'POST',
                  url: "http://z.duobaodai.com/index.php?m=Ppb&c=Mqj&a=merge_headimg",
                  data: {
                    data : imgdata
                  }, 
                  beforeSend: function () {
                      $(".sc-mark").show();
                  },
                  success: function(response,status,xhr) { 
                    console.log(response);
                    console.log(xhr);
                    if(response.msg_code == 0){
                        window.location.href = 'fx.html'
                    }
                  },
                  error:function(){
                    console.log('发送数据失败！');
                  }
                }) 
                
                // return self.configs.Base64ck(imgdata);
            });
           
            $(this.configs.raduis).find("li").click(function () {
                var index=$(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                switch(index)
                {
                    case 0:
                        self.lineWidth = 8;
                        break;
                    case 1:
                        self.lineWidth = 6;
                        break;
                    case 2:
                        self.lineWidth = 5;
                        break;
                    case 3:
                        self.lineWidth = 3;
                        break;
                    case 4:
                        self.lineWidth = 2;
                        break;
                    case 5:
                        self.lineWidth = 1;
                        break;
                }
            })
            $(this.configs.colorBox).find("span").click(function () {
                var index=$(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                self.lineColor = self.configs.color[index];
            })
        },
        getTouchPos: function(e){ // 获得触摸点的相对位置
            var rect = e.target.getBoundingClientRect();
            var p = { // 相对坐标
                x: (e.touches[0].clientX - rect.left)*this.ratio,
                y: (e.touches[0].clientY - rect.top)*this.ratio
            };
            return p;
        },
        getPos: function(e){ // 获得触摸点的相对位置
            var rect = e.target.getBoundingClientRect();
            var p = { // 相对坐标
                x: (e.clientX - rect.left)*this.ratio,
                y: (e.clientY - rect.top)*this.ratio
            };
            return p;
        },
        freeLine:function (pos) {
            this.ctx.lineWidth = this.lineWidth*this.ratio;
            this.ctx.strokeStyle = this.lineColor;
            this.ctx.lineTo(pos.x, pos.y);
            this.ctx.stroke();
        },
        reDo:function (index) {
            this.reset();
            this.ctx.putImageData(this.drawDataArr[index],  0,  0)
        },
        reset: function(){ // 重置 canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 先清空
        },
      }
      window.tuya=tuya;
})(window,Zepto);