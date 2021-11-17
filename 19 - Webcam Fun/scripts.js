const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const photoContent = [];

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
  }, 0);
};

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL("image/jpeg");
  photoContent.unshift(
    `<a href="${data}" download="handsome"><img src="${data}" alt="Handsome Man" /></a>`
  );

  strip.innerHTML = photoContent;
};

window.addEventListener("load", getVideo);
video.addEventListener("canplay", drawVideo);
