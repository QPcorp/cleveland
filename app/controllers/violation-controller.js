app.controller('violationController', function($scope, $location, $routeParams, $http, appConfig, $rootScope, $cookieStore, locationService){

	$scope.user = $rootScope.user.info;
	$scope.violation = {};

//Violations

	//$('')

	$http({
	    method: 'GET',
	    //url: 'https://'+ appConfig.domain + '/permit_property/' + location_id,
	    url: appConfig.proxy+'://'+ appConfig.domain + '/violations',
	    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
	})
	.success(function(vehicles, status, headers, config) {
		console.log(vehicles);
		var columns = [
		    {"sTitle":"License Plate", "mData":"lpn"},
		    {"sTitle":"Type", "mData":"type"},
		    {"sTitle":"Employee Id", "mData":"employee_id"},
		    {"sTitle":"Date", "mData":"date"},
		    {"sTitle":"Time", "mData":"time"},
		    {"sTitle":"Description", "mData":"description"},
		    {"sTitle":"Actions", "sClass":"violation-details"}
		];

		//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
		$('#violations').dataTable({
	        "data": vehicles,
	        "columns":columns,
            "columnDefs": [
            		{
		            	"targets": 6,
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

	$scope.violation_update = function(){
		$scope.violation = {};
		$('.add-violation').text('Add Violation');
	};

});