var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var util = require('util');
var moment = require('moment');
var app = express();

//boy-parser, used for post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the port to run on
app.set('port', 5000);
app.use(express.static(path.join(__dirname, 'public')));
// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Listening on port:  ' + port);
});

//node-crone - task scheduler, runs every day at 11:59:59 PM UTC+00:00
//Scheduler. Resource: https://github.com/kelektiv/node-cron
var CronJob = require('cron').CronJob;
var runCrawler = new CronJob({
  cronTime: '25 21 11 * * 1-7',//'59 59 23 * * 1-7',
  onTick: function() {
     	var child_process = require('child_process');
		console.log("Execute python");

		//do the same for every website or specify them in array/json string and for-loop
		/*child_process.execSync('python PCcrawler.py wwwnc.cdc.gov/travel/notices https://wwwnc.cdc.gov/travel/notices 100',{cwd: './PCcrawler/'}, function (err){
   	 		if (err){
   	 			console.log(err);
    			console.log("child processes failed with error code: " + err.code);
   	 		}
		});*/

	 	/*child_process.execSync('python PCcrawler.py www.who.int http://www.who.int/csr/don/archive/country/en/ 100',{cwd: './PCcrawler/'}, function (err){
   	 		if (err){
   	 			console.log(err);
    			console.log("child processes failed with error code: " + err.code);
   	 		}
		});*/
		child_process.execSync('python PCcrawler.py promedmail.org/post http://www.promedmail.org 200',{cwd: './PCcrawler/'}, function (err){
   	 		if (err){
   	 			console.log(err);
    			console.log("child processes failed with error code: " + err.code);
   	 		}
		});
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

		//Sarch for recent outbreaks in each country and store them on the server
		//1 day, one week, two weeks, one month
		entry = {//used to represent an entry (date and country)+range added later
			date: null,
			country: null,
		},

		ranges = [1, 7, 14, 31];

		for(var r = 0; r<ranges.length; r++){

			entriesList = [];
			k = [];

			for(var i = 0;i<countries.length;i++){
				var newEntry = Object.create(entry);
				newEntry.country = countries[i];
				newEntry.date = moment(Date.now()).format('DD/MM/YYYY');
				newEntry.range = ranges[r];
				entriesList.push(newEntry);
			}
			//console.log(entriesList);

			var e = findPossibleEntries(entriesList);
  			var outbreaksList = findOutbreaks(e, k);

  			var fs = require('fs');
			fs.writeFile("mapdata/mapdata"+ranges[r]+".txt", JSON.stringify(outbreaksList), function(err) {
    		if(err) {
        		return console.log(err);
    		}
    		console.log("The file was saved");
			}); 
  	
  			var newmap = [];
			var keys = Object.keys(outbreaksList);

			var mapobj = JSON.parse(fs.readFileSync('mapdata/map.json', 'utf8'));
			//console.log(mapobj);

			for (var i in keys) {
  				val = keys[i];
  				//console.log(val);
  				for(q = 0; q< mapobj.length; q++){
					//console.log(mapobj[q].name);
					if(mapobj[q].name===val){
						//find number of outbreks for main country and assign value
						var noOutbreaks = Object.keys(outbreaksList[val]).length;
						mapobj[q].value = noOutbreaks;
					}
				}
			}

			fs.writeFile("mapdata/mapvalues"+ranges[r]+".txt", JSON.stringify(mapobj), function(err) {
    		if(err) {
        		return console.log(err);
    		}
    		console.log("The file was saved");
			});
	}

  },
  start: false, // Start the job right now 
  timeZone: 'Europe/London'
});
runCrawler.start();

//Return data of recent outbreaks for one day, one week, two weeks, one month
app.post('/worldmap',function(req, res){
	var data = req.body;
	data = Object.keys(data);

	var filenameData = 'mapdata/mapdata'+data[0]+'.txt';
	var filanameValues = 'mapdata/mapvalues'+data[0]+'.txt';

	var mapobj = JSON.parse(fs.readFileSync(filenameData, 'utf8'));
	var mapval = JSON.parse(fs.readFileSync(filanameValues, 'utf8'));

	res.send([JSON.stringify(mapobj), JSON.stringify(mapval)]);
});

//Accept post request with search entries from client, process the data and 
//return to client
//Returns three files: data for map, outbreaks for selected countries and data for coutries
app.post('/resultsPage', function(req, res){
	var data = req.body.name.split('#');

	var keywords = JSON.parse(data[1]);
	var parsed = JSON.parse(data[0]);

	var arr = [];
	for(var x in parsed){
  		arr.push(parsed[x]);
	}
	console.log(arr);

  	var k = [];
	for(var x in keywords){
  		k.push(keywords[x]);
	}

	var e = findPossibleEntries(arr);

	//find outbreaks
  	var outbreaksList = findOutbreaks(e, k);
  	
  	var newmap = [];
	var keys = Object.keys(outbreaksList);

	//Map.json contains a base used for displaying a map
	//By default a number of outbreaks for each country is set to null
	//Note! The user cannot interact with a country (on the map) from results page if a value is set to null
	var mapobj = JSON.parse(fs.readFileSync('mapdata/map.json', 'utf8'));


	//Find neighbour countries
	var newdata = [];
	for (var i in keys) {
  		val = keys[i];
  		//console.log(val);
  		for(q = 0; q< mapobj.length; q++){
			//console.log(mapobj[q].name);
			if(mapobj[q].name===val){
				//find number of outbreks for main country and assign value
				var noOutbreaks = Object.keys(outbreaksList[val]).length;
				mapobj[q].value = noOutbreaks;
				//find abbreviations of neighbour countries
				var neighbourCountries = mapobj[q].neighbours;
				//console.log(neighbourCountries);

				//for each neighbour country
				for(w = 0; w< neighbourCountries.length; w++){
					//console.log(w);
					var currNeighbour = neighbourCountries[w].toUpperCase();
					for(p = 0; p< mapobj.length; p++){
						if(mapobj[p].code===currNeighbour){
							var name = mapobj[p].name;
							
							newdata.push({country:name,date:arr[0].date,range:arr[0].range});
							//console.log(newdata);
							break;
						}
					}
				}
			}
		}
	}

	var neighOutbreaks = findPossibleEntries(newdata);
	//Find outbreaks for neighbour countries
  	var neighOutbrList = findOutbreaks(neighOutbreaks, "nokeywords");

	var nkeys = Object.keys(neighOutbrList);

	for (var j in nkeys) {
  		value = nkeys[j];
  		//console.log(value);
		for(k = 0; k< mapobj.length; k++){
			if(mapobj[k].name===value){
				var nuOutbreaks = Object.keys(neighOutbrList[value]).length;
				mapobj[k].value = nuOutbreaks;
				//console.log(mapobj[k].value);
				break;
			}
		}
	}  	
  	res.send([JSON.stringify(outbreaksList),JSON.stringify(mapobj),JSON.stringify(Object.assign(outbreaksList, neighOutbrList))]);
});

//store different values for months e.g. January can be represented as Jan, January or 01
var months = [];
months['01'] = ['01', 'Jan', 'January']; months['02'] = ['02', 'Feb', 'February']; months['03'] = ['03', 'Mar', 'March'];
months['04'] = ['04', 'Apr', 'April'];   months['05'] = ['05', 'May'];             months['06'] = ['06', 'Jun', 'June'];
months['07'] = ['07', 'Jul', 'July'];    months['08'] = ['08', 'Aug', 'August'];   months['09'] = ['09', 'Sept', 'September'];
months['10'] = ['10', 'Oct', 'October']; months['11'] = ['11', 'Nov', 'November']; months['12'] = ['12', 'Dec', 'December'];

var findPossibleEntries = function(entries){
	var newCountryDates = [];
	for(i = 0; i< entries.length; i++){
		d = entries[i].date.split("/");
		nd = d[2]+"-"+d[1]+"-"+d[0];
		drange = rangeBetweenDays(nd, entries[i].range);
		newCountryDates.push({country: entries[i].country, dates: drange});
	}
	return newCountryDates;
};

//function to find the range of dates 
//Source: http://momentjs.com
var rangeBetweenDays = function(start, range){
	var day = moment(start);
	var lastday = moment(day).subtract(range, 'days');

	var dates1 = [];
	dates1.push(day.format("DD/MM/YYYY"));//first day
		while(day.subtract(1, 'days').diff(lastday) > 0) {
        	dates1.push(day.format("DD/MM/YYYY"));
    	}
	dates1.push(day.format("DD/MM/YYYY"));//last day
	return dates1;
};

var findMatchingKeywords = function(keywords, id){
	var postings1 = JSON.parse(fs.readFileSync('PCcrawler/data/postings1.txt', 'utf8'));						
	var vocab1 = JSON.parse(fs.readFileSync('PCcrawler/data/vocab1.txt', 'utf8'));

	keywordsMatched = [];
	//for each keyword 
	for(k = 0; k < keywords.length; k++){
		var kID = vocab1.indexOf(keywords[k]);
		//console.log(kID);
		if(kID>-1){//if keyword is inside the vocabulary
			var keys = Object.keys(postings1[kID]);
			for(p = 0; p < keys.length; p++){
				if(keys[p]===id){
					keywordsMatched.push(keywords[k]);
					break;
				}
			}
		}
	}
	return keywordsMatched;
};

//some countries might be mentioned differently (in the postings)
//for example: United States of America/United States or United Republic of Tanzania/Tanzania
//so there's a list of 'alternative' names which have to be checked for some countries
//to make sure some of the postings are not left out
var findAltNames = function(country){

	var altnames = {'United States of America':['United States of America', 'United States'],
					'United Republic of Tanzania':['United Republic of Tanzania','Tanzania'],
					'United Arab Emirates':['UAE', 'United Arab Emirates'],
					'Unted Kingdom':['United Kingdom', 'England', 'Scotland', 'Northern Ireland', 'Wales'],
						'Republic of Serbia':['Serbia', 'Republic of Serbia'],
					'Democratic Republic of the Congo':['Democratic Republic of the Congo', 'DR Congo']
					};

	var altcountries = Object.keys(altnames);
	if(altcountries.indexOf(country) > -1){
		alternatives = altnames[country];
	}else{
		alternatives = [country];
	}

	return alternatives;
};

//check all dates for this country and find all posible dates by checking the vocabulary
var findPossibleDates = function(entries){
	var vocab1 = JSON.parse(fs.readFileSync('PCcrawler/data/vocab1.txt', 'utf8'));
	
	var possibledates = [];
	for(i = 0; i < entries.dates.length; i++){
		date = entries.dates[i];
		dayMonthYear = date.split("/");//split the date into day-[0], month[1], year[2]
		monthVariations = months[dayMonthYear[1]];//three possibilities for month e.g. 01, Jan, January

		//console.log(dayMonthYear);
		for(m = 0; m < monthVariations.length; m++){
			var dateFound = [dayMonthYear[0], monthVariations[m], dayMonthYear[2]];
			if(vocab1.indexOf(dayMonthYear[0]) > -1 && vocab1.indexOf(monthVariations[m]) > -1 && vocab1.indexOf(dayMonthYear[2]) > -1){
				possibledates.push(dateFound);
				//console.log("possible outbreak for this date: " + dateFound);
			}
		}//end for month variations
	}//end for dates

	return possibledates;
};

//find ids of documents that contain this country
var checkCountryPostings = function(splitcountry){
	var postings1 = JSON.parse(fs.readFileSync('PCcrawler/data/postings1.txt', 'utf8'));						
	var vocab1 = JSON.parse(fs.readFileSync('PCcrawler/data/vocab1.txt', 'utf8'));
	
	var countryPostings = [];

	var wordsIndex = [];//indeces for each part of the country name
	for(i in splitcountry){
		word = splitcountry[i]
		wordsIndex.push(vocab1.indexOf(word));
	}

	var wordsPostings = [];//contains ids of documents that contain the words
	for(w = 0; w < wordsIndex.length; w++){
		var ids = [];
		for(var post in postings1[wordsIndex[w]]){
			ids.push(post);
		}
		wordsPostings.push(ids);
	}

	//if id is present in postings for each word (part of the country name), then this document contains the whole country name
	var ids = wordsPostings[0];
	var isFound = 1;
	for(i in ids){//for each id
		var currId = ids[i];
		for(q in wordsPostings){
			wordOccurences = wordsPostings[q];

			if(wordOccurences.indexOf(currId) >-1){
				isFound = 1;//found
			}
			else{
				isFound = 0;//not found
				break;
			}
		}
		if(isFound === 1)
			countryPostings.push(currId);
	}
	//console.log("Country posts:   " + countryPostings);
	return countryPostings;
};

//extra check if country is in dictionary
var isCountryInDictionary = function(splitcountry){
	var vocab1 = JSON.parse(fs.readFileSync('PCcrawler/data/vocab1.txt', 'utf8'));

	var isPresent = 1//true - found in the vocab
	for(word in splitcountry){
		if (vocab1.indexOf(splitcountry[word]) > -1){
			isPresent = 1;//found
		}
		else {
			isPresent = 0//not found
		}
	}
	return isPresent;
};

var findOutbreaks = function(entries, keywords){
	var docids1 = JSON.parse(fs.readFileSync('PCcrawler/data/docids1.txt', 'utf8'));
	var postings1 = JSON.parse(fs.readFileSync('PCcrawler/data/postings1.txt', 'utf8'));						
	var vocab1 = JSON.parse(fs.readFileSync('PCcrawler/data/vocab1.txt', 'utf8'));
	var summary1 = JSON.parse(fs.readFileSync('PCcrawler/data/fsummary1.txt', 'utf8'));
	var outbreaksFound = {};

	for (j = 0; j < entries.length; j++){
			var c = entries[j].country;
			outbreaksFound[c] = {};

			var altCountryNames = findAltNames(c);

			for(var a = 0; a<altCountryNames.length; a++){
				//some countries are composite (United Kingdom, United Arab Emirates)
				//need to split because they are stored as separate words in the vocabulary
				var csplit = altCountryNames[a].split(' ');

				//if the country is indeed in the dictionary
				if(isCountryInDictionary(csplit) === 1){
					console.log(c);

					//check all dates for this country and find all posible dates by checking the vocabulary
					var possibleDates = findPossibleDates(entries[j]);

					//if any possible dates for outbreaks were found in the vocab
					if(possibleDates.length > 0){

							//find ids of documents that contain this country
							var countryPostings = checkCountryPostings(csplit);

							//for each possible date
							for(d in possibleDates){
								datePostings = [];

								var pDate = possibleDates[d];
								//console.log(pDate);
								var dmyIndex = [vocab1.indexOf(pDate[0]), vocab1.indexOf(pDate[1]), vocab1.indexOf(pDate[2])];

								//find postings for dayMonthYear for this date
								var dmyPostings = [[],[],[]];
								for(w = 0; w < 3; w++){						
									for(var post in postings1[dmyIndex[w]]){
										dmyPostings[w].push(post);
									}
								}
								//console.log("Date postings: "+ dmyPostings);

								for(i in dmyPostings[0]){
									var curDateId = dmyPostings[0][i];
									if(dmyPostings[1].indexOf(curDateId)>-1 && dmyPostings[1].indexOf(curDateId)>-1){
										datePostings.push(curDateId);
									}
								}
								//console.log(datePostings);

								for(i in countryPostings){
									var docid = countryPostings[i];
									var excludedDocids = ['who.int/en/', 'who.int/csr/disease/ebola/en/', 'wwwnc.cdc.gov/travel/notices',
														  'who.int/csr/en/'];

									//docids1[docid].match(/who\.int\/csr\/don\/archive\/country\/...\/en/)

									//exclude if contains who and does not have pattern - www.who.int/csr/don 
									
									if((excludedDocids.indexOf(docids1[docid]) == -1 ) && (!docids1[docid].match(/who\.int\/csr\/don\/archive\/country\/...\/en/))){
										if(datePostings.indexOf(docid)>-1){
											//we want to get only if of the documents if they contain the country name as least 2 times
											var occurences = 1;//true - number of occurences more that one
											for(word in csplit){
												var curWord = csplit[word];
												if(postings1[vocab1.indexOf(curWord)][docid]>1){
													occurences = 1;
												}
												else {
													occurences = 0;
												}
											}

											if(occurences > 0){
													//check if the date found is indeed a string that exists
												for(x = 0; x < summary1[docid].dates.length; x++){
													//console.log(pDate);
													var currentPost = summary1[docid].dates[x];

													var summary2 = summary1[docid].sentences;

													if (currentPost.includes(pDate[0]+" "+pDate[1]+" "+pDate[2])){
														if(!(docid in outbreaksFound[c])){
															//console.log(pDate);												
															outbreaksFound[c][docid]=({title : summary1[docid].title, date : pDate, url : docids1[docid], summary : summary2, keywordsMatched:findMatchingKeywords(keywords, docid)});
														} 
													}
													if(currentPost.includes(pDate[1]+" "+pDate[0]+" "+pDate[2])){										
														if(!(docid in outbreaksFound[c])){
															//console.log(pDate);
															outbreaksFound[c][docid]=({title : summary1[docid].title, date : pDate, url : docids1[docid], summary : summary2, keywordsMatched:findMatchingKeywords(keywords, docid)});
														}
													}
												}//end for
											}//end if occurence is more that 1

										}//end if not in the date postings
									}//end if not in excluded documents

								}//end for country postings

							}//end for each possible date
						}//end if any possible date found
				}//end if country is present in the vocab

		}//end for alt names
	}//end for each country
	return outbreaksFound;
};


/*if(docids1[docid].match(/who\.int\/entity\/csr\/don\/archive\/country\/...\/en/)){
		console.log('whaaaaaaaaat');
		console.log(docids1[docid]);
}*/