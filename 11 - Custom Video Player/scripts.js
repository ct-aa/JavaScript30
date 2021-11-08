const videoSource = document.querySelector(".viewer");
const videoTriggers = document.querySelectorAll(".viewer, .toggle");
const videoSliders = document.querySelectorAll(".player__slider");
const videoSkipper = document.querySelectorAll("button[data-skip]");
const videoProgress = document.querySelector(".progress__filled");

let isPlaying = false;

const handlePlay = () => {
  isPlaying == false ? `${videoSource.play()}` : `${videoSource.pause()}`;
  isPlaying = !isPlaying;
};

const handleProgress = () => {
  let progressTime =
    ((videoSource.currentTime / videoSource.duration) * 100).toString() + "%";
  videoProgress.style.flexBasis = progressTime;
};

const handleSlider = (e) => (videoSource[e.target.name] = e.target.value);
const handleSkip = (e) =>
  (videoSource.currentTime += parseInt(e.target.getAttribute("data-skip")));

videoTriggers.forEach((trigger) =>
  trigger.addEventListener("click", handlePlay)
);
videoSliders.forEach((slider) =>
  slider.addEventListener("mousemove", handleSlider)
);
videoSkipper.forEach((skipper) =>
  skipper.addEventListener("click", handleSkip)
);

videoSource.addEventListener("timeupdate", handleProgress);
