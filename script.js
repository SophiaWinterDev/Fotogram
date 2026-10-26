// #region global variables
const IMAGES = [
    {
        src: "aurora.jpg",
        alt: "Northern lights over a snowy mountain landscape",
        category: "calm/clear",
    },
    {
        src: "fog.jpg",
        alt: "Small wooden cabin by a misty lake surrounded by autumn forest",
        category: "mixed",
    },
    {
        src: "frost.jpg",
        alt: "Small white hut under a bare tree in a frost-covered field",
        category: "calm/clear",
    },
    {
        src: "hail.jpg",
        alt: "Large hailstones scattered across green grass after a storm",
        category: "severe/stormy",
    },
    {
        src: "rain.jpg",
        alt: "Heavy rain shower falling from dark storm clouds over a rural landscape",
        category: "severe/stormy",
    },
    {
        src: "rainbow.jpg",
        alt: "Bright rainbow appearing over a green pine forest",
        category: "mixed",
    },
    {
        src: "snow.jpg",
        alt: "Sunlight breaking through snow-covered trees in a forest",
        category: "calm/clear",
    },
    {
        src: "storm.jpg",
        alt: "A massive, dark storm front rolling over green fields",
        category: "severe/stormy",
    },
    {
        src: "sunshine.jpg",
        alt: "Bright sunshine illuminating a green, rolling countryside",
        category: "calm/clear",
    },
    {
        src: "thunderstorm.jpg",
        alt: "Bright lightning bolts striking from dark clouds over a city at night",
        category: "severe/stormy",
    },
    {
        src: "tornado.jpg",
        alt: "A small tornado funnel extending from dark clouds",
        category: "severe/stormy",
    },
];

const GALLERY_WRAPPER_REF = document.getElementById("galleryWrapper");
const GALLERY_DIALOG_REF = document.getElementById("galleryDialog");
const DIALOG_HEADLINE_REF = document.getElementById("dialogHeadline");
const DIALOG_PAGENUMBER_REF = document.getElementById("dialogPagenumber");
const IMAGE_SECTION_REF = document.getElementById("imageSection");
const PREVIOUS_BUTTON_REF = document.getElementById("previousButton");
const NEXT_BUTTON_REF = document.getElementById("nextButton");
const PREVIOUS_BUTTON_IMG_REF = document.getElementById("previousButtonImage");
const NEXT_BUTTON_IMG_REF = document.getElementById("nextButtonImage");
const DIASHOW_BUTTON_REF = document.getElementById("diashowButton");
const CATEGORY_ALL_REF = document.getElementById("categoryAll");
const CATEGORY_CALM_REF = document.getElementById("categoryCalm");
const CATEGORY_MIXED_REF = document.getElementById("categoryMixed");
const CATEGORY_SEVERE_REF = document.getElementById("categorySevere");

const FIRST_IMAGE_INDEX = 0;
let currentIndex = 0;
let scrollPosition = 0;
let diashowInterval = null;
let currentImages = [];
// #endregion

function init() {
    renderGallery("all");
}

function renderGallery(category) {
    GALLERY_WRAPPER_REF.innerHTML = "";
    currentImages = [];
    for (let index = 0; index < IMAGES.length; index++) {
        if (category === "all" || IMAGES[index].category === category) {
            currentImages.push(IMAGES[index]);
        }
    }
    for (let index = 0; index < currentImages.length; index++) {
        GALLERY_WRAPPER_REF.innerHTML += getHTMLForButton(index);
    }
}

// #region dialog
function openDialog(index) {
    NEXT_BUTTON_IMG_REF.classList.remove("inactive-button");
    PREVIOUS_BUTTON_IMG_REF.classList.remove("inactive-button");
    currentIndex = index;
    DIALOG_HEADLINE_REF.innerText = getTextForDialogHeadline(index);
    IMAGE_SECTION_REF.innerHTML = getHTMLForImageSection(index);
    DIALOG_PAGENUMBER_REF.innerText = getTextForDialogPagenumber(index);
    checkImageIndex();
    stopDiashow();
    GALLERY_DIALOG_REF.showModal();
    lockScroll();
}

function closeDialog() {
    GALLERY_DIALOG_REF.close();
    unlockScroll();
}

function showPreviousImage() {
    NEXT_BUTTON_IMG_REF.classList.remove("inactive-button");
    if (currentIndex > FIRST_IMAGE_INDEX) {
        currentIndex -= 1;
        updateImage();
    }
    checkImageIndex();
}

function showNextImage() {
    PREVIOUS_BUTTON_IMG_REF.classList.remove("inactive-button");
    if (currentIndex < currentImages.length - 1) {
        currentIndex += 1;
        updateImage();
    }
    checkImageIndex();
}

function updateImage() {
    DIALOG_HEADLINE_REF.innerText = getTextForDialogHeadline(currentIndex);
    IMAGE_SECTION_REF.innerHTML = getHTMLForImageSection(currentIndex);
    DIALOG_PAGENUMBER_REF.innerText = getTextForDialogPagenumber(currentIndex);
}

function checkImageIndex() {
    if (currentIndex <= FIRST_IMAGE_INDEX) {
        PREVIOUS_BUTTON_IMG_REF.classList.add("inactive-button");
    }
    if (currentIndex >= currentImages.length - 1) {
        NEXT_BUTTON_IMG_REF.classList.add("inactive-button");
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
// #endregion

// #region diashow
function toggleDiashow() {
    if (diashowInterval === null) {
        diashowInterval = setInterval(autoplayNextImage, 5000);
        DIASHOW_BUTTON_REF.innerText = "⏸ PAUSE DIASHOW";
    } else {
        stopDiashow();
    }
}

function stopDiashow() {
    clearInterval(diashowInterval);
    diashowInterval = null;
    DIASHOW_BUTTON_REF.innerText = "▶ PLAY DIASHOW";
    PREVIOUS_BUTTON_IMG_REF.classList.remove("inactive-button");
    NEXT_BUTTON_IMG_REF.classList.remove("inactive-button");
    PREVIOUS_BUTTON_REF.disabled = false;
    NEXT_BUTTON_REF.disabled = false;
    checkImageIndex();
}

function autoplayNextImage() {
    PREVIOUS_BUTTON_REF.disabled = true;
    NEXT_BUTTON_REF.disabled = true;
    PREVIOUS_BUTTON_IMG_REF.classList.add("inactive-button");
    NEXT_BUTTON_IMG_REF.classList.add("inactive-button");
    if (currentIndex < currentImages.length - 1) {
        currentIndex += 1;
    } else {
        currentIndex = 0;
    }
    updateImage();
}
// #endregion

// #region categories
function chooseCategory(clickedButton, category) {
    CATEGORY_ALL_REF.classList.remove("active-button");
    CATEGORY_CALM_REF.classList.remove("active-button");
    CATEGORY_MIXED_REF.classList.remove("active-button");
    CATEGORY_SEVERE_REF.classList.remove("active-button");

    clickedButton.classList.add("active-button");
    renderGallery(category);
}
// #endregion
