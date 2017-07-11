	/*App.js
	*/
	//jslint settings
	/*  jslint         browser : true, continue : true
		devel  : true, indent  : 2,    maxerr   : 50,
		newcap : true, nomen   : true, plusplus : true,
		regexp : true, sloppy  : true, vars     : true,
		white  : search
	*/

var countries = ["Afghanistan","Albania","Algeria", "American Samoa","Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
				"Aruba", "Australia","Austria","Azerbaijan","Bahamas", "Bahrain","Bangladesh", "Barbados", "Belarus","Belgium",
 				"Belize", "Benin", "Botswana", "Brazil","Brunei", "Bulgaria", "Burkina Faso","Burundi", "Cambodia", "Cameroon", "Canada",
 	  			"Cape Verde", "Cayman Islands","Central African Republic", "Chad", "Chile","China", "Colombia", "Comoros", 
 		 		"Democratic Republic of Congo", "Republic of Congo", "Costa Rica", "Cote dIvoire", "Croatia", "Cuba", "Curacao",
 		  		"Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica","Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
 		  		"Equatorial Guinea", "Eritrea","Estonia", "Ethiopia","Faeroe Islands", "Fiji", "Finland","France", "Gabon", "Gambia",
 				"Georgia", "Germany", "Ghana", "Greece", "Grenada","Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
 				"Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
 				"Japan", "Jordan", "Kazakhstan","Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  				"Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", 
  				"Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico","Mayotte",
  				"Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
  				"Netherlands", "New Caledonia", "New Zealand", "Nicaragua","Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan",
  				"Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar",
  				"Romania", "Russia", "Rwanda", "St Kitts and Nevis", "St Lucia", "St Martin", "Saint Vincent and the Grenadines", "Samoa",
  				"San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", 
  				"Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", 
  				"Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", 
  				"East Timor", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  				"United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];


var search = (function() {
	var
	searchTemplates = {
		input: String()+
				'<div class="spa-search-input container">'+
				'<div class="spa-search-input-date">'+
					'<div class="row">'+
						'<div class = "col-xs-1 col-sm-3 col-md-3"></div>'+
						'<p class="col-xs-4 col-sm-2 col-md-2">Date: </p>'+
						'<input type="text" class = "input-group col-xs-6 col-sm-4 col-md-4" id="datepicker">'+
					'</div>'+
				'</div>'+

				'<div class="spa-search-input-country">'+
					'<div class="row">'+
						'<div class = "col-xs-1 col-sm-3 col-md-3"></div>'+
						'<p class="col-xs-4 col-sm-2 col-md-2">Country: </p>'+
						'<div id="col-xs-6 col-sm-4 col-md-4">'+
							'<input type="text" id = "countries" class = "input-group col-xs-6 col-sm-4 col-md-4 dropdown-toggle" data-toggle="dropdown">'+
						'</div>'+
					'</div>'+
				'</div>'+

				'<div class="spa-search-input-range">'+
					'<div class="row">'+
						'<div class = "col-xs-1 col-sm-3 col-md-3"></div>'+
						'<p class="col-xs-4 col-sm-2 col-md-2">Date range*: </p>'+
						'<div class="input-group col-xs-6 col-sm-4 col-md-4">'+
  							'<input type="text" id = "range" class="form-control" placeholder="Default: 20" aria-describedby="basic-addon2">'+
  							'<span class="input-group-addon" id="basic-addon2">days</span>'+
						'</div>'+
					'</div>'+	
				'</div>'+

				'<div class="spa-search-keywords">'+
					'<div class="row">'+
						'<div class = "col-xs-1 col-sm-3 col-md-3"></div>'+
						'<p class="spa-search-keywords-title col-xs-4 col-sm-2 col-md-2">Keywords: </p>'+
						'<input type="text" id = "tags" value="">'+
					'</div>'+
				'</div>'+

				'<div class="spa-search-input-addbtn">'+
					'<div class="row">'+
						'<div class = "col-xs-4 col-sm-5 col-md-5"></div>'+
						  '<button type="button" class = "btn btn-primary col-xs-4 col-sm-2 col-md-2" id="input-addbtn">Add</button>'+
					'</div>'+
				'</div>',

		footbar: String()+
					'<div class="spa-search-footbar container-wrapper">'+
						'<div class="row">'+
							'<div class ="nnuhlogo col-xs-8 col-sm-8 col-md-8"></div>'+
							'<div class = "uealogo col-xs-4 col-sm-4 col-md-4"></div>'+
						'</div>'+
					'</div>',

		searchbtn: String()+
					'<div class="spa-search-searchbtn">'+
						'<div class="row">'+
					 		'<div class = "col-xs-4 col-sm-5 col-md-5"></div>'+
							'<button class = "btn btn-primary col-xs-4 col-sm-2 col-md-2" id="searchbtn" type = "submit">Search</button>'+
						'</div>	'+
					'</div>'
	},//end search templates


	entryTemplates = {
		entriesContainer: '<div class="spa-search-entries container"></div>',
		newEntryBtn: String()+
				'<div class="spa-search-addbtn">'+
				'<div class = "col-xs-7 col-sm-7 col-md-7"></div>'+
				'<span class="glyphicon glyphicon glyphicon-plus-sign col-xs-3 col-sm-4 col-md-4"" id="addbtn" aria-hidden="true"></span>'+
				'</div>',
	},//end entry templates

	entry = {//used to represent an entry (date and country)
		date: null,
		country: null,
	},

	//these two variables are parsed to the python stuff and used to create html page for results
	keywordsList = [],//list of keywords 
	entriesList = [],//list of entries


	count = 0,

	//variables for methods
	addEntry, removeEntry, editEntry,
	showMap, closeMap,
	hideElement, showElement,
	initSearch, initResults,
	sendEntriesToNode,
	onClickAdd, onClickNewEntry, onClickSearch, onClickMap, onClickAddKeywords, onClickEditKeywords;


	onClickAdd = function(event){
		var date, country;
		date = $('#datepicker').val();
		country = $('#countries').val();

		if(date===''||country===null){
			$('#input-addbtn').attr('disabled');
		}else{
			hideElement($('.spa-search-input'));
			showElement($('.spa-search-addbtn'));
			showElement($('.spa-search-entries'));
			//take data from input, create new entry object
			addEntry('.spa-search-entries');
		};	
	}

	onClickNewEntry = function(event){
		showElement($('.spa-search-input'));
		hideElement($('.spa-search-addbtn'));
	}

//http://stackoverflow.com/questions/25983603/how-to-submit-html-form-without-redirection
	sendPostToNode = function(path, parameters){
  			 $.ajax({
        		url: path,
        		type:'post',
        		data: parameters,
        		success:function(data){
            		localStorage.setItem("resultsObject", data[0]);
    				var retrievedObject = JSON.parse(localStorage.getItem('resultsObject'));
    				//console.log(retrievedObject);

            		localStorage.setItem("worldData", data[1]);
    				var retrievedObjectMap = JSON.parse(localStorage.getItem('worldData'));
    				//console.log(retrievedObjectMap);

					initResults(retrievedObject);
            		
        		}
    		});
	};

	onClickSearch = function(event){
		if (!($('.spa-search-entries').children().length === 0)){//check if no children (entries)

		$(".spa-search-entry").each(function() {
  			var newEntry = Object.create(entry);
			newEntry.country = $(this).find(".spa-search-entry-country").text();
			newEntry.date = $(this).find(".spa-search-entry-date").text();
			if($(this).find("#range").text()){
				newEntry.range = $(this).find("#range").text();
			}
			else{
				newEntry.range = 20;
			}
			console.log(newEntry.range);
			entriesList.push(newEntry);
		});
			keywordsList = $("#tags").tagsinput('items');

			sendPostToNode('/resultsPage', {name: JSON.stringify(entriesList)+"#"+JSON.stringify(keywordsList)});
			$('#searchbtn').css('background-color', '#777');
		};
	};


	removeEntry = function(event){
		$(this).parent().parent().remove();
		count-=1;
		if (count===0){
			$('#datepicker').val('');
			$('#countries').val('');
			hideElement($('.spa-search-entries'));
			hideElement($('.spa-search-addbtn'));
			showElement($('.spa-search-input'));
		}
	};

	editEntry = function(){

		$('#datepicker').val($(this).parent().parent().find('.spa-search-entry-date').text());
		$('#countries').val($(this).parent().parent().find('.spa-search-entry-country').text());

		showElement($('.spa-search-input'));
		hideElement($('.spa-search-addbtn'));
		$(this).parent().parent().remove();
		count-=1;
	}

	//parse object into here from onClickAdd
	addEntry = function($container){
		var date, country;
		date = $('#datepicker').val();
		country = $('#countries').val();

		count += 1;

		//used to bind methods for buttons
		var deleteBtnID = '#delete-entry' + count;
		//var mapBtnID = '#showmap-entry' + count;
		//var mapID = '#map-entry' + count;
		var editBtn = '#edit-entry'+count;

		var entryHtml = String()+
					'<div class="row">'+
						'<div class="col-lg-2 col-md-2 col-sm-2 "></div>'+
						'<div class="spa-search-entry col-lg-8 col-md-8 col-sm-8 col-xs-12" id="entry'+count+'">'+
							'<div class="spa-search-entry-data col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
								'<p class="spa-search-entry-date col-lg-4 col-md-4 col-sm-4 col-xs-4">'+date+'</p>'+
								'<p class="spa-search-entry-country col-lg-6 col-md-6 col-sm-6 col-xs-6">'+country+'</p>'+
							
							'<div class="spa-search-entry-btns col-lg-2 col-md-2 col-sm-2 col-xs-2">'+
								'<span class="glyphicon glyphicon glyphicon-pencil" id="edit-entry'+count+'" aria-hidden="true"></span>'+
								'<span class="glyphicon glyphicon-remove" id="delete-entry'+count+'" aria-hidden="true"></span>'+
							'</div>'+
						'</div>'+
						//'<div class="map" id="map-entry'+count+'"></div>'+
					'</div>'
					;

		$(entryHtml).appendTo($container);

		$(deleteBtnID).click(removeEntry);//bind remove method
		$(editBtn).click(editEntry);
		//$(mapBtnID).click(showMap);
		//hideElement($(mapID));

		//clear values in input
		$('#datepicker').val('');
		$('#countries').val('');
		$('spa-search-entry').addClass("row");
	};

	hideElement = function($container){
		$($container).hide();//hide(speed,callback); check animations
	};

	showElement = function($container){
		$($container).show();//show(speed,callback); check animations
	};


	initResults = function($container){
		var retrievedObject = JSON.parse(localStorage.getItem('resultsObject'));
		results.initResults(retrievedObject);//initialize results page, parse keywords and entries
	};


	//init starting page
	initSearch = function($container){
			$container.append(entryTemplates.keywordsContainer);
			$container.append(entryTemplates.entriesContainer);
			$container.append(searchTemplates.input);
			$(entryTemplates.newEntryBtn).insertAfter($(".spa-search-entries"));
			hideElement($('.spa-search-addbtn'));
			hideElement($('.spa-search-entries'));


			$('#datepicker').val('');
			$('#countries').val('');

			$container.append(searchTemplates.searchbtn);

			$inputbtn = $container.find('#input-addbtn');
		  	$inputbtn.click(onClickAdd);

		  	$addentrybtn = $container.find('#addbtn');
		  	$addentrybtn.click(onClickNewEntry);

		  	$searchbtn = $container.find('#searchbtn');
		  	$searchbtn.click(onClickSearch);

		  	$addkeywordsbtn = $container.find('#keywords-addbtn'); 
		  	$addkeywordsbtn.click(onClickAddKeywords);
		  	$('#tags').tagsinput({
            	
        	});

		  		$('<ul class="dropdown-menu col-lg-4 col-md-4 col-sm-4 col-xs-6"></ul>').insertAfter('#countries');
		  		$('<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5"></div>').insertAfter('#countries');
				for (index = 0; index < countries.length; ++index) {
   	 					$(".dropdown-menu").append('<li value="'+countries[index]+'">'+countries[index]+'</li>');					
				}

			$('#countries').keyup(function(event) {
    			
    			$(".dropdown-menu li").each(function( index ) {
    				var newT = $('#countries').val().toLowerCase();
  					var val = $(this).text().toLowerCase();
  					if((val.indexOf(newT) == -1)){;    
    					$(this).hide();
    				}	
    				else{
    					$(this).show();
    				}			
				});
  			});

  			$(".dropdown-menu li").click(function(){
				$('#countries').val($(this).text());
			});
			$('.bootstrap-tagsinput').addClass("col-xs-6 col-sm-4 col-md-4");
			$container.append(searchTemplates.footbar);
		};
		return {initSearch:initSearch};
	}());

	
//manage results page	
var results = (function(){
	var 
	resultsTemplates = {
		dropdown: String()+'<div class="spa-results-dropdown"></div>',
		countryDetailsContainer: String()+'<div class="spa-results-countrydetails">',
		outbreaksContainer: String()+'<div class="spa-results-outbreaks">',
		nav: String() + '<div class="container-wrapper">'+
    						'<div id= "header" class = "row">'+
      							'<div class="col-lg-1"></div>'+
      							'<span id="headerspan" class="col-lg-1">&#9776;</span>'+
      							'<div class="col-lg-6"></div>'+
      							'<span id="logospan" class="col-lg-2">DiseaseInfo</span>'+
   							'</div>'+
						'</div>'
	},//end results templates
		dropdownHandler,
		showMap, closeMap,
		initResults, showDescription, kooo;

		dropdownHandler = function(event){
			if($(this).parent().next().css('display') === 'none'){
				$(this).parent().next().show();
			}
			else
				$(this).parent().next().hide();
		};

		koo = function(obj){
			var ids = String()+$(this).attr('id');
			ids = ids.split('entry');
			var outid = ids[1].split('-');
			var resultsObject = JSON.parse(localStorage.getItem('resultsObject'));
			var countries = Object.keys(resultsObject);
			var outbreaks = Object.keys(resultsObject[countries[outid[0]]]);
			var outbrk = resultsObject[countries[outid[0]]][outbreaks[outid[1]]];
			//console.log(outbrk);

			description.initDescription(outbrk);//initialize description page, parse outbreak object
		};

		showMap = function(event){
			var mapDivID = $(this).parent().next().next().attr("id");//get id of the map container
			if($('#'+mapDivID).css('display')=='none'){
				var countryName = $(this).parent().find('.spa-results-countryname').text();//get country name
				var datax = JSON.parse(localStorage.getItem('worldData'));
				console.log(datax);

				for(i = 0; i< datax.length; i++){
					//console.log(datax[i].name);
					if(datax[i].name===countryName){
						abbr = datax[i].code;
						break;
					}
				}
				$('#'+mapDivID).show();
				doMap(mapDivID, abbr);
			}
			else{
				$('#'+mapDivID).css('display','none');
			}
		}

		closeMap = function(){

		}
			

			initResults = function(resultsObject){

				if($("#spa-search").length !== 0) {
  				
  						$($("#spa-search")).html("");
						$($('#spa-search')).attr("id","spa-results");
				}
				if($("#spa-description").length !== 0) {
  						$($("#spa-description")).html("");
						$($('#spa-description')).attr("id","spa-results");
				}


				//resultsObject is an array of countries	
				console.log(resultsObject);
				console.log(Object.keys(resultsObject));
				$($("#spa-results")).append(resultsTemplates.nav);	

				var countries = Object.keys(resultsObject);

				for(i = 0; i< countries.length; i++){
					
					//container for dropdown list 
					if(resultsObject.length<2){
						var resultsEntryContainer = String()+'<div class="spa-results-dropdown"id="'+countries[i]+'">'+
																'<div class="container">'+
																	'<div class="spa-results-countrydetails row" id="entry'+i+'">'+
																		'<div class="col-xs-1 col-sm-2 col-md-2"></div>'+
																		'<p class="spa-results-countryname col-xs-3 col-sm-3 col-md-3">'+countries[i]+'</p>'+
																		'<span class="glyphicon glyphicon-map-marker col-xs-4 col-sm-2 col-md-2" id="showmap-entry'+i+'" aria-hidden="true"></span>'+
																		'<p class="spa-results-found col-xs-2 col-sm-5 col-md-5"></p>'+
																	'</div>'+
																	'<div class="map col-xs-12 col-sm-12 col-md-12" id="map-entry'+countries[i]+'"></div>'+
																'</div>'+
														 	'</div>';
					}
					else{
					var mapBtnID = '#countrydetails-map'+i;
					var dropBtnID = '#countrydetails-drop'+i;
					var resultsEntryContainer = String()+'<div class="spa-results-dropdown"id="'+countries[i]+'">'+
															'<div class="container">'+
																'<div class="spa-results-countrydetails row" id="entry'+i+'">'+
																	'<div class="col-xs-1 col-sm-2 col-md-2"></div>'+
																	'<p class="spa-results-countryname col-xs-3 col-sm-3 col-md-3">'+countries[i]+'</p>'+
																	'<span class="glyphicon glyphicon-map-marker col-xs-1 col-sm-1 col-md-1" id="showmap-entry'+i+'"aria-hidden="true"></span>'+
																	'<p class="spa-results-found col-xs-4 col-sm-5 col-md-5"></p>'+
																	'<span class="glyphicon glyphicon-chevron-down spa-results-dropbtn col-xs-1 col-sm-1 col-md-1" id="countrydetails-drop'+i+'" aria-hidden="true"></span>'+
																	'<div class="col-xs-2 col-sm-2 col-md-2"></div>'+	
																'</div>'+	
																'<div class="map" id="map-entry'+i+'"></div>'+	
															'</div>'								
														'</div>';
					}

					$($("#spa-results")).append(resultsEntryContainer);
					

					var entryOutbreaksContainer = String()+
															'<div class="spa-results-outbreaks" id="outbreaks-entry'+i+'">';
					var ide= String()+'#entry'+i;
					$(entryOutbreaksContainer).insertAfter($(ide));
					$(dropBtnID).click(dropdownHandler);

					var mapBtnID = '#showmap-entry' + i;
					var mapID = '#map-entry' + i;
					$(mapBtnID).click(showMap);
					$(mapID).hide();

					var outbreaks = Object.keys(resultsObject[countries[i]]);
					
					var id = String()+'#outbreaks-entry'+i;
				 for (j = 0; j < outbreaks.length; j++){
				 		var current = resultsObject[countries[i]][outbreaks[j]];
				 		console.log(current);
				 			var entryOutbreak = String()+
				 											'<div class="spa-results-outbreak row" id="outbreaks-entry'+i+'-'+j+'">'+
				 											'<div class="col-xs-1 col-sm-2 col-md-2"></div>'+
				 												'<p class="spa-results-outbreak-date col-xs-4 col-sm-4 col-md-4">'+current.date[0]+" "+current.date[1]+" "+current.date[2]+'</p>'+
				 												'<p class="spa-results-outbreak-name col-xs-6 col-sm-6 col-md-6">'+current.title+'</p>'+
				 											'</div>';
				 			var descrBtnID = '#outbreaks-entry'+i+'-'+j;
				 		$(id).append(entryOutbreak);
				 		$(descrBtnID).click(koo);


				 }//end for
				 $(ide).find('.spa-results-found').text(Object.keys(resultsObject[countries[i]]).length + " results found");
				}
		};
		return {initResults:initResults};

	}());



	//manage descriptions page	
var description = (function(){
	//just pass outbreak object
		var desTemplates = {
		nav: String() + '<div class="container-wrapper">'+
    '<div id= "header" class = "row">'+
      '<div class="col-lg-1"></div>'+
      '<span id="headerspan" class="col-lg-1">&#9776;</span>'+
      '<div class="col-lg-6"></div>'+
      '<span id="logospan" class="col-lg-2">DiseaseInfo</span>'+
   '</div>'+
'</div>'

	},//end results templates
	initDescription, backToResults;

	backToResults = function(){
		//to go back from description to results screen just take an object from local storage and call init results
		var retrievedObject = JSON.parse(localStorage.getItem('resultsObject'));
        //console.log(retrievedObject);
		results.initResults(retrievedObject);
	};

	initDescription = function(outbreak){
		$($("#spa-results")).html("");
		$($('#spa-results')).attr("id","spa-description");
		
		console.log(outbreak);
		var id = '#spa-description';
		var details = String()+
							'<div class="container">'+
								'<div class="row">'+
									'<div class="col-sm-2 col-md-2"></div>'+
									'<p class="col-sm-8 col-md-8 spa-description-title">Title: '+outbreak.title+'</p>'+
								'</div>'+

								'<div class="row">'+
									'<div class=" col-sm-2 col-md-2"></div>'+
							  		'<p class=" col-sm-8 col-md-8 spa-description-date">Date: '+outbreak.date[0]+" "+outbreak.date[1]+" "+outbreak.date[2]+'</p>'+
							  	'</div>'+

							  	'<div class="row">'+
							  		'<div class="col-sm-2 col-md-2"></div>'+
							  		'<p class=" col-sm-8 col-md-8 spa-description-summary">Summary: '+outbreak.summary+'</p>'+
							  	'</div>'+

							  	'<div class="row">'+
							  		'<div class=" col-sm-2 col-md-2"></div>'+
							  		'<p class=" col-sm-8 col-md-8 spa-description-url">Url: '+outbreak.url+'</p>'+
							  	'</div>'+

							  	'<div class="row">'+
							  		'<div class=" col-sm-2 col-md-2"></div>'+
							  		'<p class=" col-sm-8 col-md-8 spa-description-keywords">Keywords: '+outbreak.keywordsMatched+'</p>'+
							  	'</div>'+
							'</div>';
		$(id).append(desTemplates.nav);		 			
		$(id).append(details);

		var backBtn = String()+'<div class="row">'+
							  		'<div class=" col-sm-2 col-md-2"></div>'+
									'<button type="button" class = "btn btn-primary col-xs-4 col-sm-2 col-md-2" id="spa-description-back">Back</button>'+			
								'</div>';
		$(id).append(backBtn);

		$($("#spa-description-back")).click(backToResults);
	};
	return {initDescription:initDescription};
}());//end description

//init search page once app is started
$(function() {search.initSearch($('#spa-search'));});

//initialize datepicker
$( function() {
    $('#datepicker').datepicker({
        autoclose: true,
        todayBtn: false,
        todayHighlight: true,
        format: 'dd/mm/yyyy'
	});
});
(jQuery);

    