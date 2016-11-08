window.onload = function() {

  //function factory
  let shadow = function( element, info ) {

      let state = {
        middleY: info.top + ( info.height/2 ),
        middleX: info.left + ( info.width/2 ),
      }

      return {
        consoley: function() {
          console.log(state);
        }
      }

  }//END function factory

  let shadowElements = []
  // Get all nodes by Class name 'shadow'
  let elements = document.getElementsByClassName( 'shadow' );
  //Loop through node array
  Array.prototype.forEach.call(elements, function( element, index ) {
    // Get getBoundingClientRect INFO

    let info = element.getBoundingClientRect()
    // Create new object
    let newShadow = shadow( element,info )
    //Push into array
    shadowElements.push(newShadow) 

  })

  console.log(shadowElements)
  console.log(shadowElements[0].consoley())



};

  ////////////OLD///////////////

/*
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

  document.addEventListener("click", position);

  function position(e){

    //USING THE MOUSE POSITION TO DETERMINE THE SHADOW HORIZONTAL AND VERTICAL POSITION
    console.log('yep');
  	shadowVert = (boxMidY - e.clientY) * Px;
  	shadowHorz = (boxMidX - e.clientX) * Px;
    console.log(shadowVert + ' : ' + shadowHorz);
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
*/
