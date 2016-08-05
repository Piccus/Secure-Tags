$(function(){
	var store = localStorage;
	if(store.getItem("lock") == "true"){
		if(store.length == 1){
			$("#unlock_pw").hide();
			$("#unlock").hide();
			$("#add_mark").hide();
			$("#add_new_mark").hide();
		}else{
			$("#lock_pw").hide();
			$("#lock").hide();
			$("#add_mark").hide();
			$("#add_new_mark").hide();
		}
	}else{
		$("input").hide();
		$("button.little").hide();
		showMarks();
	}

	$("#lock").click(function(){
		var data = {"lock_key": "", "marks": []};
		data.lock_key = $("#lock_pw").val();
		data = JSON.stringify(data);
		store.setItem("data", data);
		location.reload();
	})

	$("#unlock").click(function(){
		var data = store.getItem("data");
		data = JSON.parse(data);
		if(data.lock_key == $("#unlock_pw").val()){
			store.setItem("lock", false);
			location.reload();
		}
	})

	$("#secure_mode").click(function() {
		chrome.windows.create({incognito: true});
	})

	$("#add_mark").click(function(){
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
   			var url = tabs[0].url;
   			var title = tabs[0].title;
   			var data = store.getItem("data");
			data = JSON.parse(data);
   			var newMark = {"title":"", "url":""};
   			newMark.title = title;
   			newMark.url = url;
   			data.marks.push(newMark);
   			data = JSON.stringify(data);
   			store.setItem("data", data);
   			location.reload();
		});
	})

	$("#options").click(function(){
		chrome.tabs.create({url: "options.html"});
	})

	$(".mark").click(function(){
		chrome.tabs.create({url:$(this).attr("target")});
	})

	function showMarks(){
		var data = store.getItem("data");
		data = JSON.parse(data);
		var markNumber = data.marks.length;
		$(data.marks).each(function(){
				var button = $("<button class=\"mark\"></button>").text(this.title.substring(0,10)).attr("target", this.url);
				$("#options").before(button);
		});
	}
})
