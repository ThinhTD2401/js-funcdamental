
var api = (function() {
    var url ='';

    function init(url) {
        this.url = url;
    }
    function _delete(id) {
        return fetch(this.url + '/' + id, {method: "DELETE"})
            .then(response => response.json())
            .catch((error) => { console.error('Error:', error) });
    }

    function _post(data) {
        return fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function _get(id) {
        return fetch(this.url + '/' + id)
        .then(response => response.json())
        .catch((error) => { console.error('Error:', error) });
    }

    function _put(id, data) {
        return fetch(this.url + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function _filter(keyword) {
        return fetch(this.url + '?q=' + keyword)
        .then((response) => {
            return response.text();
        })
        .catch((error) => { console.error('Error:', error) });
    }
    
    return {
        delete: _delete,
        post: _post,
        get: _get,
        put: _put,
        filter: _filter,
        init: init
    }
})();

var loading = (function() {
    var loading = null;

    function init(selector) {
        this.loading = document.querySelector(selector);
    }

    function show() {
        this.loading.classList.add('loader-active');
    }

    function hide() {
        this.loading.classList.remove('loader-active');
    }

    return {
        init: init,
        show: show,
        hide: hide
    }

})();

var todoList = (function(api, loading){

    // getting all required elements
    const inputBox = document.querySelector(".inputField input");
    const addBtn = document.querySelector(".inputField button");
    const todoList = document.querySelector(".todoList");
    const deleteAllBtn = document.querySelector(".footer button");
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    const url = "https://json-server-td.herokuapp.com/todolist";
    var listArray = [];

    this.init = function () {
        loading.init('.loader');
        api.init(url);
        showTasks();
        registerEvent();
    }

    registerEvent = function () {
        inputBox.onkeyup =  _onHandleAdding;
        addBtn.onclick = _onHandleAdding;
        deleteAllBtn.onclick = _onHandleDeletingAll;
    }

    _onHandleDeletingAll = function() {
        var delelePromises = [];
        listArray.forEach(function(task) {
            delelePromises.push(api.delete(task.id));
        });
        Promise.all(delelePromises).then(function(res){
            showTasks();
        })
    }

    showTasks = function () {
        loading.show();
        var self = this;
        api.filter('')
        .then(function(data) {
            listArray = data == null ? [] : JSON.parse(data);
            self._bindingItem(listArray);
            loading.hide();
        });
    }

    _onHandleAdding = function(event) {
        let userEnteredValue = inputBox.value;
        userEnteredValue != '' ? addBtn.classList.add('active') : addBtn.classList.remove('active');
        if((event.keyCode === 13 && event instanceof KeyboardEvent) || event instanceof FocusEvent) {
            var data = {
                id: _generateId(),
                title: userEnteredValue
            };
            _addTask(data);
        }
       
    }

    _addTask = function(data) {
        api.post(data)
            .then(data => {
                showTasks(); 
                addBtn.classList.remove("active"); 
            });
        
    }
    
    _bindingItem = function(listArray) {
        pendingTasksNumb.textContent = listArray.length; 
        listArray.length > 0 ? deleteAllBtn.classList.add("active") : deleteAllBtn.classList.remove("active"); 
        let newLiTag = "";
        listArray.forEach((element, index) => {
            newLiTag += `<li class="task-${element.id}">
                            <span onclick="_editTask(${element.id})" >${element.title}</span>
                            <span class="icon" onclick="_deleteTask(${element.id})"><i class="fas fa-trash"></i></span>
                        </li>`;
        });
        todoList.innerHTML = newLiTag;
        inputBox.value = ""; 
    }

    _deleteTask = function(id) {
        api.delete(id)
        .then(function(data) {
            showTasks(); 
        });
    }

    _editTask = function(id) {
        api.get(id).then(function(response) {
            var liTag = todoList.querySelector('.task-'+response.id);
            var inputTemp = document.createElement("input");
            inputTemp.setAttribute("type", "text");
            inputTemp.setAttribute("value", response.title);
            inputTemp.onkeypress = _onHandleEditing.bind(this, id);
            inputTemp.onblur = _onHandleEditing.bind(this, id);
            liTag.innerHTML= '';
            liTag.append(inputTemp);

        });
    }

    _onHandleEditing = function(id, event) {
        if((event.keyCode === 13 && event instanceof KeyboardEvent) || event instanceof FocusEvent) {
            var data = {
                id : id,
                title: event.target.value
            }
            _onEditTask(id, data);
        }
    }

    _onEditTask = function(id, data) {
        api.put(id, data).then(function(response) {
            showTasks();
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
})(api, loading);

todoList.init();



