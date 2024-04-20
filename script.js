const container = document.querySelector(".container");
const subcontainer = document.querySelector(".subcontainer");
const firstimagesWidth = subcontainer.querySelector(".images").offsetWidth;
const arrows = document.querySelectorAll(".container i");
const subcontainerChildrens = [...subcontainer.children];

let imagesPerView = Math.round(subcontainer.offsetWidth / firstimagesWidth);

subcontainerChildrens.slice(-imagesPerView).reverse().forEach(images => {
    subcontainer.insertAdjacentHTML("afterbegin", images.outerHTML);
});

subcontainerChildrens.slice(0, imagesPerView).forEach(images => {
    subcontainer.insertAdjacentHTML("beforeend", images.outerHTML);
});

subcontainer.classList.add("no-transition");
subcontainer.scrollLeft = subcontainer.offsetWidth;
subcontainer.classList.remove("no-transition");

arrows.forEach(button => {
    button.addEventListener("click", () => {
        subcontainer.scrollLeft += button.id == "left" ? -firstimagesWidth : firstimagesWidth;
    });
});

const infiniteScroll = () => {
    if(subcontainer.scrollLeft === 0) {
        subcontainer.classList.add("no-transition");
        subcontainer.scrollLeft = subcontainer.scrollWidth - (2 * subcontainer.offsetWidth);
        subcontainer.classList.remove("no-transition");
    }
    else if(Math.ceil(subcontainer.scrollLeft) === subcontainer.scrollWidth - subcontainer.offsetWidth) {
        subcontainer.classList.add("no-transition");
        subcontainer.scrollLeft = subcontainer.offsetWidth;
        subcontainer.classList.remove("no-transition");
    }
}

subcontainer.addEventListener("scroll", infiniteScroll);
container.addEventListener("mouseenter", () => clearTimeout(timeoutId));