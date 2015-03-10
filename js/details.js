$(document).ready(function(){
var personArray = [];

//Making ajax request to get json data
var personsJson = function() {	
return	$.ajax({
	   url: 'js/person.json',
	   type: 'GET',
	   dataType: 'json'
	});
}

//Making ajax request to get xml data
var personsXml = function() {
return $.ajax({
      url: 'persons.xml',
      type: 'GET',
      dataType:'xml'
  });
};

//using when method for making 2 ajax calls in parallel and done will be called once they are complete
$.when(personsJson(), personsXml()).done(function(jsonResponse, xmlResponse) {
	if(jsonResponse[1] == "success") {
    $.each(jsonResponse[0], function(i, person){
		person = $.extend({id:"", firstName:"", lastName: ""}, person);
		personArray.push(person);
	});
	} else {
       alert("error while obtaining json response");
	}
    
    if(xmlResponse[1] == "success") {
    	var personsEle= xmlResponse[0].getElementsByTagName("persons")[0];
   		var personsContent = personsEle.getElementsByTagName("person");
    	$.each(personsContent, function(i, person) {
    		var id = $(person.getElementsByTagName("id")[0]).text();
    		var firstName = $(person.getElementsByTagName("firstName")[0]).text();
    		var lastName = $(person.getElementsByTagName("lastName")[0]).text();
      		personArray.push({id: id, firstName: firstName, lastName: lastName}); 
    	});
   } else {
       alert("error while obtaining xml response");
   }


   //sorting based on id
    personArray.sort(function(person1, person2){
       return person1.id > person2.id ? 1 : (person1.id < person2.id ? -1 : 0);
    });

    //appending data to table
    $.each(personArray, function (i, personinfo) {
    	$('tbody').append("<tr><td>"+personinfo.id+"</td><td>"+personinfo.firstName+"</td><td>"+personinfo.lastName+"</td></tr>");
    });
  });
});