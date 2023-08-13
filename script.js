const play = document.getElementById('play');
const video = document.getElementById('video');
//by default set volume to 70%
video.volume = 0.7;
isvideoplaying = false
function playvideo(){
    isvideoplaying =true
    video.play();
    play.classList.replace('fa-play','fa-pause');
}
function pausevideo(){
    isvideoplaying = false
    video.pause();
    play.classList.replace('fa-pause','fa-play');
}


play.addEventListener('click',function(){
    if(isvideoplaying){
        pausevideo();
    }
    else{
        playvideo();
    }
})
//----------------------------------Time Update----------------------------------------
const progressbar = document.querySelector('.progress-bar');
const runtime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
video.addEventListener('timeupdate',function(event){
    // console.log(event.srcElement.currentTime,event.srcElement.duration);   Check objects by simply consoling event
    let currtime =video.currentTime;
    let totaltime = video.duration;
    let myPercentage = (currtime/totaltime)*100;  //percentage of currtime
    progressbar.style.width = `${myPercentage}%`;

    if(Math.floor(currtime%60) < 9){
        runtime.innerText = `${Math.floor(currtime/60)}:0${Math.floor(currtime%60)}`
    }
    else{runtime.innerText = `${Math.floor(currtime/60)}:${Math.floor(currtime%60)}`}
    
    if(Math.floor(totaltime%60) < 9){duration.innerText = `/${Math.floor(totaltime/60)}:0${Math.floor(totaltime%60)}`}
    else{duration.innerText = `/${Math.floor(totaltime/60)}:${Math.floor(totaltime%60)}`}
})

//------------------------------------Clicked at position-----------------------
const progressrange = document.querySelector('.progress-range');
progressrange.addEventListener('click',function(event){
    //Logic to move prgressbar to clicked position
    // console.log(event);
    //console.log(event.srcElement.offsetWidth)  Gives total width of range
    const totalwidth = event.srcElement.offsetWidth;
    //console.log(event.offsetX) Gives the value of the clicked distance from original
    const clickeddistance = event.offsetX;
    const clickPercentage = (clickeddistance/totalwidth)*100;
    // console.log(clickPercentage);
    progressbar.style.width = `${clickPercentage}%`;

    video.currentTime = (clickeddistance / totalwidth) * video.duration;
})

//------------------------------------Clicked at volume-----------------------
const volumerange = document.getElementById('volume-range');
const volumebar = document.getElementById('volume-bar');
volumerange.addEventListener('click',function(event){
    let totalvolume = event.srcElement.offsetWidth;
    let clickvolume = event.offsetX;
    let volpercentage = (clickvolume / totalvolume) * 100;
    volumebar.style.width = `${volpercentage}%`;
    let volumeinfo = clickvolume / totalvolume;  //This gives the value between 0 to 1
    video.volume = volumeinfo; // And value ranges from 0 to 1
})
const volumebtn = document.querySelector('#volume');
let ismute = false;
volumebtn.addEventListener('click',function(){
    if(ismute){
        ismute = false
        video.volume = 1;
        volumebtn.classList.replace('fa-volume-xmark','fa-volume-up')
    }
    else{
        ismute = true
        video.volume = 0
        volumebtn.classList.replace('fa-volume-up','fa-volume-xmark')
    }
})
//------------------------------------Entering fullscreen-----------------------
// window.innerWidth and window.innerHeight are used to get the height and width of clients display
const fullscreen = document.getElementById('fullscreen');
const playercontainer = document.getElementById('player-container');
let Fullscreen = false;

function displayFullscreen(container){
    if(container.requestFullscreen){
        container.requestFullscreen();
    }
}
function closeFullscreen(container){
    if(container.exitFullscreen){
        container.exitFullscreen();
    }
}

fullscreen.addEventListener('click',function(){
    if(!Fullscreen){
        displayFullscreen(playercontainer);
    }
    else{
        closeFullscreen(playercontainer);
    }
})
//fullscreen.addEventListener('click',function(){
//     video.style.width =`${window.innerWidth}px`;
//     video.style.height = `${window.innerHeight}px`;
// })  This is also one method

//------------------------------------Playback Speed-----------------------
const Speed = document.getElementById('speed');
playback.addEventListener('change',function(){
    video.playbackRate = Speed.value;
})