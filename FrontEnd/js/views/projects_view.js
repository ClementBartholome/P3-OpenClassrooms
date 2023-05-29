/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
class ProjectsView {
  constructor() {
    this.filtersList = document.querySelector("#filtres");
    this.gallery = document.querySelector(".gallery");
    this.filterButtonsArray = [];
    this.modal = document.querySelector("#modal");
    this.createModal();
    this.editButton = document.querySelector("#edit-button");
    this.closeModalBtn = document.querySelector("#close-modal");
    this.deleteProject = document.querySelector("#trash");
  }

  displayProjects(projectsArray) {
    this.gallery.innerHTML = "";

    for (let i = 0; i < projectsArray.length; i += 1) {
      const project = projectsArray[i];
      this.gallery.innerHTML += `
          <figure>
              <img src="${project.imageUrl}" alt="${project.title}" />
              <figcaption>${project.title}</figcaption>
          </figure>
        `;
    }
  }

  displayFilterButtons(categoriesArray) {
    this.filtersList.innerHTML = `<button class="tous active-button">Tous</button>`;
    const allBtn = document.querySelector(".tous");
    this.filterButtonsArray.push(allBtn);

    for (let i = 0; i < categoriesArray.length; i += 1) {
      const category = categoriesArray[i];
      const button = document.createElement("button");
      button.className = category;
      button.innerText = category;
      this.filtersList.appendChild(button);
      this.filterButtonsArray.push(button);
    }
  }

  styleActiveFilterBtn(clickedButton) {
    // Boucle dans un array avec tous les boutons de filtre
    this.filterButtonsArray.forEach((button) => {
      // Applique le style par défaut
      button.classList.add("default-button");
      button.classList.remove("active-button");
    });
    // Applique le style du bouton de filtre actif / cliqué
    clickedButton.classList.add("active-button");
    clickedButton.classList.remove("default-button");
  }

  createModal() {
    this.modal.innerHTML = "";

    this.modal.innerHTML = `
      <div class="modal-wrapper">
        <i class="fa-solid fa-xmark" id="close-modal"></i>
        <h2>Galerie photo</h2>
        <div class="modal-gallery" id="modal-gallery"></div>
        <hr />
        <button class="add-project">Ajouter une photo</button>
        <button class="delete-gallery">Supprimer la galerie</button>
      </div>
    `;
    this.modalGallery = document.querySelector("#modal-gallery");
  }

  displayProjectsInModal(projectsArray) {
    this.modalGallery.innerHTML = "";

    for (let i = 0; i < projectsArray.length; i += 1) {
      const project = projectsArray[i];
      this.modalGallery.innerHTML += `
        <figure>
          <img src="${project.imageUrl}" alt="${project.title}" />
          <i class="fa-regular fa-trash-can trash" id="trash" data-project-id="${project.id}"></i>
          <button>éditer</button>
        </figure>
      `;
    }
  }

  changeModalContent() {
    this.modal.innerHTML = `
      <div class="modal-wrapper">
        <div class="modal-nav">
          <i class="fa-solid fa-arrow-left"></i>
          <i class="fa-solid fa-xmark" id="close-modal"></i>
        </div>
        <h2>Ajout photo</h2>
        <div class="add-photo" id="add-photo">
          <i class="fa-solid fa-image"></i>
          <label for="add-photo-btn">+ Ajouter photo</label>
          <input class="add-photo-btn hidden" type="file" id="add-photo-btn" name="add-photo-btn" accept="image/png, image/jpeg">
          <span>jpg, png : 4mo max</span>
        </div>
        <form id="modal-form">
          <label for="title">Titre</label>
          <input type="text" name="title" id="title" maxlength="40" required />
          <label for="category">Catégorie</label>
          <select name="category" id="category">
            <option value=""></option>
            <option value="1">Objets</option>
            <option value="2">Appartements</option>
            <option value="3">Hotels & restaurants</option>
          </select>
          <hr>
          <input type="submit" value="Valider" class="submit-project" id="submit-project">
        </form>
      </div>
    `;
    this.titleInput = document.querySelector("#title");
    this.categorySelect = document.querySelector("#category");
    this.imageInput = document.querySelector("#add-photo-btn");
    this.submitButton = document.querySelector("#submit-project");

    this.addPhotoBtn = document.querySelector("#add-photo-btn");
    this.addPhotoDiv = document.querySelector("#add-photo");
  }

  changeModal() {
    this.changeModalContent();
  }

  openModal() {
    this.modal.style.display = "flex";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  enableSubmitButton() {
    this.submitButton.classList.add("submit-ready");
    this.submitButton.disabled = false;
  }

  disableSubmitButton() {
    this.submitButton.classList.remove("submit-ready");
    this.submitButton.disabled = true;
  }

  checkFormValidity() {
    this.isTitleValid = this.titleInput.value.trim() !== "";
    this.isCategorySelected = this.categorySelect.value !== "";
    this.isImageSelected =
      // Vérifie si une image a été ajoutée précédemment
      this.file || (this.imageInput.files && this.imageInput.files.length > 0);

    if (this.isTitleValid && this.isCategorySelected && this.isImageSelected) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }
}
