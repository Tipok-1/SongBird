import {birds_info} from './birds_info.js';

let start = document.querySelectorAll(".start");
let go_menu = document.querySelector(".go_menu");
let gif = document.querySelector(".gif");
let header = document.querySelector(".header");
let menu = document.querySelector(".menu");
let galery = document.querySelector(".galery");
let to_galery = document.querySelector('.to_galery');
let game_field = document.querySelector(".game_field");

let first_info = document.querySelector(".first_info");
let bird  = document.querySelector(".bird");
let bird_img_info  = bird.querySelector(".bird_img_info");
let bird_title  = bird.querySelector(".bird_title");
let close_first_info = false;

let help = document.querySelector(".help");
let popap = document.querySelector(".popap");

let click = new Audio('assets/sound/click.mp3');
let sound = true;
let play_click = ()=>{
    if(sound)
        click.play();
}
let error_answer = new Audio('assets/sound/error_answer.mp3');
let play_error = ()=>{
    if(sound)
        error_answer.play();
}
let correct_answer = new Audio('assets/sound/correct_answer.mp3');
correct_answer.volume = 0.2;
let play_correct = ()=>{
    if(sound)
        correct_answer.play();
}

for(let st of start){
st.addEventListener('click',(e)=>{
    e.preventDefault();
    menu.style.display = 'none';
    result.style.display = 'none';
    galery.style.display = 'none';
    game_field.style.display = 'flex';
    gif.style.visibility = 'hidden';
    header.style.height  = '100px';
    start[0].classList.add('active_link');
    go_menu.classList.remove('active_link');
    play_click();
    new_game();
})
}

go_menu.addEventListener('click',(e)=>{
    e.preventDefault();
    menu.style.display = 'flex';
    result.style.display = 'none';
    game_field.style.display = 'none';
    galery.style.display = 'none';
    gif.style.visibility = 'visible';
    header.style.height  = '200px';
    start[0].classList.remove('active_link');
    go_menu.classList.add('active_link');
    play_click();
    if(isPlaying)
        audio.pause();
    if(isPlaying_2)
        audio_2.pause();
    isPlaying = false;
    popap.style.display = 'none';
    playBtn.innerHTML="►";
})

to_galery.addEventListener('click',()=>{
    menu.style.display = 'none';
    galery.style.display = 'grid';
    gif.style.visibility = 'hidden';
    header.style.height  = '100px';
    go_menu.classList.remove('active_link');
    //start[0].classList.remove('active_link');
    play_click();
})

/*======================= */


let block_image = document.querySelector(".bird_img");
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
let name_question = ['forest','sea','predator','marsh','songbirds'];
let num_question = 0;
let correct_name = '';
let correct_lat = '';
let correct_img;
let score = 0;
let nums_error = 0;

function pick_random_bird(nm){
    let rand = randomInteger(0, 5);
    correct_img = `url(${birds_info[nm][rand].img})`;
    correct_lat  = ` (${birds_info[nm][rand].lat})`;
    correct_name = birds_info[nm][rand].name;
    audio.src = birds_info[nm][rand].sound;
}

let variant = document.querySelectorAll('.variant');
let next_round =  document.querySelector('.next');
let question = document.querySelectorAll('.question');
let score_block = document.querySelector('.score');
let bird_main_name = document.querySelector('.bird_name');
let result = document.querySelector('.result');
let bird_info = document.querySelector('.bird_info');

function set_variant(nm){
    for(let i = 0; i< variant.length; i++)
    {
        variant[i].innerHTML = birds_info[nm][i].name;
    }
}
let win_round = false;
function view_info(name,lat,img,sound, inf)
{
    bird_img_info.style.backgroundImage = `url(${img})`;
    bird_title.innerHTML = name + '\n'+`(${lat})`;
    audio_2.src = sound;
    bird_info.innerHTML = inf;
    if(isPlaying_2)
    {
        playBtn_2.click();
        can_play_2 = false;
    }
}           
for(let v of variant)
{
    v.addEventListener('click',(e)=>{
        if(!win_round){
            if(e.currentTarget.innerHTML == correct_name)
            {
                e.currentTarget.classList.add('correct_answer');
                block_image.style.backgroundImage = correct_img;
                score += 5 - nums_error;
                score_block.innerHTML = `Score ${score}`;
                next_round.style.backgroundColor = 'rgb(8, 15, 36)';
                bird_main_name.innerHTML = correct_name + correct_lat;
                win_round = true;
                if(num_question == 4)
                {
                    next_round.innerHTML = 'Результат';
                }
                play_correct();
                if(isPlaying)
                    playBtn.click();
            }
            else{
                if(!e.currentTarget.classList.contains('wrong_answer'))
                    nums_error++;
                e.currentTarget.classList.add('wrong_answer');
                play_error();
            }
        }
        if(!close_first_info )
        {
            first_info.style.display = 'none';
            bird.style.display = 'flex';
            close_first_info = true;
        }
        let now = 0;
        let quest = name_question[num_question];
        for(let i = 0; i<variant.length;i++)
        {
            if(variant[i] == v)
            {
                now = i;
            }     
        }     
        view_info(birds_info[quest][now].name,
        birds_info[quest][now].lat,
        birds_info[quest][now].img,
        birds_info[quest][now].sound,
        birds_info[quest][now].info)

    })
}
function sbros(){
    pick_random_bird(name_question[num_question]);
    set_variant(name_question[num_question]);
    block_image.style.backgroundImage = `url('assets/img/uncn1.jpeg')`;
    for(let v of variant)
    {
        if(v.classList.contains('correct_answer'))
            v.classList.remove('correct_answer');
        if(v.classList.contains('wrong_answer'))
            v.classList.remove('wrong_answer');
    }
    win_round = false;
    nums_error = 0;
    if(isPlaying)
        audio.pause();
    if(isPlaying_2)
        audio_2.pause();
    isPlaying = false;
    playBtn.innerHTML="►";
    next_round.style.backgroundColor = 'rgb(82, 78, 80)';
    bird_main_name.innerHTML = '***********';
    
    question_hide = false;
    check_tablet();
}
let button_restart = document.querySelector('.button_restart');
let result_info = document.querySelector('.result_info');
next_round.addEventListener('click',()=>{
    play_click();
    if(next_round.innerHTML == 'Результат')
    {
        if(score != 25)
            result_info.innerHTML = `Хороший результат ваш счёт ${score}`
        else{
            result_info.innerHTML = `Отличный результат! ${score}`
            button_restart.style.display = 'none';
        }
        result.style.display = 'flex';
        game_field.style.display = 'none';
    }
    if(win_round && num_question<4)
    {
        can_play = false;
        question[num_question].classList.remove('active_question');
        num_question++;
        if(num_question< 5)
            question[num_question].classList.add('active_question');
        sbros();
    }
})
button_restart.addEventListener('click',()=>{
    result.style.display = 'none';
    game_field.style.display = 'flex';
    new_game();
});

function new_game(){
    next_round.innerHTML = 'Следующий';
    question[num_question].classList.remove('active_question');
    num_question = 0;
    question[num_question].classList.add('active_question');
    score = 0;
    score_block.innerHTML = `Score ${score}`;
    sbros();
    first_info.style.display = 'flex';
    bird.style.display = 'none';
    close_first_info = false;
}
pick_random_bird(name_question[num_question]);
set_variant(name_question[num_question]);

/*===============*/
let close_popap = document.querySelector(".close_popap");
let vol= document.querySelector(".vol");

help.addEventListener('click',()=>{
    play_click();
    popap.style.display = 'flex';
})
close_popap.addEventListener('click',()=>{
    play_click();
    popap.style.display = 'none'
})
vol.addEventListener('click',(e)=>{
    if(sound){
        sound = false;
        e.target.style.backgroundImage = "url(assets/img/audio_off.png)";
        volume.value = 1;
        volume_2.value = 1;
        speaker.click();
        speaker_2.click();
    }
    else{
        sound = true;
        e.target.style.backgroundImage = "url(assets/img/audio_on.png)";
        volume.value = 0;
        volume_2.value = 0;
        speaker.click();
        speaker_2.click();
    }
})

export {play_click};