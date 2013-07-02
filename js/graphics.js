


var width = 960;
var height = 500;
var pi = Math.PI;
var timer;
var items = [];
var cur_index = 0;
var max_index = 0;
var tickTime = 10;
var ropeX = 120;
var ropeY = 300;



var x = d3.scale.linear()
        .domain([0, 200])
        .range([1, 600]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var usdRect = svg.append("rect")
    .attr("class", "usdRect")
    .attr("x", ropeX)
    .attr("y", ropeY)
    .attr("height", 2)
    .attr("width", 650)
    .attr("fill", "white");

var bitRect = svg.append("rect")
    .attr("class", "bitRect")
    .attr("x", ropeX)
    .attr("y", ropeY-5)
    .attr("height", 15)
    .attr("width", 3)
    .attr("fill", "yellow");

var text = svg.append("text")
    .attr("class","text")
    .attr("x", 300)
    .attr("y", 300)
    .attr("font-size", "20px")
    .text("");

var num = svg.append("text")
    .attr("class","text")
    .attr("x", 100)
    .attr("y", 50)
    .attr("font-size", "20px")
    .text("");

var bitImge = svg.append("svg:image")
      .attr("xlink:href", "images/b5.png")
      .attr("x", 20)
      .attr("y", 60)
      .attr("width", "150")
      .attr("height", "200");

var usdImge = svg.append("svg:image")
      .attr("xlink:href", "images/u5.png")
      .attr("x", 730)
      .attr("y", 60)
      .attr("width", "150")
      .attr("height", "200");

var ropeImage = svg.append("g")
      //.attr("class","rope")
      //.attr(translate,"transform(50,50)")
      .attr("width",600)
      .attr("height",20);


$.getJSON("usd.json", function(data){

  $.each(data, function(key, val) 
  {
    items.push(val);
  });

})
.done(function() { init(); })


function init()
{
  max_index = items.length-1;
  start();

}

function changeRec()
{
  var size = items[cur_index].open;
  var title = items[cur_index].date;
  bitRect 
    .transition()
    .duration(tickTime)
    .attr("x", function(){return ropeX+5+x(size)});
    
  text
    .transition()
    .duration(tickTime)
    .text(function(){return title});

  num
    .transition()
    .duration(tickTime)
    .text(function(){return size});

  var rand_numb = Math.round(Math.random() * (3 - 1))+1;
  var rand_numu = 4 - rand_numb;
  if(cur_index % 20 == 0)
  { 
    bitImge
      .attr("xlink:href", "images/b"+ rand_numb +".png");
   
    usdImge
      .attr("xlink:href", "images/u"+ rand_numu +".png");
  }


}

function start() 
{

    changeRec();
    if(cur_index < max_index)
    {
      timer = setTimeout(start, tickTime); 
    }
    else
    {
      stop();
    }
    cur_index++;      
};

function stop() {

};




/*console.log(data);
for (var i = 0; i < data.length - 1;  i++) 
  {
    console.log(data[i]);


    bitRect 
    .transition()
    .duration(1000)
    .delay(100)  
    .attr("width", function(){return data[i].high*10});


    text
    .transition()
    .duration(1000)
    .delay(100)  
    .text(function(){return data[i].date});

  };*/



//kipod code
/*var theData = []
for (var i = 0; i<3500; i++)
   theData[i] = i;

var ang = 360 / theData.length;
console.log(theData);

var arc = d3.svg.arc()
    .startAngle(function(i) { return (i*ang)* (pi/180); })
    .endAngle(function(i) { return ((i*ang)+0.1)* (pi/180); })
    .innerRadius(function(i) { return 10; })
    .outerRadius(function(i) { return 250+Math.round(Math.random() * 100); })


var p = svg.selectAll("p")
  .data(theData)
  .enter()
  .append("path")
  .attr("class","p")
  .attr("d",arc)
  .attr("transform", "translate(500,400)")
  .style("fill", function(){return get_random_color();});*/

