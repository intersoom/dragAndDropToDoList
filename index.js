//list 새로 만들기
const states = document.querySelectorAll('.state');
const addNew = document.querySelectorAll('.addNew');
let draggedItem = null;

window.onload = function(){
    localStorage.clear();
}

let key = 0;
let objInnerText = {}

for (let i = 0; i < states.length; i++){
    let count = 0;
    addNew[i].addEventListener('click', func=(e)=>{
        objInnerText[key] = '';
        //div 태그 추가
        const todoDiv = document.createElement('span');
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
        states[i].appendChild(todoDiv);
        
        //todo 갯수 count 체크
        count ++;
        states[i].querySelector('.count').innerHTML = count;

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
            objInnerText[key] = todoInputText.value;
            todoDiv.id = key;
        };
        
        // 새로 만들기를 제일 밑으로 보내기
        states[i].insertAdjacentElement('beforeend', addNew[i]);

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
            states[i].removeChild(todoDiv);
            count --;
            states[i].querySelector('.count').innerHTML = count;
        })

        //리스트 이름 작성 -> 글씨로 바꾸기
        todoInputText.onkeyup = func=()=>{
            if (window.event.keyCode == 13){
                console.log('enter pressed')
                enterPressed();
                //DB 정보 전송 (수정 필요)
                localStorage.setItem('DB', JSON.stringify(objInnerText));
                //key 값 + 1
                key ++
            }
        };
        
        //drag and drop 기능 추가
        todoDiv.draggable = 'true';

        todoDiv.addEventListener('dragstart', function() {
            draggedItem = todoDiv;
            todoDiv.classList.add('.dragging');
            setTimeout(function() {
                todoDiv.style.display = 'none';
            }, 0);
        })
        
        todoDiv.addEventListener('dragend', function() {
          setTimeout(function(){
            draggedItem.style.display = 'flex';
            draggedItem = null;
          }, 0);
        })
    })

    //drag and drop
    states[i].addEventListener('dragover', function(e){
        e.preventDefault();
    })

    states[i].addEventListener('dragenter', function(e){
        e.preventDefault();
        
        const afterElement = getDragAfterElement(states[i], e.clientY);

        if(afterElement == null){
            this.append(draggedItem);
            this.insertAdjacentElement('beforeend', addNew[i]);
        } else {
            this.insertBefore(draggedItem, afterElement);
        }
    })

    //drag and drop 시 count 변경
    states[i].addEventListener('dragstart', function(e){
        count --;
        this.querySelector('.count').innerHTML = count;
    })

    states[i].addEventListener('dragend', function(e){
        count ++;
        this.querySelector('.count').innerHTML = count;
    })

    

    function getDragAfterElement(state, y){
        const draggableElements = [...state.querySelectorAll('.todo:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2
            console.log(offset);
            if (offset < 0 && offset > closest.offset){
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element;
    }
}

//검색 기능 (중복되는 것 찾을 수 있도록 -> json 쓰기, 그냥 지우면 색 안 없어지는 것 처리)
let timer;
let searchKey;

document.querySelector('.searchBox').addEventListener('input', function(e) {
    if (timer) {
        clearTimeout(timer);
    }

    if (e.target.value !== searchKey){
        document.querySelectorAll('.todo').forEach( todo => todo.style.backgroundColor = 'white');
    }

    timer = setTimeout(function() {
        let DB = localStorage.getItem('DB');
        DB = JSON.parse(DB);

        Object.keys(DB).forEach(function(k){
            if (e.target.value == DB[k]){
                console.log(k)
                document.getElementById(k).style.backgroundColor = 'rgba(255, 199, 199, 30)';
                searchKey = e.target.value;
            }
        })

        //엑스 버튼 누르면 모두 취소
        const xBtn = document.querySelector('.Xbutton');
        xBtn.addEventListener('click', function(){
            Object.keys(DB).forEach(function(k){
                document.getElementById(k).style.backgroundColor = 'white';
                e.target.value = '';
            })
        })        
    }, 200); 
});
