$(document).ready(function(){

  var body=$('body');
  var gallery=$('.gallery');


  var bodyWidth=body.width();
  var bodyHeight=body.height();
  var galleryWidth=gallery.width();
  var galleryHeight=gallery.height();

  var galleryLeft=bodyWidth/2-galleryWidth/2;
  var galleryTop=bodyHeight/2-galleryHeight/2;

  console.log(bodyHeight);
  console.log(galleryHeight);

  gallery.css({
    'left': galleryLeft,
    'top' : galleryTop
  });
});
// 항상 가운데에 맞춰주는 자바스크립트 함수  라이브러리 작성
