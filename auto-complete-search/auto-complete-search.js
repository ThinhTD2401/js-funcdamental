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
    "How to became Web Designer becAme beCAME",
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
            return item.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1;
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

function addHightText(str, keyword) {
    var hasSub = true;
    var result = '';
    do{
        if (keyword === '') {
            hasSub = false;
            result = str;
        }
        else 
        {
            var startIndex = str.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase());
            if(startIndex === -1) {
                hasSub = false;
                result += str;
            } else{
                var endIndex = startIndex + keyword.length;
                var orginalWord = str.substring(startIndex, endIndex);
                result += str.substring(0, endIndex).replace(orginalWord, '<b>'+ orginalWord + '</b>');
                str = str.substring(startIndex + keyword.length, str.length);
            }
        }
       
    } while(hasSub);
    return result;
}

