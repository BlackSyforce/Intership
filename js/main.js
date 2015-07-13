$(function() {
	var userList = [];

	function renderTable() {
		var $template = $("<tr><td class='click'></td><td class='click'></td><td class='click'></td><td class='action'>X</td></tr>");
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
		var editMode = true;
		var editIndex;
		var Ordonaref = true;
		var Ordonarel = true;
		var Ordonarec= true;

		$(".user-list").on("click", ".action", function() {
			var index = $(this).parent().index();
			
			$.ajax({
				"method" : "DELETE",
				"url" : "http://localhost:4000/user/" + userList[index]._id
			}).done(function(data) {
			 	userList.splice(index, 1);
					clearTable();
					renderTable();

			});
			clearTable();
			renderTable();
		});

		$(".user-list").on("click", ".click", function() {
			editMode = true;

            var index = $(this).parent().index();
            editIndex = index;
            var user = userList[index];
            var $items = $(".user-form input[type='text']");
				var obj = {
					firstName: $($items[0]).val(),
					lastName: $($items[1]).val(),
					city: $($items[2]).val()
				};
            showForm();
            $.ajax({
				"method" : "PUT",
				"url" : "http://localhost:4000/user/" + userList[index]._id
				data: obj
			}).done(function(data) {
			 	userList.splice(index, 1);
			 	
					clearTable();
					renderTable();

			});
        });

		$("#saveUser").on("click", function() {
			if(editMode){


				
	            var user = userList[editIndex];
	            var $items = $(".user-form input[type='text']");
	            user.firstName = $($items[0]).val();
	            user.lastName = $($items[1]).val();
	            user.city = $($items[2]).val();

	            clearTable();
	            renderTable();

	            hideForm();
	            clearForm();
			}
            	

            });

		$("#addUser").on("click", function() {
			editMode = false;
			showForm();

		});

		$("#saveUser").on("click", function() {
			if(!editMode){
		var $items = $(".user-form input[type='text']");
				var obj = {
					firstName: $($items[0]).val(),
					lastName: $($items[1]).val(),
					city: $($items[2]).val()
				};
			$.ajax({
				"method" : "POST",
				"url" : "http://localhost:4000/user",
				data: obj
			}).done(function(data) {	
				userList.push(obj);
				console.log(userList);
				clearTable();
				renderTable();

			});



				
				hideForm();
				clearForm();
			}
		});

		$(".user-list").on("click","#firstName", function() {
			
			if(Ordonaref == false){
				console.log("ordonare descr");
				for(var i=0;i<userList.length-1;i++) {
					for(var j=i+1;j<userList.length;j++) {
						if(userList[i].firstName < userList[j].firstName) {
							var aux= userList[i].firstName;
							userList[i].firstName = userList[j].firstName;
							userList[j].firstName = aux;
					    }
					}
					
				}
				Ordonaref = true;
			} else {
				console.log("ordonare cresc");
				for(var i=0;i<userList.length-1;i++) {
					for(var j=i+1;j<userList.length;j++) {
						if(userList[i].firstName > userList[j].firstName) {
							var aux= userList[i].firstName;
							userList[i].firstName = userList[j].firstName;
							userList[j].firstName = aux;
					    }
					}
				}
				Ordonaref= false;
			}

			clearTable();
	        renderTable();
		});

		$(".user-list").on("click","#lastName", function() {

			if(Ordonarel == false){
				console.log("ordonare descr");
				for(var i=0;i<userList.length-1;i++) {
					for(var j=i+1;j<userList.length;j++) {
						if(userList[i].lastName < userList[j].lastName) {
							var aux= userList[i].lastName;
							userList[i].lastName = userList[j].lastName;
							userList[j].lastName = aux;
					    }
					}
					
				}
				Ordonarel = true;
			} else {
				console.log("ordonare cresc");
				for(var i=0;i<userList.length-1;i++) {
					for(var j=i+1;j<userList.length;j++) {
						if(userList[i].lastName > userList[j].lastName) {
							var aux= userList[i].lastName;
							userList[i].lastName = userList[j].lastName;
							userList[j].lastName = aux;
					    }
					}
				}
				Ordonarel = false;
			}

			clearTable();
	        renderTable();
		});

		$(".user-list").on("click","#city", function() {
			if(Ordonarec == false){
				console.log("ordonare descr");
				for(var i=0;i<userList.length-1;i++) {
					for(var j=i+1;j<userList.length;j++) {
						if(userList[i].city < userList[j].city) {
							var aux= userList[i].city;
							userList[i].city = userList[j].city;
							userList[j].city = aux;
					    }
					}
					
				}
				Ordonarec = true;
			} else {
				console.log("ordonare cresc");
				for(var i=0;i<userList.length-1;i++) {
					for(var j=i+1;j < userList.length;j++) {
						if(userList[i].city > userList[j].city) {
							var aux= userList[i].city;
							userList[i].city = userList[j].city;
							userList[j].city = aux;
					    }
					}
				}
				Ordonarec = false;
			}

			clearTable();
	        renderTable();
		});

		
			$.ajax({
				"method" : "GET",
				"url" : "http://localhost:4000/users"
			}).done(function(data) {
			 	for(var i=0;i<data.length; i++){
					userList[i] = data[i];
				}
					clearTable();
					renderTable();

			});

		

			

			
		

		$("#cancelUser").on("click", function() {
			hideForm();
			clearForm();
		});

	}



	renderTable();
	addEvents();
});