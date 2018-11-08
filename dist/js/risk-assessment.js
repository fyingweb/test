$(function(){
    var $radio = $('input[type="radio"]');
    
    $radio.on('click', function () {
        var $this = $(this);
        $this.parents('dd').addClass('selected').siblings('dd').removeClass('selected');
    });


    $('#submit').click(function () {
        $.ajax({
            type: 'post',
            url: '/riskassessment/showtablesub',
            data: $("#assessForm").serialize(),
            dataType: 'json',
            success: function (e) {
                layer.open({
                   content: e.info,
                   btn: '我知道了'
                });

                if (e.status == 1) {
                    location.href = "/user/usermanage.html";
                }
            }
        });
        return false;
    });
});