import "./styles/index.scss";

const welcomeMessage = document.querySelector(".welcome-message");
const appContainer = document.querySelector(".app-container");
appContainer.style.display = "none";

window.addEventListener("click", openApp);

function openApp() {
  appContainer.style.display = "block";
  document.body.removeChild(welcomeMessage);
}

window.onload = function () {
  const file = document.getElementById("file-input");
  const canvas = document.getElementById("canvas");
  const h3 = document.getElementById("name");
  const audio = document.getElementById("audio");

  file.onchange = function () {
    const files = this.files;
    //list of file objects selected by user (DOM File API)
    audio.src = URL.createObjectURL(files[0]);
    //DOMString of selected file object

    const name = files[0].name;
    h3.innerText = `${name}`; // Sets <h3> to the name of the file

    /////C A N V A S//////
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ///////       ////////

    //interface audio-processing graph
    const context = new AudioContext();
    let src = context.createMediaElementSource(audio);
    //audio context -> audio source that can be played/analysed
    const analyser = context.createAnalyser();
    //analyser for audio context

    src.connect(analyser);
    //connects audio context source to analyser
    analyser.connect(context.destination);
    //destination === speakers/headphones

    analyser.fftSize = 8192;
    //FFT is an algo that samples a signal over a period of time and divides it into it's frequency components. it seperates the mixed signals and shows the violent vibration of a frequency. lower size = less bars

    const bufferLength = analyser.frequencyBinCount;
    //equals number of data values you have for visualizations

    const dataArray = new Uint8Array(bufferLength);
    //converts 8-bit unsigned interger array

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    ///BARZZZ
    const barWidth = (WIDTH / bufferLength) * 13;
    let barHeight;
    let x = 0;
    /////////////////////

    function renderFrame() {
      requestAnimationFrame(renderFrame); 
      //callback func to invoke before rendering

      ///BARZZZZ
      x = 0;
      ///

      analyser.getByteFrequencyData(dataArray);
       //frequency data -> dataArray

      ctx.fillStyle = "rgba(0,0,0,1)"; 
      // clears canvas with opacity 0.2
      ctx.fillRect(0, 0, WIDTH, HEIGHT); 
      // fade effect

      ///////////////////////////////////////
      //WAVEZZZZ set line width and stroke color for wave drawn, then begin path
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(57, 255, 20)";
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

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      ///////////////////////////////////////


      // /////BARZZZZ/////////
      // let r, g, b;
      // let bars = 200; // Set total number of bars you want per frame

      // for (let i = 0; i < bars; i++) {
      //   barHeight = (dataArray[i] * 2.5);

      //   if (dataArray[i] > 210) {
      //     // pink
      //     r = 255;
      //     g = 110;
      //     b = 199;
      //   } else if (dataArray[i] > 200) {
      //     // yellow
      //     r = 250;
      //     g = 237;
      //     b = 39;
      //   } else if (dataArray[i] > 190) {
      //     // green
      //     r = 57;
      //     g = 255;
      //     b = 20;
      //   } else if (dataArray[i] > 180) {
      //     // purple
      //     r = 188;
      //     g = 19;
      //     b = 254;

      //   } else {
      //     // blue
      //     r = 0;
      //     g = 249;
      //     b = 255;
      //   }

      //   ctx.fillStyle = `rgb(${r},${g},${b})`;
      //   ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      //   // (x, y, i, j)
      //   // (x, y) Represents start point
      //   // (i, j) Represents end point

      //   x += barWidth + 5; // Gives 10px space between each bar
      //   ///////////////////////////////////////
      // }
      //   ///////////////////////////////////////
    }

    audio.play();
    renderFrame();
  };;;
};