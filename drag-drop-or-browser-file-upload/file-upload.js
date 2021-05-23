

document.addEventListener("DOMContentLoaded", function(event) { 

    
    document.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
    
    document.addEventListener('dragleave', function(event) {
        event.preventDefault();
    });
    
    document.addEventListener('drop', function(event) {
        event.preventDefault();
    });
    
    
    let file;
    var dragArea = document.getElementById('dt-drag-area');
    var dragText = document.getElementById('dt-drag-title');
    var buttonBrowser = document.getElementById('dt-browser');
    var inputFile = document.getElementById('dt-input-file');

    dragArea.addEventListener('dragover', function(event){
        event.preventDefault();
        dragText.innerText = 'Release file here';
    });

    dragArea.addEventListener('dragleave', function(event){
        event.preventDefault();
        dragText.innerText = 'Drag & drop file here';
    });
    
    dragArea.addEventListener('drop', function(event) {
        event.preventDefault();
        file = event.dataTransfer.files[0];
        showFile();
    });

    buttonBrowser.onclick = function() {
        inputFile.click();
    }

    inputFile.addEventListener('change', function() {
        file = this.files[0];
        dragArea.classList.add('active');
        showFile();
    })

    function showFile(){
        let fileType = file.type; 
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 
        if(validExtensions.includes(fileType)){ 
          let fileReader = new FileReader(); 
          fileReader.onload = ()=>{
            let fileURL = fileReader.result; 
            let imgTag = `<img src="${fileURL}" alt="image">`; 
            dragArea.innerHTML = imgTag; 
            dragArea.classList.add("active");
          }
          fileReader.readAsDataURL(file);
        }else{
          alert("This is not an Image File!");
          dragArea.classList.remove("active");
        }
      }
});