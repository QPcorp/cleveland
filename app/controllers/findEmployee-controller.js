app.controller('findEmployeeController', function($scope, $location, $http, appConfig, $rootScope, $cookieStore, locationService){

	console.log($rootScope.user);
	$scope.user = $rootScope.user.info;

	// locationService.getLocations().then(function (data){
 	//  $scope.locations = $rootScope.user.locations;
	// });
	var auth = Base64.encode('gandalf@rivendell.com' + ':' + '5jf99enfvjr');

	//if($scope.employee.data.first_name)
	// for(var key in $scope.employee.data){

	// }
	//$('#employees-table').dataTable();
	var count = 0;

	$scope.search = function(query){
		
		if(count > 0){
			$('#employees-table').dataTable().fnDestroy();
		}
		count ++;
		
		var search_string = '';

		for (var key in $scope.employee.data) {
			console.log(key);
			if($scope.employee.data[key] === ''){
				console.log('empty value');
			} else {
				search_string += 'employee['+key +']='+$scope.employee.data[key] + '&';
			}
			
			console.log('SEARCH STRING', search_string);
		}



		$http({
		    method: 'GET',
		    url: 'https://dev-csr-clevelandclinic.locomobi.com/employees/find/by?'+search_string,//$scope.employee.data.first_name + '&',//appConfig.proxy+'://'+ appConfig.domain +'/login', //dev.csr-api.locomobi.com:2950/login'
		    //data: login,
		    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + auth}
		})
		.success(function(data, status, headers, config) {
			console.log(data);
			var columns = [
			    {"sTitle":"Badge Number", "mData":"badge_encode_number"},
			    {"sTitle":"Employee Number", "mData":"employee_number"},
			    {"sTitle":"Email", "mData":"email_address"},
			    {"sTitle":"Job Title", "mData":"job_title"},
			    // {"sTitle":"name_suffix", "mData":"name_suffix"},
			    {"sTitle":"First Name", "mData":"first_name"},
			    {"sTitle":"Last Name", "mData":"last_name"},
			    {"sTitle":"Location", "mData":"location"},
			    {"sTitle":"Department Name", "mData":"department_name"},
			    {"sTitle":"Actions", "sClass":"employee-actions"}
			];

			//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
			$('#employees-table').dataTable({
		        "data": data.employees,
		        "columns":columns,
                "columnDefs": [{
		            	"targets": 8,
						"data": function ( row, type, val, meta ) {
		            		return '<a href="/#/employee/'+row.id +'"><button class="btn btn-sm btn-default" data-employee="'+row.id+'">View Details</button></a>';
		            	},
		        }]
		    });	
		})
		.error(function(data, status, headers, config) {
			$scope.login_error = true;
		});
	};

	$scope.employees = function(){
		var unix_time = Math.round(new Date().getTime()/1000);
		console.log(unix_time);
		console.log(unix_time - 14400);
		unix_time = unix_time - 14400;


		var t = new Date(unix_time * 1000);

		$scope.current_unit_time = t;

	};

	$scope.employees();

});