/**
 * Geronimo 1.0.0
 * Super-simple parallax backgrounds.
 *
 * https://github.com/galengidman/Geronimo
 *
 * Licensed under the MIT License,
 */

;( function( $ ) {

  'use strict';

  $.fn.geronimo = function() {

    var $els = this;

    var calcOffset = function( $parent ) {
      var sizes        = getSizes( $parent );
      var compensation = 16.667;

      var totalInViewport   = sizes.windowHeight + sizes.parentHeight;
      var inViewport        = ( sizes.scrollPos + sizes.windowHeight ) - sizes.parentOffset;
      var percentInViewport = ( inViewport / totalInViewport ) * 100;

      var offset = ( ( percentInViewport / 100 ) * ( compensation * 2 ) ) - compensation;

      return offset;
    };

    var getSizes = function( $parent ) {
      return {
        parentHeight : $parent[0].offsetHeight,
        parentOffset : $parent.offset().top,
        parentTop    : $parent[0].getBoundingClientRect().top,
        scrollPos    : window.pageYOffset,
        windowHeight : window.innerHeight
      }
    };

    var inViewport = function( $parent ) {
      var sizes = getSizes( $parent );
      return sizes.windowHeight >= sizes.parentTop && ( sizes.parentTop + sizes.parentHeight ) >= 0;
    };

    var position = function( $parallax, $parent ) {
      if ( ! inViewport( $parent ) ) return;
      $parallax.css( 'transform', 'translateY(' + calcOffset( $parent ) + '%)' );
    };

    var geronimo = function() {
      $els.each( function() {
        var $this = $( this );
        position( $this, $this.parent() );
      } );
    };

    $els.each( function() {
      var $this = $( this );

      $this.parent().css( {
        'overflow' : 'hidden',
        'position' : 'relative',
      } );

      $this.css( {
        'bottom'   : '-25%',
        'left'     : '0',
        'position' : 'absolute',
        'right'    : '0',
        'top'      : '-25%'
      } );
    } );

    geronimo();

    $( window ).on( 'scroll resize', function() {
      window.requestAnimationFrame( geronimo );
    } );

  };

} )( window.jQuery || window.Zepto );
