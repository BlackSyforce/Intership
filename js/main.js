$(function() {
	var editIndex;
	var userList = [];

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
		$("#saveUser").on("click", function() {
			if (addMode == false){

				$.ajax({
					method: 'POST',
					url: 'http://localhost:4000/users'
				}).done(function(users){
					user: '{"firstName": "' + $(".user-form input[name='firstName']").val() + 
					',"lastName" : ' + $(".user-form input[name='lastName']").val() +
					',"city" : '+ $(".user-form input[name='cityName']").val()+'}'
				});
			clearTable();
			renderTable();
			hideForm();
			clearForm();
				
			};
		});

		$(".user-list").on("click", ".firstName", function(){
			addMode = false;
			console.log(addMode);
			editIndex = $(this).parent().index();
			showForm();
			$(".user-form input[name='firstName']").val(userList[editIndex].firstName);
			$(".user-form input[name='lastName']").val(userList[editIndex].lastName);
			$(".user-form input[name='cityName']").val(userList[editIndex].city);
			$("#saveUser").on("click", function() {
			console.log('1')
				
				
			});
		});
 	
		$(".user-list").on("click", ".lastName", function(){
			addMode = false;
			editIndex = $(this).parent().index();
			$(".user-form input[name='firstName']").val(userList[editIndex].firstName);
			$(".user-form input[name='lastName']").val(userList[editIndex].lastName);
			$(".user-form input[name='cityName']").val(userList[editIndex].city);
			console.log(userList[editIndex].lastName);
			showForm();
			
		});

		$(".user-list").on("click", ".cityName", function(){
			addMode = false;
			editIndex = $(this).parent().index();
			$(".user-form input[name='firstName']").val(userList[editIndex].firstName);
			$(".user-form input[name='lastName']").val(userList[editIndex].lastName);
			$(".user-form input[name='cityName']").val(userList[editIndex].city);
			console.log(userList[editIndex].city);
			showForm();
			
		});

		$(".user-list").on("click", "#fN", function(){
			console.log('Trigger')
			for (var i=0;i<userList.length-1;i++){
				for(var j=i+1;j<userList.length;j++){
					console.log(i,j);
					if (userList[j].firstName<userList[i].firstName){
						var aux = {
							firstName: userList[j].firstName,
							lastName: userList[j].lastName,
							city: userList[j].city
						}

						userList[j]=userList[i];
						userList[i]=aux;
						clearTable();
						renderTable();

					}
				}
			}
		});

		$(".user-list").on("click", "#lN", function(){
			console.log('Trigger')
			for (var i=0;i<userList.length-1;i++){
				for(var j=i+1;j<userList.length;j++){
					console.log(i,j);
					if (userList[j].lastName<userList[i].lastName){
						var aux = {
							firstName: userList[j].firstName,
							lastName: userList[j].lastName,
							city: userList[j].city
						}

						userList[j]=userList[i];
						userList[i]=aux;
						clearTable();
						renderTable();

					}
				}
			}
		});

		$(".user-list").on("click", "#cN", function(){
			console.log('Trigger')
			for (var i=0;i<userList.length-1;i++){
				for(var j=i+1;j<userList.length;j++){
					console.log(i,j);
					if (userList[j].city<userList[i].city){
						var aux = {
							firstName: userList[j].firstName,
							lastName: userList[j].lastName,
							city: userList[j].city
						}

						userList[j]=userList[i];
						userList[i]=aux;
						clearTable();
						renderTable();

					}
				}
			}
		});

		$("#addUser").on("click", function() {
			showForm();
			clearForm();
			addMode=true;
		});

		$("#saveUser").on("click", function() {
			
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
	$.ajax({
		method: 'GET',
		url: 'http://localhost:4000/users'
	}).done(function(users){
		userList = users;
		clearTable();
		renderTable();
	});


});