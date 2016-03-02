/**
 * Geronimo 1.1.0
 * Super-simple parallax backgrounds.
 *
 * https://github.com/galengidman/Geronimo
 *
 * Licensed under the MIT License,
 */

;( function( $ ) {

  'use strict';

  $.fn.geronimo = function( options ) {

    var options = $.extend( {
      speed: 'medium'
    }, options );

    var $els = this;

    var compensations = { slow: 10, medium: 16.667, fast: 25 };
    var compensation = compensations[options.speed];

    var offsets = { slow: '12.5%', medium: '25%', fast: '50%' };
    var offset = offsets[options.speed];

    var calcPosition = function( $parent ) {
      var sizes = getSizes( $parent );

      var totalInViewport   = sizes.windowHeight + sizes.parentHeight;
      var inViewport        = ( sizes.scrollPos + sizes.windowHeight ) - sizes.parentOffset;
      var percentInViewport = ( inViewport / totalInViewport ) * 100;

      var pos = ( ( percentInViewport / 100 ) * ( compensation * 2 ) ) - compensation;

      return pos;
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
      $parallax.css( 'transform', 'translateY(' + calcPosition( $parent ) + '%)' );
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
        'bottom'     : '-' + offset,
        'height'     : 'auto',
        'left'       : '0',
        'position'   : 'absolute',
        'right'      : '0',
        'top'        : '-' + offset,
        'transition' : '100ms'
      } );
    } );

    geronimo();

    $( window ).on( 'scroll resize', function() {
      window.requestAnimationFrame( geronimo );
    } );

  };

} )( window.jQuery || window.Zepto );
