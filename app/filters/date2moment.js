app.filter('date2moment', function ($filter) {
    return function (input){
	  var time = moment(input).format('MM/DD/YY - HH:MM');
	  return time;
	};
});
