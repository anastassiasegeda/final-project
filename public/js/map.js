//Manage/initialize information page
/*var worldmaprecent = (function(){
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
           
            var outbreaks = Object.keys(neighOutbreaks[countryname]);

            //console.log(outbreaks);
            var outbrk = neighOutbreaks[countryname][outbreaks[outid[1]]];
            //console.log(outbrk);
            $('body').removeClass('modal-open');
            $('body').css('padding-right','');

            var elementExists = document.getElementById("spa-results");
            var prevpage = null;
            if(elementExists===null){
                prevpage = 'worldmap';
            }
            else{
                prevpage = 'resultspage'
            };
            $('.form-control').css('width', '')
            description.initDescription(outbrk, prevpage);//initialize description page
    };

    //Hide/show dropown
    dropdownHandler = function(event){
        //hide map and animate div
        $(this).toggleClass('down');
        $(this).parent().parent().parent().parent().nextAll().slideToggle(400);
    };

    //Open description page for the outbreak (list)
    goToDescription = function(event){
            var ids = String()+$(this).attr('id');//get id of the outbreak container
            ids = ids.split('outbreaks-');
            var outid = ids[1].split('-');

            //depending on what range is chosen - extract details
            var name = $("#dropdownRange").text();
            switch(name.toLowerCase()) {
                case "one day":
                    var resultsObject = JSON.parse(localStorage.getItem('mapdata'+1));
                break;
                case "one week":
                    var resultsObject = JSON.parse(localStorage.getItem('mapdata'+7));
                break;
                case "two weeks":
                    var resultsObject = JSON.parse(localStorage.getItem('mapdata'+14));
                break;
                case "one month":
                    var resultsObject = JSON.parse(localStorage.getItem('mapdata'+31));
                break;
            }//end cwitch

            var countries = Object.keys(resultsObject);
            var outbreaks = Object.keys(resultsObject[countries[outid[0]]]);
            var outbrk = resultsObject[countries[outid[0]]][outbreaks[outid[1]]];
            description.initDescription(outbrk, 'worldmap');//initialize description page, parse outbreak object
    };


initWorldmap = function(container, abbr){           

//if abbr is number - then the request was made from recent map page
if(Number.isInteger(abbr)){
    var datax = JSON.parse(localStorage.getItem('mapval'+abbr));
    var neighOutbreaks = JSON.parse(localStorage.getItem('mapdata'+abbr));
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

        var cheader = String()+  '<div class="spa-outbreaks-dropdown" id="recent-outbreaks-'+currentc+'">'+
                                                        '<div class="container">'+
                                                            '<div class="spa-outbreaks-countrydetails row" id="recent-entry'+i+'">'+
                                                                '<div class="col-sm-2 col-md-2"></div>'+
                                                                '<p class="spa-outbreaks-countryname col-xs-3 col-sm-3 col-md-3">'+currentc+'</p>'+
                                                                '<p class="spa-outbreaks-found col-xs-7 col-sm-5 col-md-5">'+outbreaks.length+' outbreaks found</p>'+

                                                                '<div class="spa-results-dropbtn col-xs-1 col-sm-1 col-md-1" aria-hidden="true">'+
                                                                    '<span><i class="fa fa-chevron-up spa-results-dropbtn" id="outbreaklist-drop'+i+'"></i></span>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                '</div>';
        $('#recent-outbreaks-list').append(cheader);

        var targetid = String()+'#recent-outbreaks-'+currentc;
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

        //HANDLE DROPDOWN
        //Dropdownhandler!!!
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
                colors: ['rgb(244, 249, 255)', 'rgb(158, 255, 147)', 'rgb(205, 242, 111)',
                'rgb(237, 228, 113)', 'rgb(239, 226, 52)', 'rgb(239, 176, 51)', 'rgb(239, 88, 50)'],

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
                        var outbreakKeys = Object.keys(outbreaks);

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
        },
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

}());*/
