/**
 * Play button
 * @type {HTMLElement}
 */
let playBtn = document.querySelector('.player__button');

/**
 * Progress bar container
 * @type {HTMLElement}
 */
let progressBarContainer = document.querySelector('.progress');

/**
 * Progress bae
 * @type {HTMLElement}
 */
let progressFilled = document.querySelector('.progress__filled');

/**
 * Skip btns
 * @type {HTMLElement}
 */
let skipBtns = Array.from(document.querySelectorAll('.player__button[data-skip]'));

/**
 * Speed up and volume buttons
 * @type {Array}
 */
let sliderBtns = Array.from(document.querySelectorAll('.player__slider'));

/**
 * The video
 * @type {HTMLElement}
 */
let video = document.querySelector('.player__video');


video.addEventListener('loadeddata', function(){

  /**
   * Duration of the video
   * @type {Number}
   */
  let videoDuration = video.duration;

  // Complete the progress bar
  // while video is playing
  video.addEventListener('timeupdate', handleProgress);

  // Play with the progress bar
  // to change the video playing part
  let enableProgress = false;
  progressBarContainer.addEventListener('click', handleProgressClick);
  progressBarContainer.addEventListener('mousemove', handleProgressClick);
  progressBarContainer.addEventListener('mousedown', () => enableProgress = true);
  progressBarContainer.addEventListener('mouseup', () => enableProgress = false);

  // Play or pause the video
  playBtn.addEventListener('click', handleVideoPlay);
  video.addEventListener('click', handleVideoPlay);

  // Control the skip part of the video
  skipBtns.forEach(skipBtn => {
    skipBtn.addEventListener('click', skip)
  })

  sliderBtns.forEach(slider => {
    slider.addEventListener('change', function(){
      video[this.name] = this.value;
    });
  });

  /**
   * Function to control the part of the video the user want to plat
   * @param  {Event} The event
   * @return {Undefined}
   */
  function handleProgressClick(e){
    if(e.type == 'click' || enableProgress){
      let offsetX = e.offsetX;
      let percentage = Math.floor((offsetX * 100) / progressBarContainer.offsetWidth);
      progressFilled.style.flexBasis = percentage + '%';

      let currentTime = (videoDuration * percentage) / 100;
      video.currentTime = currentTime;
    }
  }

  /**
   * Fill the progress bar
   * @param  {Event} e The event
   * @return {undefined}
   */
  function handleProgress(e){
    let percentage = Math.floor((video.currentTime * 100) / videoDuration);
    progressFilled.style.flexBasis = percentage + '%';
  }

  /**
   * Play or pause the video
   * @return {undefined}
   */
  function handleVideoPlay(){
    if(video.paused){
      video.play();
      playBtn.innerText = '❚ ❚'
    } else {
      video.pause();
      playBtn.innerText = '►'
    }
  }

  /**
   * Change the volume of the video
   * @param  {Event} e The event
   * @return {undefined}
   */
  function handleVolume(e){
    video.volume = this.value;
  }

  /**
   * Skip a video part
   * @return {undefined}
   */
  function skip(){
    video.currentTime += parseInt(this.dataset.skip);
  }

})