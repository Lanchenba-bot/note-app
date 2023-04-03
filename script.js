const hamButton = document.getElementById("ham");
const listNotes = document.getElementById("list-notes");
const back = document.getElementById("back");
let state = true;
ham.addEventListener("click", (e)=>{
  if(state){
    back.classList.add("active");
    listNotes.classList.add("active");
    state = false;
  }else{
    back.classList.remove("active");
    listNotes.classList.remove("active");
    state = true;
  }
  
})
back.addEventListener("click", (e)=>{
    back.classList.remove("active");
    listNotes.classList.remove("active");
})

const addButton = document.getElementById('add');
const form = document.querySelector('form');
let noteList = JSON.parse(localStorage.getItem('noteList')) || {};

addButton.addEventListener("click", (event) => {
  const textInput = "";
  const headInput = "";
  event.preventDefault();
    const note = {
      id: Date.now(),
      head: "",
      text: "" 
    };
    noteList[note.id] = note;
    localStorage.setItem('noteList', JSON.stringify(noteList));
    document.documentElement.scrollTop = 0;
    location.reload(); 
    
});


const hamListItem = document.querySelector(".ham-list-item");

function hamListAdd(head, text, key){
  const anchorForHam = document.createElement('a');
  const divHamItem = document.createElement('div');

  anchorForHam.setAttribute('href', "#id"+key);
  anchorForHam.setAttribute('class', "anchor-ham");
  divHamItem.setAttribute('class', "ham-item");
  divHamItem.innerHTML=`<h3> ${head} </h3> <p> ${text} </p>`;
  
  anchorForHam.appendChild(divHamItem);
  hamListItem.appendChild(anchorForHam);
  const anchorHam = document.querySelectorAll('.anchor-ham');
  console.log(anchorHam);
  for(let i=0; i<anchorHam.length; i++){
  console.log(anchorHam[i]);
  anchorHam[i].addEventListener("click", (event)=>{
  back.classList.remove("active");
  listNotes.classList.remove("active");

  })
}
}

const listItems = document.querySelector('.list-items');
for (const [key, value] of Object.entries(noteList).reverse()) {
  const noteDiv = document.createElement('div');
  const textDiv = document.createElement('div');
  const noteHeading = document.createElement('div');
  const deleteDiv =document.createElement('div');
  const deleteButton = document.createElement('button');

  noteDiv.setAttribute('data-id', key);
  noteDiv.setAttribute('id', "id"+key);
  noteDiv.classList.add('item');
  noteHeading.classList.add('note-heading');

  textDiv.classList.add('text-div');
  deleteDiv.classList.add('delete-div');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = `<span>X</span>`;

  const noteHeadingText = document.createElement('textarea');
  noteHeadingText.setAttribute('placeholder', 'Heading');
  noteHeadingText.textContent = value.head;

  const noteText = document.createElement('textarea');
  noteText.setAttribute('placeholder', 'Enter note text');
  noteText.setAttribute('id', 'textarea'+ key);
  noteText.textContent = value.text;

  noteHeading.appendChild(noteHeadingText);
  deleteDiv.appendChild(noteHeading);
  deleteDiv.appendChild(deleteButton);

  noteDiv.appendChild(deleteDiv);
  textDiv.appendChild(noteText);
  noteDiv.appendChild(textDiv);
  listItems.appendChild(noteDiv);

  function deleteNote(id, parentElement){
    delete noteList[id];
    localStorage.setItem('noteList', JSON.stringify(noteList));
    parentElement.remove();
    window.location.reload();
  }
  deleteButton.addEventListener("click", (event)=>{
    const parentElement = event.target.closest('.item');
    const id = parentElement.getAttribute('data-id');
    deleteNote(id, parentElement);
  })

  let textValue = "";
  let headValue = "";
   noteHeadingText.addEventListener("blur", () => {
    const parentElement = event.target.closest('.item');
    const id = parentElement.getAttribute('data-id');
    textValue = noteHeadingText.value;
    const updatedHeading = {
      id: key,
      head: noteHeadingText.value,
      text: noteList[key].text
    };
    console.log(textValue);
    noteList[key] = updatedHeading;
    localStorage.setItem('noteList', JSON.stringify(noteList));
    
  });

  noteText.addEventListener("blur", () => {
    const parentElement = event.target.closest('.item');
    const id = parentElement.getAttribute('data-id');
    const updatedNote = {
      id: key,
      head:noteList[key].head,
      text: noteText.value
    };
    
    noteList[key] = updatedNote;
    localStorage.setItem('noteList', JSON.stringify(noteList));  
    window.location.reload();
  });
  console.log(value.head, value.text);
  hamListAdd(value.head, value.text, key);

}
for (const [key] of Object.entries(noteList).reverse()) {
  const textAreaText = document.querySelector(`#textarea${key}`);
  console.log(textAreaText);
  textAreaText.addEventListener('input', ()=>{
    textAreaText.style.height = 'auto';
    textAreaText.style.height =`${textAreaText.scrollHeight}px`;
  })
   textAreaText.style.height = `${textAreaText.scrollHeight}px`;

}
 

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    const heading = item.querySelector('.note-heading textarea').value;
    const text = item.querySelector('.text-div textarea').value;
    const lowerCaseHeading = heading.toLowerCase();
    const lowerCaseText = text.toLowerCase();
    if (lowerCaseHeading.includes(searchTerm) || lowerCaseText.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});