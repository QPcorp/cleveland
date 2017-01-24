app.controller('employeesController', function($scope, $location, $http, appConfig, $rootScope, $cookieStore, locationService){

	console.log($rootScope.user);
	$scope.user = $rootScope.user.info;

	// locationService.getLocations().then(function (data){
 	//  $scope.locations = $rootScope.user.locations;
	// });

	$scope.employees = function(){

		$http({
			    method: 'GET',
			    //url: 'https://'+ appConfig.domain + '/permit_property/' + location_id,
			    url: appConfig.proxy+'://'+ appConfig.domain + '/employees',
			    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(employees, status, headers, config) {
			console.log(employees);
			if(employees.length < 1){
				$scope.no_employees = true;
			}

			var columns = [
			    {"sTitle":"Badge Number", "mData":"badge_encode_number"},
			    {"sTitle":"email", "mData":"email"},
			    {"sTitle":"job_title", "mData":"job_title"},
			    {"sTitle":"name_suffix", "mData":"name_suffix"},
			    {"sTitle":"first_name", "mData":"first_name"},
			    {"sTitle":"Middle Initial", "mData":"middle_name"},
			    {"sTitle":"last_name", "mData":"last_name"},
			    {"sTitle":"location_code", "mData":"location_code"},
			    // {"sTitle":"location_description", "mData":"location_description"},
			    {"sTitle":"CCF Mail Code", "mData":"ccf_mail_code"},
			    // {"sTitle":"division", "mData":"division"},
			    // {"sTitle":"Department Name", "mData":"department_name"},
			    // {"sTitle":"Supervisor Fn", "mData":"supervisor_firt_name"},
			    // {"sTitle":"Supervisor Ln", "mData":"supervisor_last_name"},
			    // {"sTitle":"Hire Date", "mData":"hire_date"},
			    // {"sTitle":"Termination Date", "mData":"termination_date"},
			    // {"sTitle":"Tag Number", "mData":"tag_number"}
			    {"sTitle":"Actions", "sClass":"employee-actions"}
			];

			//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
			$('#employees-table').dataTable({
		        "data": employees,
		        "columns":columns,
                "columnDefs": [{
		            	"targets": 9,
						"data": function ( row, type, val, meta ) {
		            		return '<a href="/#/employee/'+row.id +'"><button class="btn btn-sm btn-default" data-employee="'+row.id+'">View Details</button></a>';
		            	},
		        }]
		    });
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.employees();

});