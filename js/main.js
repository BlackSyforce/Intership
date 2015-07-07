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
		firstName: "Tudor",
		lastName: "Prejmerean",
		city: "Laponia"
	}];

	function renderTable() {
		var $template = $("<tr><td></td><td></td><td></td><td class='action'>X</td></tr>");
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
		$(".user-list").on("click", ".action", function() {
			var index = $(this).parent().index();
			userList.splice(index, 1);
			
			clearTable();
			renderTable();
		});

		$("#addUser").on("click", function() {
			showForm();
		});

		$("#saveUser").on("click", function() {
			var $items = $(".user-form input[type='text']");
			var obj = {
				firstName: $($items[0]).val(),
				lastName: $($items[1]).val(),
				city: $($items[2]).val()
			};

			addUser(obj);
			hideForm();
			clearForm();
		});

		$("#cancelUser").on("click", function() {
			hideForm();
			clearForm();
		});
	}

	renderTable();
	addEvents();
});