window.onload = function() {

  //Pub and Sub object///////////////////////////////////////////
  let pubSub = {
    events: {},

    on: function( eventName, fn ) {
      this.events[eventName] = this.events[eventName] || []
      this.events[eventName].push( fn )
    },

    off: function( eventName ) {
      if( this.events[eventName] ) {
        let eventLength = this.events.length;
        for( let i = 0; i < eventLength; i++ ) {
          this.events.splice( i,1 );
          break
        }
      }
    },

    emit: function( eventName, data ) {
      if( this.events[eventName] ) {
        this.events[eventName].forEach( function( fn ) {
          fn( data )
        })
      }
    }

  }; //End of Pub and Sub Object////////////////////////////////////

  //function factory
  let shadow = function( element, info ) {

    let state = {
      middleY: info.top + ( info.height/2 ),
      middleX: info.left + ( info.width/2 ),
      elemHeight: info.height,
      elemWidth: info.width
    }

    let newX, newY, blur

    function get_XY( m, b, b_WH ) {

      let xy
      console.log('m: ' + m);
      console.log('b: ' + b);

      if( ( m - b ) >= 200 ) {
        xy = 1 * ( b_WH * -0.75 )
      }else if ( ( m - b ) <= -200 ) {
        xy = 1 * ( b_WH * 0.75 )
      }else {
        xy = m < b ? ( ( b - m ) / 200 ) * ( b_WH * 0.55 ) : ( ( m - b ) / 200 ) * ( b_WH * -0.55 )
      }

      return xy

    }

    return {
      action: function(mouse) {
        newX = get_XY( mouse.x, state.middleX, state.elemWidth )
        newY = get_XY( mouse.y, state.middleY, state.elemHeight )

        console.log('y: ' + newY)

        element.style.boxShadow = newX + 'px ' + newY + 'px 50px 20px #666';
        //element.style.boxShadow = newX + 'px ' + newY + 'px BLUR px SPREAD #666';

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
    shadowElements.push( newShadow )
    console.log(index)
    pubSub.on( "mousePos", shadowElements[index].action );

  })


  //Track mouse movement and emit
  document.addEventListener("mousemove", mousePos)

  function mousePos(e) {
    let mouse = {
      x: e.clientX,
      y: e.clientY
    }
    pubSub.emit( "mousePos", mouse )
  }

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
