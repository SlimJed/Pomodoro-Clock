$(document).ready(function(){
	// Declare Variables
	let  pomodoro =25, resetPomodoro=25, breakTime=5, x, finishTime;

	var clockDiv = document.getElementById("clockArea");
	var activeMinutes = clockDiv.querySelector(".minutes");
	var activeSecond = clockDiv.querySelector(".seconds");

		$(".pomodoroMinuteCount").html(pomodoro);
		$(".breakMinutesCount").html(breakTime);
		activeMinutes.innerHTML = ("0" + pomodoro).slice(-2);
		activeSecond.innerHTML = "00";

	

	$(".pomodoroMinusBtn").click(function(){
		pomodoro--;
		if (pomodoro <= 1){
			pomodoro = 1;
		}
		$(".pomodoroMinuteCount").html(pomodoro);
		activeMinutes.innerHTML = ("0" + pomodoro).slice(-2);
	});

	$(".pomodoroPlusBtn").click(function(){
		pomodoro++;
		if (pomodoro >= 60){
			pomodoro = 60;
		}
		$(".pomodoroMinuteCount").html(pomodoro);
		activeMinutes.innerHTML = ("0" + pomodoro).slice(-2);
	});

	$(".breakMinusBtn").click(function(){
		breakTime--;
		if (breakTime <= 1){
			breakTime = 1;
		}
		$(".breakMinutesCount").html(breakTime);
	});

	$(".breakPlusBtn").click(function(){
		breakTime++;
		if (breakTime >= 15){
			breakTime = 15;
		}
		$(".breakMinutesCount").html(breakTime);
	});

	//Calculate the time remaining
	function getTimeLeft (xxx) {
		var total = Date.parse(xxx) - Date.parse(new Date());
		var seconds = Math.floor( (total/1000) % 60 );
		var minutes = Math.floor( (total/1000/60) % 60 );

		return {
			"total": total,
			"minutes": minutes,
			"seconds": seconds
		};
	}

	//Initialize the timer
		
	function clockInterval() {
		var t = getTimeLeft(finishTime);
		activeMinutes.innerHTML = ("0" + t.minutes).slice(-2);
		activeSecond.innerHTML = ("0" + t.seconds).slice(-2);
		$("title").html(("0" + t.minutes).slice(-2) + ":" + ("0" + t.seconds).slice(-2));
		if (t.total <= 0) {
			clearInterval(clockInterval);
			if (x === 0) {startBreak();}
			else if (x === 1) {startPomodoro();}
		}
	}
	

	function startPomodoro () {
		activeMinutes.innerHTML = ("0" + pomodoro).slice(-2);
		activeSecond.innerHTML = "00";
		$(".message").html("Do Not Disturb");
		$(".message2").addClass("hidden");
		finishTime = new Date(Date.parse(new Date()) + (pomodoro * 60 * 1000));
		setInterval(clockInterval, 1000);
		$(".clockArea").removeClass("hidden");
		x = 0;
	}

	function startBreak () {
		activeMinutes.innerHTML = ("0" + breakTime).slice(-2);
		activeSecond.innerHTML = "00";
		$(".message").html("Taking a Break");
		$(".message2").addClass("hidden");
		finishTime = new Date(Date.parse(new Date()) + (breakTime * 60 * 1000));
		setInterval(clockInterval,1000);
		$(".clockArea").removeClass("hidden");
		x = 1;
	}

	function resetClock () {
		
		$("title").html("Pomodoro")
		// Manual implementation of 2 way binding
		pomodoro = 25;
		breakTime = 15;
		$(".message2").addClass("hidden");
		$(".message").html("25:00");
		$(".pomodoroMinuteCount").html(pomodoro)
		$(".breakMinutesCount").html(breakTime)
		activeMinutes.innerHTML = ("0" + pomodoro).slice(-2);
		activeSecond.innerHTML = "00";
		$(".clockArea").addClass("hidden");
		//clearInterval(clockInterval);		
	}

	function stopClock() {
		clearInterval(clockInterval);
		$("title").html("Pomodoro")
		pomodoro = 25;
		breakTime = 15;
		$(".message").html("Clock stopped, Dont be Lazy");
		$(".message2").html("00:00");
		$(".message2").removeClass("hidden");
		$(".clockArea").addClass("hidden");
		$(".pomodoroMinuteCount").html(pomodoro)
		$(".breakMinutesCount").html(breakTime)
		activeMinutes.innerHTML = ("0" + pomodoro).slice(-2);
		activeSecond.innerHTML = "00";
	}

	$(".startPomodoroBtn").click(function() {
		startPomodoro();
	});

	$(".takeBreakBtn").click(function() {
		startBreak();
	});

	$(".resetBtn").click(function() {
		resetClock();
	});

	$(".stopClock").click(function(){
		stopClock();
	});
});