const videoSource = document.querySelector(".viewer");
const videoTriggers = document.querySelectorAll(".viewer, .toggle");
const videoSliders = document.querySelectorAll(".player__slider");
const videoSkipper = document.querySelectorAll("button[data-skip]");
const videoProgressBar = document.querySelector(".progress__filled");
const videoProgress = document.querySelector(".progress");
const playIcon = document.querySelector(".toggle");

let isPlaying = false;
let progressTime = 0;

const handlePlay = () => {
  isPlaying === false
    ? `${videoSource.play()} ${(playIcon.textContent = "❚ ❚")}`
    : `${videoSource.pause()} ${(playIcon.textContent = "►")}`;
  isPlaying = !isPlaying;
};

const handleProgressTime = () => {
  progressTime =
    ((videoSource.currentTime / videoSource.duration) * 100).toString() + "%";
  videoProgressBar.style.flexBasis = progressTime;
};

const handleProgressBar = (e) => {
  const movieProgress =
    (e.offsetX / videoProgress.offsetWidth) * videoSource.duration;
  videoSource.currentTime = movieProgress;
};

const handleSlider = (e) => (videoSource[e.target.name] = e.target.value);

const handleSkip = (e) =>
  (videoSource.currentTime += parseInt(e.target.getAttribute("data-skip")));

videoTriggers.forEach((trigger) =>
  trigger.addEventListener("click", handlePlay)
);

videoSource.addEventListener("timeupdate", handleProgressTime);

videoProgress.addEventListener("click", handleProgressBar);

videoSliders.forEach((slider) =>
  slider.addEventListener("mousemove", handleSlider)
);

videoSkipper.forEach((skipper) =>
  skipper.addEventListener("click", handleSkip)
);
