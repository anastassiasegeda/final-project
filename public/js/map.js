function doMap(ba, abbr){           

var datax = JSON.parse(localStorage.getItem('worldData'));
            // Initiate the chart
            var chart = Highcharts.mapChart(ba, {
                chart : {
                    borderWidth : 1,
                    backgroundColor: '#f7f7f7'
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
                    { to:0,
                     color:"#337AB7"},

                    {
                        from: 0,
                        to: 1000,
                        color: "red"
                    }]
                },
                series : [{
                    data : datax,
                    mapData: Highcharts.maps['custom/world'],
                    joinBy: ['iso-a2', 'code'],
                    //animation: true,
                    //name: 'Number of outbreaks',
                                    formatter: function () {
                                    if (this.point.value>0) {
                                            return this.point.name;
                                        }
                         },
                    states: {
                        hover: {
                            color: '#5BC0DE'
                        }
                    },
                    //show country names
                    dataLabels: {
                        enabled: true,
                        format:'{point.name}', 
                        style: {
                            fontWeight: 'italic',
                            fontSize: '12px',
                            //textShadow: false,
                            textShadow: '0px 1px 2px black ',
                            color: 'white',
                            textOutline: null
                        }           
                    },
                    tooltip: {
                        name: 'Number of outbreaks',
                        valueSuffix: ' outbreaks found',
                        formatter: function () {
                                    if (this.point.value) {
                                            return this.point.name;
                                        }
                         }
                    }
                }]
            });
            var heh = String() + '#' + ba;
            console.log(abbr);

            for(i = 0; i< datax.length; i++){
            var str1 = datax[i].code;

                if(str1===abbr){
                    console.log(str1);
                    console.log(datax[i].neighbours);
                    break;
                }
            }
            var mapChart = $(heh).highcharts(); 
            mapChart.get(abbr).zoomTo(); 
            mapChart.mapZoom(5);    
};