showNotes();
let addbtn = document.getElementById('add-btn');

addbtn.addEventListener("click", function(e){

    let addtext = document.getElementById("addText");
    let addtitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        text: addtext.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtext.value = "";
    addtitle.value = "";
    //console.log(notesObj);
    showNotes();
});

function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete note</button>
              
            <button id="${index}"onclick="editNotes(this.id)" class="note-btn btn btn-primary edit-btn">Edit Note</button>
            </div>
          </div>`;
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = "Nothing added yet, create a note.";
    }
};

// Function to delete note
function deleteNote(index){
    //console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// for search
let search = document.getElementById("srchtxt");
search.addEventListener("input", function(){
    let inputval = search.value.toLowerCase();
    //console.log("Input event fired", inputval);

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        let cardtitle = element.getElementsByTagName("h5")[0].innerText;

        if(cardtxt.includes(inputval) || cardtitle.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});

// Function for editing notes
function editNotes(index){
    let notes = localStorage.getItem("notes");
    let addtext = document.getElementById("addText");
    let addtitle = document.getElementById("addTitle");

    if(addtitle.value !== "" ||  addtext.value !== ""){
        return alert("Please the clear the section.");
    }
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.findIndex((element,index) => {
        addtitle.value = element.title;
        addtext.value = element.text;
    })
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
showNotes();