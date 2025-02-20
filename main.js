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
// let allItems = document.getElementById("all-items");
// let ongoingItems = document.getElementById("ongoing-items");
// let doneItems = document.getElementById("done")
let tabs = document.querySelectorAll(".task-tabs div") //task-tabs아래에 있는 div 다 가져온다.
let horizontalUnderline = document.getElementById("horizontal-underline")
let taskList=[];
let mode = 'all-items';
let filterList=[];

tabs.forEach((menu)=>menu.addEventListener("click",(e)=>horizontalIndicator(e)));

function horizontalIndicator(e){
    horizontalUnderline.style.left = e.currentTarget.offsetLeft+"px";
    horizontalUnderline.style.width = e.currentTarget.offsetWidth+"px";
    horizontalUnderline.style.top = e.currentTarget.offsetTop+e.currentTarget.offsetHeight+"px";
}
// 버튼 비활성화, 경고 문구 3일동안 고민하다가 결국 chat gpt..
taskInput.addEventListener("input", function () {
    addButton.disabled = taskInput.value.trim() === "";
});
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",function(){taskInput.value=""});
taskInput.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        addButton.addEventListener("click",addTask());
}})



for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}

console.log(tabs);
// ongoingItems.addEventListener("click",ongoing);
// doneItems.addEventListener("click",imdone);
// allItems.addEventListener("click", backtoall);

function addTask(){
        if (taskInput.value.trim() === "") {
            alert("할 일을 입력해주세요!");
            return;
        }
    let task = {
        id : randomIdGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    if(taskInput.value>0){
        addButton.disabled = false
    }
    taskList.push(task);
    console.log(taskList);
    render();
    taskInput.value=""; //할 일 입력 후 입력창 자동으로 비워짐
}


function render(){
    // 1. 내가 선택한 탭에 따라서 
    let list = [];
    
    if(mode === "all-items"){
        list = taskList;
    }else if(mode === "ongoing-items" || mode === "done"){
        list = filterList;
    }
    //2. 리스트를 달리 보여준다.
    let resultHTML = '';
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += `<div id = "task">
                <div class = "task-done">${list[i].taskContent}</div> 
                <div>
                    <button class="btn1" onclick = "toggleComplete('${list[i].id}')"><i class="fa fa-rotate-left"></i></button> 
                    <button class="btn" onclick = "deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
            </div> `;
            
        }else{resultHTML += `<div id = "task">
            <div>${list[i].taskContent}</div> 
            <div>
                <button class="btn" onclick = "toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button> 
                <button class="btn" onclick = "deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
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
    filter({ target: { id: mode } });
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
        filter({ target: { id: mode } });
        //삭제는 tasklist, 하지만 filterlist에는 반영 안됨.
        //진행중과 끝남 탭에서는 filterlist만 보여줌
        //이것도 결국 chat gpt.. 
    }

function filter(event){
    //내가 누구를 클릭했는지에 대한 정보를 event가 가지고 있음 add.eventlistner
    console.log("filter",event.target.id)
    filterList = [];
    mode = event.target.id
    if(mode ==="all-items"){
        //전체 리스트를 보여준다.
        render();
    }else if(mode ==="ongoing-items"){
        //진행중인 아이템을 보여준다.
        //task.isComplete=false
        for(let i = 0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
        console.log("진행중",filterList)

    }else if(mode ==="done"){
        //끝나는 케이스
        //task.isComplete=true
        for(let i = 0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

// function ongoing(id){
//     console.log("진행중인 아이템이다.")
//     let resultHTML = '';
//     for(let i=0;i<taskList.length;i++){
//         if(taskList[i].isComplete == false){
//             resultHTML += `<div id = "task">
//             <div>${taskList[i].taskContent}</div> 
//             <div>
//                 <button class="btn" onclick = "toggleComplete('${taskList[i].id}'); change()"><i class="fa fa-check"></i></button> 
//                 <button class="btn" onclick = "deleteTask('${taskList[i].id}')"><i class="fa fa-trash"></i></button>
//             </div>
//         </div> `;
//     }
// }
// document.getElementById("task-board").innerHTML = resultHTML;
// }

// function imdone(id){
//     console.log("끝난 아이템만 표시하러 간다.")
//     let resultHTML = '';
//     for(let i=0;i<taskList.length;i++){
//         if(taskList[i].isComplete == true){
//             resultHTML += `<div id = "task">
//                 <div class = "task-done">${taskList[i].taskContent}</div>
//                 <div>
//                     <button class="btn1" onclick = "toggleComplete('${taskList[i].id}') ; change()"><i class="fa fa-rotate-left"></i></button> 
//                     <button class="btn" onclick = "deleteTask('${taskList[i].id}')"><i class="fa fa-trash"></i></button>
//                 </div>
//             </div> `;
//     }
// }
// document.getElementById("task-board").innerHTML = resultHTML;
// }
// function backtoall(id){
//         console.log("모두 클릭")
//         render();
//         }