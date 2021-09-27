//list 새로 만들기
const state = ['.noneState', '.beforeState', '.progressState', '.endState'];
const todoInputCount = [];
const addNew = document.querySelectorAll('.addNew');

for (let i = 0; i < 4; i++){
    addNew[i].addEventListener('click', func=(e)=>{
        //div 태그 추가
        const todoDiv = document.createElement('div');
        const todoInputText = document.createElement('input');

        todoDiv.classList.add('todo');
        todoDiv.classList.add('list');
        todoInputText.classList.add('todoInput');

        todoDiv.appendChild(todoInputText);


        document.querySelector(state[i]).appendChild(todoDiv);
        
        // 새로 만들기를 제일 밑으로 보내기
        document.querySelector(state[i]).insertAdjacentElement('beforeend', addNew[i]);

        let timer;
        // const todoInput = document.querySelectorAll('.todoInput');
        // const todo = document.querySelectorAll('.todo');

        todoInputText.addEventListener('input', function(e) {
            if (timer) {
                clearTimeout(timer);
            }
                
            timer = setTimeout(function() {
            todoDiv.innerHTML = todoInputText.value;
            todoInputText.classList.add('.hide');
            }, 800);
        });
    })
}


// list text 입력

