import "./styles/index.scss";
// import "./src/styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  // window.onload = function () {
  const file = document.getElementById("file-input");
  const canvas = document.getElementById("canvas");
  const h3 = document.getElementById("name");
  const audio = document.getElementById("audio");
  const visuals = ["waveVisual", "barVisual", "circleVisual"];
  // const visuals = ["waveVisual"];
  // const visuals = ["barVisual"];
  // const visuals = ["circleVisual"];

  const modalBg = document.querySelector(".modal-background");
  const modal = document.querySelector(".modal-main");

  modalBg.addEventListener("click", closeModal);

  function openModal() {
    modalBg.setAttribute("class", "modal-background");
    modal.setAttribute("class", "modal-main");
  }

  function closeModal() {
    modalBg.setAttribute("class", "modal-bg-fade");
    modal.setAttribute("class", "modal-main-fade");
    // canvas.setAttribute("background-image", "url('/assets/images/stars.jpg')");
  }

  const questionIcon = document.getElementById("question-icon");
  questionIcon.addEventListener("click", answerQuestion);

  function answerQuestion() {
    openModal();
    // console.log("hello mateYYYYYYY");
  }
  ///////////////////////////
  ///////////////////////////

  //visual stuff//
  const visualButton = document.querySelector("button");
  visualButton.addEventListener("click", visualSelector);
  let visual;
  function visualSelector() {
    visual = visuals[Math.floor(Math.random() * visuals.length)];
  }
  //////////////////////

  file.onchange = function () {
    /////
    const files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    const name = files[0].name;
    h3.innerText = `${name.toLowerCase()}`;
    /////
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const ctx = canvas.getContext("2d");
    /////
    const context = new AudioContext();
    let src = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    /////

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      const random = Math.random;

      function getRandomColor() {
        return (random() * 255) >> 0;
      }

      if (visual === "barVisual") {
        // const barWidth = (WIDTH / bufferLength) * 5;
        const barWidth = (WIDTH / bufferLength) * 50;
        let barHeight;
        let x = 0;
        let r, g, b;
        let bars = 200;

        // const barFftSizes = [256, 512, 2048, 4096, 8192];
        const barFftSizes = [2048];
        analyser.fftSize =
          barFftSizes[Math.floor(Math.random() * barFftSizes.length)];

        for (let i = 0; i < bars; i++) {
          barHeight = dataArray[i] * 2.5;

          if (dataArray[i] > 210) {
            // pink
            r = 255;
            g = 110;
            b = 199;
            // r = getRandomColor();
            // g = getRandomColor();
            // b = getRandomColor();
          } else if (dataArray[i] > 200) {
            // yellow
            // r = 250;
            // g = 237;
            // b = 39;
            r = getRandomColor();
            g = getRandomColor();
            b = getRandomColor();
          } else if (dataArray[i] > 190) {
            // green
            r = 57;
            g = 255;
            b = 20;
            // r = getRandomColor();
            // g = getRandomColor();
            // b = getRandomColor();
          } else if (dataArray[i] > 180) {
            // purple
            // r = 188;
            // g = 19;
            // b = 254;
            r = getRandomColor();
            g = getRandomColor();
            b = getRandomColor();
            (")");
          } else {
            // blue
            // r = 0;
            // g = 249;
            // b = 255;
            r = getRandomColor();
            g = getRandomColor();
            b = getRandomColor();
          }

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 10;
        }
        // console.log("dis is BARVISUAL", analyser.fftSize);
        ////
      } else if (visual === "waveVisual") {
        const waveFftSizes = [1024];
        analyser.fftSize =
          waveFftSizes[Math.floor(Math.random() * waveFftSizes.length)];
        ////
        ctx.lineWidth = 2;
        ctx.strokeStyle =
          "rgb(" +
          getRandomColor() +
          "," +
          getRandomColor() +
          "," +
          getRandomColor() +
          ")";
        ctx.beginPath();

        let sliceWidth = (WIDTH * 3.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0;
          let y = (v * HEIGHT) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(WIDTH, HEIGHT / 2);
        ctx.stroke();
        // console.log("WAVEVISUALLLL");

        /////
      } else if (visual === "circleVisual") {
        // console.log("ISSA CIRCLE");
        /////////////////////////
        if (audio.paused) {
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
        } else {
          let cx = WIDTH * 0.5,
            cy = HEIGHT * 0.5,
            radiusMax = Math.min(cx, cy) - 20,
            radiusMin = radiusMax * 0.1;

          // const circleFftSizes = [128, 256, 512];
          const circleFftSizes = [128, 256];
          analyser.fftSize =
            circleFftSizes[Math.floor(Math.random() * circleFftSizes.length)];

          // ctx.lineWidth = 0;
          ctx.lineWidth =
            dataArray[Math.floor(Math.random() * dataArray.length)];

          ctx.strokeStyle =
            "rgb(" +
            "75," +
            // getRandomColor() +
            // "," +
            getRandomColor() +
            "," +
            getRandomColor() +
            ")";

          // ctx.fillStyle = "rgba(0,0,0,0.16)";
          // ctx.fillStyle =
          //   "rgb(" +
          //   getRandomColor() +
          //   "," +
          //   getRandomColor() +
          //   "," +
          //   getRandomColor() +
          //   ")";

          render();

          function render() {
            // ctx.fillRect(0, 0, WIDTH, HEIGHT);
            analyser.getByteFrequencyData(dataArray);
            let v = (dataArray[1] + dataArray[2]) / 512;

            ctx.beginPath();
            ctx.arc(
              cx,
              cy,
              radiusMin + (radiusMax - radiusMin) * v * v * v * v,
              0,
              6.28
            );
            ctx.closePath();
            ctx.stroke();
            ctx.drawImage(canvas, -8, -8, WIDTH + 16, HEIGHT + 16);

            // requestAnimationFrame(render);
          }
        }
      }
    }

    // audio.play();
    renderFrame();
  };
});
