function getHTMLForButton(index) {
    return `
    <li>
        <button id="galleryButton${index}" onclick="openDialog(${index})">
            <img src="./assets/img/${currentImages[index].src}" alt="${currentImages[index].alt}" />
        </button>
    </li>`;
}

function getTextForDialogHeadline(index) {
    return `${currentImages[index].src}`;
}

function getHTMLForImageSection(index) {
    return `<img src="./assets/img/${currentImages[index].src}" alt="${currentImages[index].alt}" />`;
}

function getTextForDialogPagenumber(index) {
    return `${index + 1}/${currentImages.length}`;
}
