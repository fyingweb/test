function drawHc(data){
    var hc = document.getElementById("draw-hc"); 
    var cxt = hc.getContext("2d");
    hc.width = $(window).width();
    hc.height = $(window).height();
    
    var ratio = window.devicePixelRatio;
    var width = hc.width,height=hc.height;
       
    hc.style.width = width + "px";
    hc.style.height = height + "px";

    hc.height = height * ratio;
    hc.width = width * ratio;

    cxt.fillStyle="#fff";
    cxt.fillRect(0,0,hc.width,hc.height); 

    //绘制图
    // console.log(canvas);
    var ty = new Image();
    ty.src = data;
    ty.onload = function(){
        $('.share-box').append('<img src="'+ty.src+'" style="display:none">');
        var h = $(window).width()/ty.width*ty.height;
        cxt.drawImage(ty,0,parseInt($('header').css('height'))* ratio, $(window).width()*ratio, h*ratio);
    }

setTimeout(function(){
    //底部矩形
    var grd=cxt.createLinearGradient(0,hc.height-96* ratio,hc.width,hc.height);
    // grd.addColorStop(0,"#FED5E4");
    // grd.addColorStop(1,"#F29FB7");
    cxt.fillStyle="#F29FB7";
    cxt.fillRect(0,hc.height-96* ratio,hc.width,hc.height); 

    //绘制头像
    var imgT = new Image();
    //获取用户微信头像
    wxImg = "images/tx.png"
    imgT.src = wxImg;
    imgT.onload = function(){
        cxt.drawImage(imgT,10* ratio,hc.height-81* ratio,66* ratio,66* ratio);
    }
    
    //绘制文字
    cxt.font = 18* ratio+"px Helvetica";
    cxt.fillStyle = "#8a4e61";
    //获取用户微信名
    var name = "用户微信名"
    cxt.fillText(name,85* ratio,hc.height-57* ratio);

    cxt.font = 22* ratio+"px Helvetica bold"
    cxt.fillStyle = "#8a4e61";
    cxt.fillText("画·献给母亲",85* ratio,hc.height-28* ratio);

    //绘制二维码
    var imgEwm = new Image();
    imgEwm.src = "images/ewm.png";
    imgEwm.onload = function(){
        cxt.drawImage(imgEwm,hc.width-88* ratio,hc.height-87* ratio,78* ratio,78* ratio);
    }
},50)

    //合成图片
    var timer = setTimeout(function(){
      var imgsrc=hc.toDataURL('image/png');
      $('#draw-hc').hide();
      $('.share-box').append('<img src="'+imgsrc+'" width="100%">'); 

      $.ajax({ 
          type: 'POST',
          url: "http://z.duobaodai.com/index.php?m=Ppb&c=Mqj&a=merge_headimg",
          data: {
            data : imgdata
          }, 
          success: function(response,status,xhr) { 
            console.log(response);
            if(response.msg_code == 0){
              setTimeout(function(){
                window.location.href = 'fx.html'
              }, 1500)
            }
          },
          error:function(){
            console.log('发送数据失败！');
          }
       })

    },200);
}