var todoList = (function(){

    // getting all required elements
    const inputBox = document.querySelector(".inputField input");
    const addBtn = document.querySelector(".inputField button");
    const todoList = document.querySelector(".todoList");
    const deleteAllBtn = document.querySelector(".footer button");
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    const url = "http://localhost:3000/todolist";
    var listArray = [];

    this.init = function () {
        showTasks();
        registerEvent();
    }

    function registerEvent() {
        inputBox.onkeyup = (event) => {
            if(event.keyCode === 13) {
                _addTask();
            } 
        }

        addBtn.onclick = () => { 
            _addTask();
        }

        deleteAllBtn.onclick = () => {
            var delelePromises = [];
            listArray.forEach(function(task) {
                delelePromises.push(
                    fetch(url + '/' + task.id, {
                    method: "DELETE"})
                );
            });
            Promise.all(delelePromises).then(function(res){
                showTasks();
            })
        }
    }

    function showTasks() {
        var self = this;
        fetch(url)
        .then(function(response) {
            response.text()
            .then(function(data) {
                listArray = data == null ? [] : JSON.parse(data);
                self._bindingItem(listArray);
            });
        });
    }

    _addTask = function() {
        let userEnteredValue = inputBox.value;
        var data = {};
        data.id = _generateId();
        data.title = inputBox.value;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            showTasks(); 
            addBtn.classList.remove("active"); 
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }
    
    _bindingItem = function(listArray) {
        pendingTasksNumb.textContent = listArray.length; 
        listArray.length > 0 ? deleteAllBtn.classList.add("active") : deleteAllBtn.classList.remove("active"); 
        let newLiTag = "";
        listArray.forEach((element, index) => {
            newLiTag += `<li>${element.title}<span class="icon" onclick="_deleteTask(${element.id})"><i class="fas fa-trash"></i></span></li>`;
        });
        todoList.innerHTML = newLiTag;
        inputBox.value = ""; 
    }

    _deleteTask = function(index) {
        fetch(url + '/' + index, {
            method: "DELETE"
        })
        .then(function(response) {
            response.text()
            .then(function(data) {
                showTasks(); 
            });
        });
    }

    _generateId = function() {
        if (listArray) {
            var maxIndex = 0;
            listArray.forEach(function(item){
                if(item.id > maxIndex) {
                    maxIndex = item.id;
                }
            });
            return ++maxIndex;
        }
        return 1;
    }

    return {
        init: this.init
    }
})();

todoList.init();

