app.controller('employeesController', function($scope, $location, $http, appConfig, $rootScope, $cookieStore, locationService){

	console.log($rootScope.user);
	$scope.user = $rootScope.user.info;

	// locationService.getLocations().then(function (data){
 	//  $scope.locations = $rootScope.user.locations;
	// });

	$scope.employees = function(){

		$http({
			    method: 'GET',
			    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees',
			    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(employees, status, headers, config) {
			console.log(employees);
			if(employees.length < 1){
				$scope.no_employees = true;
			}

			var columns = [
			    {"sTitle":"Employee Number", "mData":"employee_number"},
			    {"sTitle":"Badge Number", "mData":"badge_encode_number"},
			    {"sTitle":"Employment Status", "mData":"employment_status"},
			    {"sTitle":"Email", "mData":"email_address"},
			    {"sTitle":"Job Title", "mData":"job_title"},
			    {"sTitle":"First Name", "mData":"first_name"},
			    {"sTitle":"Last Name", "mData":"last_name"},
			    {"sTitle":"Hire Date", "mData":"adjust_hire_date"},
			    {"sTitle":"CCF Mail Code", "mData":"ccf_mail_code"},
			    // {"sTitle":"division", "mData":"division"},
			    {"sTitle":"Department Name", "mData":"department_name"},
			    {"sTitle":"Supervisor Fn", "mData":"supervisor_first_name"},
			    {"sTitle":"Supervisor Ln", "mData":"supervisor_last_name"},
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
		            	"targets": 12,
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