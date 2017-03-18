window.onload = function() {

  //PUB AND SUB OBJECT/////////////////////////////////////////////////////////////////////////////////////////////

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

  };

  //End of Pub and Sub Object/////////////////////////////////////////////////////////////////////////////////////////






  //SHADOW FUNCTION FACTORY//////////////////////////////////////////////////////////////////////////////////////////////

  let Shadow = function( element, EInfo ) {

    let state = {
      middleY: EInfo.top + ( EInfo.height/2 ),
      middleX: EInfo.left + ( EInfo.width/2 ),
      elemHeight: EInfo.height,
      elemWidth: EInfo.width,
      color: '666',
      blur: '10'
    }

    let newX, newY, blur

    function get_XY( m, b, b_WH ) {

      let xy
      /*
      if( ( m - b ) >= 200 ) {
        xy = 1 * ( b_WH * -0.75 )
      }else if ( ( m - b ) <= -200 ) {
        xy = 1 * ( b_WH * 0.75 )
      }else {
        xy = m < b ? ( ( b - m ) / 200 ) * ( b_WH * 0.55 ) : ( ( m - b ) / 200 ) * ( b_WH * -0.55 )
      }
      */

      if( ( m - b ) >= 200 ) {
        xy = -b_WH
      }else if ( ( m - b ) <= -200 ) {
        xy = b_WH
      }else {
        xy = m < b ? ( ( b - m ) / 200 ) * b_WH : ( ( m - b ) / 200 )
      }


      return xy

    }

    function render() {
      element.style.boxShadow = newX + 'px ' + newY + 'px ' + state.blur + 'px 20px #' + state.color;
      console.log('BS: ' + newX + 'px ' + newY + 'px ' + state.blur + 'px 0px #' + state.color);
      //element.style.boxShadow = newX + 'px ' + newY + 'px BLUR px SPREAD #666';
    }

    return {

      mousePos: function(mouse) {
        console.log('eee');
        newX = get_XY( mouse.x, state.middleX, state.elemWidth )
        newY = get_XY( mouse.y, state.middleY, state.elemHeight )
        render()
      },

      colorChange: function(color) {
      	state.color = color;
        render()
      },

      blurChange: function(blur) {
        state.blur = blur;
        render();
      }


    }

  }

  //END function factory/////////////////////////////////////////////////////////////////////////////////////////////////////////




  //GET ALL ELEMENTS WITH CLASS OF SHADOW/////////////////////////////////////////////////////////////////////////////////////////

  // Create empty array to hold all 'shadow' nodes
  let shadowElements = []
  // Get all nodes by Class name 'shadow'
  let elements = document.getElementsByClassName( 'shadow' );
  //Loop through node array
  Array.prototype.forEach.call(elements, function( element, index ) {
    // Get getBoundingClientRect INFO

    let elementInfo = element.getBoundingClientRect()
    // Create new object
    let newShadow = Shadow( element,elementInfo )
    //Push into array
    shadowElements.push( newShadow )
    console.log(index)
    pubSub.on( "mousePos", shadowElements[index].mousePos )
	  pubSub.on( "colorChange", shadowElements[index].colorChange)
    pubSub.on( "blurChange", shadowElements[index].blurChange)

  })



  //ADD EVENT LISTENERS/////////////////////////////////////////////////////////////////////////////////////////////////////////

  //track mouse movement
  document.addEventListener("mousemove", mousePos)

  //Control settings changes
  document.getElementById("controlColor").onchange = colorCh

  //Control settings changes
  document.getElementById("controlBlur").oninput = blurCh



  //EVENT LISTENER FUNCTIONS//////////////////////////////////////////////////////////////////////////////////////////////////////

  function mousePos(e) {
    let mouse = {
      x: e.clientX,
      y: e.clientY
    }
    pubSub.emit( "mousePos", mouse )
  }

  function colorCh() {
  	let color = document.getElementById("controlColor").value
  	console.log('color: ' + color)
  	pubSub.emit( "colorChange", color )
  }

  function blurCh() {
    let blur = document.getElementById("controlBlur").value
    console.log(typeof blur);
    pubSub.emit( "blurChange", blur )
  }

}//End of window.onload function
