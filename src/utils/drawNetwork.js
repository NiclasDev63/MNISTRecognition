let canvas = document.getElementById('modelCanvas');
let ctx = canvas.getContext('2d');
let dpi = window.devicePixelRatio

// https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
function fix_dpi() {
    //create a style object that returns width and height
    let style = {
        height() {
            return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
        },
        width() {
            return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
        }
    }
    //set the correct attributes for a crystal clear image!
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
}

module.exports = function draw(pred = -1, inputImage = null) {
    if (canvas.getContext) {


        fix_dpi()

        const bottom = canvas.height;
        const spaceBetweenLayers = 25

        //Input info box
        const xInfo = canvas.width / 2 + 80
        const yInfo = 35
        const widthInfo = 300
        const heightInfo = 40
        ctx.fillRect(xInfo, yInfo, widthInfo, heightInfo);
        ctx.fillStyle = 'white';
        ctx.font = "30px serif";
        ctx.fillText("Input Layer (28, 28, 1)", xInfo + 15, yInfo + heightInfo / 2 + 5);

        //Draw Input Image
        const imgWidth = 120
        const imgHeight = 120
        const xInput = (canvas.width / 2) - (imgWidth / 2)
        const yInput = 5
        ctx.fillStyle = 'black';
        ctx.fillRect(xInput, yInput, imgWidth, imgHeight)
        if (inputImage !== null) {
            ctx.lineWidth = 10
            ctx.strokeStyle = 'blue';
            ctx.drawImage(inputImage, xInput, yInput, imgWidth, imgHeight);
        } else {
            ctx.clearRect(xInput, yInput, imgWidth, imgHeight)
            ctx.fillStyle = 'black';
            ctx.fillRect(xInput, yInput, imgWidth, imgHeight)
        }

        //Draw Conv2D Layer
        const xConv2D = 25
        const yConv2D = spaceBetweenLayers + imgHeight + yInput
        const widthConv2D = canvas.width - (2 * xConv2D)
        const heightConv2D = 60

        ctx.beginPath();
        ctx.moveTo(xInput + imgHeight / 2, yInput + imgHeight);
        ctx.lineTo(xConv2D + widthConv2D / 2, yConv2D);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillRect(xConv2D, yConv2D, widthConv2D, heightConv2D);
        ctx.fillStyle = 'white';
        ctx.font = "30px serif";
        ctx.fillText("Conv2D Layer (26, 26, 32)", canvas.width / 2 - xConv2D - 100, yConv2D + 40);

        //Draw Activation Layer (ReLU)
        const widthReLU = 450
        const heightReLU = 80
        const xReLU = canvas.width / 2 - widthReLU / 2
        const yReLU = spaceBetweenLayers + heightConv2D + yConv2D

        ctx.beginPath();
        ctx.moveTo(xConv2D + widthConv2D / 2, yConv2D + heightConv2D);
        ctx.lineTo(xReLU + widthReLU / 2, yReLU);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillRect(xReLU, yReLU, widthReLU, heightReLU);
        ctx.fillStyle = 'white';
        ctx.font = "30px serif";
        ctx.fillText("Activation Layer ReLU (26, 26, 32)", canvas.width / 2 - 215, yReLU + 50)

        //Draw Flatten Layer
        const xFlatten = 25
        const yFlatten = spaceBetweenLayers + heightReLU + yReLU
        const widthFlatten = canvas.width - (2 * xFlatten)
        const heightFlatten = 60

        ctx.beginPath();
        ctx.moveTo(xReLU + widthReLU / 2, yReLU + heightReLU);
        ctx.lineTo(xFlatten + widthFlatten / 2, yFlatten);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillRect(xFlatten, yFlatten, widthFlatten, heightFlatten);
        ctx.fillStyle = 'white';
        ctx.font = "30px serif";
        ctx.fillText("FLATTEN LAYER (21632)", canvas.width / 2 - xFlatten * 6.5, canvas.height / 1.85)


        //Draw Activation Layer2 (ReLU)
        const widthReLU2 = 450
        const heightReLU2 = 80
        const xReLU2 = canvas.width / 2 - widthReLU / 2
        const yReLU2 = spaceBetweenLayers + heightFlatten + yFlatten

        ctx.beginPath();
        ctx.moveTo(xConv2D + widthConv2D / 2, yConv2D + heightReLU2);
        ctx.lineTo(xReLU2 + widthReLU2 / 2, yReLU2);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillRect(xReLU2, yReLU2, widthReLU2, heightReLU2);
        ctx.fillStyle = 'white';
        ctx.font = "30px serif";
        ctx.fillText("Activation Layer 2 ReLU (10)", canvas.width / 2 - 185, yReLU2 + 50)


        //Draw OutPut Layer
        const spaceBetweenNodes = 70
        const radius = 40;
        const outPutNodes = 10
        let x = 65
        for (let i = 0; i < outPutNodes; i++) {
            ctx.beginPath();
            ctx.arc(x, bottom - radius * 2, radius, 0, 2 * Math.PI);
            if (i == pred) {
                ctx.lineWidth = 10
                ctx.fillStyle = 'blue';
                ctx.strokeStyle = 'blue';
            } else {
                ctx.lineWidth = 1
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
            }
            ctx.fill();
            ctx.moveTo(widthReLU2 / 2 + xReLU2, yReLU2 + heightReLU2);
            ctx.lineTo(x, bottom - radius * 2 - radius);
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.font = '30px serif';
            ctx.fillText(i, x - 8, bottom - radius - 30)
            x = x + spaceBetweenNodes + radius
        }

    }
}