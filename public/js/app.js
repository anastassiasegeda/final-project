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
 				"Belize", "Bermuda", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil","Brunei", "Bulgaria", "Burkina Faso","Burundi", "Cambodia", "Cameroon", "Canada",
 	  			"Cape Verde", "Cayman Islands","Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
 		 		"Democratic Republic of the Congo", "Republic of Congo", "Costa Rica", "Cote dIvoire", "Croatia", "Cuba", "Curacao",
 		  		"Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica","Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
 		  		"Equatorial Guinea", "Eritrea","Estonia", "Ethiopia","Faeroe Islands", "Fiji", "Finland","France","French Polynesia", "Gabon", "Gambia",
 				"Georgia", "Germany", "Ghana", "Greece", "Greenland","Grenada", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
 				"Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
 				"Japan", "Jordan", "Kazakhstan","Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  				"Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", 
  				"Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico","Mayotte",
  				"Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
  				"Netherlands", "New Caledonia", "New Zealand", "Nicaragua","Niger", "Nigeria", "North Korea", "Northern Cyprys", "Northern Mariana Island", "Norway", "Oman", "Pakistan",
  				"Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar",
  				"Romania", "Russia", "Russian Federation", "Rwanda", "St Kitts and Nevis", "St Lucia", "St Martin", "Saint Vincent and the Grenadines", "Samoa",
  				"San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Republic of Serbia", "Seychelles", "Sierra Leone", "Singapore", 
  				"Slovakia", "Slovenia", "Solomon Islands", "Somalia", "Somaliland", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", 
  				"Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "United Republic of Tanzania", "Thailand", 
  				"East Timor", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  				"United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];


var slideOutMenu = String()+'<div id="slideOutMenu">'+
								'<div id = "openSearch" class="slideOutIcon" data-toggle="tooltip" data-placement="right" title="Search"><i class="fa fa-search" aria-hidden="true"></i></div>'+
								'<div id = "openWorldMap" class="slideOutIcon" data-toggle="tooltip" data-placement="right" title="Recent outbreaks"><i class="fa fa-map-marker" aria-hidden="true"></i></div>'+
								'<div id ="openInfo" class="slideOutIcon" data-toggle="tooltip" data-placement="right" title="Information/Help"><i class="fa fa-info" aria-hidden="true"></i></div>'+
							'</div>';

var nav = String() + '<div class="container-wrapper">'+
    						'<div id= "header" class = "row">'+
      								'<button class="hamburger hamburger--collapse" type="button">'+
  										'<span class="hamburger-box">'+
    										'<span class="hamburger-inner"></span>'+
  										'</span>'+
									'</button>'+      							
      								'<span id="logospan">DiseaseInfo</span>'+
   							'</div>'+
						'</div>';
var footbar = String()+
					'<div class="spa-search-footbar container-wrapper">'+
						'<footer class="row">'+
							'<div class ="nnuhlogo col-xs-8 col-sm-8 col-md-8"></div>'+
							'<div class = "uealogo col-xs-4 col-sm-4 col-md-4"></div>'+
						'</footer>'+
					'</div>';

//Helper for search page initialization
var showSearch = function($container){
		if($container.length !== 0) {
  			$container.html("");
			$container.attr("id","spa-search");
		}	
		search.initSearch($('#spa-search'));
    	$('#datepicker').datepicker({
        	autoclose: true,
        	todayBtn: false,
        	todayHighlight: true,
        	format: 'dd/mm/yyyy'
		});
};

//Manage/initialize information page
var information = (function(){
	var infoTemplates = {
		about: String()+
						'<div id="spa-info-about">'+
							'<div class="container">'+
								'<div class="row">'+
									'<h1>Information page</h1>'+
									'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus reiciendis eligendi temporibus porro dignissimos itaque sapiente eaque animi explicabo alias labore aspernatur, ipsam, sint ratione repudiandae cumque magni pariatur. Perferendis!</p>'+
									'<h2>About</h2>'+
									'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae repellendus possimus deleniti ad earum iusto reprehenderit omnis molestiae, at iure unde in amet! Nisi ullam esse, quaerat totam dicta, illum?</p>'+
									'<h2>Title 2</h2>'+
									'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam eligendi, libero, delectus atque eos eum minima architecto porro nihil praesentium nobis quae in eaque deserunt accusantium necessitatibus dolor quam quo!</p>'+
								'</div>'+
							'</div>'+
						'</div>',

	},
	gotoMap, initInfo, initSearch;

	//Open worldmap w/ recent outbreaks
	gotoMap = function(){
		worldmap.initWorldMap1(($('#spa-info')));
	}

	//Open search page
	initSearch = function(){
		showSearch($('#spa-info'));
	}

	//Initialize contents of the information page and display
	initInfo = function($container){
		$container.html('');
		$container.attr("id","spa-info");
		$container.append(nav);
		$container.append(slideOutMenu);
		 $('[data-toggle="tooltip"]').tooltip();
		$container.append(infoTemplates.about);
		$(".hamburger").click(function(){
			$('#slideOutMenu').toggleClass('on');
			$(".hamburger").toggleClass('is-active');
		});
		$('#openSearch').click(initSearch);
		$('#openWorldMap').click(gotoMap);
		$container.append(footbar);
	};
	return {initInfo:initInfo};
}());

//Manage page and display a map of recent outbreaks
//Other functionality in map.js
var worldmap = (function(){
	var mapTemplates = {
		worldmap: String() +					
							'<div class = "spa-worldmap-container container">'+

								'<div class="row">'+
									'<h1 class="col-sm-12 col-md-12 col-lg-12">Recent outbreaks</h1>'+
								'</div>'+

								'<div class = "row spa-worldmap-info">'+
									'<h3 id="mapRecentHeader" class="col-xs-8 col-sm-8 col-md-6 col-lg-5">Showing recent outbreaks for the last </h3>'+
  									'<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">'+
    									'<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" id="dropdownRange">Two Weeks</button>'+
    									'<ul class="dropdown-menu" id="dropdownRanges">'+
     										'<li><a href="#!">One Day</a></li>'+
      										'<li><a href="#!">One Week</a></li>'+
      										'<li><a href="#!">Two Weeks</a></li>'+
     										'<li><a href="#!">One Month</a></li>'+
    									'</ul>'+
  									'</div>'+
  								'</div>'+

  								'<div class="row">'+
										'<p class="col-sm-12 col-md-12 col-lg-12" id="mapRecentNote">Hover on the country to see the number of outbreaks found. Click on the country for more details.</p>'+
								'</div>'+

								'<div class = "row">'+
									'<div class="map" id="worldmap"></div>'+
								'</div>'+

								'<div id="recent-outbreaks-list">'+

								'</div>'+
							'</div>',
	},
	openWorldmap, goToInfo, initSearch, initWorldMap1;

	//Open search page
	initSearch = function(){
		showSearch($('#spa-worldmap'));
	}

	//Open information page
	goToInfo = function(event){
		information.initInfo(($('#spa-worldmap')));
	}

	//Initialize and display worldmap w/ recent outbreaks
	openWorldmap = function(range){

		        //loader
        var load = String()+ 
                            '<div class="loaderContainerTransparent">'+
                                    '<div class="container-wrapper">'+
                                            '<div class="row">'+
                                                '<div class="loader"></div>'+
                                            '</div>'+
                                    '</div>'+
                            '</div>';
        $('#recent-outbreaks-list').html('');
        $('#worldmap').html(load);

    		$.ajax({
        		url: '/worldmap',
        		type:'post',
        		data: range,
        		success:function(data){
        			localStorage.clear();//clear localStorage first to make sure there's enough space
        			localStorage.setItem("mapdata", data[0]);
        			localStorage.setItem("mapval", data[1]);  

        			worldmaprecent.initWorldmap('worldmap', 14);   			
        		}
    		});
	}

		initWorldMap1 = function($container){

  		$container.html('');
		$container.attr("id","spa-worldmap");
		$container.append(nav);
		$container.append(slideOutMenu);
		 $('[data-toggle="tooltip"]').tooltip();
		$container.append(mapTemplates.worldmap);
		$(".hamburger").click(function(){
			$('#slideOutMenu').toggleClass('on');
			$(".hamburger").toggleClass('is-active');
		});
		$('#openSearch').click(initSearch);
		$('#openInfo').click(goToInfo);
		$container.append(footbar);

        //loader
        var load = String()+ 
                            '<div class="loaderContainer">'+
                                    '<div class="container-wrapper">'+
                                            '<div class="row">'+
                                                '<div class="loader"></div>'+
                                            '</div>'+
                                    '</div>'+
                            '</div>';

        $('#worldmap').html(load);

		$("#dropdownRanges li").click(function(){
			var name = $(this).text();
			var rangeDays = '14';

			switch(name.toLowerCase()) {
    			case "one day":
        			rangeDays = '1';
        		break;
    			case "one week":
        			rangeDays = '7';
        		break;
        		case "two weeks":
        			rangeDays = '14';
        		break;
        		case "one month":
        			rangeDays = '31';
        		break;
			}//end cwitch
			$("#dropdownRange").text(name);
			openWorldmap(rangeDays);
		});
		//default - two weeks
		openWorldmap('14');
	};
	return {initWorldMap1:initWorldMap1};
})();

//Display loading animation
var loader = (function(){
	var loaderTemplates = {
		loader: String() +
							'<div class="loaderContainer">'+
									'<div class="container-wrapper">'+
											'<div class="row">'+
												'<div class="loader"></div>'+
											'</div>'+
									'</div>'+
							'</div>'							
	},
	initLoader;
	//Display loading screen on top of $container
	//Used when the user clicks search button
	initLoader = function($container){
		$($container).html('');
		$($container).append(nav);
		$($container).append(loaderTemplates.loader);
		$($container).append(footbar);
	};
	return {initLoader:initLoader};
})();

//Manage search page (also playing a role of a starting page)
var search = (function() {
	var
	searchTemplates = {
		input: String()+
				'<div class="spa-search-input container">'+
				'<div class="spa-search-input-date">'+
					'<div class="row">'+
						'<div class = "col-xs-1 col-sm-3 col-md-3"></div>'+
						'<p class="col-xs-4 col-sm-2 col-md-2">Date: </p>'+
						'<input type="text" class = "datepick input-group col-xs-6 col-sm-4 col-md-4" id="datepicker">'+
					'</div>'+
				'</div>'+

				'<div class="spa-search-input-country">'+
					'<div class="row">'+
						'<div class = "col-xs-1 col-sm-3 col-md-3"></div>'+
						'<p class="col-xs-4 col-sm-2 col-md-2">Country: </p>'+
						'<div id="col-xs-6 col-sm-4 col-md-4">'+
							'<input type="text" id = "countries" class = "datepick input-group col-xs-6 col-sm-4 col-md-4 dropdown-toggle" data-toggle="dropdown">'+
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
					'<span col-xs-3 col-sm-4 col-md-4"><i id="addbtn" class="fa fa-plus-circle" aria-hidden="true"></i></span>'+
				'</div>',
	},//end entry templates

	entry = {//used to represent an entry (date and country)
		date: null,
		country: null,
	},

	count = 0,//count number of entries

	//variables for methods
	addEntry, removeEntry, editEntry,
	showMap, closeMap,
	hideElement, showElement,
	initSearch, initResults,
	sendEntriesToNode,
	onClickAdd, onClickNewEntry, onClickSearch, onClickMap, onClickAddKeywords, onClickEditKeywords,
	goToInfo, goToMap;

	//Initialize information page
	goToInfo = function(event){
		information.initInfo(($('#spa-search')));
	}

	//Open worldmap/ recent outbreaks page
	goToMap = function(){
		worldmap.initWorldMap1(($('#spa-search')));
	}

	//Click Add new entry
	onClickAdd = function(event){
		var date, country;
		date = $('#datepicker').val();
		country = $('#countries').val();

		//check if country name is correct
		if(countries.indexOf(country)<0){
			//insert error (html row) after country row
			var countryerror = document.getElementById("errorcountry");
			if(!countryerror){
				$('<div id="errorcountry">'+
					'<div class="row">'+
						'<div class="col-xs-1 col-sm-3 col-md-3"></div>'+
						'<p class="col-xs-2 col-sm-2 col-md-2"> </p>'+
						'<p class="col-xs-7 col-sm-7 col-md-7">Incorrect country</p>'+
					'</div>'+
				'</div>').insertAfter($(".spa-search-input-country"));
			}
		}
		else{
			if(date===''||country===null){
				$('#input-addbtn').attr('disabled');
			}else{
				hideElement($('.spa-search-input'));
				showElement($('.spa-search-addbtn'));
				showElement($('.spa-search-entries'));
				var countryerror = document.getElementById("errorcountry");
					if(countryerror){
						$('#errorcountry').remove();
					}
					//take data from input, create new entry object
				addEntry('.spa-search-entries');
			};	
		}//end else
	}

	//Handle elements (show/hide) when a new entry is added
	onClickNewEntry = function(event){
		showElement($('.spa-search-input'));
		hideElement($('.spa-search-addbtn'));
	}

	//Sent post request to node to find outbreaks for specified countries
	sendPostToNode = function(path, parameters){
  			 $.ajax({
        		url: path,
        		type:'post',
        		data: parameters,
        		success:function(data){

            		localStorage.setItem("resultsObject", data[0]);
    				var retrievedObject = JSON.parse(localStorage.getItem('resultsObject'));
            		localStorage.setItem("worldData", data[1]);
    				var retrievedObjectMap = JSON.parse(localStorage.getItem('worldData'));
    				localStorage.setItem("neighboursObject", data[2]);   				

					initResults();
        		}
    		});
	};

	//Click on SEARCH button 
	//Sent post request to node and display loading animation 
	onClickSearch = function(event){
		if (!($('.spa-search-entries').children().length === 0)){//check if no children (entries)

			var entriesList = [];
			var keywordsList = [];

		$(".spa-search-entry").each(function() {
  			var newEntry = Object.create(entry);
			newEntry.country = $(this).find(".spa-search-entry-country").text();
			newEntry.date = $(this).find(".spa-search-entry-date").text();

			if($(this).find(".spa-search-entry-date").data('range')===''){
				newEntry.range = 20;
			}else{
				newEntry.range = $(this).find(".spa-search-entry-date").data('range');
			}

			entriesList.push(newEntry);
		});

			keywordsList = $("#tags").tagsinput('items');

			sendPostToNode('/resultsPage', {name: JSON.stringify(entriesList)+"#"+JSON.stringify(keywordsList)});
			$('#searchbtn').css('background-color', '#777');
			loader.initLoader('#spa-search');
		};
	};

	//Remove entry from the list of chosed countries
	removeEntry = function(event){
		$(this).parent().parent().parent().parent().parent().remove();
		count-=1;
		if (count===0){
			$('#datepicker').val('');
			$('#countries').val('');
			hideElement($('.spa-search-entries'));
			hideElement($('.spa-search-addbtn'));
			showElement($('.spa-search-input'));
		}
	};

	//Edit entry and add back to the list of chosen countries
	editEntry = function(){
		$('#datepicker').val($(this).parent().parent().parent().find('.spa-search-entry-date').text());
		$('#countries').val($(this).parent().parent().parent().find('.spa-search-entry-country').text());

		showElement($('.spa-search-input'));
		hideElement($('.spa-search-addbtn'));
		$(this).parent().parent().parent().parent().parent().remove();
		count-=1;
	}

	//Parse object into here from onClickAdd
	addEntry = function($container){
		var date, country;
		date = $('#datepicker').val();
		country = $('#countries').val();
		range = $('#range').val();

		count += 1;

		//used to bind methods for buttons
		var deleteBtnID = '#delete-entry' + count;
		var editBtn = '#edit-entry' + count;

		var entryHtml = String()+
					'<div class="row">'+
						'<div class="col-lg-2 col-md-2 col-sm-2 "></div>'+
						'<div class="spa-search-entry col-lg-8 col-md-8 col-sm-8 col-xs-12" id="entry'+count+'">'+
							'<div class="spa-search-entry-data col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
								'<p class="spa-search-entry-date col-lg-4 col-md-4 col-sm-4 col-xs-4" data-range="'+range+'">'+date+'</p>'+
								'<p class="spa-search-entry-country col-lg-6 col-md-6 col-sm-6 col-xs-6">'+country+'</p>'+
							
							'<div class="spa-search-entry-btns col-lg-2 col-md-2 col-sm-2 col-xs-2">'+
								'<span><i class="fa fa-pencil" aria-hidden="true" id="edit-entry'+count+'"></i></span>'+
								'<span><i class="fa fa-times" aria-hidden="true" id="delete-entry'+count+'"></i></span>'+
							'</div>'+
						'</div>'+
					'</div>';

		$(entryHtml).appendTo($container);

		$(deleteBtnID).click(removeEntry);//bind remove method
		$(editBtn).click(editEntry);

		//clear values in input
		$('#datepicker').val('');
		$('#countries').val('');
	};

	hideElement = function($container){
		$($container).hide();//hide(speed,callback); 
	};

	showElement = function($container){
		$($container).show();//show(speed,callback); 
	};

	//Initialize results page to show outbreaks found
	initResults = function(){
		var retrievedObject = JSON.parse(localStorage.getItem('resultsObject'));
		results.initResults("#spa-search",retrievedObject);//initialize results page, parse keywords and entries
	};

	//Initialize starting page/search page
	initSearch = function($container){
			$container.append(nav);
			$container.append(slideOutMenu);
			$('[data-toggle="tooltip"]').tooltip();
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
		  	$('#tags').tagsinput({});

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
			$container.append(footbar);
			$(".hamburger").click(function(){
				$('#slideOutMenu').toggleClass('on');
				$(".hamburger").toggleClass('is-active');
			});
			$('#openInfo').click(goToInfo);
			$('#openWorldMap').click(goToMap);
		};
		return {initSearch:initSearch};
	}());
	
//Manage results page	
var results = (function(){
	var 
	resultsTemplates = {
		dropdown: String()+'<div class="spa-results-dropdown"></div>',
		countryDetailsContainer: String()+'<div class="spa-results-countrydetails">',
		outbreaksContainer: String()+'<div class="spa-results-outbreaks">'
	},//end results templates
		dropdownHandler,
		showMap, closeMap,
		initResults, showDescription, backToSearch,kooo,goToWorldmap;

		//Click back to search button. initialize search page
		backToSearch = function(){
			showSearch($('#spa-results'));
		}

		//Open worldmap w/ recent outbreaks
		goToWorldmap = function(event){
			worldmap.initWorldMap1(($('#spa-results')));
		}

		//Hide/show dropown
		dropdownHandler = function(event){
				//hide map and animate div
				$(this).toggleClass('down');
				$(this).parent().parent().parent().next().slideToggle(400);
				$(this).parent().parent().parent().next().next().slideToggle(400);
				$(this).parent().parent().parent().next().next().hide();
		};

		//Open description page for the outbreak 
		goToDescription = function(event){
			var ids = String()+$(this).attr('id');
			
			ids = ids.split('entry');
			var outid = ids[1].split('-');
			var resultsObject = JSON.parse(localStorage.getItem('resultsObject'));
			var countries = Object.keys(resultsObject);
			var outbreaks = Object.keys(resultsObject[countries[outid[0]]]);
			var outbrk = resultsObject[countries[outid[0]]][outbreaks[outid[1]]];

			description.initDescription(outbrk, 'resultspage');//initialize description page, parse outbreak object
		};

		//Show map
		showMap = function(event){
			var mapDivID = $(this).parent().parent().next().next().attr("id");//get id of the map container
			if($('#'+mapDivID).css('display')=='none'){
				var countryName = $(this).parent().parent().find('.spa-results-countryname').text();//get country name
				var datax = JSON.parse(localStorage.getItem('worldData'));

				for(i = 0; i< datax.length; i++){
					if(datax[i].name===countryName){
						abbr = datax[i].code;
						break;
					}
				}
				$('#'+mapDivID).show();
				worldmaprecent.initWorldmap(mapDivID, abbr);				
			}
			else{
				$('#'+mapDivID).css('display','none');
			}
		}

		//Go to information page
		goToInformation = function(event){
			information.initInfo(($('#spa-results')));
		}	

		//Initialize/display results page
		initResults = function($container, resultsObject){
			//required if new search was made from this page
			$("#spa-results").html("");

  			$($container).html("");
			$($container).attr("id","spa-results");
  					
			$($("#spa-results")).append(nav);
			$($("#spa-results")).append(slideOutMenu);	
			$('[data-toggle="tooltip"]').tooltip();

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
																	'<span> <i class="fa fa-map-marker col-xs-1 col-sm-1 col-md-1" id="showmap-entry'+i+'"aria-hidden="true"></i></span>'+
																	'<p class="spa-results-found col-xs-4 col-sm-5 col-md-5"></p>'+

																	'<div class="spa-results-dropbtn col-xs-1 col-sm-1 col-md-1" aria-hidden="true">'+
																		'<span><i class="fa fa-chevron-up spa-results-dropbtn" id="countrydetails-drop'+i+'"></i></span>'+
																	'</div>'+
																'</div>'+	
																'<div class="map" id="map-entry'+i+'"></div>'+	
															'</div>'								
														'</div>';
					var resultsBackButton = String()+
													'<div class="row">'+
							  							'<div class=" col-sm-2 col-md-2"></div>'+
														'<button type="button" class = "btn btn-primary col-xs-4 col-sm-2 col-md-2" id="spa-results-back">Back</button>'+			
													'</div>';
					}

					$($("#spa-results")).append(resultsEntryContainer);

					var entryOutbreaksContainer = String()+'<div class="spa-results-outbreaks" id="outbreaks-entry'+i+'">';
					var ide = String()+'#entry'+i;
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
				 		//console.log(current);
				 			var entryOutbreak = String()+
				 											'<div class="spa-results-outbreak row" id="outbreaks-entry'+i+'-'+j+'">'+
				 											'<div class="col-xs-1 col-sm-2 col-md-2"></div>'+
				 												'<p class="spa-results-outbreak-date col-xs-4 col-sm-4 col-md-4">'+current.date[0]+" "+current.date[1]+" "+current.date[2]+'</p>'+
				 												'<p class="spa-results-outbreak-name col-xs-6 col-sm-6 col-md-6">'+current.title+'</p>'+
				 											'</div>';
				 			var descrBtnID = '#outbreaks-entry'+i+'-'+j;
				 		$(id).append(entryOutbreak);
				 		$(descrBtnID).click(goToDescription);
				 	}//end for
				 $(ide).find('.spa-results-found').text(Object.keys(resultsObject[countries[i]]).length + " results found");
				}

				$($("#spa-results")).append(resultsBackButton);
				$($("#spa-results")).append(footbar);
				$($("#spa-results-back")).click(backToSearch);
				$(".hamburger").click(function(){
					$('#slideOutMenu').toggleClass('on');
					$(".hamburger").toggleClass('is-active');
				});
				$('#openSearch').click(backToSearch);
				$('#openWorldMap').click(goToWorldmap);
				$('#openInfo').click(goToInformation);
		};
		return {initResults:initResults};
	}());

	//Manage descriptions page	
var description = (function(){
	//just pass outbreak object
		var desTemplates = {
	},//end results templates
	initDescription, backToResults, backToSearch, backToWorldmap;

	var previouspage = null;//stores id of previous page, makes sure the back button redirects to the right page

	//Go back to results page (button)
	backToResults = function(){
		//to go back from description to results screen just take an object from local storage and call init results
		var retrievedObject = JSON.parse(localStorage.getItem('resultsObject'));
        //console.log(retrievedObject);
		results.initResults("#spa-description", retrievedObject);
	};

	//Go back to search page (menu button)
	backToSearch = function(event){
		showSearch($('#spa-description'));
	}

	//Go back to worldmap page
	backToWorldmap = function(event){
		worldmap.initWorldMap1(($('#spa-description')));
	}

	//Go to information page (menu button)
	goToInfo = function(event){
			information.initInfo(($('#spa-description')));
	}

	//Initialize/display description
	initDescription = function(outbreak, prevpage){
		previouspage = prevpage;

		if($("#spa-results").length !== 0) {
			$($("#spa-results")).html("");
			$($('#spa-results')).attr("id","spa-description");
		}
		if($("#spa-worldmap").length !== 0) {
			$($("#spa-worldmap")).html("");
			$($('#spa-worldmap')).attr("id","spa-description");
		}

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
		$(id).append(nav);	
		$(id).append(slideOutMenu);	
		$('[data-toggle="tooltip"]').tooltip(); 			
		$(id).append(details);

		var backBtn = String()+'<div class="row">'+
							  		'<div class=" col-sm-2 col-md-2"></div>'+
									'<button type="button" class = "btn btn-primary col-xs-4 col-sm-2 col-md-2" id="spa-description-back">Back</button>'+			
								'</div>';
		$(id).append(backBtn);

		if(previouspage === 'resultspage'){
			$($("#spa-description-back")).click(backToResults);
		}
		else{
			$($("#spa-description-back")).click(backToWorldmap);
		}

		$(".hamburger").click(function(){//menu animation
			$('#slideOutMenu').toggleClass('on');
			$(".hamburger").toggleClass('is-active');
		});

		$('#openSearch').click(backToSearch);
		$('#openWorldMap').click(backToWorldmap);

		$('#openInfo').click(goToInfo);
		$('#spa-description').append(footbar);
	};
	return {initDescription:initDescription};
}());//end description

//Manage/initialize information page
var worldmaprecent = (function(){
    var worldmapTemplates = {
    },
    goToDescription, dropdownHandler, showDescription, searchFromMap, initWorldmap;

    //Start new search for the chosen country
    searchFromMap = function(event){

    $('body').removeClass('modal-open');
    $('body').css('padding-right','');

    //modal header
    var headername = $('html').find(".modal-title").text();
    $('html').find(".modal-title").text('New search for: '+headername.split(':')[0]);
    //modal body
    $('html').find(".modal-body").html('');
    $('html').find(".modal-body").append('<div class="spa-worldmap-input">'+
                '<div class="spa-search-input-date">'+
                    '<div class="row">'+
                        '<div class = "col-xs-1 col-sm-3 col-md-3"></div>'+
                        '<p class="col-xs-4 col-sm-2 col-md-2">Date: </p>'+
                        '<input type="text" class = "datepick col-xs-6 col-sm-4 col-md-4" id="datepicker">'+
                    '</div>'+
                '</div>'+

                '<div class="spa-search-input-country">'+
                    '<div class="row">'+
                        '<div class = "col-xs-1 col-sm-3 col-md-3"></div>'+
                        '<p class="col-xs-4 col-sm-2 col-md-2">Country: </p>'+

                        '<div id="col-xs-6 col-sm-4 col-md-4">'+
                            '<p id = "countries" class = "col-xs-6 col-sm-4 col-md-4 dropdown-toggle">'+headername.split(':')[0]+'</p>'+
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
                '</div>');

    $('#tags').tagsinput({});//initialise tags input
    $('.bootstrap-tagsinput').addClass("col-xs-6 col-sm-4 col-md-4");

    $('#datepicker').datepicker({//initialise datapicker
        autoclose: true,
        todayBtn: false,
        todayHighlight: true,
        format: 'dd/mm/yyyy'
    });

    //modal footer
    $('html').find(".modal-footer").html('');
    $('html').find(".modal-footer").append('<button type="button" id="newSearchQuery" class="btn btn-default">Search</button>');

    //handle data - send request, load results
    var entry = {
        country: null,
        name: null
    };

    var newSearchBtnID= '#newSearchQuery';
    $(newSearchBtnID).click(function(){

        entriesList = [];
        keywordsList = [];

            var newEntry = Object.create(entry);
            newEntry.country = headername.split(':')[0];
            newEntry.date = $('.modal-body').find("#datepicker").val();
            if($('.modal-body').find("#range").val()){
                newEntry.range = $('.modal-body').find("#range").val();
            }
            else{
                newEntry.range = 20;
            }
            entriesList.push(newEntry);
            keywordsList = $("#tags").tagsinput('items');

            //loader
            var load = String()+ 
                            '<div class="loaderContainer">'+
                                    '<div class="container-wrapper">'+
                                            '<div class="row">'+
                                                '<div class="loader"></div>'+
                                            '</div>'+
                                    '</div>'+
                            '</div>';

            var div = $('body').find('.modal-body').parent().parent().parent().html(load);
            $('body').removeClass('modal-open');
            $('body').css('padding-right','');

            $.ajax({//send request to node server
                url: '/resultsPage',
                type:'post',
                data: {name: JSON.stringify(entriesList)+"#"+JSON.stringify(keywordsList)},
                success:function(data){//display results page

                    localStorage.setItem("resultsObject", data[0]);
                    var retrievedObject = JSON.parse(localStorage.getItem('resultsObject'));
                    localStorage.setItem("worldData", data[1]);
                    var retrievedObjectMap = JSON.parse(localStorage.getItem('worldData'));
                    localStorage.setItem("neighboursObject", data[2]);   
                    results.initResults("#spa-worldmap", retrievedObject);
                }
            });
        });
    };

    //Show outbreak description if an entry was clicked on (MODAL)
    showDescription = function(event){           
            var ids = String()+$(this).attr('id');
            ids = ids.split('entry');
            var outid = ids[1].split('_');

            var countryname = outid[0].split("-").join(" ");

            var elementExists = document.getElementById("spa-results");
            var prevpage = null;
            if(elementExists===null){
                prevpage = 'worldmap';
                var neighOutbreaks = JSON.parse(localStorage.getItem('mapdata'));
            }
            else{
                prevpage = 'resultspage';
                var neighOutbreaks = JSON.parse(localStorage.getItem('neighboursObject'));
            };

            var outbreaks = Object.keys(neighOutbreaks[countryname]);

            //console.log(outbreaks);
            var outbrk = neighOutbreaks[countryname][outbreaks[outid[1]]];
            //console.log(outbrk);
            $('body').removeClass('modal-open');
            $('body').css('padding-right','');

            $('.form-control').css('width', '')
            description.initDescription(outbrk, prevpage);//initialize description page
    };

    //Hide/show dropown
    dropdownHandler = function(event){
        //hide map and animate div
        $(this).toggleClass('down');
        $(this).parent().parent().parent().nextAll().slideToggle(400);
    };

    //Open description page for the outbreak (list)
    goToDescription = function(event){
            var ids = String()+$(this).attr('id');//get id of the outbreak container
            ids = ids.split('outbreaks-');
            var outid = ids[1].split('-');

            //depending on what range is chosen - extract details
            var name = $("#dropdownRange").text();
            
            var resultsObject = JSON.parse(localStorage.getItem('mapdata')); 

            var countries = Object.keys(resultsObject);
            var outbreaks = Object.keys(resultsObject[countries[outid[0]]]);
            var outbrk = resultsObject[countries[outid[0]]][outbreaks[outid[1]]];
            description.initDescription(outbrk, 'worldmap');//initialize description page, parse outbreak object
    };

initWorldmap = function(container, abbr){           
//if abbr is number - then the request was made from recent map page
if(Number.isInteger(abbr)){
    var datax = JSON.parse(localStorage.getItem('mapval'));
    var neighOutbreaks = JSON.parse(localStorage.getItem('mapdata'));
}
else{//request was made from results page
    var datax = JSON.parse(localStorage.getItem('worldData'));
    var neighOutbreaks = JSON.parse(localStorage.getItem('neighboursObject'));
}

$('#recent-outbreaks-list').html('');
//populate the list with data
var cnames = Object.keys(neighOutbreaks);
//console.log(neighOutbreaks);
for(var i =0;i<cnames.length;i++){//for each country
    var currentc = cnames[i];
    var outbreaks = Object.keys(neighOutbreaks[currentc]);
    if(outbreaks.length>0){//if any outbreaks found - create list
    	var currentid = currentc.split(" ").join("_");

        var cheader = String()+  '<div class="spa-outbreaks-dropdown" id="recent-outbreaks-'+currentid+'">'+
                                                            '<div class="spa-outbreaks-countrydetails row" id="recent-entry'+i+'">'+
                                                                '<div class="col-sm-2 col-md-2"></div>'+
                                                                '<p class="spa-outbreaks-countryname col-xs-3 col-sm-3 col-md-3">'+currentc+'</p>'+
                                                                '<p class="spa-outbreaks-found col-xs-7 col-sm-5 col-md-5">'+outbreaks.length+' outbreaks found</p>'+

                                                                '<div class="spa-results-dropbtn col-xs-1 col-sm-1 col-md-1" aria-hidden="true">'+
                                                                    '<span><i class="fa fa-chevron-up spa-results-dropbtn" id="outbreaklist-drop'+i+'"></i></span>'+
                                                                '</div>'+
                                                            '</div>'+
                                                '</div>';
        $('#recent-outbreaks-list').append(cheader);

        var targetid = String()+'#recent-outbreaks-'+currentid;
        for(var j = 0;j<outbreaks.length;j++){//for each outbreak found in this country
            var currento = neighOutbreaks[currentc][outbreaks[j]];
            var outbreakDetails = String()+
                                    '<div class="row spa-outbreaks-outbreak" id="recent-outbreaks-'+i+'-'+j+'">'+
                                        '<p class="map-outbreak-date col-xs-3 col-sm-3 col-md-2 col-lg-2">Date: '+currento.date[0]+" "+currento.date[1]+" "+currento.date[2]+'</p>'+
                                        '<p class="map-outbreak-name col-xs-9 col-sm-9 col-md-7 col-lg-7">'+currento.title+'</p>'+
                                    '</div>';
            $(targetid).append(outbreakDetails);
            var descrBtnID = '#recent-outbreaks-'+i+'-'+j;
            $(descrBtnID).click(goToDescription);
        }

        //handle dropdown button
        var dropdownBtnID = '#outbreaklist-drop'+i
        $(dropdownBtnID).click(dropdownHandler);
        //trigger click so it's closed
        $(dropdownBtnID).trigger('click');
    }//end if             
}
            //Initialise highmaps to display a worldmap
            var chart = Highcharts.mapChart(container, {
                chart : {
                    borderWidth : 0
                },
                title : {
                    text : null
                },
                mapNavigation: {
                    enabled: true
                },
                legend: {
                    enabled:false
                },

                colorAxis: {
                dataClasses: [
                   {
                    to: -1,
                    color: "rgb(244, 249, 255)"
                }, {
                    from: 0,
                    to: 1,
                    color: 'rgb(158, 255, 147)'
                }, { 
                  from: 1,
                  to: 3,
                  color: 'rgb(205, 242, 111)'
                }, {
                    from: 3,
                    to: 5,
                    color: 'rgb(237, 228, 113)'
                }, {
                    from: 5,
                    to: 8,
                    color: 'rgb(239, 226, 52)'
                }, {
                    from: 8,
                    to: 10,
                    color: 'rgb(239, 176, 51)'
                }, {
                    from: 10,
                    to: 13,
                    color: 'rgb(239, 88, 50)'
                },{
                    from: 13,
                    color: 'rgb(239, 43, 43)'
                }]
            },
              
                series : [{
                    data : datax,
                    mapData: Highcharts.maps['custom/world'],
                    joinBy: ['iso-a2', 'code'],
                        formatter: function () {
                            if (this.point.value>0) {
                                    return this.point.name;
                            }
                         },
                    states: {
                        hover: {}//color on hover
                    },
                    //show country names
                    dataLabels: {
                        enabled: true,
                        format:'{point.name}', 
                        style: {
                            fontWeight: 'italic',
                            fontSize: '12px',
                            textShadow: '0px 1px 2px black ',
                            color: 'white',
                            textOutline: null
                        }           
                    },
                    tooltip: {
                        name: '',
                        valueSuffix: ' outbreaks found',
                        hideDelay: 1,
                        followPointer: true
                    }
                }],

            plotOptions: {
            series: {
                events: {
                    //when country is clicked - pop up window with details
                    click: function (e) {
                        var countryname = String()+e.point.name.toLowerCase();  
                        countryname.split(" ");
                        var carr = countryname.split(" ");
                        
                        var targetclass = String () +'.highcharts-name-'+carr.join("-");
                        //select element containing data about the country
                        var targetelement = $('.map').find(targetclass);

                        if($('.map').find('#countryModal')){
                            $("#countryModal").remove();
                        }

                        //Bootstrap Modal - pop up window
                        var modal = String() +
                                    '<div class="modal fade" id="countryModal" role="dialog">'+
                                        '<div class="modal-dialog">'+
                                        '<!-- Modal content-->'+
                                            '<div class="modal-content">'+
                                                '<div class="modal-header">'+
                                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                                    '<h4 class="modal-title">'+e.point.name+': '+e.point.value+' outbreaks found</h4>'+
                                                '</div>'+
        
                                                '<div class="modal-body">'+
                                                    //dates and names of outbreaks are added in a loop below
                                                '</div>'+

                                                '<div class="modal-footer">'+
                                                    '<button type="button" class="btn btn-default newSearch">New Search for: '+e.point.name+'</button>'+
                                                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                        $('.map').append(modal);

                        var countries = Object.keys(neighOutbreaks);
                        var outbreaks = neighOutbreaks[e.point.name];
                        //console.log('Clicked: '+ e.point.name);
                        
                        var outbreakKeys = Object.keys(outbreaks);
                        //console.log('Found: '+outbreakKeys.length);

                        for (j = 0; j < outbreakKeys.length; j++){
                            var current = neighOutbreaks[e.point.name][outbreakKeys[j]];
                            var nname = e.point.name.split(" ");
                            var outbreakDetails = String()+
                                    '<div class="map-outbreak"'+'id="modal-entry'+nname.join("-")+'_'+j+'">'+
                                        '<p class="map-outbreak-date">Date: '+current.date[0]+" "+current.date[1]+" "+current.date[2]+'</p>'+
                                        '<p class="map-outbreak-name">'+current.title+'</p>'+
                                    '</div>';

                            $($(".modal-body")).append(outbreakDetails);

                            var descrBtnID = '#modal-entry'+nname.join("-")+'_'+j;
                            $(descrBtnID).click(showDescription);
                        }//end for

                        var newSearchBtnID = '.newSearch';
                        $(newSearchBtnID).click(searchFromMap);
                        targetelement.attr('data-toggle', 'modal');
                        targetelement.attr('data-target', '#countryModal');

                        $('body').removeClass('modal-open');
                        $('body').css('padding-right','');
                    }
                }
            }
        }
        });

            chart.series[0].name="";//remove series name
            var containerDiv = String() + '#' + container;
            var mapChart = $(containerDiv).highcharts(); 
            //if abbr not null (meaning one country was chosen - results page)
            if(!(abbr===null||Number.isInteger(abbr))){
                mapChart.get(abbr).zoomTo(); 
                mapChart.mapZoom(5); 
            }
            //else recent outbreaks map page, no specific country was chosen, so no zoom
    };
    return{initWorldmap:initWorldmap};
}());

//Initialize search page as a starting page
$(function() {
	search.initSearch($('#spa-search'));
});

//Initialize datepicker
$( function() {
    $('#datepicker').datepicker({
        autoclose: true,
        todayBtn: false,
        todayHighlight: true,
        format: 'dd/mm/yyyy'
	});
});
(jQuery);