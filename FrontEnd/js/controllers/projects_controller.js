/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
class ProjectsController {
  constructor(view) {
    // Crée une instance de Project et l'assigne à la propriété projectsData pour gérer les données et interagir avec la view passée en paramètre
    this.view = view;
    this.projectsData = new ProjectsModel();
    this.init();
  }

  init() {
    // Affichage et Event Listeners par défaut
    this.view.styleActiveFilterBtn(this.view.allBtn);
    this.displayAllProjects();
    this.setupEventListeners();
  }

  // Affiche tous les projets
  displayAllProjects() {
    this.projectsData.getAllProjects().then((data) => {
      this.view.displayProjects(data);
    });
  }

  // Affiche les projets en fonction de la catégorie sélectionnée
  displayProjectsByCategory(categoryName) {
    this.projectsData
      .filterProjectsByCategory(categoryName)
      .then((filteredProjects) => {
        this.view.displayProjects(filteredProjects);
      });
  }

  createProject() {
    // Récupère les valeurs du formulaire et le fichier d'image
    const { value: title } = document.getElementById("title");
    const { value: category } = document.getElementById("category");
    // Récupère le premier élément de l'array files
    const [image] = this.view.addPhotoBtn.files;

    this.projectsData
      .addProjectToDatabase(title, category, image)
      .then((data) => {
        this.view.displayProjects(data);
      });
  }

  setupFormListeners() {
    this.view.titleInput.addEventListener("input", () => {
      this.view.checkFormValidity();
    });

    this.view.categorySelect.addEventListener("change", () => {
      this.view.checkFormValidity();
    });

    this.view.imageInput.addEventListener("change", () => {
      this.view.checkFormValidity();
    });
  }

  setupPhotoUploadListener() {
    this.view.addPhotoBtn.addEventListener("change", (event) => {
      const [file] = event.target.files;
      this.file = file;
      // Permet de lire le contenu du fichier
      this.reader = new FileReader();

      // Lorsque la lecture du fichier est terminée, crée un élément img et lui attribue la src du fichier
      this.reader.onload = () => {
        this.imageElement = document.createElement("img");
        this.imageElement.src = this.reader.result;
        this.imageElement.style.width = "30%";
        this.imageElement.style.height = "100%";
        this.imageElement.style.objectFit = "cover";

        // Vide la div add photo
        this.view.addPhotoDiv.innerHTML = "";
        this.view.addPhotoDiv.appendChild(this.imageElement);
      };
      // Si un fichier a été sélectionné, lis le fichier en tant qu'URL de données (utilisable en src de <img>)
      if (this.file) {
        this.reader.readAsDataURL(this.file);
      }
    });
  }

  setupEventListeners() {
    // Écouteur d'événement pour le bouton d'édition
    this.view.editButton.addEventListener("click", () => {
      this.projectsData.getAllProjects().then((data) => {
        this.view.displayProjectsInModal(data);
      });
      this.view.openModal();
    });

    // Écouteur d'événement pour le formulaire de la modale
    this.view.modal.addEventListener("submit", (event) => {
      event.preventDefault();
      this.createProject();
    });

    // Écouteur d'événement pour la fermeture de la modale
    window.addEventListener("click", (event) => {
      if (
        event.target === this.view.modal ||
        event.target.classList.contains("fa-xmark")
      ) {
        this.view.closeModal();
      }
    });

    // Écouteur d'événement pour les actions dans la modale
    this.view.modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("trash")) {
        const { projectId } = event.target.dataset;
        this.projectsData.deleteProject(projectId);
      } else if (event.target.classList.contains("add-project")) {
        this.view.changeModal();
        this.setupPhotoUploadListener();
        this.setupFormListeners();
      } else if (event.target.classList.contains("fa-arrow-left")) {
        this.view.createModal();
        this.projectsData.getAllProjects().then((data) => {
          this.view.displayProjectsInModal(data);
        });
      }
    });

    // Écouteurs d'événement pour les boutons de filtre
    this.view.allBtn.addEventListener("click", () => {
      this.view.styleActiveFilterBtn(this.view.allBtn);
      this.displayAllProjects();
    });

    this.view.objetsBtn.addEventListener("click", () => {
      this.view.styleActiveFilterBtn(this.view.objetsBtn);
      this.displayProjectsByCategory("Objets");
    });

    this.view.appartementsBtn.addEventListener("click", () => {
      this.view.styleActiveFilterBtn(this.view.appartementsBtn);
      this.displayProjectsByCategory("Appartements");
    });

    this.view.hotelsRestaurantsBtn.addEventListener("click", () => {
      this.view.styleActiveFilterBtn(this.view.hotelsRestaurantsBtn);
      this.displayProjectsByCategory("Hotels & restaurants");
    });
  }
}
