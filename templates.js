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
    return `${index + 1}/${IMAGES.length}`;
}
