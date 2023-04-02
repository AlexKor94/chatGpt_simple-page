document.addEventListener('DOMContentLoaded', () => {

  const modal = document.querySelector("#modal");
  const addCardButton = document.querySelector("#add-card-button");
  const closeButton = document.querySelector(".close");
  const saveButton = document.querySelector("button[type='submit']");
  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");
  const cardGrid = document.querySelector('.card-grid');
  let cardData = [];
  loadCards();


  addCardButton.onclick = function () {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  closeButton.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  saveButton.onclick = function (event) {
    event.preventDefault(); // prevent form from submitting

    const title = titleInput.value;
    const description = descriptionInput.value;

    // get existing data from local storage or create an empty array
    cardData = JSON.parse(localStorage.getItem("cardData")) || [];

    // add new card data to the array
    cardData.push({ title, description });

    console.log(cardData);

    // save updated data to local storage
    localStorage.setItem("cardData", JSON.stringify(cardData));

    modal.style.display = "none";
    document.body.style.overflow = "auto";

    // render the updated cards on the page
    loadCards();
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // 

  function loadCards() {
    cardGrid.innerHTML = ''; // clear the card-grid
    cardData = Object.keys(localStorage)
      .filter(key => key.startsWith('card'))
      .map(key => JSON.parse(localStorage.getItem(key)));

    console.log(cardData);

    cardData[0].forEach((data, i) => {
      const card = createCard(data, i);
      cardGrid.appendChild(card);
    });
    updateDeleteButtonHandlers();
    updateSaveButtonHandlers();
  }


  function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);

    const title = document.createElement('h2');
    title.textContent = data.title;

    const description = document.createElement('p');
    description.textContent = data.description;

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-button');
    saveButton.textContent = 'Save';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(saveButton);
    card.appendChild(deleteButton);

    cardGrid.appendChild(card); // add card to cardGrid

    // Return the card element
    return card;
  }

  function updateDeleteButtonHandlers() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button, index) => {
      button.removeEventListener('click', deleteButtonHandler); // remove old event listener
      button.addEventListener('click', event => {
        event.preventDefault();
        const card = event.target.closest('.card');
        const index = card.getAttribute('data-index');
        deleteCard(card, index);
        updateCardDataAttributes();
      }); // add new event listener
    });
  }

  function deleteButtonHandler(event) {
    event.preventDefault();
    const card = event.target.closest('.card');
    deleteCard(card, card.getAttribute('data-index'));
    updateCardDataAttributes();
  }

  updateDeleteButtonHandlers();

  // function to delete a card and remove corresponding data from local storage
  const deleteCard = (card, index) => {
    card.remove();
    cardData[0].splice(index, 1);
    console.log(cardData);
    localStorage.setItem('cardData', JSON.stringify(cardData[0]));

    // update date attributes
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.setAttribute('data-index', i);
    });
  };

  function updateSaveButtonHandlers() {
    const saveButtons = document.querySelectorAll('.save-button');
    saveButtons.forEach((button) => {
      button.removeEventListener('click', saveButtonHandler); // remove old event listener
      button.addEventListener('click', saveButtonHandler); // add new event listener
    });
  }

  function saveButtonHandler(event) {
    const index = event.target.closest('.card').dataset.index; // Retrieve index from data attribute
    const newTitle = prompt('Enter a new title:', cardData[0][index].title);
    const newDescription = prompt('Enter a new description:', cardData[0][index].description);
    const newData = {
      title: newTitle,
      description: newDescription
    };
    updateCardData(event.target.closest('.card'), index, newData); // Pass card element to updateCardData function
  }

  const saveButtons = document.querySelectorAll('.save-button');
  saveButtons.forEach((button) => {
    button.addEventListener('click', saveButtonHandler);
  });


  function updateCardData(card, index, newData) {
    // Update the card data
    cardData[0][index] = newData;

    // Update the card elements
    card.querySelector('h2').textContent = newData.title;
    card.querySelector('p').textContent = newData.description;

    // Save the updated data to local storage
    localStorage.setItem('cardData', JSON.stringify(cardData[0]));
  }

  function updateCardDataAttributes() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.setAttribute('data-index', index);
    });

    cardData[0] = Array.from(cards).map(card => {
      const title = card.querySelector('h2').textContent;
      const description = card.querySelector('p').textContent;
      return { title, description };
    });

    localStorage.setItem('cardData', JSON.stringify(cardData[0]));
    updateDeleteButtonHandlers();
  }
});
