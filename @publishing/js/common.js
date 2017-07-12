/* toggle button */

$( function(){

	var wTab = $('.mu-col-tab').width();
	var wAlarm = $('.mu-col-alarm').width();
	var wTotal = wTab + wAlarm;
	var speed = 500;
	var easing = 'easeOutExpo';
	//var easing = 'easeOutBounce';

	$('.stats-close').on('click', function() {
		$('.mu-col-tab').css({'width':wTab}).animate({'width':'0'},speed,easing,function(){
			$(this).hide();
		}).removeClass('mu-col-open').find('.mu-panel > div').hide();
		$('.stats-open').addClass('toggle-btn');
		wService(wTab);
	});

	$('.stats-open').on('click', function() {
		$('.mu-col-tab').css({'width':'0'}).animate({'width':wTab},speed,easing).show().addClass('mu-col-open').find('.mu-panel > div').show();
		$(this).removeClass('toggle-btn');
		wService(-wTab);
	});

	$('.alarm-close').on('click', function() {
		$('.mu-col-alarm').css({'width':wAlarm}).animate({'width':'0'},speed,easing,function(){
			$(this).hide();
		}).removeClass('mu-col-open').find('.mu-panel > div').hide();
		$('.alarm-open').addClass('toggle-btn');
		wService(wAlarm);
	});

	$('.alarm-open').on('click', function() {
		$('.mu-col-alarm').css({'width':'0'}).animate({'width':wAlarm},speed,easing).show().addClass('mu-col-open').find('.mu-panel > div').show();
		$(this).removeClass('toggle-btn');
		wService(-wAlarm);
	});

	function wService(n) {

		var wService = $('.mu-col-service').width();
		wTotal = wTotal - n;

		$('.mu-col-service').css({'width':wService}).animate({'width':wService + n},speed,easing);

		$('.mu-col-open').removeClass('last');
		$('.mu-col-open:eq(-1)').addClass('last');

		$(window).on("resize",function() {
			$('.mu-col-service').css('width','calc(100% - '+ wTotal +'px)');
		});

	}

});



/* 통계정보 list */
$( function(){

	$('.stats-list').on('click', function() {

		$('.chart-value').fadeToggle(500);
		$('.chart-background').fadeToggle(500);

	});

});