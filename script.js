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

function init() {
    renderGallery();
}

function renderGallery() {
    for (let index = 0; index < IMAGES.length; index++) {
        GALLERY_WRAPPER_REF.innerHTML += getHTMLForButton(index);
    }
}

function openDialog(index) {
    const GALLERY_DIALOG_REF = document.getElementById("galleryDialog");
    let dialogHeadlineRef = document.getElementById("dialogHeadline");
    let dialogPagenumberRef = document.getElementById("dialogPagenumber");
    let imageSectionRef = document.getElementById("imageSection");

    dialogHeadlineRef.innerText = getTextForDialogHeadline(index);
    imageSectionRef.innerHTML = getHTMLForImageSection(index);
    dialogPagenumberRef.innerText = getTextForDialogPagenumber(index);
    GALLERY_DIALOG_REF.showModal();
}

// #region get HTML and text for functions
function getHTMLForButton(index) {
    return `
    <li>
        <button id="galleryButton${index}" onclick="openDialog(${index})">
            <img src="./assets/img/${IMAGES[index].src}" alt="${IMAGES[index].alt}" />
        </button>
    </li>`;
}

function getTextForDialogHeadline(index) {
    return `${IMAGES[index].src}`;
}

function getHTMLForImageSection(index) {
    return `<img src="./assets/img/${IMAGES[index].src}" alt="${IMAGES[index].alt}" />`;
}

function getTextForDialogPagenumber(index) {
    return `${index + 1}/11`;
}
// #endregion
