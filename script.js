// #region global variables
const IMAGES = [
    {
        src: "aurora.jpg",
        alt: "Northern lights over a snowy mountain landscape",
    },
    {
        src: "fog.jpg",
        alt: "Small wooden cabin by a misty lake surrounded by autumn forest",
    },
    {
        src: "frost.jpg",
        alt: "Small white hut under a bare tree in a frost-covered field",
    },
    {
        src: "hail.jpg",
        alt: "Large hailstones scattered across green grass after a storm",
    },
    {
        src: "rain.jpg",
        alt: "Heavy rain shower falling from dark storm clouds over a rural landscape",
    },
    {
        src: "rainbow.jpg",
        alt: "Bright rainbow appearing over a green pine forest",
    },
    {
        src: "snow.jpg",
        alt: "Sunlight breaking through snow-covered trees in a forest",
    },
    {
        src: "storm.jpg",
        alt: "A massive, dark storm front rolling over green fields",
    },
    {
        src: "sunshine.jpg",
        alt: "Bright sunshine illuminating a green, rolling countryside",
    },
    {
        src: "thunderstorm.jpg",
        alt: "Bright lightning bolts striking from dark clouds over a city at night",
    },
    {
        src: "tornado.jpg",
        alt: "A small tornado funnel extending from dark clouds",
    },
];

const GALLERY_WRAPPER_REF = document.getElementById("galleryWrapper");
const GALLERY_DIALOG_REF = document.getElementById("galleryDialog");
const DIALOG_HEADLINE_REF = document.getElementById("dialogHeadline");
const DIALOG_PAGENUMBER_REF = document.getElementById("dialogPagenumber");
const IMAGE_SECTION_REF = document.getElementById("imageSection");
const PREVIOUS_BUTTON_REF = document.getElementById("previousButton");
const NEXT_BUTTON_REF = document.getElementById("nextButton");

const FIRST_IMAGE_INDEX = 0;
const LAST_IMAGE_INDEX = IMAGES.length - 1;
let currentIndex = 0;
let scrollPosition = 0;
// #endregion

function init() {
    renderGallery();
}

function renderGallery() {
    for (let index = 0; index < IMAGES.length; index++) {
        GALLERY_WRAPPER_REF.innerHTML += getHTMLForButton(index);
    }
}

function openDialog(index) {
    NEXT_BUTTON_REF.classList.remove("inactive-button");
    PREVIOUS_BUTTON_REF.classList.remove("inactive-button");
    currentIndex = index;
    DIALOG_HEADLINE_REF.innerText = getTextForDialogHeadline(index);
    IMAGE_SECTION_REF.innerHTML = getHTMLForImageSection(index);
    DIALOG_PAGENUMBER_REF.innerText = getTextForDialogPagenumber(index);
    checkImageIndex();
    GALLERY_DIALOG_REF.showModal();
    lockScroll();
}

function closeDialog() {
    GALLERY_DIALOG_REF.close();
    unlockScroll();
}

function showPreviousImage() {
    NEXT_BUTTON_REF.classList.remove("inactive-button");
    if (currentIndex > FIRST_IMAGE_INDEX) {
        currentIndex -= 1;
        DIALOG_HEADLINE_REF.innerText = getTextForDialogHeadline(currentIndex);
        IMAGE_SECTION_REF.innerHTML = getHTMLForImageSection(currentIndex);
        DIALOG_PAGENUMBER_REF.innerText =
            getTextForDialogPagenumber(currentIndex);
    }
    checkImageIndex();
}

function showNextImage() {
    PREVIOUS_BUTTON_REF.classList.remove("inactive-button");
    if (currentIndex < LAST_IMAGE_INDEX) {
        currentIndex += 1;
        DIALOG_HEADLINE_REF.innerText = getTextForDialogHeadline(currentIndex);
        IMAGE_SECTION_REF.innerHTML = getHTMLForImageSection(currentIndex);
        DIALOG_PAGENUMBER_REF.innerText =
            getTextForDialogPagenumber(currentIndex);
    }
    checkImageIndex();
}

function checkImageIndex() {
    if (currentIndex <= FIRST_IMAGE_INDEX) {
        PREVIOUS_BUTTON_REF.classList.add("inactive-button");
    }
    if (currentIndex >= LAST_IMAGE_INDEX) {
        NEXT_BUTTON_REF.classList.add("inactive-button");
    }
}

function bubblingPrevention(event) {
    event.stopPropagation();
}

function lockScroll() {
    scrollPosition = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
}

function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollPosition);
}
