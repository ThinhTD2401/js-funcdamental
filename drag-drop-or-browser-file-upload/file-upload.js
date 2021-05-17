

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
        let fileType = file.type; //getting selected file type
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
        if(validExtensions.includes(fileType)){ //if user selected file is an image file
          let fileReader = new FileReader(); //creating new FileReader object
          fileReader.onload = ()=>{
            let fileURL = fileReader.result; //passing user file source in fileURL variable
              // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
            let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            dragArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
          }
          fileReader.readAsDataURL(file);
        }else{
          alert("This is not an Image File!");
          dragArea.classList.remove("active");
          dragArea.textContent = "Drag & Drop to Upload File";
        }
      }
});