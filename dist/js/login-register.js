$(function () {

    var $phone = $('#phone'),
        $phoneNum = $('.phone-num');
    //清空按钮显示&隐藏
    $phoneNum.on('keyup', function () {
        var $this = $(this);
        if ($this.val() !== '') {
            $this.next('.close-icon').show();
        } else {
            $this.next('.close-icon').hide();
        }
    });

    var $closeIcon = $('.close-icon');
    //清空输入
    $closeIcon.on('click', function () {
        var $this = $(this);
        $this.hide();
        setTimeout(function() {
            $this.prev('input').val('').focus();
        }, 100);
    });


    var $eyeIcon = $('.eye-icon');

    //密码显示&隐藏
    $eyeIcon.on('click', function () {
        var $this = $(this);
        $this.toggleClass('eye-icon-open');
        if ($this.hasClass('eye-icon-open')) {
            $this.prev('input').attr('type', 'text');
        } else {
            $this.prev('input').attr('type', 'password');
        }
        setTimeout(function() {
            $this.prev('input').focus();
        }, 300);
    });


    var phoneReg = /^1[3,4,5,6,7,8,9]\d{9}$/,
        passwordReg = /\w{6,18}/,
        $password = $('#password'),
        $submitBtn = $('#login-form .submit-btn'),
        $errorMessage = $('.error-message'),
        $logForm = $('#login-form'),
        $dx = $('#dx'),
        $csrf = $('#csrf'),
        $type = true;

    var $switch = $('.switch-type'),
        $pwdgroup = $('.pwd-group'),
        $dxgroup = $('.dx-group'),
        $forget = $('.forget');

    $switch.on('click', function(){
        var $this = $(this);
        $this.toggleClass('on');
        if($this.hasClass('on')){
            $dxgroup.css('display', 'flex');
            $pwdgroup.hide();
            $this.text('使用密码登录');
            $forget.hide();
            $type = false;
        }else{
            $dxgroup.hide();
            $pwdgroup.css('display', 'flex');
            $this.text('短信验证码登录');
            $forget.show();
            $type = true;
        }
        $logForm[0].reset();
        $closeIcon.hide();
        $errorMessage.text('');
    });

    $('input').focus(function(){
        $errorMessage.text('');
    });

    //登录
    $submitBtn.on('click', function (event) {
        var $this = $(this);

        if(!phoneReg.test($phone.val())) {
            $errorMessage.text('请输入正确的手机号码');
            return;
        }
        if($type){
            if(!passwordReg.test($password.val())) {
                $errorMessage.text('密码格式不正确');
                return;
            }
        }else{
            if(!$.trim($dx.val())){
                $errorMessage.text('短信验证码不正确');
                return;
            }
        }

        $this.addClass('submit-btn-disable').attr('disabled', true).text('登录中...');
        $.ajax({
            type: 'POST',
            url: '/mobile/login/Sign_in',
            data: $logForm.serialize(),
            dataType: 'json',
            success: function (res) {
                if(res.code == 0){
                    window.location.href = '/mobile/ucenter.html';
                }else if(res.code == 1){
                    $errorMessage.text(res.msg);
                }else if(res.code == 2){
                    window.location.href = res.url;
                }
            },
            error: function () {
                $errorMessage.text('登录失败');
            },
            complete: function () {
                $this.removeClass('submit-btn-disable').attr('disabled', false).text('登录');
            }
        });
    });

    var imgCaptchaReg = /^\d{4,6}$/,
        smsCaptchaReg = /^\d{4,6}$/,
        $imgCaptcha = $('#imgCaptcha'),
        $refereePhone = $('#refereePhone'),
        $smsCaptcha = $('#smsCaptcha'),
        $nextBtn = $('.next-btn'),
        $nextStepError = $('.next-step-error'),
        $lastStepError = $('.last-step-error'),
        $lastStep = $('.form-last-step'),
        $nextStep = $('.form-next-step'),
        $getSmsCaptchaBtn = $('.get-sms-captcha-btn'),
        $getVoiceCaptchaBtn = $('.get-voice-captcha-btn');

    //注册点击下一步
    $nextBtn.on('click', function () {
        var $this = $(this),
            phone = $phone.val(),
            captcha = $imgCaptcha.val(),
            referee = $refereePhone.val();
        if (!phoneReg.test(phone)) {
            $lastStepError.text('请输入正确的手机号码');
            return;
        }
        if (!imgCaptchaReg.test(captcha)) {
            $lastStepError.text('图片验证码不正确');
            return;
        }
        if (!phoneReg.test(referee) && referee !== '') {
            $lastStepError.text('请输入正确的推荐人手机号码或不输入');
            return;
        }
        $this.addClass('submit-btn-disable').attr('disabled', true);

        $.ajax({
            type: 'POST',
            async: false,
            url: '/reg/Check_VerifyCode',
            data: {
                phone: phone,
                captcha: captcha,
                referee: referee
            },
            dataType: 'json',
            success: function (res) {
                $csrf.val(res.csrf);
                if (res.code === 0) {
                    $lastStep.fadeOut(100, function() {
                        $nextStep.fadeIn();
                    });
                    sendCaptcha(phone, res.csrf);
                } else {
                    $lastStepError.text(res.msg);
                }
            },
            complete: function () {
                $this.removeClass('submit-btn-disable').attr('disabled', false);
            }
        });
    });


    //校验打开页面的时候是否要继续倒计时
    function checkCountdown(elem) {
        var secondsRemained = $.cookie('secondsRemained');
        if (secondsRemained) {
            var date = new Date(unescape(secondsRemained));
            setCountDown(date);
        }
    }
    checkCountdown($getSmsCaptchaBtn);

    // 倒计时
    function setCountDown(date) {
        var nowDate = new Date(),
            timeDifference = ((nowDate - date) / 1000).toFixed(0),
            countDown = 60 - timeDifference;
        if (countDown <= 0) {
            $getSmsCaptchaBtn.removeAttr('disabled').text('重新获取');
            $errorMessage.text('点击按钮发送验证码');
            addCookie('secondsRemained', '', 60); //添加cookie记录,有效时间60s
            return;
        }
        $getSmsCaptchaBtn.attr('disabled', true);
        $getSmsCaptchaBtn.text('重新发送(' + countDown + ')');

        setTimeout(function () {
            setCountDown(date);
        }, 1000) //每1000毫秒执行一次
    }

    //发送验证码时添加cookie
    function addCookie(name, value, expiresTime) {
        //判断是否设置过期时间,0代表关闭浏览器时失效
        if (expiresTime > 0) {
            var date = new Date();
            date.setTime(date.getTime() + expiresTime * 1000);
            $.cookie(name, escape(value), {
                expires: date
            });
        } else {
            $.cookie(name, escape(value));
        }
    }

    //发送验证码
    function sendCaptcha(phone, csrf, type) {
        var secondsRemained = $.cookie('secondsRemained');
        if (secondsRemained) {
            return false;
        }

        if(!phoneReg.test(phone)){
            $phone.focus();
            $errorMessage.text('手机号码格式错误');
            return false;
        }

        var url = '/reg/Send_Sms';
        if(type === 'voice') {
            url = '/reg/Send_Voice';
        }

        $.ajax({
            type: 'POST',
            async: false,
            url: 'http://getcode.com',
            data: {
                phone: phone,
                csrf: csrf
            },
            dataType: 'json',
            success: function (res) {
                $csrf.val(res.csrf);
                if (res.msg_code === 0) {
                    $errorMessage.text('验证码已发送到您手机');
                    setTimeout(function () {
                        $errorMessage.text('');
                    }, 5000);

                    var date = new Date();
                    addCookie('secondsRemained', date.toGMTString(), 60); //添加cookie记录,有效时间60s
                    setCountDown(date);
                }
            }
        });
    }

    //获取短信验证码
    $getSmsCaptchaBtn.on('click', function (event) {
        event.preventDefault();
        var phone = $phone.val(),
            csrf = $csrf.val();
        sendCaptcha(phone, csrf, 'sms');
    });

    //获取语音验证码
    $getVoiceCaptchaBtn.on('click', function(event) {
        event.preventDefault();
        var phone = $phone.val(),
            csrf = $csrf.val();
        sendCaptcha(phone, csrf, 'voice');
    })

    var $back = $('.back');
        $imgCode = $('#imgCode');

    $back.on('click', function () {
        $imgCode.attr('src', '/yanzheng/index/?' + Math.random());
        $nextStep.fadeOut(100, function () {
            $lastStep.fadeIn(100);
        });
    });

    var $confirmBtn = $('.confirm-btn'),
        $regForm = $('#reg-form');

    $confirmBtn.on('click', function(event) {
        event.preventDefault();
        var smsCaptcha = $smsCaptcha.val(),
            password = $password.val();
        if (!smsCaptchaReg.test(smsCaptcha)) {
            $nextStepError.text('您输入的验证码有误，请重新输入');
            return;
        }
        if(!passwordReg.test(password)) {
            $nextStepError.text('密码格式不正确');
            return;
        }
        $confirmBtn.addClass('submit-btn-disable').attr('disabled', true).text('注册中...');
        // console.log($regForm.serialize());
        $.ajax({
            type: 'POST',
            async: false,
            url: '/reg/Confirm_Register',
            data: $regForm.serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code === 0) {
                    //注册成功
                    window.location.href = '/mobile/ucenter/index.html'
                } else {
                    $nextStepError.text(res.msg);
                }
            },
            complete: function() {
                $confirmBtn.removeClass('submit-btn-disable').removeAttr('disabled').text('确认注册');
            }
        });
    });


    //忘记密码点击下一步
    var $forNextBtn = $('.forget-next-btn');

    $forNextBtn.on('click', function () {
        var $this = $(this),
            phone = $phone.val(),
            captcha = $imgCaptcha.val();
        if (!phoneReg.test(phone)) {
            $lastStepError.text('请输入正确的手机号码');
            return;
        }
        if (!imgCaptchaReg.test(captcha)) {
            $lastStepError.text('图片验证码不正确');
            return;
        }
        
        $this.addClass('submit-btn-disable').attr('disabled', true);

        $.ajax({
            type: 'POST',
            async: false,
            url: '/reg/Check_VerifyCode',
            data: {
                phone: phone,
                captcha: captcha
            },
            dataType: 'json',
            success: function (res) {
                $csrf.val(res.csrf);
                if (res.code === 0) {
                    $lastStep.fadeOut(100, function() {
                        $nextStep.fadeIn();
                    });
                    sendCaptcha(phone, res.csrf);
                } else {
                    $lastStepError.text(res.msg);
                }
            },
            complete: function () {
                $this.removeClass('submit-btn-disable').attr('disabled', false);
            }
        });
    });

    var $forConfirmBtn = $('.forget-confirm-btn'),
        $forgetForm = $('#forget-form'),
        $pwdAgin = $('#passwordAgin');

    $forConfirmBtn.on('click', function(event) {
        event.preventDefault();
        var smsCaptcha = $smsCaptcha.val(),
            password = $password.val(),
            passwordAgin = $pwdAgin.val();
        if (!smsCaptchaReg.test(smsCaptcha)) {
            $nextStepError.text('您输入的验证码有误，请重新输入');
            return;
        }
        if(!passwordReg.test(password)) {
            $nextStepError.text('密码格式不正确');
            return;
        }
        if (password != passwordAgin) {
            $nextStepError.text('两次输入的密码不一致');
            return;
        }

        $confirmBtn.addClass('submit-btn-disable').attr('disabled', true).text('修改中...');
        // console.log($regForm.serialize());
        $.ajax({
            type: 'POST',
            async: false,
            url: '/reg/Confirm_dit',
            data: $forgetForm.serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code === 0) {
                    //注册成功
                    window.location.href = '/mobile/ucenter/index.html'
                } else {
                    $nextStepError.text(res.msg);
                }
            },
            complete: function() {
                $confirmBtn.removeClass('submit-btn-disable').removeAttr('disabled').text('确认修改');
            }
        });
    });

});
