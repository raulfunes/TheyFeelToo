// Funcion lanzada al cargar todo lo necesario
document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

const { createApp } = Vue;

// VUE
createApp({
  data() {
    return {
      url: "/datos.json",
      animales: [],
      imagenes: [],
      consejos: [],
    };
  },
  methods: {
    async fetchData(url) {
      const res = await fetch(url);
      const data = await res.json();
      this.animales = data.animales;
      this.imagenes = data.imagenes;
      this.consejos = data.consejos;
    },
  },
  async created() {
    await this.fetchData(this.url);
  },
}).mount("#app");

// Funcion lanzada al inicializar la aplicacion
function iniciarApp() {
  navegacionFija();
  scrollNav();
  validateForms();
  startListeningIntersections();
}

// Funcion para ver cuando un elemento entra en pantalla
function handleIntersect(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}

// Funcion que empieza las escuchas de los elementos con la clase .animate
function startListeningIntersections() {
  var elements = document.querySelectorAll(".animate");
  var observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });

  elements.forEach(function (element) {
    observer.observe(element);
  });
}

function validateForms() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

// Funcion que fija el navbar despues de un punto
function navegacionFija() {
  const navbar = document.querySelector(".header--background");
  const desde = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");
  window.addEventListener("scroll", function () {
    if (desde.getBoundingClientRect().top < 100) {
      // Ya pasamos el elemento
      navbar.classList.add("fijo");
    } else {
      navbar.classList.remove("fijo");
      body.classList.remove("navbar-scroll");
    }
  });
}

// Funcion para que al presionar los enlaces de navegacion se haga un efecto smooth para dirigirse a ellos
function scrollNav() {
  const enlaces = document.querySelectorAll(".navbar a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const seccion = document.querySelector(e.target.attributes.href.value);
      seccion.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
