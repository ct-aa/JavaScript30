const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const screenshots = [];

const constraints = {
  video: true,
  audio: false,
};

const getVideo = async () => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  setVideo(stream);
};

const setVideo = (stream) => {
  video.srcObject = stream;
  video.play();
};

const drawVideo = () => {
  const { videoWidth: width, videoHeight: height } = video;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    const currentVideo = ctx.getImageData(0, 0, width, height);
    const updatedVideo = rgbSpliter(currentVideo, {
      rOffset: -250,
      gOffset: 500,
      bOffset: -350,
    });
    ctx.putImageData(updatedVideo, 0, 0);
  }, 0);
};

const rgbSpliter = (currentVideo, rgbOffset) => {
  const { rOffset, gOffset, bOffset } = rgbOffset;
  for (let i = 0; i < currentVideo.data.length; i += 4) {
    currentVideo.data[i + rOffset] = currentVideo.data[i + 0];
    currentVideo.data[i + gOffset] = currentVideo.data[i + 1];
    currentVideo.data[i + bOffset] = currentVideo.data[i + 2];
  }
  return currentVideo;
};

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  const photo = canvas.toDataURL("image/jpeg");
  screenshots.unshift(
    `<a href="${photo}" download="handsome"><img src="${photo}"/></a>`
  );

  strip.innerHTML = screenshots;
};

window.addEventListener("load", getVideo);
video.addEventListener("canplay", drawVideo);
