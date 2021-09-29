//list 새로 만들기
const state = ['.noneState', '.beforeState', '.progressState', '.endState'];
const addNew = document.querySelectorAll('.addNew');

for (let i = 0; i < state.length; i++){
    addNew[i].addEventListener('click', func=(e)=>{
        //div 태그 추가
        const todoDiv = document.createElement('div');
        const todoInputText = document.createElement('input');
        
        //icon 추가
        const todoDivIcons = document.createElement('div');
        const todoEdit = document.createElement('button');
        const todoDelete = document.createElement('button');
        const editIcon = document.createElement('i');
        const deleteIcon = document.createElement('i');
        const innerText = document.createElement('p');

        todoDiv.classList.add('todo');
        todoDiv.classList.add('list');
        todoInputText.classList.add('todoInput');
        todoDivIcons.classList.add('icons');
        todoEdit.classList.add('edit');
        todoDelete.classList.add('delete');
        editIcon.classList.add('far');
        editIcon.classList.add('fa-edit');
        deleteIcon.classList.add('far');
        deleteIcon.classList.add('fa-trash-alt');

        todoDiv.appendChild(todoInputText);
        document.querySelector(state[i]).appendChild(todoDiv);

        //todo 내용 입력 후 엔터 입력시
        enterPressed=()=> {
            innerText.innerHTML = todoInputText.value;
            todoDiv.appendChild(innerText);
            innerText.classList.remove('hide');
            todoInputText.classList.add('hide');
            
            todoEdit.appendChild(editIcon);
            todoDelete.appendChild(deleteIcon);

            todoDivIcons.appendChild(todoEdit);
            todoDivIcons.appendChild(todoDelete);

            todoDiv.appendChild(todoDivIcons);
        };
        
        // 새로 만들기를 제일 밑으로 보내기
        document.querySelector(state[i]).insertAdjacentElement('beforeend', addNew[i]);

        // 수정
        todoEdit.addEventListener('click', func=(e)=>{
            todoInputText.classList.remove('hide');
            innerText.classList.add('hide');
            
            if (window.event.keyCode == 13) {
                enterPressed();
            } 
        })

        //삭제
        todoDelete.addEventListener('click', func=(e)=>{
            document.querySelector(state[i]).removeChild(todoDiv);
        })

        //리스트 이름 작성 -> 글씨로 바꾸기

        todoInputText.onkeyup = func=()=>{
            if (window.event.keyCode == 13){
                console.log('enter pressed')
                enterPressed();
            }
        };

        

    })
}

