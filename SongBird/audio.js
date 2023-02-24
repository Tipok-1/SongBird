let speaker = document.querySelector(".speaker");
let volume = document.querySelector(".volume");
let volume_div = document.querySelector(".volume_range");
let audio = document.querySelector(".audio");
let curTime = document.querySelector(".cur_time");
let playBtn = document.querySelector(".play_btn");
let playTime = document.querySelector(".playTime");
let allTime = document.querySelector(".allTime");

let speaker_2 = document.querySelector(".speaker_2");
let volume_2 = document.querySelector(".volume_2");
let volume_div_2 = document.querySelector(".volume_range_2");
let audio_2 = document.querySelector(".audio_2");
let curTime_2 = document.querySelector(".cur_time_2");
let playBtn_2 = document.querySelector(".play_btn_2");
let playTime_2 = document.querySelector(".playTime_2");
let allTime_2 = document.querySelector(".allTime_2");

var isPlaying = false;
var isPlaying_2 = false;

let can_play = false;
let can_play_2 = false;



function setMaxTime(au,curtm, all_tm){
    if(au.duration){
        if(au.duration>60)
            all_tm.innerHTML = parseInt(au.duration)/60+':'+ ((parseInt(au.duration)%60)<10 ?'0'+ parseInt(au.duration)%60: parseInt(au.duration)%60);
        else{
            all_tm.innerHTML = '00'+':'+((parseInt(au.duration)%60)<10 ?'0'+ parseInt(au.duration)%60: parseInt(au.duration)%60);
            curtm.max = parseInt(au.duration);
        }
    }
}
/*======================*/
audio.addEventListener('loadedmetadata', function () {
    setMaxTime(audio,curTime,allTime);
    can_play = true;
});
setMaxTime(audio,curTime,allTime);

audio_2.addEventListener('loadedmetadata', function () {
    setMaxTime(audio_2,curTime_2,allTime_2);
    can_play_2 = true;
});
setMaxTime(audio_2,curTime_2,allTime_2);
/*=====================*/

speaker.addEventListener("mouseover",()=>{
    volume.style.transform = "rotate(-90deg) scaleX(1)";
})
volume_div.addEventListener("mouseleave",()=>{
    volume.style.transform = "rotate(-90deg) scaleX(0)";
});

speaker_2.addEventListener("mouseover",()=>{
    volume_2.style.transform = "rotate(-90deg) scaleX(1)";
})
volume_div_2.addEventListener("mouseleave",()=>{
    volume_2.style.transform = "rotate(-90deg) scaleX(0)";
});
/*===============================*/

was_nul_vol = false;
was_nul_vol_2 = false;

volume.onchange = function() { 
    if(was_nul_vol){
        speaker.style.backgroundImage = "url(assets/img/audio_on.png)";
        was_nul_vol = false;
    }
    if(volume.value == 0)
    {
        speaker.style.backgroundImage = "url(assets/img/audio_off.png)";
        was_nul_vol = true;
    }
    audio.volume = volume.value/10;
}; 
volume_2.onchange = function() { 
    if(was_nul_vol_2){
        speaker_2.style.backgroundImage = "url(assets/img/audio_on.png)";
        was_nul_vol_2 = false;
    }
    if(volume_2.value == 0)
    {
        speaker_2.style.backgroundImage = "url(assets/img/audio_off.png)";
        was_nul_vol_2 = true;
    }
    audio_2.volume = volume_2.value/10;
}; 
/*============================*/
curTime.onchange = function() { 
    audio.pause(); 
    audio.currentTime = curTime.value; 
    isPlaying = true;
    playBtn.innerHTML="❚❚";
    audio.play(); 
}; 
curTime_2.onchange = function() { 
    audio_2.pause(); 
    audio_2.currentTime = curTime_2.value; 
    isPlaying_2 = true;
    playBtn_2.innerHTML="❚❚";
    audio_2.play(); 
}; 
/*=========================*/ 
audio.ontimeupdate = function() {
            
    var sec_num = audio.currentTime;
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    seconds=Math.round(seconds);

    if (hours < 10) {
      hours   = "0"+hours;
    }
    if (minutes < 10) {
      minutes = "0"+minutes;
    }
    if (seconds < 10) { seconds = "0"+seconds; } playTime.innerHTML = minutes+':'+seconds; 
    if(isPlaying) curTime.value = audio.currentTime; 
}; 
audio.onended = ()=>{
    isPlaying = false;
    playBtn.innerHTML="►";
}
audio_2.ontimeupdate = function() {
            
    var sec_num = audio_2.currentTime;
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    seconds=Math.round(seconds);

    if (hours < 10) {
      hours   = "0"+hours;
    }
    if (minutes < 10) {
      minutes = "0"+minutes;
    }
    if (seconds < 10) { seconds = "0"+seconds; } playTime_2.innerHTML = minutes+':'+seconds;
    if(isPlaying_2) curTime_2.value=audio_2.currentTime; 
}; 
audio_2.onended = ()=>{
    isPlaying_2 = false;
    playBtn_2.innerHTML="►";
}
/*====================================*/
speaker.onclick=function() { 
    if(volume.value == 0) { 
        volume.value =10; 
        audio.volume=1;
        speaker.style.backgroundImage = "url(assets/img/audio_on.png)";
        was_nul_vol = false;
    } else { 
        volume.value=0; 
        audio.volume=0;
        speaker.style.backgroundImage = "url(assets/img/audio_off.png)";
        was_nul_vol = true;
    } 
}; 
speaker_2.onclick=function() { 
    if(volume_2.value == 0) { 
        volume_2.value =10; 
        audio_2.volume=1;
        speaker_2.style.backgroundImage = "url(assets/img/audio_on.png)";
        was_nul_vol_2 = false;
    } else { 
        volume_2.value=0; 
        audio_2.volume=0;
        speaker_2.style.backgroundImage = "url(assets/img/audio_off.png)";
        was_nul_vol_2 = true;
    } 
}; 
/*============================== */
playBtn.addEventListener("click", (a)=> {

    if(can_play)
    {
        if(isPlaying)
        {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML="►";
        }
        else
        {
        audio.play();
        isPlaying = true;
        playBtn.innerHTML="❚❚";
        }
    }
    
});
playBtn_2.addEventListener("click", (a)=> {
    if(can_play_2)
    {
        if(isPlaying_2)
        {
        audio_2.pause();
        isPlaying_2 = false;
        playBtn_2.innerHTML="►";
        }
        else
        {
        audio_2.play();
        isPlaying_2 = true;
        playBtn_2.innerHTML="❚❚";
        }
    }
    
});
//})
