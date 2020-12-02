import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const file = document.getElementById("file-input");
  const canvas = document.getElementById("canvas");
  const h3 = document.getElementById("name");
  const audio = document.getElementById("audio");
  const visuals = ["waveVisual", "barVisual", "circleVisual"];
  // const visuals = ["barVisual"];

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
    canvas.setAttribute("background-image", "url('/assets/images/stars.jpg')");
  }

  const questionIcon = document.getElementById("question-icon");
  questionIcon.addEventListener("click", answerQuestion);

  function answerQuestion() {
    openModal();
  }

  //random visual selector//
  const visualButton = document.querySelector("button");
  visualButton.addEventListener("click", visualSelector);
  let visual;
  function visualSelector() {
    visual = visuals[Math.floor(Math.random() * visuals.length)];
  }

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
    //creates analyser node, which allows you to extract data from your audio source
    const analyser = context.createAnalyser();
    //analyser node then connects to audio source (your speakers)
    src.connect(analyser);
    analyser.connect(context.destination);
    //returns the fft size in half
    const bufferLength = analyser.frequencyBinCount;
    //creates an array for 8-bit unsigned integers, and the frequencyBinCount's length is how many data points that will be collected for the fft size
    const dataArray = new Uint8Array(bufferLength);
    /////

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      //capture the frequency data and copies it into the dataArray
      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      const random = Math.random;

      function getRandomColor() {
        return (random() * 255) >> 0;
      }

      if (visual === "barVisual") {
        // const barWidth = (WIDTH / bufferLength) * 5;
        const barWidth = (WIDTH / bufferLength) * 40;
        let barHeight;
        let x = 0;
        let r, g, b;
        //total number of bars per frame
        let bars = 200;

        // const barFftSizes = [512, 1024, 2048, 4096];
        const barFftSizes = [2048];
        analyser.fftSize =
          barFftSizes[Math.floor(Math.random() * barFftSizes.length)];

        for (let i = 0; i < bars; i++) {
          barHeight = dataArray[i] * 2.5;

          if (dataArray[i] > 220) {
            r = getRandomColor();
            g = getRandomColor();
            b = getRandomColor();
          } else if (dataArray[i] > 210) {
            //hot orange
            r = 255;
            g = 115;
            b = 0;
          } else if (dataArray[i] > 200) {
            // hot pink
            r = 255;
            g = 105;
            b = 180;
          } else if (dataArray[i] > 190) {
            // cornflower blue
            r = 39;
            g = 58;
            b = 93;
          } else if (dataArray[i] > 180) {
            // fluorescent yellow
            r = 204;
            g = 255;
            b = 0;
          } else if (dataArray[i] > 160) {
            //bright purple
            r = 115;
            g = 0;
            b = 255;
            // } else if (dataArray[i] > 150) {
            //   r = getRandomColor();
            //   g = getRandomColor();
            //   b = getRandomColor();
          } else if (dataArray[i] > 140) {
            //bright baby blue
            r = 0;
            g = 140;
            b = 255;
          } else if (dataArray[i] > 120) {
            //seamoss
            r = 0;
            g = 169;
            b = 137;
          } else if (dataArray[i] > 80) {
            // dark neon pink
            r = 255;
            g = 0;
            b = 140;
          } else if (dataArray[i] > 40) {
            // neon purple
            r = 125;
            g = 18;
            b = 255;
          } else {
            // neon green
            r = 140;
            g = 255;
            b = 0;
          }

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
          //spacing between bar
          x += barWidth + 10;
        }
      } else if (visual === "waveVisual") {
        const waveFftSizes = [2048];
        analyser.fftSize =
          waveFftSizes[Math.floor(Math.random() * waveFftSizes.length)];
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
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.lineTo(WIDTH, HEIGHT / 2);
        ctx.stroke();
      } else if (visual === "circleVisual") {
        if (audio.paused) {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
        } else {
          // canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
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
          }
        }
      } else if (audio.pause) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }
    }

    renderFrame();
  };
});
