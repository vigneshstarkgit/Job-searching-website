const initslider = () =>{
    const imagelist = document.querySelector(".slider-wrapper .image-list");    
    const slidebuttons = document.querySelectorAll(".slider-wrapper .material-symbols-outlined");
    const sliderscrollbar = document.querySelector(".container4 .slider-scrollbar");
    const scrollbarthumb = sliderscrollbar.querySelector(".scrollbar-thumb");
    const maxscrolleft = imagelist.scrollWidth - imagelist.clientWidth;

    scrollbarthumb.addEventListener("mousedown", (e) => {
        const startx = e.clientX;
        const thumbposition = scrollbarthumb.offsetLeft;

        

        const handlemousemove = (e) => {
            const deltax = e.clientX - startx;
            const newthumbposition = thumbposition + deltax;
            const maxthumbposition = sliderscrollbar.getBoundingClientRect().width - scrollbarthumb.offsetWidth;
            const boundedposition = Math.max(0, Math.min(maxthumbposition, newthumbposition));
            const scrollposition = (boundedposition / maxthumbposition) * maxscrolleft;
            

            scrollbarthumb.style.left = `${boundedposition}px`;
            imagelist.scrollLeft = scrollposition;

        }
        const handlemouseup = () =>{
            document.removeEventListener("mousemove",handlemousemove);
            document.removeEventListener("mouseup", handlemouseup);
        }

        document.addEventListener("mousemove" , handlemousemove);
        document.addEventListener("mouseup" , handlemouseup);


    });


    slidebuttons.forEach(button => {
        button.addEventListener("click",() => {
           button.addEventListener("click",()=>{
            const direction = button.id === "prev-slide"  ? -1 : 1;
            const scrollamount = imagelist.clientWidth * direction;
            imagelist.scrollBy({left: scrollamount, behavior:"smooth"});
           });
        });
    });
    const handleSlideButtons = () => {
        slidebuttons[0].style.display = imagelist.scrollLeft <= 0 ? "none" : "block";
        slidebuttons[1].style.display = imagelist.scrollLeft >= maxscrolleft ? "none" : "block";
    }

    const updateScrollThumbPosition = () =>{
        const scrollposition = imagelist.scrollLeft;
        const thumbposition = (scrollposition / maxscrolleft) * (sliderscrollbar.clientWidth - scrollbarthumb.offsetWidth);
        scrollbarthumb.style.left = `${thumbposition}px`;
    }

    imagelist.addEventListener("scroll",() =>{
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}


window.addEventListener("load", initslider);
