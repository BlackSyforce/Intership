$(function() {
	var userList = [];
	var editMode = false;
	var editIndex;
	var ascendingF = true;
	var ascendingL = true;
	var ascendingC = true;

	function renderTable() {
		var $template = $("<tr><td></td><td></td><td></td><td class='action'>X</td></tr>");
		var $body = $(".user-list tbody");

		for (var i = 0; i < userList.length; i++) {
			var $element = $template.clone();

			var $items = $element.find("td");
			$($items[0]).text(userList[i].firstname);
			$($items[1]).text(userList[i].lastname);
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
		$("#addUser").on("click", function() {
			showForm();
			editMode = false;
		});

		$("#saveUser").on('click', function() {
			if (editMode){
				var $items = $(".user-form input[type='text']");
				var objNew = {
					firstname: $($items[0]).val(),
					lastname: $($items[1]).val(),
					city: $($items[2]).val()
				};

				var newIndex = userList[editIndex]._id;

				jQuery.ajax({
					method: "PUT",
					url: "http://localhost:4000/user/" + newIndex,
					data: objNew
				}) .done(function(data) {
					userList[editIndex].firstname = objNew.firstname;
					userList[editIndex].lastname = objNew.lastname;
					userList[editIndex].city = objNew.city;
					clearTable();
					renderTable();
				});
					
				hideForm();
				clearForm();
			} else {
				var $items = $(".user-form input[type='text']");
				var obj = {
					firstname: $($items[0]).val(),
					lastname: $($items[1]).val(),
					city: $($items[2]).val()
				};

				jQuery.ajax({
					method: "POST",
					url: "http://localhost:4000/user",
					data: obj
				}) .done(function(data) {
					userList.push(data);
					clearTable();
					renderTable();
				});

				hideForm();
				clearForm();
			}
		});

		$("#cancelUser").on("click", function() {
			hideForm();
			clearForm();
		});

		$('.user-list').on('click', 'tr', function(e) {
			if ( $(e.target).hasClass("action") ) {
				return;
			}
			showForm();
			var $oldData = $(this).find('td');
			console.log('here');
			editIndex = $(this).index();
			var $newData = $(".user-form input[type='text']");
			for (var i = 0; i < $newData.length; i++) {
				$($newData[i]).val($($oldData[i]).text());
			}
			editMode = true;
		});

		$(".user-list").on("click", ".action", function(e) {
			hideForm();
			var index = $(this).parent().index();
			var id = userList[index]._id;
			jQuery.ajax({
				method: "DELETE",
				url: "http://localhost:4000/user/" + id
			}) .done(function(data) {
					userList.splice(index, 1);
					clearTable();
					renderTable();
			});
			
			clearTable();
			renderTable();
		});

		$('.user-list').on('click', '#first', function() {
			var fName = [];
			for ( var i = 0; i<userList.length; i++ ) {
				fName.push(userList[i].firstname);
			}
			if (ascendingF) {
				fName.sort();
				ascendingF = false;
			} else {
				fName.reverse();
				ascendingF = true;
			}
			console.log(fName);

			var mapF = {};
			for (j=0; j<userList.length; j++) {
				mapF[userList[j].firstname] = userList[j];
			}

			for(k=0; k<userList.length; k++) {
				userList[k] = mapF[fName[k]];
			}
			console.log(mapF);
			clearTable();
			renderTable();
		});

		$('.user-list').on('click', '#last', function() {
			var lName = [];
			for ( var i = 0; i<userList.length; i++ ) {
				lName.push(userList[i].lastname);
			}
			if (ascendingL) {
				lName.sort();
				ascendingL = false;
			} else {
				lName.reverse();
				ascendingL = true;
			}
			console.log(lName);

			var mapL = {};
			for (j=0; j<userList.length; j++) {
				mapL[userList[j].lastname] = userList[j];
			}

			for(k=0; k<userList.length; k++) {
				userList[k] = mapL[lName[k]];
			}
			console.log(mapL);
			clearTable();
			renderTable();
		});

		$('.user-list').on('click', '#city', function() {
			var cName = [];
			for ( var i = 0; i<userList.length; i++ ) {
				cName.push(userList[i].city);
			}
			if (ascendingC) {
				cName.sort();
				ascendingC = false;
			} else {
				cName.reverse();
				ascendingC = true;
			}
			console.log(cName);

			var mapC = {};
			for (j=0; j<userList.length; j++) {
				mapC[userList[j].city] = userList[j];
			}

			for(k=0; k<userList.length; k++) {
				userList[k] = mapC[cName[k]];
			}
			console.log(mapC);
			clearTable();
			renderTable();
		});
	}

	renderTable();
	addEvents();

	jQuery.ajax({
		method: "GET",
		url: "http://localhost:4000/users"
	}) .done(function(data) {
			for (i=0; i<data.length; i++) {
				userList[i].push(data[i]);
			}
			clearTable();
			renderTable();
	});
});