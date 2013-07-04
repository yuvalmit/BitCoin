


var width = 960;
var height = 500;
var pi = Math.PI;
var timer;
var items = [];
var cur_index = 0;
var max_index = 0;
var tickTime = 100;
var ropeX = 180;
var ropeY = 300;
var pauseIndex = 0;
var lastValue = 0;
var curValue = 0;
var bitImgNum = 1;
var usdImgNum = 1;



//scale def
var s = d3.scale.linear()
        .domain([200, 0])
        .range([1, 600]);
//svg
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
//scale drawing
var axis = d3.svg.axis()
        .scale(s)
        .tickSize(14);

var usdRect = svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + ropeX + "," + ropeY + ")")
      .call(axis.ticks(20));


// yellow line indicate value
var bitRect = svg.append("rect")
    .attr("class", "bitRect")
    .attr("x", ropeX-115)
    .attr("y", ropeY-5)
    .attr("height", 15)
    .attr("width", 3)
    .attr("fill", "yellow");
//the text filed of the date
var text = svg.append("text")
    .attr("class","text")
    .attr("x", 400)
    .attr("y", 50)
    .attr("font-size", "20px")
    .attr("fill","white")
    .text("");
//the value of the current day
var num = svg.append("text")
    .attr("class","text")
    .attr("x", ropeX)
    .attr("y", ropeY +70)
    .attr("font-size", "20px")
    .attr("fill","white")
    .text("");

//bitcoin guy
var bitImge = svg.append("svg:image")
      .attr("xlink:href", "images/b1.png")
      .attr("x", ropeX-145)
      .attr("y", ropeY-195)
      .attr("width", "150")
      .attr("height", "200");
//dollar guy
var usdImge = svg.append("svg:image")
      .attr("xlink:href", "images/u1.png")
      .attr("x", ropeX+600)
      .attr("y", ropeY-205)
      .attr("width", "150")
      .attr("height", "200");
//ptrren of the rope
var ropeImage = svg.append("svg:pattern")
      .attr("id","pat")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 10)
      .attr("patternUnits", "userSpaceOnUse")
      .append("svg:image")
      .attr("xlink:href", "images/rope.png")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 10);
//the rope      
var ropeRec = svg.append("rect")
      .attr("x",ropeX-30)
      .attr("y",ropeY-80)
      .attr("width",670)
      .attr("height",9)
      .attr("fill","url(#pat)")
      .attr("class","rope");

//star image in the middle of the rope
var starImg = svg.append("svg:image")
      .attr("xlink:href", "images/star.png")
      .attr("x", ropeX+580)
      .attr("y", ropeY-90)
      .attr("width", "30")
      .attr("height", "30");


$.getJSON("usd.json", function(data){

  $.each(data, function(key, val) 
  {
    items.push(val);
  });

})
.done(function() { init(items.length-1,0); })


function init(startIndex, stopIndex)
{
  max_index = startIndex;
  cur_index = stopIndex;
  start();

}

function changeRec()
{
  var size = items[cur_index].open;
  var title = items[cur_index].date;
  bitRect 
    .transition()
    .duration(tickTime)
    .attr("x", function(){return ropeX-5+s(size)});
    
  text
    .transition()
    .duration(tickTime)
    .text(function(){return title});

  num
    .transition()
    .duration(tickTime)
    .attr("x", function(){return ropeX+5+s(size)})
    .text(function(){return size});

  starImg
    .transition()
    .duration(tickTime)
    .attr("x", function(){return ropeX-17+s(size)})
    .text(function(){return size});


  curValue = size;

  if(curValue > lastValue)
  {
    if(bitImgNum == 1)
      bitImgNum = 2;
    else
      bitImgNum--;

  }
  else
  {
    if(usdImgNum == 1)
      usdImgNum = 2;
    else
      usdImgNum--;
  }

  if(cur_index % 2 == 0)
  { 
    bitImge
      .attr("xlink:href", "images/b"+ bitImgNum +".png");
   
    usdImge
      .attr("xlink:href", "images/u"+ usdImgNum +".png");

  }

  lastValue = size;


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


function play(){
  init(items.length-1,pauseIndex);
}

function pause(){
  clearTimeout(timer);
  pauseIndex = cur_index;
}

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

