$(document).ready(function(){		
	$("#time_in").click(function(){
			var inDevice_serial = $('[name = device_serial]').val();
			var inRoom  = $('[name = room_name]').val();	
			$.ajax({
				type: 'POST',
				url: 'http://lormafacultylocator.000webhostapp.com/faculty/time_in.php',
				cache: false,
				data: {device_serial: inDevice_serial, room: inRoom},
				success: function(data){
					alert("Successfully time in!");
					msg.innerHTML = '';
					$("#deleteTimer").show();
					$("#deleteButton").show();
					preRemarks();
					refreshHistory();
					frame.innerHTML = '<iframe src = "http://lormafacultylocator.000webhostapp.com/faculty/mobile_locator.php" width = "100%" height = "100%" frameBorder = "0" hspace="0" vspace="0" marginheight="0" marginwidth="0">Something\'s wrong!</iframe>';

				},
				error: function (jqXHR, exception){
					app.checkInOut = false;
					app.timeinoutInput = 0;
					if (jqXHR.status === 0) {
						console.log('Not connect.\n Verify Network.');
						alert("Data not inserted");
					} else if (jqXHR.status == 404) {
						console.log('Requested page not found. [404]');
						alert("Data not inserted");
					} else if (jqXHR.status == 500) {
						alert('Internal Server Error [500].');
						alert("Data not inserted");
					} else if (exception === 'parsererror') {
						console.log('Requested JSON parse failed.');
						alert("Data not inserted");
					} else if (exception === 'timeout') {
						console.log('Time out error.');
						alert("Data not inserted");
					} else if (exception === 'abort') {
						console.log('Ajax request aborted.');
						alert("Data not inserted");
					} else {
						console.log('Uncaught Error.\n' + jqXHR.responseText);
						alert("Data not inserted");
					}
				}
			});
	});
	
	$("#dialogok").click(function(){
			var inDevice_serial = $('[name = device_serial]').val();
			var inRoom  = $('[name = room_name]').val();	
			$.ajax({
				type: 'POST',
				url: 'http://lormafacultylocator.000webhostapp.com/faculty/time_in.php',
				cache: false,
				data: {device_serial: inDevice_serial, room: inRoom},
				success: function(data){
					alert("Successfully time in!");
					msg.innerHTML = '';
					preRemarks();
					$("#deleteTimer").show();
					$("#deleteButton").show();
					refreshHistory();
					frame.innerHTML = '<iframe src = "http://lormafacultylocator.000webhostapp.com/faculty/mobile_locator.php" width = "100%" height = "100%" frameBorder = "0" hspace="0" vspace="0" marginheight="0" marginwidth="0">Something\'s wrong!</iframe>';

				},
				error: function (jqXHR, exception){
					app.checkInOut = false;
					app.timeinoutInput = 0;
					if (jqXHR.status === 0) {
						console.log('Not connect.\n Verify Network.');
						alert("Data not inserted");
					} else if (jqXHR.status == 404) {
						console.log('Requested page not found. [404]');
						alert("Data not inserted");
					} else if (jqXHR.status == 500) {
						alert('Internal Server Error [500].');
						alert("Data not inserted");
					} else if (exception === 'parsererror') {
						console.log('Requested JSON parse failed.');
						alert("Data not inserted");
					} else if (exception === 'timeout') {
						console.log('Time out error.');
						alert("Data not inserted");
					} else if (exception === 'abort') {
						console.log('Ajax request aborted.');
						alert("Data not inserted");
					} else {
						console.log('Uncaught Error.\n' + jqXHR.responseText);
						alert("Data not inserted");
					}
				}
			});
	});

	$("#time_out").click(function(){
			console.log("Initializing Time Out");

			var outdeviceserial = $('[name = device_serial]').val();
			var outRoom  = $('[name = room_name]').val();
			$.ajax({
				type: 'POST',
				url: 'http://lormafacultylocator.000webhostapp.com/faculty/time_out.php',
				cache: false,
				data: {device_serial: outdeviceserial, room: outRoom},
				success: function(data){
					alert("Successfully time out!");
					console.log(data);
					refreshHistory();
					frame.innerHTML = '<iframe src = "http://lormafacultylocator.000webhostapp.com/faculty/mobile_locator.php" width = "100%" height = "100%" frameBorder = "0" hspace="0" vspace="0" marginheight="0" marginwidth="0">Something\'s wrong!</iframe>';
					
					$("#deleteButton").hide();
					msg.innerHTML = '';
				},
				error: function (jqXHR, exception){
					app.timeinoutInput += 2;
					app.checkInOut = false;
					console.log(jqXHR);
					console.log("jqXHR.status: " + jqXHR.status );
					console.log("jqXHR.status: " + exception);
					if (jqXHR.status === 0) {
						console.log('Not connect.\n Verify Network.');
						alert("Data not inserted");
					} else if (jqXHR.status == 404) {
						console.log('Requested page not found. [404]');
						alert("Data not inserted");
					} else if (jqXHR.status == 500) {
						alert('Internal Server Error [500].');
						alert("Data not inserted");
					} else if (exception === 'parsererror') {
						console.log('Requested JSON parse failed.');
						alert("Data not inserted");
					} else if (exception === 'timeout') {
						console.log('Time out error.');
						alert("Data not inserted");
					} else if (exception === 'abort') {
						console.log('Ajax request aborted.');
						alert("Data not inserted");
					} else {
						console.log('Uncaught Error.\n' + jqXHR.responseText);
						alert("Data not inserted");
					}
				}
			});
	});

	$("#deleteButton").click(function(){
		console.log("console: initializing.deletebutton");
		var deleteulr = 'http://lormafacultylocator.000webhostapp.com/faculty/delete_recent.php';
		var delHistory = $('[name = deviceInfo ]').val();
		console.log("device Serial: " + delHistory);
		$.ajax({
			type: 'POST',
			url: deleteulr,
			cache: false,
			data: {device_serial: delHistory},
			success: function(data){
				alert("Successfully delete the file");
				historydel();
				$("#deleteButton").hide();

			},
			error: function (jqXHR, exception){
				app.timeinoutInput += 2;
				app.checkInOut = false;
				console.log(jqXHR);
				console.log("jqXHR.status: " + jqXHR.status );
				console.log("jqXHR.status: " + exception);
				if (jqXHR.status === 0) {
					console.log('Not connect.\n Verify Network.');
					alert("Data not Deleted. Check network connection.");
				} else if (jqXHR.status == 404) {
					console.log('Requested page not found. [404]');
					alert("Data not inserted. database not available");
				} else if (jqXHR.status == 500) {
					alert('Internal Server Error [500].');
					alert("Data not inserted. Server error");
				} else if (exception === 'parsererror') {
					console.log('Requested JSON parse failed.');
					alert("Data not inserted Requested JSON parse failed.");
				} else if (exception === 'timeout') {
					console.log('Time out error.');
					alert("Data not inserted. Request time out");
				} else if (exception === 'abort') {
					console.log('Ajax request aborted.');
					alert("Data not inserted. Aborted");
				} else {
					console.log('Uncaught Error.\n' + jqXHR.responseText);
					alert("Data not inserted");
				}
			}
		});

	});

	$("#remarksend").click(function(){
		var remarksInput = $('[name = remarksresult]').val();
		var rdeviceserial = $('[name = deviceInfo ]').val();
		console.log("REMARKS INPUT: " + remarksInput);
		console.log("Device Serial: " + rdeviceserial);
		$.ajax({
			type: 'POST',
			url: 'http://lormafacultylocator.000webhostapp.com/faculty/time_out.php',
			cache: false,
			data: {"device_serial": rdeviceserial, "ed_remarks": remarksInput},
			success: function(data){
				alert("Successfully send remarks.");
				console.log(data);
				console.log("time out here");
				msg.innerHTML = '';
			}
		});
	});
	
	$("#log").click(function(){
		console.log("initializing refresh history");
		latest.innerHTML = '';
		console.log(app.deviceSerialToUrl);
		var data;
		var jsonUrl = 'http://lormafacultylocator.000webhostapp.com/json/generated_files/'+app.deviceSerialToUrl+'.json';

		$.ajax({
			dataType: "json",
			url: jsonUrl,
			cache: false,
			data: data,
			success: function (data) {
				var iterator = 0;
				var dataIterator;

				var iterH = 1;
				var hLength = data.posts.length;
				while(iterH < hLength){
					if(iterH - 1 == 0){
						var hdataIter = 0;
						$("#latest").append('<ons-list-header style = "text-align: center">' + data.posts[0].date + '</ons-list-header>');
						
						while(hdataIter < hLength){
							if(data.posts[hdataIter].date == data.posts[0].date){
								$("#latest").append('<ons-card><ons-row><ons-col style = "text-align: center" width = "120px">' + data.posts[hdataIter].room + '</ons-col><ons-col style = "align-text: center"><ons-icon icon = "ion-arrow-down-a">' + data.posts[hdataIter].time_in + '</ons-icon></ons-col><ons-col style = "align-text: center"><ons-icon icon = "ion-arrow-up-a">' + data.posts[hdataIter].time_out + '</ons-icon></ons-col></ons-row></ons-card>');
							}
							else{
								break;
							}
							hdataIter++;
						}
					}
					iterH++;
				}
				
		
			},
			error: function(jqXHR, error){
				console.log(jqXHR);
				console.log(error);
				$("#p").empty();
				alert("No Data.");
			}
		});	
	});
	$("#locator").click(function(){
		console.log("initializing locator refresh..")
		frame.innerHTML = '<iframe src = "http://lormafacultylocator.000webhostapp.com/faculty/mobile_locator.php" width = "100%" height = "100%" frameBorder = "0" hspace="0" vspace="0" marginheight="0" marginwidth="0">Something\'s wrong!</iframe>';
	});
	
	startTime();
});

function refreshHistory(){
	console.log("initializing refresh history");
	latest.innerHTML = '';
	console.log(app.deviceSerialToUrl);
	var data;
	var jsonUrl = 'http://lormafacultylocator.000webhostapp.com/json/generated_files/'+app.deviceSerialToUrl+'.json';

	$.ajax({
		dataType: "json",
		url: jsonUrl,
		cache: false,
		data: data,
		success: function (data) {
			var iterator = 0;
			var dataIterator;
			app.roomchecker = data.posts[0].room;
			app.outchecker = data.posts[0].time_out;
			app.inremarks = data.posts[0].time_in;
			app.outremarks = data.posts[0].time_out;
			var iterH = 1;
			var hLength = data.posts.length;
			var classduration = diff_minutes(new Date(gettodayDate() + " " + app.inremarks), new Date(gettodayDate() + " " + app.outremarks));
				
			if(app.outremarks != 'null' && app.outremarks != null){
				console.log("im not equal no null");
				console.log(app.inremarks);
				console.log(app.outremarks);
				console.log("diiference: " + classduration);
				if(classduration <= 50 || classduration <= 110 || classduration <= 170){
						$("#remarksdialog").show();
				}
			}
			while(iterH < hLength){
				if(iterH - 1 == 0){
					var hdataIter = 0;
					$("#latest").append('<ons-list-header style = "text-align: center">' + data.posts[0].date + '</ons-list-header>');
					
					while(hdataIter < hLength){
						if(data.posts[hdataIter].date == data.posts[0].date){
							$("#latest").append('<ons-card><ons-row><ons-col style = "text-align: center" width = "120px">' + data.posts[hdataIter].room + '</ons-col><ons-col style = "align-text: center"><ons-icon icon = "ion-arrow-down-a">' + data.posts[hdataIter].time_in + '</ons-icon></ons-col><ons-col style = "align-text: center"><ons-icon icon = "ion-arrow-up-a">' + data.posts[hdataIter].time_out + '</ons-icon></ons-col></ons-row></ons-card>');
						}
						else{
							break;
						}
						hdataIter++;
					}
				}
				iterH++;
			}
			
	
		},
		error: function(jqXHR, error){
			console.log(jqXHR);
			console.log(error);
			$("#p").empty();
			alert("No Data.");
		}
	});		
}

function historydel(){
	console.log("initializing refresh history");
	latest.innerHTML = '';
	console.log(app.deviceSerialToUrl);
	var data;
	var jsonUrl = 'http://lormafacultylocator.000webhostapp.com/json/generated_files/'+app.deviceSerialToUrl+'.json';

	$.ajax({
		dataType: "json",
		url: jsonUrl,
		cache: false,
		data: data,
		success: function (data) {
			var iterator = 0;
			var dataIterator;
			app.roomchecker = data.posts[0].room;
			app.outchecker = data.posts[0].time_out;
			app.inremarks = data.posts[0].time_in;
			app.outremarks = data.posts[0].time_out;
			var iterH = 1;
			var hLength = data.posts.length;
			while(iterH < hLength){
				if(iterH - 1 == 0){
					var hdataIter = 0;
					$("#latest").append('<ons-list-header style = "text-align: center">' + data.posts[0].date + '</ons-list-header>');
					
					while(hdataIter < hLength){
						if(data.posts[hdataIter].date == data.posts[0].date){
							$("#latest").append('<ons-card><ons-row><ons-col style = "text-align: center" width = "120px">' + data.posts[hdataIter].room + '</ons-col><ons-col style = "align-text: center"><ons-icon icon = "ion-arrow-down-a">' + data.posts[hdataIter].time_in + '</ons-icon></ons-col><ons-col style = "align-text: center"><ons-icon icon = "ion-arrow-up-a">' + data.posts[hdataIter].time_out + '</ons-icon></ons-col></ons-row></ons-card>');
						}
						else{
							break;
						}
						hdataIter++;
					}
				}
				iterH++;
			}
			
	
		},
		error: function(jqXHR, error){
			console.log(jqXHR);
			console.log(error);
			$("#p").empty();
			alert("No Data.");
		}
	});	
}

function startTime() {
    var today = new Date();
    var h = (today.getHours()<10?"0":'') + today.getHours();
    var m = (today.getMinutes()<10?"0":'') + today.getMinutes();
    var s = (today.getSeconds()<10?"0":'') + today.getSeconds();
	
	app.timevalue = h + ":" + m;
	app.timehour = h;
	app.timemin = m;
    server_time.innerHTML = "Server Time: " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function preRemarks(){
	var secondsCountdown = 30,
		display = document.querySelector("#deleteTimer");
		countdownTimer(secondsCountdown, display);
}

function countdownTimer(duration, display){
	var timer = duration, minute, seconds;
	 var setTimerrun = setInterval(function() {
		seconds = parseInt(timer % 60, 10);
		seconds = seconds < 10 ? "0" +seconds : seconds;
		display.textContent = seconds;

		if(--timer < 0){
			timer = duration;
			clearInterval(setTimerrun);
			deleteTimer.innerHTML = '30';
			$("#deleteTimer").hide();
			$("#deleteButton").hide();
			
		}
	},1000);
}

function myFunction() {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var d = new Date();
    var n = month[d.getMonth()];
    return n;
}

function gettodayDate(){
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy;
return today = myFunction() + " " + dd + ", " + yyyy;  
  
}

function diff_minutes (d1, d2) {
    var m1 = d1.getMinutes();
    var m2 = d2.getMinutes();
    return m2 - m1;
}
