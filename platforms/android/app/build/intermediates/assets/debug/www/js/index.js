var devdata;
var serialToUrl;
var nfcdata;
var rName;
var timeh;
var timem;
var time;
var rchecker;
var ochecker;
var remarks;
var remarkstimein;
var remarkstimeout;
var app = {
	roomData: rName,
    timehour: timeh,
	timemin: timem,
	timevalue: time,
	nfcSerialData: nfcdata,
	deviceSerialData: devdata,
	deviceSerialToUrl: serialToUrl,
	checkInOut: inbool = true,
	roomchecker: rchecker,
	outchecker: ochecker,
	timeOutRemarks: remarks,
	inremarks: remarkstimein,
	outremarks: remarkstimeout,
	initialize: function(){
		this.bindEvents();
		console.log("init NFC");
	},
	bindEvents: function(){
		document.addEventListener("deviceready", this.onDeviceready, false);
		console.log("bindEvents running...");
	},
	onDeviceready: function(){
		var ref = cordova.InAppBrowser.open(encodeURI('http://lormafacultylocator.000webhostapp.com/faculty/'), '_blank','hidden=yes');
		cordova.plugins.backgroundMode.setEnabled(true);
		document.getElementById("time_in").addEventListener("click", onclickingRestrict);
		document.getElementById("time_out").addEventListener("click", outclickingRestrict);
		document.getElementById("dialogclose").addEventListener("click", hideDialog);
		document.getElementById("dialogok").addEventListener("click", roompost);
		document.getElementById("remarksclose").addEventListener("click",remarksdialog);
		document.getElementById("remarksend").addEventListener("click", remarksdialog);
		document.getElementById("takephoto").addEventListener("click", cameraTakePicture);
		
		app.onDeviceId();
		buttonRestriction();
		hidedeleteButton();
		nfc.addTagDiscoveredListener(
			app.onNfc,
			function(status){
				console.log("Device NFC enable");
			},		
			function(error){
				app.dialogs("Device NFC disable");
				console.log("Device NFC disable");	
			}
		)
	},
	onDeviceId: function(){
		var deviceId = device.serial;
		app.deviceSerialToUrl = device.serial;
		console.log("device Serial inside app.index: " + app.deviceSerialToUrl);
		console.log(deviceId);
		app.display(deviceId);
		latestHistory();
	},
	onNfc: function(nfcEvent){
		var tag = nfcEvent.tag;
		var deviceId = device.serial;
		app.deviceSerialData = deviceId;
		app.nfcSerialData = nfc.bytesToHexString(tag.id);
		app.displayOutput(nfc.bytesToHexString(tag.id), deviceId);
		console.log(nfc.bytesToHexString(tag.id)+ " /" +  deviceId);		
	},
	display: function(dev_info){
		devInfo.innerHTML = "device Serial: " + dev_info;
		document.getElementById('deviceInfo').setAttribute("value", dev_info);
	},
	dialogs: function(nfcStat){
		var message = nfcStat;
		var title = "Error";
		var buttonName = "ok";
		navigator.notification.alert(message, alertCallback, title, buttonName);
	}, 
	
	displayOutput: function(nfcSerial, devSerial){
		// write something that handle double tapping;
		msg.innerHTML = '';
		buttonRestriction();
		roomNamecall();
		
	},
}


app.initialize();

function alertCallback(){
	console.log("NFC device disable");
}

function latestHistory(){
	console.log("initializing refresh history");
	latest.innerHTML = '';
	var data;
	var jsonUrl = 'http://lormafacultylocator.000webhostapp.com/json/generated_files/'+app.deviceSerialToUrl+'.json';

	$.ajax({
		dataType: "json",
		url: jsonUrl,
		cache: false,
		data: data,
		success: function (data) {
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
						
						var in12hours = data.posts[hdataIter].time_in;
						var out12hours = data.posts[hdataIter].time_out;
						
						var inH = +in12hours.substr(0,2);
						var inhour = inH % 12 || 12;
						var inampm = (inH < 12 || inH == 24) ? " AM" : " PM";
						in12hours =  inhour + in12hours.substr(2,3) + inampm;
						console.log(in12hours);
						console.log(out12hours);
						
						if(data.posts[hdataIter].time_out != null){
							console.log("time_out != null");
							var outH = +out12hours.substr(0,2);
							var outhour = outH % 12 || 12;
							var outampm = (outH < 12 || outH == 24) ? " AM" : " PM";
							out12hours = outhour + out12hours.substr(2,3) + outampm;
							console.log(out12hours);
						}
						
						if(data.posts[hdataIter].date == data.posts[0].date){
							$("#latest").append('<ons-card><ons-row><ons-col style = "text-align: left" width = "120px">' + data.posts[hdataIter].room + '</ons-col><ons-col style = "align-text: center"><ons-icon icon = "ion-arrow-down-a">' + in12hours + '</ons-icon></ons-col><ons-col style = "align-text: center"><ons-icon icon = "ion-arrow-up-a">' + out12hours + '</ons-icon></ons-col></ons-row></ons-card>');
						}
						else{
							break;
						}
						hdataIter++;
					}
				}
				iterH++;
			}
			//$("#latest").append('<ons-list-header>' + data.posts[iterH].date + '</ons-list-header>');
			
		},
		error: function(jqXHR, error){
			console.log(jqXHR);
			console.log(error);
			$("#p").empty();
			$('#p').append("No Data");
		}
	});	
}

function roomNamecall(){

	var data;
	var roomjsonurl = 'http://lormafacultylocator.000webhostapp.com/json/generate_roomslist.php';
	
	$.ajax({
		dataType: "json",
		url: roomjsonurl,
		cache: false,
		data: data,
		success: function(data){			
			var iterator = 0;
			var iteratorlength = data.Rooms.length;	
			while(iterator < iteratorlength){
				if(data.Rooms[iterator].nfc_serial == app.nfcSerialData){
					app.roomData = data.Rooms[iterator].room_name;
					console.log("comaparison is checked.");
					break;
				}
				iterator++;
			}
			
			console.log("roomNamecall: ");
			console.log(app.roomData);
			console.log(app.roomchecker);
			console.log(app.outremarks);
			console.log("comparison: " + (app.roomData == app.roomchecker));
			console.log("comparison: " +(app.outremarks != 'null'));
			console.log("comparison: " +(app.outremarks != null));
			if(app.roomData == app.roomchecker && app.outremarks != 'null' && app.outremarks != null){
				alert("You already have an entry for this schedule.");
			}
			else{
				console.log("if is false esle is running.");
				onTapDisplay();
			}
		}
	});	
}
 
function onTapDisplay(){
	//652896c2
	console.log("room data " + app.roomData);
	console.log("device id: " + app.deviceSerialData);
	console.log("nfc Serial: " + app.nfcSerialData);
	var data;
	var getScheduleurl = 'http://lormafacultylocator.000webhostapp.com/faculty/get_schedule.php?serial='+app.deviceSerialToUrl;
	var devSerialInput = document.createElement("INPUT");
	var roomNameInput = document.createElement("INPUT");
	var displayRoom = document.createElement("P");
	var createnode = document.createTextNode(app.roomData);
	var designMaker = document.createElement("ONS-CARD");
	
	
	devSerialInput.setAttribute("type", "hidden");
	devSerialInput.setAttribute("name", "device_serial");
	devSerialInput.setAttribute("style", "border: none");
	devSerialInput.setAttribute("readonly", true);
	devSerialInput.setAttribute("value", app.deviceSerialData);
	
	roomNameInput.setAttribute("type", "hidden");
	roomNameInput.setAttribute("name", "room_name");
	roomNameInput.setAttribute("style", "border: none");
	roomNameInput.setAttribute("readonly", true);
	roomNameInput.setAttribute("value", app.roomData);
	
	displayRoom.setAttribute("style", "text-align: center")
	
	designMaker.appendChild(devSerialInput);
	designMaker.appendChild(roomNameInput);
	displayRoom.appendChild(createnode);
	designMaker.appendChild(displayRoom);
	$.ajax({
		dataType: "json",
		url: getScheduleurl,
		cache: false,
		data: data,
		success: function(data){
			var iterator = 0;
			var iteratorlength = data.Schedule.length;
			var servertime = app.timehour;
			
			console.log("console: running.time_out.checker " + (app.outchecker == null));
			if(app.roomchecker == app.roomData && app.outchecker  == null){
				$("#msg").append(designMaker);
				document.getElementById("room_remarks").value = app.roomData;
				outremoveRestriction();

				
			}
			else{
				while(iterator< iteratorlength){
					var schedtime = data.Schedule[iterator].StartTime;
					var timesplit = schedtime.split(":");
					var sethour = parseInt(timesplit[0]);
					console.log("console: running.sethour" + sethour)
					if(servertime == sethour){
						console.log("console: running.if.value");
						if(data.Schedule[iterator].Sched_Room == app.roomData){
							console.log("console: timeOut.display.running: " + (data.Schedule[iterator].time_out));
							$("#msg").append(designMaker);
							app.timeOutRemarks = data.Schedule[iterator].time_out;
							showphotodialog();
							inremoveRestriction();
							break;
						}
						else{
							//roompost();
							console.log("console: inner.else.value");
							var innersethour = parseInt(timesplit[0]);	
							var innertimechecker = app.timehour;
							while(innertimechecker < 24){
								displayinputData(data.Schedule[iterator].Sched_Room, data.Schedule[iterator].StartTime, data.Schedule[iterator].EndTime);
								displayDialog();
								break;
							}
							if(servertime == innertimechecker){
								//roompost();
								break;
							}
						}
						continue;
					}
					else {
						
						var timechecker = app.timehour;
						while( timechecker < 24){
							console.log("console: running.else.value");
							if(timechecker == sethour){
								displayinputData(data.Schedule[iterator].Sched_Room, data.Schedule[iterator].StartTime, data.Schedule[iterator].EndTime);
								displayDialog();
								break;
							}
							timechecker++;
						}
						if(timechecker  == sethour){
							//roompost();
							break;
						}
					}
					iterator++;
				}	
			}
		}
	});
}

function cameraTakePicture() {
	navigator.camera.getPicture(onSuccess, onFail, {quality: 10, destinationType: Camera.DestinationType.DATA_URL,correctOrientation: true});
	function onSuccess(imageData) {
		var image = document.getElementById('myImage');
		image.src = "data:image/png;base64," + imageData;
		document.getElementById("imageAscii").value = imageData;
		console.log(imageData);
		console.log(document.getElementById("imageAscii").value = imageData);
		hidephotodialog();
	}
	function onFail(message) {
		alert('Failed because: ' + message);
	}
	
}

function buttonRestriction(){
	document.getElementById("time_in").setAttribute("disabled", true);
	document.getElementById("time_out").setAttribute("disabled", true);
	//document.getElementById("remarksdialog").show();
}
function inremoveRestriction(){
	document.getElementById("time_in").removeAttribute("disabled");
}
function onclickingRestrict(){
	document.getElementById("time_in").setAttribute("disabled", true);
}
function outremoveRestriction(){
	document.getElementById("time_out").removeAttribute("disabled");
}
function outclickingRestrict(){
	document.getElementById("time_out").setAttribute("disabled", true);
}
function displayDialog(){
	var dialog = document.getElementById('dialogs');
	dialog.show();
}
function hideDialog(){
	msg.innerHTML = '';
	var dialog = document.getElementById('dialogs');
	dialog.hide();
}
function hidedeleteButton(){
	$("#deleteButton").hide();
}

function remarksdialog(){
	var dialog_ = document.getElementById("remarksdialog");
	dialog_.hide();
}

function showphotodialog(){
	document.getElementById("photodialog").show();
}
function hidephotodialog(){
	document.getElementById("photodialog").hide();
}

function displayinputData(roomData, beginTime, endTime){
	console.log("initializing display input data");
	schedroomName.innerHTML = '';
	schedtimeIO.innerHTML = '';
	schedtimeIO_.innerHTML = '';
	timeInfo.innerHTML = '';
	timeIn.innerHTML = '';
	
	var in12hours = beginTime;
	var out12hours = endTime;
	
	var inH = +in12hours.substr(0,2);
	var inhour = inH % 12 || 12;
	var inampm = (inH < 12 || inH == 24) ? " AM" : " PM";
	in12hours =  inhour + in12hours.substr(2,3) + inampm;
	console.log(in12hours);
	
	var outH = +out12hours.substr(0,2);
	var outhour = outH % 12 || 12;
	var outampm = (outH < 12 || outH == 24) ? " AM" : " PM";
	out12hours = outhour + out12hours.substr(2,3) + outampm;
	console.log(out12hours);
						
					
	
	$("#schedroomName").append(roomData);
	$("#schedtimeIO").append("Begin:\t" + in12hours);
	$("#schedtimeIO_").append("End: \t" + out12hours);
	$("#timeInfo").append("No schedule found.");
	$("#timeIn").append("Enter [" + app.roomData + "]?" + "<br>" + "Press ok");
}

function roompost(){
	console.log("room posting display running");
	msg.innerHTML = '';
	var devSerialInput = document.createElement("INPUT");
	var roomNameInput = document.createElement("INPUT");
	var displayRoom = document.createElement("P");
	var createnode = document.createTextNode(app.roomData);
	var designMaker = document.createElement("ONS-CARD");
	
	document.getElementById("room_remarks").value = app.roomData;
	
	devSerialInput.setAttribute("type", "hidden");
	devSerialInput.setAttribute("name", "device_serial");
	devSerialInput.setAttribute("style", "border: none");
	devSerialInput.setAttribute("readonly", true);
	devSerialInput.setAttribute("value", app.deviceSerialData);
	
	roomNameInput.setAttribute("type", "hidden");
	roomNameInput.setAttribute("name", "room_name");
	roomNameInput.setAttribute("style", "border: none");
	roomNameInput.setAttribute("readonly", true);
	roomNameInput.setAttribute("value", app.roomData);
	
	displayRoom.setAttribute("style", "text-align: center")
	
	designMaker.appendChild(devSerialInput);
	designMaker.appendChild(roomNameInput);
	displayRoom.appendChild(createnode);
	designMaker.appendChild(displayRoom);
	
	inremoveRestriction();
	hideDialog();
	$("#msg").append(designMaker);
	showphotodialog();
}


