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
    location.reload(); 
  
});

const listItems = document.querySelector('.list-items');


for (const [key, value] of Object.entries(noteList).reverse()) {
  const noteDiv = document.createElement('div');
  const textDiv = document.createElement('div');
  const noteHeading = document.createElement('div');
  const deleteDiv =document.createElement('div');
  const deleteButton = document.createElement('button');


  noteDiv.setAttribute('data-id', key);
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
  }
  deleteButton.addEventListener("click", (event)=>{
    const parentElement = event.target.closest('.item');
    const id = parentElement.getAttribute('data-id');
    deleteNote(id, parentElement);
  })

   noteHeadingText.addEventListener("blur", () => {
    console.log("where is the bug");
    const parentElement = event.target.closest('.item');
    const id = parentElement.getAttribute('data-id');

    const updatedHeading = {
      id: key,
      head: noteHeadingText.value,
      text: noteList[key].text
    };

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
  });
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