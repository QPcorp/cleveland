app.controller('employeeController', function($scope, $location, $routeParams, $http, $rootScope, $cookieStore, locationService){

	console.log($rootScope.user);
	var employee_id = $routeParams.id;
	$scope.user = $rootScope.user.info;
	$scope.employee = {};
	// $scope.employee.termination_date = moment().format('MM-DD-YY');

	//Vehicle Defaults
	$scope.vehicle = {};
	$scope.vehicle.state = "0";
	$scope.vehicle.vehicle_model_id = "0";
	$scope.vehicle.type = "0";

	$scope.violation = {};
	$scope.violation.employee_id = employee_id;
	$scope.violation.type = "0";
	$scope.violation.action = "0";
	$scope.violation.amount = "0";


	$scope.vehicleSelected = false; //Determines if vehicle update or vehidle add
	$scope.violationSelected = false; 

	$scope.tab = 1;


	$scope.getEmployeeData = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id,
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.employee = data;
			console.log('EMPLOYEE', $scope.employee);
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};


	$scope.getEmployeeNotes = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id + '/notes',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.notes = data;
			console.log('NOTES', data);
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};





/*-----------------------------------------------------------------
						POST AND PUT COMMANDS
-----------------------------------------------------------------*/

//Add employee note
	$scope.addEmployeeNote = function(){
		var employee_note_data = {
			"body": "Overtime exempt under Ohio state law.",
		};

		$http({
		    method: 'POST',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id + '/notes',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.notes = data;
			console.log('NOTES', data);
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};


//Add Employee Vehicle
	$scope.addEmployeeVehicle = function(){
		var vehicle_data = {
			license_plate_number: $scope.vehicle.license_plate_number,
			state_id: $scope.vehicle.state,
			temporary_plate: "0",
			year: $scope.vehicle.year,
			vehicle_model_id: $scope.vehicle.vehicle_model_id,
			color: $scope.vehicle.color,
			avi_sticker_number: $scope.vehicle.avi_sticker_number,
			parking_lot_sticker_number: $scope.vehicle.parking_lot_sticker_number,
			vehicle_type_id: $scope.vehicle.type
		};

		console.log(vehicle_data);

		$http({
		    method: 'POST',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id + '/vehicles',
		    data: vehicle_data,
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			//$scope.vehicles = data;
			console.log('ADD VEHICLE RESPONSE', data);
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};


//Update Employee
	$scope.updateEmployee = function(){
		var vehicle_data = {
			license_plate_number: $scope.vehicle.license_plate_number,
			state_id: $scope.vehicle.state,
			temporary_plate: "0",
			year: $scope.vehicle.year,
			vehicle_model_id: $scope.vehicle.vehicle_model_id,
			color: $scope.vehicle.color,
			avi_sticker_number: $scope.vehicle.avi_sticker_number,
			parking_lot_sticker_number: $scope.vehicle.parking_lot_sticker_number,
			vehicle_type_id: $scope.vehicle.type
		};

		console.log(vehicle_data);

		$http({
		    method: 'PUT',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id,
		    data: $scope.employee,
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			console.log('update employee',data);
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};







//DROP DOWN POPULATORS
	$scope.getPrimaryAssignments = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/assignments',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.primary_assignments = data;
			console.log($scope.employee.primary_assignment);

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.getVehicleStates = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/states',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.states = data;

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.getVehicleTypes = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/vehicles/types',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.vehicle_types = data;

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.getVehicleModels = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/vehicles/makes',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.vehicle_models = data;

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.getViolationTypes = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/violations/types',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.violation_types = data;

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.getViolationActions = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/violations/actions',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.violation_actions = data;

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.getViolationAmounts = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/violations/amounts',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.violation_amounts = data;

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};
	


//Vehicles Tab
	$http({
	    method: 'GET',
	    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id + '/vehicles',
	    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
	})
	.success(function(vehicles, status, headers, config) {
		console.log('VEHICLES', vehicles);
		$scope.vehicles = vehicles;
		if(vehicles.length < 1){
			console.log('No Vehicles');
		} else {
			$scope.buildVehicleTable();
		}
	})
	.error(function(data, status, headers, config) {
		console.log(data);
	});


	$scope.buildVehicleTable = function(){
		var columns = [
		    {"sTitle":"License Plate", "mData":"license_plate_number"},
		    {"sTitle":"Type", "sClass":"type"},
		    // {"sTitle":"Make", "mData":"make"},
		    {"sTitle":"Model", "sClass":"model"},
		    {"sTitle":"Color", "mData":"color"},
		    {"sTitle":"Year", "mData":"year"},
		    {"sTitle":"AVI Number", "mData":"avi_sticker_number"},
		    {"sTitle":"Edit", "sClass":"vehicle-edit"},
		    {"sTitle":"Delete", "sClass":"vehicle-delete"}
		];

		//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
		$('#employee-vehicles').dataTable({
	        "data": $scope.vehicles,
	        "columns":columns,
            "columnDefs": [
            		{
		            	"targets": 1,
						"data": function ( row, type, val, meta ) {
							for(var i = 0; i < $scope.vehicle_types.length; i ++){

							}
							console.log(row);
		            		return '';
	            		}
	            	},
            		{
		            	"targets": 6,
						"data": function ( row, type, val, meta ) {
		            		return '<button class="btn btn-sm btn-default edit-vehicle" data-vehicle="'+row.id+'">Edit Vehicle</button></a>';
	            		}
	            	},
	            	{
		            	"targets": 7,
						"data": function ( row, type, val, meta ) {
		            		return '<button class="btn btn-sm btn-danger delete-vehicle" data-vehicle="'+row.id+'">Delete Vehicle</button></a>';
	            		}
	            	}
	        ]
	    });

	    $('.edit-vehicle').click(function(){
			var vehicle_id = $(this).data('vehicle');
			$http({
			    method: 'GET',
			    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/',//vehicle_id,
			    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
			})
			.success(function(data, status, headers, config) {
				console.log(data);
				$scope.vehicle.lpn = data[0].lpn;
				$scope.vehicle.state = data[0].state;
				$scope.vehicle.make = data[0].make;
				$scope.vehicle.model = data[0].model;
				$scope.vehicle.type = data[0].type;
				$scope.vehicle.year = data[0].year;
				$scope.vehicle.avi_number = data[0].avi_number;
				$scope.vehicle.color = data[0].color;

				$('.vehicle-btn').text('Update Vehicle');
			})
			.error(function(data, status, headers, config) {
				console.log(data);
			});
		});
	};

	
	$scope.vehicle_update = function(){
		$scope.vehicle = {};
		$('.vehicle-btn').text('Add Vehicle');
	};

	// $('.vehicle-btn').click(function(){
	// 	$scope.vehicle = {};
	// 	$(this).text('Add Vehicle');
	// });


	$scope.getEmployeeViolations = function(){
		$http({
		    method: 'GET',
		    //url: 'https://'+ appConfig.domain + '/permit_property/' + location_id,
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/'+ employee_id +'/violations',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(violations, status, headers, config) {
			console.log('VIOLATIONS',violations);
			var columns = [
			    {"sTitle":"Violation Date", "mData":"violation_date"},
			    {"sTitle":"Violation Number", "mData":"violation_number"},
			    {"sTitle":"Violation Type", "mData":"violation_type_id"},
			    {"sTitle":"Payment Status", "mData":"payment_status"},
			    {"sTitle":"Amount", "mData":"violation_amount"},
			    {"sTitle":"Actions", "sClass":"violation-details"}
			];

			//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
			$('#violations').dataTable({
		        "data": violations,
		        "columns":columns,
	            "columnDefs": [
	        		{
		            	"targets": 5,
						"data": function ( row, type, val, meta ) {
		            		return '<button class="btn btn-sm btn-default violation-details" data-violation="'+row.id+'">View Details</button></a>';
	            		}
	            	}
		        ]
		    });


		    $('#violations').on('click', '.violation-details', function(){
				var violation_id = $(this).data('violation');
				console.log(violation_id);
				$http({
				    method: 'GET',
				    //url: 'https://'+ appConfig.domain + '/permit_property/' + location_id,
				    url: appConfig.proxy+'://'+ appConfig.domain + '/violations/' + violation_id,
				    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
				})
				.success(function(data, status, headers, config) {
					console.log(data);
					$scope.violation.lpn = data[0].lpn;
					$scope.violation.date = data[0].date;
					$scope.violation.time = data[0].time;
					$scope.violation.employee_id = data[0].employee_id;
					$scope.violation.type = data[0].type;
					$scope.violation.description = data[0].description;
					// $scope.violation.avi_number = data[0].avi_number;
					// $scope.vehicle.color = data[0].color;

					$('.add-violation').text('Update Violation');
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});
			});
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};



	$scope.violation_update = function(){
		$scope.violation = {};
		$('.add-violation').text('Add Violation');
	};



	$scope.getVehicleStates();
	$scope.getPrimaryAssignments();
	$scope.getVehicleTypes();
	$scope.getVehicleModels();
	$scope.getViolationTypes();
	$scope.getViolationActions();
	$scope.getViolationAmounts();

	//Employee GETS
	$scope.getEmployeeData();
	$scope.getEmployeeNotes();
	$scope.getEmployeeViolations();


});







