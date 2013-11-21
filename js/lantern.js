//David English 2013

function lanternSlideshow(imageArray, lanternWidth, lanternSpeed) {
  this.imageArray = imageArray;
  this.lanternWidth = lanternWidth;
  this.lanternSpeed = lanternSpeed;
}

lanternSlideshow.prototype.getLanternSlidesCode = function(imageArray) {
  var lanternFieldSetCode = '';
  for (var j=0; j < imageArray.length; j++) {
    if (imageArray[j][1].length < 1) {
      lanternFieldSetCode = lanternFieldSetCode + '<div class="lanternSlide" id="slide' + (j+1) + '"><img src="' + imageArray[j] + '" ></div>';
    }
    else { 
      lanternFieldSetCode = lanternFieldSetCode + '<div class="lanternSlide" id="slide' + (j+1) + '"><a href="' + imageArray[j][1] + '"><img src="' + imageArray[j] + '" ></a></div>';

    }
  }
  return lanternFieldSetCode;
}

lanternSlideshow.prototype.getLanternJSCode = function(imageArray, lanternSpeed) {
  var jquerySlideLines = '<script> function lanternGo() {';
  for (var k=0; k < imageArray.length; k++) {
    jquerySlideLines = jquerySlideLines + '$("#slide' + (k+1) + '").fadeIn( ' + lanternSpeed[1] + ' ).delay( ' + lanternSpeed[0] + ' ).fadeOut( ' + lanternSpeed[1] + ', function() {'; 
  }
  var jquerySlideLineClosingTags = '';
  for (var q=0; q < imageArray.length; q++) {
    jquerySlideLineClosingTags = jquerySlideLineClosingTags + '});';
  }
  var lanternJSEnd = 'lanternGo();' + jquerySlideLineClosingTags + '}';
  return jquerySlideLines + lanternJSEnd;
}

lanternSlideshow.prototype.getEmbedCode = function(imageArray, lanternWidth, lanternSpeed) {

  var lanternContainerCode = '<!--beginLanternCode--><div id="lanternSlideContainer">';
  
  var lanternSlidesCode = this.getLanternSlidesCode(imageArray) + '</div>';

  var lanternCodeToRunSlideshow = '$( document ).ready(function() { setTimeout(function() {lanternGo(); },1500); });</script>';

  var lanternJSCode = this.getLanternJSCode(imageArray, lanternSpeed) + lanternCodeToRunSlideshow;

  var lanternStyleCode = '<style> #lanternSlideContainer {width:' + lanternWidth + ';position:relative;margin-left:auto;margin-right:auto;} .lanternSlide {position:absolute;display:none;} .lanternSlide img{width:100%;} .lanternSlide a:active {outline: none;} </style><!--endLanternCode-->';

  return lanternContainerCode + lanternSlidesCode + lanternJSCode + lanternStyleCode;
}

