"use strict"


//Visualizes the Network
module.exports = function draw(pred = -1, inputImage = null) {
    let canvas = document.getElementById('myCanvas2');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        window.devicePixelRatio=2


        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
        let scale = window.devicePixelRatio

        canvas.width = Math.floor(canvas.width * scale);
        console.log(canvas.width)
        canvas.height = Math.floor(canvas.height * scale);

        ctx.scale(scale, scale)
        const bottom = canvas.height;

        //Input info box
        const xInfo = canvas.width / 2 + 20
        const yInfo = 8
        const widthInfo = 100
        const heightInfo = 20
        ctx.fillRect(xInfo, yInfo, widthInfo, heightInfo);
        ctx.fillStyle = 'white';
        ctx.font = "10px serif";
        ctx.fillText("Input Layer (28, 28, 1)", xInfo + 5, yInfo + heightInfo / 2 + 2);

        //Draw Input Image
        const imgWidth = 28
        const imgHeight = 28
        const xInput = (canvas.width / 2) - (imgWidth / 2)
        const yInput = 4
        ctx.fillStyle = 'black';
        ctx.fillRect(xInput, yInput, imgWidth, imgHeight)
        if (inputImage !== null) {
            ctx.strokeStyle = 'blue';
            ctx.drawImage(inputImage, xInput, yInput, imgWidth, imgHeight);
        }else{
            ctx.clearRect(xInput, yInput, imgWidth, imgHeight)
            ctx.fillStyle = 'black';
            ctx.fillRect(xInput, yInput, imgWidth, imgHeight) 
        }

        //Draw Conv2D Layer
        const xConv2D = 25
        const yConv2D = 40
        const widthConv2D = canvas.width - (2 * xConv2D)
        const heightConv2D = 15

        ctx.beginPath();
        ctx.moveTo(xInput + imgHeight / 2, yInput + imgHeight);
        ctx.lineTo(xConv2D + widthConv2D / 2, yConv2D);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillRect(xConv2D, yConv2D, widthConv2D, heightConv2D);
        ctx.fillStyle = 'white';
        ctx.font = "10px serif";
        ctx.fillText("Conv2D Layer (26, 26, 32)", canvas.width / 2 - xConv2D - 25, yConv2D + 10);

        //Draw Activation Layer (ReLU)
        const xReLU = 25
        const yReLU = 65
        const widthReLU = canvas.width - (2 * xReLU)
        const heightReLU = 15

        ctx.beginPath();
        ctx.moveTo(xConv2D + widthConv2D / 2, yConv2D + heightReLU);
        ctx.lineTo(xReLU + widthReLU / 2, yReLU);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillRect(xReLU, yReLU, widthReLU, heightReLU);
        ctx.fillStyle = 'white';
        ctx.font = "10px serif";
        ctx.fillText("Activation Layer ReLU (26, 26, 32)", canvas.width / 2 - xReLU - 40, yReLU + 10)

        //Draw Flatten Layer
        const xFlatten = 25
        const yFlatten = 90
        const widthFlatten = canvas.width - (2 * xFlatten)
        const heightFlatten = 20

        ctx.beginPath();
        ctx.moveTo(xReLU + widthReLU / 2, yReLU + heightReLU);
        ctx.lineTo(xFlatten + widthFlatten / 2, yFlatten);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillRect(xFlatten, yFlatten, widthFlatten, heightFlatten);
        ctx.fillStyle = 'white';
        ctx.font = "10px serif";
        ctx.fillText("FLATTEN LAYER (21632)", canvas.width / 2 - xFlatten - 25, yFlatten + 12)


        //Draw OutPut Layer
        const spaceBetweenNodes = 20
        const radius = 8;
        const outPutNodes = 10
        let x = 25
        for (let i = 0; i < outPutNodes; i++) {
            ctx.beginPath();
            ctx.arc(x, bottom - radius * 2, radius, 0, 2 * Math.PI);
            if (i == pred) {
                ctx.fillStyle = 'blue';
                ctx.strokeStyle = 'blue';
            } else {
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
            }
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.moveTo(widthFlatten / 2 + xFlatten, yFlatten + heightFlatten);
            ctx.lineTo(x, bottom - radius * 2 - radius);
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.font = '10px serif';
            ctx.fillText(i, x - 2, bottom - radius - 5)
            x = x + spaceBetweenNodes + radius
        }

    }
}