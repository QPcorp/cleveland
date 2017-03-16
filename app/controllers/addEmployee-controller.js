app.controller('addEmployeeController', function($scope, $location, $http, appConfig, $rootScope, $cookieStore, locationService){
	
	// console.log($rootScope.user);
	// $scope.user = $rootScope.user.info;

  $scope.employee = {};

	$scope.add_employee = function(){
		//Put endpoint for profile
        var data = {
          badge_encode_number : $scope.employee.badge_encode_number,
          email : $scope.employee.email,
          job_title : $scope.employee.job_title,
          name_suffix : $scope.employee.name_suffix,
          first_name : $scope.employee.first_name,
          middle_name : $scope.employee.middle_name,
          last_name : $scope.employee.last_name,
          location_code : $scope.employee.location_code,
          location_description : $scope.employee.location_description,
          ccf_mail_code : $scope.employee.ccf_mail_code,
          division : $scope.employee.division,
          department_name : $scope.employee.department_name,
          supervisor_firt_name : $scope.employee.supervisor_firt_name,
          supervisor_last_name : $scope.employee.supervisor_last_name,
          hire_date : $scope.employee.hire_date,
          termination_date : $scope.employee.termination_date,
          create_time : $scope.employee.create_time,
          tag_number : $scope.employee.tag_number
        };


	      $http({
                method: 'POST',
                url: 'https://dev-csr-clevelandclinic.locomobi.com/employees',
                data: $scope.employee,
                headers: {'Content-Type': 'application/json', "Authorization": "Basic " + $rootScope.user.basicAuth}
            })
            .success(function(data, status) {
                  console.log(data);
                  if(data.error){
                    $scope.error_text = data.msg;
                  } else {
                    $location.path("/employees");
                  }
                  //$location.path("/current-permits");
            })
            .error(function(data, status, headers, config) {
                  console.log(data);
            });
	};



});