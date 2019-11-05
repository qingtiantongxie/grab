var itr;
var retryTime = 3000;
var helperObj;
var settings = {
	"YZ": "硬座",
	"RZ": "软座",
	"YW": "硬卧",
	"RW": "软卧",
	"ZE": "二等座",
	"ZY": "一等座"
};
function gogogo() {
	var condition = $("#helper .trainNum .btn-success");
	if(condition.size() == 0) {
		alert("车次或者日期未填写");
		return;
	}

	var seatTypeS = $("#helper .seatType .btn-success");
	if(seatTypeS.size() == 0) {
		alert("座位类型未填写");
		return;
	}

	clearInterval(itr);
	itr = setInterval(function(){
		condition.each(function(i, obj){
			superCheck(obj.innerText);
		});
		$("#query_ticket").trigger("click");
	},retryTime);
}


function makeDiv() {
	if($("#helper").size() > 0) {
		helperObj = $("#helper");
	} else {
		// bootstrap
		$("head").append("<link rel='stylesheet' type='text/css' href='//apps.bdimg.com/libs/todc-bootstrap/3.1.1-3.2.1/todc-bootstrap.min.css'>")
		helperObj = $("<div id='helper'></div>");
		$("body").append(helperObj);
		helperObj.css({
			position:"fixed", 
			left: 0, 
			top: 0,
			height: "240px",
			width: "500px",
			background: "skyblue",
			zIndex: 999999
		});
	}

	helperObj.empty();
	
	var checkboxArr = $("<div class='checkbox trainNum' style='overflow: hidden; margin-bottom: 40px;'></div>");
	$("tr .number").each(function(i, obj){
		checkboxArr.append("<span style='float: left; margin: 10px 0 0 10px' class='btn btn-default'>" + obj.innerText + "</span>");

	});
	helperObj.append(checkboxArr);

	var seatTyptArr = $("<div class='checkbox seatType' style='overflow: hidden; margin-bottom: 40px;'></div>");
	for(var key in settings) {
		seatTyptArr.append("<span style='float: left; margin: 10px 0 0 10px' id='" + key + "' class='btn btn-default'>" + settings[key] + "</span>");
	}
	helperObj.append(seatTyptArr);

	helperObj.append("<button onclick='gogogo()' style='width: 100%' class='btn btn-primary'>开抢</button>");

	helperObj.find(".checkbox .btn").on("click", function(){
		$(this).toggleClass("btn-success");
	});
}

function superCheck(trainNum) {
	var targets = $("tr .number:contains(" + trainNum + ")").parents("tr");
	var seats = targets.find(".t-num,.yes");
	seats.each(function(i, obj){
		for(var key in settings) {
			if(obj.id.indexOf(key) != -1 && $("#" + key).hasClass("btn-success")) {
				notifyMe(trainNum , settings[key]);
			}
		}
	})
}

makeDiv();


function notifyMe(trainNum, type) {
	clearInterval(itr);
	var msg = trainNum + "..." + type;
	console.log(msg);
	var options = {
	  tag: "heroqzs",
	  icon: "http://img.weiyangx.com/2015/11/717A643A7635F4365EFB4EE9784E10E5.jpg"
	}
	
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	}

	
	else if (Notification.permission === "granted") {
	
	var notification = new Notification(msg, options);
	}

	
	else if (Notification.permission !== 'denied') {
	Notification.requestPermission(function (permission) {
	 
	  if (permission === "granted") {
	    var notification = new Notification(msg, options);
	  }
	});
	}

	var yudingBtn = $("tr .number:contains(" + trainNum + ")").parents("tr").find("td:last-child a");
	console.log(yudingBtn);
	yudingBtn.trigger("click");
}