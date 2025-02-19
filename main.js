//유저가 값을 입력한다.
//+버튼을 클릭하면, 할 일이 추가된다.
//delete버튼을 누르면 할일이 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1. check버튼을 클릭하면 true->false
// 2.true이면 끝난걸로-> 밑줄
// 3.false이면 안끝남
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝난 탭은,끝난 아이템만, 진행중 탭은 진행중 아이템만
//전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let allItems = document.getElementById("all-items");
let ongoingItems = document.getElementById("ongoing-items");
let doneItems = document.getElementById("done")
let taskList=[];
addButton.addEventListener("click",addTask);
ongoingItems.addEventListener("click",ongoing);
doneItems.addEventListener("click",imdone);
allItems.addEventListener("click", backtoall);

function addTask(){
    let task = {
        id : randomIdGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div id = "task">
                <div class = "task-done">${taskList[i].taskContent}</div> 
                <div>
                    <button class="btn1" onclick = "toggleComplete('${taskList[i].id}')"><i class="fa fa-rotate-left"></i></button> 
                    <button class="btn" onclick = "deleteTask('${taskList[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
             </div> `;
            
        }else{resultHTML += `<div id = "task">
            <div>${taskList[i].taskContent}</div> 
            <div>
                <button class="btn" onclick = "toggleComplete('${taskList[i].id}')"><i class="fa fa-check"></i></button> 
                <button class="btn" onclick = "deleteTask('${taskList[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div> `;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
    
}

function toggleComplete(id){
    console.log("id:",id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}
//delete 스스로 만들기 실패 했어요.
function deleteTask(id){
    console.log("삭제하다",id)
    for(let i=0;i<taskList.length;i++){
            if(taskList[i].id ==id){
                taskList.splice(i,1);
                break;
            }
        }
        render();
    }
function ongoing(id){
    console.log("진행중인 아이템이다.")
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == false){
            resultHTML += `<div id = "task">
            <div>${taskList[i].taskContent}</div> 
            <div>
                <button class="btn" onclick = "toggleComplete('${taskList[i].id}'); change()"><i class="fa fa-check"></i></button> 
                <button class="btn" onclick = "deleteTask('${taskList[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div> `;
    }
}
document.getElementById("task-board").innerHTML = resultHTML;
}

function imdone(id){
    console.log("끝난 아이템만 표시하러 간다.")
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div id = "task">
                <div class = "task-done">${taskList[i].taskContent}</div> 
                <div>
                    <button class="btn1" onclick = "toggleComplete('${taskList[i].id}') ; change()"><i class="fa fa-rotate-left"></i></button> 
                    <button class="btn" onclick = "deleteTask('${taskList[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
            </div> `;
    }
}
document.getElementById("task-board").innerHTML = resultHTML;
}
function backtoall(id){
        console.log("모두 클릭")
        render();
        }
    



function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
