let slidePosition=0;
const slides=document.querySelectorAll('carousel_item');
const totalSlides=slides.length;

document.querySelector('carousel_button--next')
.addEventListener("click",function(){
    console.log("hello");
    moveToNextSlide();
});
document.querySelector('carousel_button--prev')
.addEventListener("click",function(){
    console.log("hello");
    moveToPrevSlide();
});

function updateSlidePosition(){
    for (let slide of slides){
        slide.classList.remove('carousel_item--visible');
        slide.classList.add('carousel_item--hidden');
    }
    slides[slidePosition].classList.add('carousel_item--visible');

}


function moveToNextSlide() {
    
    console.log('hello next')
    if(slidePosition === totalSlides-1){
        slidePosition=0;
    } else{
        slidePosition++;
    }
    updateSlidePosition();
}

function moveToPrevSlide() {
    
    console.log('hello prev')
    if(slidePosition === 0){
        slidePosition=totalSlides-1;
    } else{
        slidePosition--;
    }
    updateSlidePosition();
}