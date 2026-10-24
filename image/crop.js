let cropMode = false;
let cropStartX, cropStartY;
let cropEndX, cropEndY;

document.getElementById("cropBtn").onclick = () => {
    cropMode = true;
    alert("Click and drag to select crop area.");
};

canvas.addEventListener("mousedown", (e) => {
    if (!cropMode) return;

    cropStartX = e.offsetX;
    cropStartY = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    if (!cropMode) return;

    cropEndX = e.offsetX;
    cropEndY = e.offsetY;

    const x = Math.min(cropStartX, cropEndX);
    const y = Math.min(cropStartY, cropEndY);
    const width = Math.abs(cropEndX - cropStartX);
    const height = Math.abs(cropEndY - cropStartY);

    if (width < 5 || height < 5) {
        cropMode = false;
        return;
    }

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = width;
    tempCanvas.height = height;

    tempCtx.drawImage(
        canvas,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height
    );

    saveState();

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(tempCanvas, 0, 0);

    cropMode = false;
});
