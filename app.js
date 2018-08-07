$(document).ready(function() {
	var filter_btn = $(".btn-group .btn");
	var chanel_div = $(".chanel");
	var chanelList_div = $("#chanel-list");
	var chanelList = ["ESL_SC2", "captaindelugo", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	
	chanelList.forEach(function(val) {
		var url = "https://wind-bow.glitch.me/twitch-api/streams/"+val;
		$.getJSON(url, function(chanel) {
			var data = chanel.stream;
			if(data===null) {
				var url2 = "https://wind-bow.glitch.me/twitch-api/channels/"+val;
				$.getJSON(url2, function(data){
					chanelList_div.append(getChanelCard(status="Offline", data));
				});
			}
			else{
				chanelList_div.append(getChanelCard(status="Online",  data.channel));
			}
		});
	});

	filter_btn.click(function() {
		$(".chanel").show();
		var t = $(this).text();
		filter_btn.removeClass("active");
		$(this).addClass('active');
		if(t==="All") {
			return;
		}
		var fil = (t==="Online")?".Offline":".Online";
		$(fil).hide();
	});

	$("#filter").keyup(function() {
		filter_btn.removeClass("active");
		var w = $(this).val().toLowerCase();
		//alert(w);
		$(".chanel").filter(function() {
			var rw = $(".details", this).text().toLowerCase();
			$(this).toggle(rw.indexOf(w)>-1);
		});
	});

});


function getChanelCard(status, data) {
	var name, logo, stCol, icon, ongoing, link;
	name = data.display_name;
	logo = data.logo;
	link = data.url;
	if(status==="Offline") {
		stCol = "danger";
		icon = "&times;";
		ongoing = "none";
	}
	else {
		ongoing = data.game;
		stCol = "success";
		icon = "&#10003;";
	}
	var text = '<div class="chanel '+status+'">\
				<img class="img-fluid chanel-logo" src="'+logo+'" />\
				<div class="details">\
					<h3>'+name+'</h3>\
					<p class="now">\
						'+ongoing+'\
					</p>\
				</div>\
				<div class="alert alert-'+stCol+'"><b>'+icon+'</b> '+status+'</div>\
				<a href="'+link+'" target="_blank" class="btn btn-block btn-info">view channel</a>\
			</div>'
	return text;
}