var wrapper = document.querySelector('.wrapper-search');
const buttonSearch = wrapper.querySelector('.dt-input-search');
var comboxSuggestion = wrapper.querySelector('.auto-com-box');
var wrapperIcon = wrapper.querySelector('.dt-icon');
const suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to became Freelancer",
    "How to became Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
];

buttonSearch.onkeyup = (e) => {
    var keyword = e.target.value;
    var datas = [];

    if (keyword) {
        datas = suggestions.filter(function(item){
            return item.toLocaleLowerCase().startsWith(keyword.toLocaleLowerCase());
        });
        showSuggestion(datas, keyword);
        //bindingEventSelected();
        var itemsCombox = comboxSuggestion.querySelectorAll('li');
        for (let i = 0; i< itemsCombox.length; i++) {
            itemsCombox[i].setAttribute("onclick", "select(this)");
        }
        comboxSuggestion.classList.add('active');
    } 
    else{
        comboxSuggestion.classList.remove('active');
    }
}

function showSuggestion(datas, keyword) {
    var comboxData;

    if (!datas.length) {
        comboxData = '<li> No data founded with keyword'+ buttonSearch.value +'</li>'; 
    } 
    else {
        comboxData = datas.map((data)=>{
            return '<li>'+ addHightText(data, keyword) +'</li>';
        }).join('');
    }
    comboxSuggestion.innerHTML = comboxData;
}

function select(element) {
    var suggestion = element.textContent;

    buttonSearch.value = suggestion;
    comboxSuggestion.classList.remove('active');
}

function addHightText(src, keyword) {
    return src = src.replace(keyword, '<b>' + keyword + '</b>');
}

