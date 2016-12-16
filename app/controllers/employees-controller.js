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
			    url: 'https://'+ appConfig.domain + '/employees',
			    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		})
		.success(function(employees, status, headers, config) {
			console.log(employees);
			if(employees.data.length < 1){
				$scope.no_employees = true;
			}

			var columns = [
			    {"sTitle":"badge_encode_number", "mData":"badge_encode_number"},
			    {"sTitle":"email", "mData":"email"},
			    {"sTitle":"job_title", "mData":"job_title"},
			    {"sTitle":"name_suffix", "mData":"name_suffix"},
			    {"sTitle":"first_name", "mData":"first_name"},
			    {"sTitle":"middle_name", "mData":"middle_name"},
			    {"sTitle":"last_name", "mData":"last_name"},
			    {"sTitle":"location_code", "mData":"location_code"},
			    {"sTitle":"location_description", "mData":"location_description"},
			    {"sTitle":"ccf_mail_code", "mData":"ccf_mail_code"},
			    {"sTitle":"division", "mData":"division"},
			    {"sTitle":"department_name", "mData":"department_name"},
			    {"sTitle":"supervisor_firt_name", "mData":"supervisor_firt_name"},
			    {"sTitle":"supervisor_last_name", "mData":"supervisor_last_name"},
			    {"sTitle":"hire_date", "mData":"hire_date"},
			    {"sTitle":"termination_date", "mData":"termination_date"},
			    {"sTitle":"tag_number", "mData":"tag_number"}
			];

			//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
			$('#employees-table').dataTable({
		        "data": employees.data,
		        "columns":columns
      //           "columnDefs": [
      //           	{
		    //         	"targets": 1,
						// "data": function ( row, type, val, meta ) {
		    //         		var x = row.BeginTime;
						// 	x = x.slice(-8);
						// 	x = Number(x.substring(0,2));
						// 	x = x +4;
						// 	if(x < 10){
						// 		x = '0' + x + ':00:00';
						// 	} else {
						// 		x = x + ':00:00';
						// 	}
							

						// 	var y = row.BeginTime;
						// 	y = y.substring(0,10);
						// 	y = y +' '+ x;

		    //         		return y;
		    //         	},
		    //         },
		    //         {
		    //         	"targets": 2,
						// "data": function ( row, type, val, meta ) {
						// 	var x = row.ExpiryTime;
						// 	console.log(x);
						// 	x = x.slice(-8);
						// 	x = Number(x.substring(0,2));
						// 	x = x +4;
						// 	if(x < 10){
						// 		x = '0' + x + ':00:00';
						// 	} else {
						// 		x = x + ':00:00';
						// 	}

						// 	var y = row.ExpiryTime;
						// 	y = y.substring(0,10);
						// 	y = y +' '+ x;

		    //         		return y;
		    //         }
		    //     }],
		    });
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.employees();

});