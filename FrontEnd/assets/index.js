/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

let projectsData = null;
const gallery = document.querySelector(".gallery");

const allBtn = document.querySelector(".tous");
const objetsBtn = document.querySelector(".objets");
const appartementsBtn = document.querySelector(".apparts");
const hotelsRestaurantsBtn = document.querySelector(".hotels");

let token = localStorage.getItem("token");
const loginEl = document.querySelector("#login");
let loginStatus = false;

class Project {
  constructor(data) {
    // Copie les propriétés de l'objet data vers l'instance de la classe Project
    Object.assign(this, data);
  }
}

function getData() {
  if (projectsData !== null) {
    return Promise.resolve(projectsData);
  }

  return fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      projectsData = data;
      return data;
    })
    .catch((error) => {
      console.error("Une erreur est survenue : ", error);
    });
}

function displayProjects(projectsArray) {
  // Crée une nouvelle instance de la classe Project pour chaque projet dans le tableau passé en argument
  for (let i = 0; i < projectsArray.length; i += 1) {
    const projet = new Project(projectsArray[i]);
    gallery.innerHTML += `
      <figure>
          <img src="${projet.imageUrl}" alt="${projet.title}" />
          <figcaption>${projet.title}</figcaption>
      </figure>
    `;
  }
}

function displayAllProjects() {
  getData().then((data) => {
    gallery.innerHTML = "";
    displayProjects(data);
  });
}

function displayFilteredProjects(categoryName) {
  getData().then((data) => {
    const filteredArray = data.filter(
      (projet) => projet.category.name === categoryName
    );
    gallery.innerHTML = "";
    displayProjects(filteredArray);
  });
}

function setActiveFilterButton(clickedButton) {
  // Boucle dans un array avec tous les btn de filtre
  [allBtn, objetsBtn, appartementsBtn, hotelsRestaurantsBtn].forEach(
    (button) => {
      // Applique le style par défaut
      button.style.color = "#1d6154";
      button.style.backgroundColor = "white";
    }
  );
  // Applique le style du bouton de filtre actif / cliqué
  clickedButton.style.color = "white";
  clickedButton.style.backgroundColor = "#1d6154";
}

function filterProjects() {
  allBtn.addEventListener("click", () => {
    setActiveFilterButton(allBtn);
    displayAllProjects();
  });

  objetsBtn.addEventListener("click", () => {
    setActiveFilterButton(objetsBtn);
    displayFilteredProjects("Objets");
  });

  appartementsBtn.addEventListener("click", () => {
    setActiveFilterButton(appartementsBtn);
    displayFilteredProjects("Appartements");
  });

  hotelsRestaurantsBtn.addEventListener("click", () => {
    setActiveFilterButton(hotelsRestaurantsBtn);
    displayFilteredProjects("Hotels & restaurants");
  });

  setActiveFilterButton(allBtn); // Active le bouton "Tous" par défaut
  displayAllProjects(); // Affiche tous les projets par défaut
}

filterProjects();

function isUserLoggedIn() {
  if (token) {
    loginEl.textContent = "logout";
    loginStatus = true;
  } else {
    loginEl.textContent = "login";
  }
}

isUserLoggedIn();

function logOut(e) {
  if (loginStatus) {
    e.preventDefault();
    loginStatus = false;
    token = "";
    loginEl.textContent = "login";
  }
}

loginEl.addEventListener("click", (e) => {
  logOut(e);
});

// function enableEditionMode() {
//   if(loginStatus){

//   }
// }
