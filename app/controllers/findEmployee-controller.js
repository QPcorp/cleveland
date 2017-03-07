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
			
			console.log(search_string);
		}



		$http({
		    method: 'GET',
		    url: '//dev.csr-api.locomobi.com:2950/employees/find/by?'+search_string,//$scope.employee.data.first_name + '&',//appConfig.proxy+'://'+ appConfig.domain +'/login', //dev.csr-api.locomobi.com:2950/login'
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

		// var hotel_desc = 'skyline';

		// if($scope.user.hotel_id == 'crowneplaza'){
		// 	hotel_desc = 'Crowne';
		// } else if($scope.user.hotel_id == 'skyline')
		// 	hotel_desc = 'Skyline';
		// } else if($scope.user.hotel_id == 'skyline'){
		// 	hotel_desc = 'Sheraton';
		// } else {
		// 	console.log('No HotelId match with Hotel Description');
		// }

		// $http({
		// 	    method: 'GET',
		// 	    //url: 'https://'+ appConfig.domain + '/permit_property/' + location_id,
		// 	    url: 'https://'+ appConfig.domain + '/permit/hotel/' + $scope.user.hotel_id + '/current/' + $scope.user.uid + '/' + unix_time,
		// 	    headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
		// })
		// .success(function(data_parked, status, headers, config) {
		// 	//$scope.parked = data_parked;
		// 	console.log(data_parked.data);

		// 	if(data_parked.data.length < 1){
		// 		$scope.no_permits = true;
		// 	}

		// 	var columns = [
		// 		{"sTitle":"Create Time", "mData": 'CreateTime'},
		// 		{"sTitle":"Begin Time", "mData":"BeginTime"},
		// 		{"sTitle":"Expiry Time", "mData":"ExpiryTime"},
		// 		{"sTitle":"Suit Id", "mData":"SuiteId"},
		// 		//{"sTitle":"Lot Id", "mData":"LotId"},
		// 		{"sTitle":"Permit Class", "mData":"PermitClass"},
		// 		{"sTitle":"First Name", "mData":"FirstName"},
		// 		{"sTitle":"Last Name", "mData":"LastName"},
		// 		{"sTitle":"Phone", "mData":"Phone"},
		// 		{"sTitle":"Email", "mData":"Email"},
		// 		{"sTitle":"LPN", "mData":"LPN"},
		// 		{"sTitle":"Make", "mData":"Make"},
		// 		{"sTitle":"Model", "mData":"Model"},
		// 		{"sTitle":"Color", "mData":"Color"},
		// 		{"sTitle":"Permit Tag", "mData":"PermitTag"}

		// 	];

			//CreateTime, Begin Time, ExpiryTime, Suite ID, First Name, Last Name, Phone, Email, LPN, Make, Model, Color, PermitTag
	// 		$('#current-permits-table').dataTable({
	// 	        "data": data_parked.data,
	// 	        "columns":columns
 //      //           "columnDefs": [
 //      //           	{
	// 	    //         	"targets": 1,
	// 					// "data": function ( row, type, val, meta ) {
	// 	    //         		var x = row.BeginTime;
	// 					// 	x = x.slice(-8);
	// 					// 	x = Number(x.substring(0,2));
	// 					// 	x = x +4;
	// 					// 	if(x < 10){
	// 					// 		x = '0' + x + ':00:00';
	// 					// 	} else {
	// 					// 		x = x + ':00:00';
	// 					// 	}
							

	// 					// 	var y = row.BeginTime;
	// 					// 	y = y.substring(0,10);
	// 					// 	y = y +' '+ x;

	// 	    //         		return y;
	// 	    //         	},
	// 	    //         },
	// 	    //         {
	// 	    //         	"targets": 2,
	// 					// "data": function ( row, type, val, meta ) {
	// 					// 	var x = row.ExpiryTime;
	// 					// 	console.log(x);
	// 					// 	x = x.slice(-8);
	// 					// 	x = Number(x.substring(0,2));
	// 					// 	x = x +4;
	// 					// 	if(x < 10){
	// 					// 		x = '0' + x + ':00:00';
	// 					// 	} else {
	// 					// 		x = x + ':00:00';
	// 					// 	}

	// 					// 	var y = row.ExpiryTime;
	// 					// 	y = y.substring(0,10);
	// 					// 	y = y +' '+ x;

	// 	    //         		return y;
	// 	    //         }
	// 	    //     }],
	// 	    });
	// 	})
	// 	.error(function(data, status, headers, config) {
	// 		console.log(data);
	// 	});
	};

	$scope.employees();

});