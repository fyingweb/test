$(function(){
	$('.arrow').on('click', function(){
		let next = $(this).parent().next();
		if($(this).hasClass('on')){
			$(this).removeClass('on').text('展开');
			next.slideUp();
		}else {
			$(this).addClass('on').text('收起');
			next.slideDown();
		}
	});

	$('.tender-money .tender-select span').on('click', function(){
		let index = $(this).index(),
			tips = $('.wrbid-box .tips');
		$(this).addClass('active').siblings().removeClass('active');

		switch(index){
			case 0:
				tips.text('填写保留金额，不会加入自动投标');
			break;
			case 1:
				tips.text('每次按照固定金额');
			break;	
			case 2:
				tips.text('设置最大金额');
			break;	
		}

		$('.tender-money-input').val(index);
	});


	$('.repayment-type .tender-select span').on('click', function(){
		let index = $(this).index();

		selectArr = [];

		$(this).toggleClass('active');

		$('.repayment-type .tender-select span').each(function(index){

			if($(this).hasClass('active')){
				selectArr.push(index);
			}else {
				selectArr.splice(index, 1);
			}
		});

		$('.tender-type-input').val(selectArr.join('-'));
	});

	$('.det-check').on('change', function() {
		let $submitBtn = $('input[type="submit"]');

        if($(this).prop('checked') === false) {
            $submitBtn.attr('disabled', true).addClass('disabled');
        } else {
            $submitBtn.attr('disabled', false).removeClass('disabled');
        }
    });



	let rateRange = {
			min: 6,
			max: 23,
		};

	$('.rate-input').on('blur', function(){
		let value = parseInt($(this).val());
		
		if(value >= rateRange.max){
			value = rateRange.max;
		}

		if(value <= rateRange.min){
			value = rateRange.min;
		}

		$(this).val(value+'%');
	});

	$('.rate-reduce').on('click', function(){
		let rateInput = $('.rate-input'),
			rateValue = parseInt(rateInput.val());

		if(rateValue > rateRange.min){
			rateValue--;
			rateInput.val(rateValue+'%');
		}
	});

	$('.rate-add').on('click', function(){
		let rateInput = $('.rate-input'),
			rateValue = parseInt(rateInput.val());

		if(rateValue < rateRange.max){
			rateValue++;
			rateInput.val(rateValue+'%');
		}
	});

	let mobiScroll = {
		theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh",
	}

	$('.loan-start-select').change(function(){
		let value = $(this).val(),
			selectArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 36],
			options = '';

		$.each(selectArr, function(i){
			if(selectArr[i] == value){
				if(value == selectArr[selectArr.length-1]) {
					$('.loan-end input').val(selectArr[i]+'个月');
					options += '<option value="'+selectArr[i]+'">'+selectArr[i]+'个月</option>';
				}else {
					$('.loan-end input').val(selectArr[i+1]+'个月');
				}
			}else if(selectArr[i] > value) {
				options += '<option value="'+selectArr[i]+'">'+selectArr[i]+'个月</option>';
			}
		});

		$('.loan-end-select').html(options);
	});


	$('.loan-start-select, .loan-end-select').mobiscroll().select({
        theme: mobiScroll.theme,    
        mode: mobiScroll.mode,      
        display: mobiScroll.display, 
        lang: mobiScroll.lang       
    });

	$('.effective-start-input, .effective-end-input').mobiscroll().date({
        theme: mobiScroll.theme,
        mode: mobiScroll.mode,
        display: mobiScroll.display,
        lang: mobiScroll.lang,
        minDate: new Date(2000,1,1),
        maxDate: new Date(2050,1,1),
    });

});
