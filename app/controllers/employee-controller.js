app.controller('employeeController', function($scope, $location, $routeParams, $http, appConfig, $rootScope, $cookieStore, locationService){

	console.log($rootScope.user);
	var employee_id = $routeParams.id;
	$scope.user = $rootScope.user.info;

	$scope.tab = 1;

	$http({
	    method: 'GET',
	    //url: 'https://'+ appConfig.domain + '/permit_property/' + location_id,
	    url: appConfig.proxy+'://'+ appConfig.domain + '/employees/' + employee_id,
	    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
	})
	.success(function(data, status, headers, config) {
		$scope.employee = data;
		console.log($scope.employee);
	})
	.error(function(data, status, headers, config) {
		console.log(data);
	});


//Vehicles Tab

	//$('')

	$http({
	    method: 'GET',
	    //url: 'https://'+ appConfig.domain + '/permit_property/' + location_id,
	    url: appConfig.proxy+'://'+ appConfig.domain + '/lpn/employee/' + employee_id,
	    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
	})
	.success(function(vehicles, status, headers, config) {
		console.log(vehicles);
		var columns = [
		    {"sTitle":"License Plate", "mData":"lpn"},
		    {"sTitle":"Type", "mData":"type"},
		    {"sTitle":"Make", "mData":"make"},
		    {"sTitle":"Model", "mData":"model"},
		    {"sTitle":"Color", "mData":"color"},
		    {"sTitle":"Year", "mData":"year"},
		    {"sTitle":"Edit", "sClass":"vehicle-edit"},
		    {"sTitle":"Delete", "sClass":"vehicle-delete"}
		];

		//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
		$('#employee-vehicles').dataTable({
	        "data": vehicles,
	        "columns":columns,
            "columnDefs": [
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
	})
	.error(function(data, status, headers, config) {
		console.log(data);
	});

});