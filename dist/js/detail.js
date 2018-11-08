$(function(){

	loadBlueDiv();

	sizeDH($('.tips'));

	let $submitBtn = $('.put-btn'),
		$needMenoy = $('#needMoney').text()
		$moeny = $('#menoy').text();

    $('.det-check').on('change', function() {
        if($(this).prop('checked') === false) {
            $submitBtn.attr('disabled', true).addClass('disabled');
        } else {
            $submitBtn.attr('disabled', false).removeClass('disabled');
        }
    });

    if(parseFloat($needMenoy) == 0){
        $('#account').prop('disabled', true);
        $submitBtn.prop('disabled', true).addClass('disabled');;
    } else {
        $("#putMoney,.put-money").click(function(){
            $("#account").val($moeny);
        });
    }

    $('#loadMore').touch({
        callback: function() {
            setTimeout(function() {

                let url = $('.tips').attr('data-href');
                location.href = url;

            }, 500);
        },
    });

});

function sizeDH(ele){
    function setHeight(){
        var win_h = $(window).height(),
            doc_h = $('.loadMoreContent').height(),
            wrap = $('#loadMore'),
            _w = ($(window).width() > 920 ? 920 : $(window).width()) * 2.2 / 10;

        if(doc_h + _w > win_h){
            wrap.css('height', 'auto');
        }else{
            wrap.css('height', '100%');
        }
    }

    setHeight();
    $(window).resize(function(){
        setHeight();
    });
}

function changeTwoDecimal(x) {
    var str = x.toString();
    var dian = str.indexOf('.');
    var result = f_x ="";
    if(dian == -1){
        result = parseFloat(str).toFixed(2);
    }else{
        result = str.substr(0, dian+3);
    }
    f_x = parseFloat(result);
    if (isNaN(f_x)) {
        return 0;
    }
    return f_x;
}

function checkBonus(tenMoney){
    var money = 0;
    $.ajax({
        type: "POST",
        url: "/bonus/hasBonus.html",
        dataType: "json",
        async: false,
        data: {money:tenMoney, borrowid:22493},
        success: function(results){
            money = results;
        }
    });
    return money;
}


function checktender(tenMoney){
    var message = '';
    var passwd = $('#dxbPassword').val();
    $.ajax({
        type: "POST",
        url: "/mobile/borrow/checktender.html",
        dataType: "json",
        async: false,
        data: {account:tenMoney, id:22493, dxb_pwd:passwd},
        success: function(results){
            message = results;
        }
    });
    return message;
}

function formSubmit(){
    if(openwin() == false){
        return false;
    }

    var xuMoney = 0.00;
    var tenderMoney = changeTwoDecimal($('#account').val());
    tenderMoney = (xuMoney<tenderMoney) ? xuMoney : tenderMoney;
    var shengyu = (parseInt(xuMoney*100,10)-parseInt(tenderMoney*100, 10))/100;

    var risk_finfish  = '';
    var risk_maxmoney = '0';

            
    var risk_grade = '';
    var riskName   = '';
    var zdMoney    = '0';
    var grade      = '1';
    ;
    var grMoney = '1000000';
      alert(risk_grade);
      alert(riskName);
      alert(zdMoney);
      alert(grade);
      alert(grMoney);

    if($('#ftype').val() == 12){
        if(tenderMoney < 0.1 ){
            dialog({ fixed: true, title: '提示', content: '最低投标金额不能小于10元!', okValue: '确定', ok: function(){ } }).show();
            return false;

        } else if(shengyu > 0 && shengyu < 10){
            dialog({ fixed: true, title: '提示',content: '投标后的剩余资金不能小于10元!',okValue: '确定', ok: function(){} }).show();
            return false;
        }

    } else if($('#ftype').val() == 14){
        if(tenderMoney < 1000 ){
            dialog({ fixed: true, title: '提示', content: '最低投标金额不能小于1000元!', okValue: '确定', ok: function(){ } }).show();
            return false;

        } else if(shengyu > 0 && shengyu < 1000){
            dialog({ fixed: true, title: '提示',content: '投标后的剩余资金不能小于1000元!',okValue: '确定', ok: function(){} }).show();
            return false;
        }
    } else if (risk_finfish != 1) {
        dialog({
            title: '温馨提示',
            content: '请先完成风险测评，现在测评？',
            okValue: '确定',
            ok: function () {
                window.location.href="/riskassessment/showtable.html";
                return false;
            },
            cancelValue: '取消',
            cancel: function () { }
        }).show();
        return false;
    } else if ((tenderMoney > risk_maxmoney) && (risk_maxmoney!=-1)) {
        var risk_maxmoney = '0';
        dialog({
            title: '温馨提示',
            content: '投资金额超出风险测评限额，剩余可投资金额为'+risk_maxmoney+'元！',
            okValue: '重新测评',
            ok: function () {
                window.location.href="/riskassessment/showtable.html";
                return false;
            },
            cancelValue: '继续投资',
            cancel: function () {
                if(parseInt(risk_maxmoney) > shengyu){
                    $("#account").val(shengyu);
                }else{
                    $("#account").val(parseInt(risk_maxmoney));
                }
            }
        }).show();
        return false;

    }else if(parseInt(risk_grade) < parseInt(grade)){

        dialog({
            title: '温馨提示',
            content: '您当前的风险测评等级为：'+riskName+'。该借款项目等级为R'+grade+'，仅限稳健型及以上风险承受能力出借人投资；您可重新测评提高风险承受能力后继续投资。',
            okValue: '重新测评',
            ok: function () {
                window.location.href="/riskassessment/showtable.html";
                return false;
            },
            cancelValue: '取消',
            cancel: function () {

            }
        }).show();
        return false;
}else{
        if(tenderMoney < 50 ){
            var d = dialog({ fixed: true, title: '提示', content: '最低投标金额不能小于50元!', okValue: '确定', ok: function(){ } });
            d.show();
            return false;

        } else if(shengyu > 0 && shengyu < 50){
            var d = dialog({ fixed: true, title: '提示',content: '投标后的剩余资金不能小于50元!',okValue: '确定', ok: function(){} });
            d.show();
            return false;
        }
    }
            var errMessage = '';
    var message = checktender(tenderMoney);
    var content = '您本次投资的金额为：'+tenderMoney+'元。';
    if(message.status === 'N' && message.content != false){
        errMessage = message.content
    } else {
        var ibonus = checkBonus(tenderMoney);
        if(ibonus.status == 'Y' && ibonus.money>0) {
            content = '您本次投资的金额为'+tenderMoney+'元，成功满标后可获得奖励'+ibonus.money+' 元，预计年化利率可达'+ibonus.apr+'。';
        }
    }

            dialog({
        fixed: true,
        title: '提示',
        content: errMessage ? errMessage : content,
        okValue: '确定',
        ok: function(){
            if(errMessage && !message.residue){ return ; }
            if(message.residue){
                $("#account").val(message.residue);
            }
            document.getElementById("subbuttondiv").style.display='none';
            document.getElementById("tender_form").submit();
            return false;
        },
        cancelValue: '取消',
        cancel: function () {$("#account").val('');}
    }).show();
}
