window.onload = function() {

  //DECLARE VARIABLES
  var shadowVert, shadowHorz;

  //GET NODE PLUS INFO
  var box = document.getElementById("box");
  var boxInfo = box.getBoundingClientRect();

  // FIND CENTER OF OBJECT
  var boxMidY = boxInfo.top + (boxInfo.height/2);
  var boxMidX = boxInfo.left + (boxInfo.width/2);

  //GET WINDOW INFO
  var WindowW = window.innerWidth;
  var WindowH = window.innerHeight;



  var Px = boxInfo.width / 200;

  document.addEventListener('click', position);

  function position(e){

    //USING THE MOUSE POSITION TO DETERMINE THE SHADOW HORIZONTAL AND VERTICAL POSITION

  	shadowVert = (boxMidY - e.clientY) * Px;
  	shadowHorz = (boxMidX - e.clientX) * Px;
    if(shadowVert < -200){
      shadowVert = -200;
    };
    if(shadowVert > 200){
      shadowVert = 200;
    };
    if(shadowHorz < -200){
      shadowHorz = -200;
    };
    if(shadowHorz > 200){
      shadowHorz = 200;
    };

  	box.style.boxShadow =  shadowHorz + 'px ' +  shadowVert + 'px 25px #888888';
  };

};
