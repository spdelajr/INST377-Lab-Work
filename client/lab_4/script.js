let slidePosition=0;
const slides=document.querySelectorAll('.carousel_item');
const totalSlides=slides.length;
console.log(totalSlides);

const next =document.querySelector('button#carousel_button--next');
console.log('next button', next);
next.addEventListener("click",function(){
    console.log("hello");
    moveToNextSlide();
});

const prev=document.querySelector('button#carousel_button--prev');
console.log('previous button', prev);
prev.addEventListener("click",function(){
    console.log("hello");
    moveToPrevSlide();
});

function updateSlidePosition(){
    console.log("test")
    for (let slide of slides){
        slide.classList.remove('.carousel_item--visible');
        slide.classList.add('.carousel_item--hidden');
    }
    slides[slidePosition].classList.add('.carousel_item--visible');

}


function moveToNextSlide() {
    
    console.log('hello next')
    if(slidePosition === totalSlides-1){
        slidePosition=0;
    } else{
        slidePosition++;
    }
    updateSlidePosition();
    console.log(slidePosition);
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