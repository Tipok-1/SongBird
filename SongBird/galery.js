import {birds_info} from './birds_info.js';
import {play_click} from './script.js';

let galery = document.querySelector(".galery");
let galery_popap = document.querySelector(".galery_popap");
let gl_img = document.querySelector(".gl_img ");
let gl_title = document.querySelector(".gl_title ");
let galery_info = document.querySelector(".galery_info");
let black_back = document.querySelector(".black_back");
let close_popap_galery = document.querySelector(".close_popap_galery");

let name_question = ['forest','sea','predator','marsh','songbirds'];
let all = [];
for(let i = 0; i<name_question.length; i++)
{
    all = all.concat(birds_info[name_question[i]]);
}
let all_birds = 30;
for(let i = 0; i<all_birds;i++)
{
    let el = document.createElement('div');
    let el_img = document.createElement('div');
    let el_name = document.createElement('div');
    el.classList.add('grid_element');
    el_img.classList.add('el_img');
    el_name.classList.add('el_name');

    el_img.style.backgroundImage = `url(${all[i].img})`;
    el_name.innerHTML = all[i].name;
    el.appendChild(el_img);
    el.appendChild(el_name);

    el.addEventListener('click',(e)=>{
        play_click();
        let nm = i;
        galery_popap.style.display = 'flex';
        black_back.style.display = 'block';
        gl_img.style.backgroundImage = `url(${all[nm].img})`;
        gl_title.innerHTML =  all[nm].name + '\n'+ `(${all[nm].lat})`;
        galery_info.innerHTML = all[nm].info;
    })

    galery.appendChild(el);
}

function close_gl_popap(){
    play_click();
    galery_popap.style.display = 'none';
    black_back.style.display = 'none';
}
close_popap_galery.addEventListener('click',close_gl_popap);
black_back.addEventListener('click',close_gl_popap);