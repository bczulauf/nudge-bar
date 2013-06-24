$(document).ready(function () {
  
  var selected = $([]); 	// list of selected objects
  
  $('body').on('click', '.n-draggable', function ( e ) {
    if( !$(this).hasClass("ui-selected")) {
      $('div').removeClass("ui-selected");
      $(this).addClass("ui-selected").droppable({
        hoverClass: "ui-state-active",
        accept: ".drop-in-selected",
        drop: function( event, ui ) {
          var newDiv = $(ui.helper).clone( false )
            .css({position:'relative', left:0, top:0, width: '50%'})
            .removeClass("drop-in-selected")
            .addClass("n-draggable flex")
            .draggable({ 
              snap: true,
              containment: ".n-device-container",
              snapTolerance: 5 
            })
            $(this).append(newDiv)
        }
      })
    }
    else {
		  $(this).removeClass("ui-selected");
		}
  })
  
  $( ".n-droppable" ).draggable({
    appendTo: ".n-device-container",
    helper: "clone",
    addClass: "clone",
    snap: true,
    snapTolerance: 5,
    start: function( event, ui ) {
      if ($('div').hasClass('ui-selected')) {
        $(event.target).removeClass('n-droppable')
        $(event.target).addClass('drop-in-selected')
      }
    }
  });
  
  $( ".n-device-container" ).droppable({
    hoverClass: "ui-state-active",
    accept: ".n-droppable",
    drop: function( event, ui ) {
      var newDiv = $(ui.helper).clone( false )
        .css({position:'relative', left:0, top:0, width: '100%'})
        .removeClass("n-droppable")
        .addClass("n-draggable flex")
        .draggable({ 
          snap: true,
          containment: ".n-device-container",
          snapTolerance: 5 
        })
      var innerDiv = newDiv[0]
      var flexBox = $('<div class="flex-box"></div>')
      flexBox.droppable({
        accept: ".n-droppable",
        hoverClass: "ui-state-active",
        tolerance: "fit",
        greedy: true,
        drop: function( event, ui ) {
          var nestedDiv = $(ui.helper).clone( false )
            .css({position:'relative', left:0, top:0, width: '100%'})
            .removeClass("n-droppable")
            .addClass("n-draggable")
            .draggable()
          $(this).append(nestedDiv)
        }
      })
      flexBox.append(innerDiv)   
      $(this).append(flexBox)
    }
  });
  
  $(document).keydown(function( e ) {
    switch ( e.which ) {
      case 37:
        $('.ui-selected').css({
          left: "-=1px"
        })
        break;
      case 38:
        $('.ui-selected').css({
          top: "-=1px"
        })
       break;
      case 39:
        $('.ui-selected').css({
          left: "+=1px"
        })
        break;
      case 40:
        $('.ui-selected').css({
          top: "+=1px"
        })
        break;
      case 46:
        e.preventDefault()
        alert('delete')
        $('.ui-selected').remove()
        break;
    }
  });
  
})