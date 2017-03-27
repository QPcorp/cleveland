app.controller('employeeController', function($scope, $location, $routeParams, $http, $rootScope, $cookieStore, locationService){

	console.log($rootScope.user);
	var employee_id = $routeParams.id;
	$scope.user = $rootScope.user.info;
	$scope.employee = {};
	// $scope.employee.termination_date = moment().format('MM-DD-YY');

	//Vehicle Defaults
	$scope.vehicle = {};
	$scope.vehicle.state_id = "0";
	$scope.vehicle.vehicle_make_id = "0";
	$scope.vehicle.vehicle_type_id = "0";

	$scope.violation = {};
	$scope.violation.employee_id = employee_id;
	$scope.violation.type = "0";
	$scope.violation.action = "0";
	$scope.violation.amount = "0";

	$scope.employee.job_type = "0";


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
			if(data.primary_assignment_id){
				$scope.employee.primary_assignment_id = data.primary_assignment_id.toString();
			} else {
				$scope.employee.primary_assignment_id = "0";
			}
			//Secondary Assignment
			if(data.secondary_assignment_id){
				$scope.employee.secondary_assignment_id = data.secondary_assignment_id.toString();
			} else {
				$scope.employee.secondary_assignment_id = "0";
			}

			//Job Type
			if(data.job_type_id){
				$scope.employee.job_type_id = data.job_type_id.toString();
				console.log($scope.employee.job_type_id);
			} else {
				$scope.employee.job_type_id = "0";
			}

			//Shift
			if(data.primary_shift_id){
				$scope.employee.primary_shift_id = data.primary_shift_id.toString();
			} else {
				$scope.employee.primary_shift_id = "0";
			}

			//Form of Payments
			if(data.form_of_payment_id){
				$scope.employee.form_of_payment_id = data.form_of_payment_id;
			} else {
				$scope.employee.form_of_payment_id = "0";
			}

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
			"employee_note" : { 
				"body" : $scope.employee_note
			}
		};
		//console.log(employee_note_data);

		$http({
		    method: 'POST',
		    data: employee_note_data,
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id + '/notes',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			// $scope.notes = data;
			$scope.getEmployeeNotes();
			console.log('NOTES', data);
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};


//Add Employee Vehicle
	$scope.addEmployeeVehicle = function(){

		var vehicle_data = { 
			vehicle : { 
				license_plate_number       : $scope.vehicle.license_plate_number,
                state_id                   : $scope.vehicle.state_id,
                temporary_plate            : "0",
                year                       : $scope.vehicle.year,
                model                      : $scope.vehicle.vehicle_model_id,
                color                      : $scope.vehicle.color,
                avi_sticker_number         : $scope.vehicle.avi_sticker_number,
                leed_qualified             : "0",
                parking_lot_sticker_number : $scope.vehicle.parking_lot_sticker_number,
                vehicle_type_id            : $scope.vehicle.vehicle_type_id,
                vehicle_make_id            : $scope.vehicle.vehicle_make_id
            } 
        };

		console.log(vehicle_data);

		$http({
		    method: 'POST',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id + '/vehicles',
		    data: vehicle_data,
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			console.log('ADD VEHICLE RESPONSE', data);
			$scope.vehicle = {};
			$scope.vehicleForm.$setPristine();
			$scope.getEmployeeVehicles();
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.updateEmployeeVehicle = function(vehicle_id){
		console.log($scope.vehicle_id);
		var vehicle_data = { 
			vehicle : { 
				license_plate_number       : $scope.vehicle.license_plate_number,
                state_id                   : $scope.vehicle.state_id,
                temporary_plate            : "0",
                year                       : $scope.vehicle.year,
                model                      : $scope.vehicle.model,
                color                      : $scope.vehicle.color,
                avi_sticker_number         : $scope.vehicle.avi_sticker_number,
                leed_qualified             : "0",
                parking_lot_sticker_number : $scope.vehicle.parking_lot_sticker_number,
                vehicle_type_id            : $scope.vehicle.vehicle_type_id,
                vehicle_make_id            : $scope.vehicle.vehicle_make_id
            } 
        };

		console.log(vehicle_data);

		$http({
		    method: 'PUT',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id + '/vehicles/'+$scope.vehicle_id,
		    data: vehicle_data,
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			console.log('UPDATE VEHICLE RESPONSE', data);
			//$scope.vehicle = {};
			$scope.vehicleSelected = false;
			$scope.vehicle = {};
			$scope.vehicleForm.$setPristine();
			$scope.getEmployeeVehicles();
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.addEmployeeViolation = function(){

		var violation_data = { 
			violation : { 
				license_plate_number       : $scope.violation.license_plate_number,
                violation_type_id          : $scope.violation.violation_type_id,
                violation_action_id        : $scope.violation.violation_action_id,
                violation_amount           : $scope.violation.violation_amount,
                payment_status			   : 'uppaid',

            } 
        };

		console.log(violation_data);

		$http({
		    method: 'POST',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/' + employee_id + '/violations',
		    data: violation_data,
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			console.log('ADD VIOLATION RESPONSE', data);
			$scope.violation = {};
			$scope.violationForm.$setPristine();
			$scope.getEmployeeViolations();
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

	$scope.getJobTypes = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/job_types',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.job_types = data;
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

	$scope.getVehicleMakes = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/vehicles/makes',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			$scope.vehicle_makes = data;
			console.log('Vehcile makes: ', data);

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

	$scope.getShifts = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/shifts',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			console.log('shifts', data);
			$scope.shifts = data;

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.formOfPayments = function(){
		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/forms_of_payment',
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(data, status, headers, config) {
			console.log('forms of payments', data);
			$scope.form_of_payments = data;

		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};
	

//Vehicles Tab
	$scope.getEmployeeVehicles = function(){
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
	};


	$scope.buildVehicleTable = function(){
		$('#employee-vehicles').empty();
		var columns = [
		    {"sTitle":"License Plate", "mData":"license_plate_number"},
		    {"sTitle":"Type", "sClass":"type"},
		    {"sTitle":"Make", "sClass":"make"},
		    {"sTitle":"Model", "mData":"model"},
		    {"sTitle":"Color", "mData":"color"},
		    {"sTitle":"Year", "mData":"year"},
		    {"sTitle":"AVI Number", "mData":"avi_sticker_number"},
		    {"sTitle":"Parking Lot Sticker", "mData":"parking_lot_sticker_number"},
		    {"sTitle":"Edit", "sClass":"vehicle-edit"},
		    {"sTitle":"Delete", "sClass":"vehicle-delete"}
		];

		//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
		$('#employee-vehicles').dataTable({
			"destroy": true,
	        "data": $scope.vehicles,
	        "columns":columns,
            "columnDefs": [
            		{
		            	"targets": 1,
						"data": function ( row, type, val, meta ) {
							for(var i = 0; i < $scope.vehicle_types.length; i ++){
								if(row.vehicle_type_id == $scope.vehicle_types[i].id){
									var x = $scope.vehicle_types[i].name;
									return x;
								}
							}
		            		//return '';
	            		}
	            	},
	            	{
		            	"targets": 2,
						"data": function ( row, type, val, meta ) {
							for(var i = 0; i < $scope.vehicle_makes.length; i ++){
								if(row.vehicle_make_id == $scope.vehicle_makes[i].id){
									var x = $scope.vehicle_makes[i].name;
									return x;
								}
							}
		            		//return '';
	            		}
	            	},
            		{
		            	"targets": 8,
						"data": function ( row, type, val, meta ) {
		            		return '<button class="btn btn-sm btn-default edit-vehicle" data-vehicle="'+row.id+'">Edit Vehicle</button></a>';
	            		}
	            	},
	            	{
		            	"targets": 9,
						"data": function ( row, type, val, meta ) {
		            		return '<button class="btn btn-sm btn-danger delete-vehicle" data-vehicle="'+row.id+'">Delete Vehicle</button></a>';
	            		}
	            	}
	        ]
	    });

	    $('.edit-vehicle').click(function(){
	    	console.log('ahahah');
			var vehicle_id = $(this).data('vehicle');
			$scope.vehicle_id = vehicle_id;
			$http({
			    method: 'GET',
			    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/'+employee_id+ '/vehicles/' + vehicle_id,
			    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
			})
			.success(function(data, status, headers, config) {
				console.log(data);
				$scope.vehicle.license_plate_number = data.license_plate_number;
				$scope.vehicle.state_id = data.state_id.toString();
				$scope.vehicle.vehicle_make_id = data.vehicle_make_id.toString();
				$scope.vehicle.model = data.model;
				$scope.vehicle.vehicle_type_id = data.vehicle_type_id.toString();
				$scope.vehicle.year = data.year;
				$scope.vehicle.avi_sticker_number = data.avi_sticker_number;
				$scope.vehicle.parking_lot_sticker_number = data.parking_lot_sticker_number;
				$scope.vehicle.color = data.color;
				$scope.vehicleSelected = true;

				//$('.vehicle-btn').text('Update Vehicle');
			})
			.error(function(data, status, headers, config) {
				console.log(data);
			});
		});

		$('.delete-vehicle').click(function(){
			var vehicle_id = $(this).data('vehicle');
			$http({
			    method: 'DELETE',
			    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/'+ employee_id +'/vehicles/'+vehicle_id,//vehicle_id,
			    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
			})
			.success(function(data, status, headers, config) {
				$scope.getEmployeeVehicles();
			})
			.error(function(data, status, headers, config) {
				console.log(data);
			});
		});
	};


	$scope.getEmployeeViolations = function(){
		$('#violations').empty();
		$http({
		    method: 'GET',
		    //url: 'https://'+ appConfig.domain + '/permit_property/' + location_id,
		    //https://dev-csr-clevelandclinic.locomobi.com/employees/45/violations
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
				"destroy": true,
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
	$scope.getVehicleMakes();
	$scope.getViolationTypes();
	$scope.getViolationActions();
	$scope.getViolationAmounts();
	$scope.getEmployeeVehicles();
	$scope.getJobTypes();
	$scope.getShifts();
	$scope.formOfPayments();

	//Employee GETS
	$scope.getEmployeeData();
	$scope.getEmployeeNotes();
	$scope.getEmployeeViolations();


});







