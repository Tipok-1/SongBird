let mql = window.matchMedia('(max-width: 850px)');
window.addEventListener('resize',check_tablet);
document.addEventListener("DOMContentLoaded", check_tablet);
let quest = document.querySelectorAll('.question');
let question_hide = false;
let name_quest = ['Лесные птицы','Морские птицы','Хищные птицы','Болотные птицы','Певчие птицы'];
function hide_question(hide){
    if(hide)
    {
        for(let i = 0; i < quest.length; i++)
        {
            if(!quest[i].classList.contains('active_question'))
            {
                quest[i].innerHTML = '';
            }
            else{
                quest[i].innerHTML = name_quest[i];
            }
        }
    }
    else{
        for(let i = 0; i < quest.length; i++)
        {
            quest[i].innerHTML = name_quest[i];
        }
    }
}
function check_tablet(){
    if(mql.matches)
    {
        if(!question_hide)
        {
            question_hide = true;
            hide_question(question_hide);
        }
    }
    else{
        if(question_hide)
        {
            question_hide = false;
            hide_question(question_hide);
        }
    }
}