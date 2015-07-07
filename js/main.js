$(function() {
	var userList = [{
		firstName: "Ion",
		lastName: "Gheorghe",
		city: "Iasi"
	}, {
		firstName: "Tudor",
		lastName: "Prejmerean",
		city: "Laponia"
	}, {
		firstName: "Alex",
		lastName: "Prejmerean",
		city: "Laponia"
	}];

	function renderTable() {
		var $template = $("<tr><td class='firstName'></td>" +
							"<td class='lastName'></td>" +
							"<td class='cityName'></td>"+
							"<td class='action'>X</td></tr>");
		var $body = $(".user-list tbody");

		for (var i = 0; i < userList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(userList[i].firstName);
			$($items[1]).text(userList[i].lastName);
			$($items[2]).text(userList[i].city);

			$body.append($element);
		}
	}

	function clearTable() {
		$(".user-list tbody tr").remove();
	}

	function clearForm() {
		$(".user-form input[type='text']").val("");
	}

	function addUser(user) {
		userList.push(user);
		clearTable();
		renderTable();
	}

	function showForm() {
		$(".user-form").removeClass("hidden");
	}

	function hideForm() {
		$(".user-form").addClass("hidden");
	}

	function addEvents() {
		var addMode = true;
		$(".user-list").on("click", ".action", function() {
			var index = $(this).parent().index();
			userList.splice(index, 1);
			
			clearTable();
			renderTable();
		});

		$(".user-list").on("click", ".firstName", function(){
			addMode = false;
			console.log(addMode);
			var index = $(this).parent().index();
			showForm();
			$(".user-form input[name='firstName']").val(userList[index].firstName);
			$(".user-form input[name='lastName']").val(userList[index].lastName);
			$(".user-form input[name='cityName']").val(userList[index].city);
			$("#saveUser").on("click", function() {
				userList[index].firstName= $(".user-form input[name='firstName']").val();
				userList[index].lastName= $(".user-form input[name='lastName']").val();
				userList[index].city= $(".user-form input[name='cityName']").val();
				clearTable();
				renderTable();
				addMode = true;
			});
		});
 	
		$(".user-list").on("click", ".lastName", function(){
			addMode = false;
			var index = $(this).parent().index();
			console.log(userList[index].lastName);
			showForm();
			$("#saveUser").on("click", function() {
					userList[index].firstName= $(".user-form input[name='firstName']").val();
					userList[index].lastName= $(".user-form input[name='lastName']").val();
					userList[index].city= $(".user-form input[name='cityName']").val();
					clearTable();
				renderTable();
				addMode = true;
				});
		});

			$(".user-list").on("click", ".cityName", function(){
				addMode = false;
				var index = $(this).parent().index();
				console.log(userList[index].city);
				showForm();
				$("#saveUser").on("click", function() {
					userList[index].firstName= $(".user-form input[name='firstName']").val();
					userList[index].lastName= $(".user-form input[name='lastName']").val();
					userList[index].city= $(".user-form input[name='cityName']").val();
					clearTable();
				renderTable();
				addMode = true;
				});
			});

		$("#addUser").on("click", function() {
			showForm();
		});

		$("#saveUser").on("click", function() {
			console.log(addMode);
			if (addMode == true) {
			    console.log(addMode);
				var $items = $(".user-form input[type='text']");
				var obj = {
					firstName: $($items[0]).val(),
					lastName: $($items[1]).val(),
					city: $($items[2]).val()
					}

			addUser(obj);
			hideForm();
			clearForm();
		};
	});

		$("#cancelUser").on("click", function() {
			hideForm();
			clearForm();
		});
	}

	renderTable();
	addEvents();
});