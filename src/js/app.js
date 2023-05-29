document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

const { createApp } = Vue;

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

function iniciarApp() {
  navegacionFija();
  scrollNav();
  validateForms();
  startListeningIntersections();
}

function handleIntersect(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}

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

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");

    imagen.innerHTML = `
            <source srcset="/build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="/build/img/thumb/${i}.webp" type="image/webp">
            <img width="400" height="300" src="/build/img/thumb/${i}.jpg" alt="Imagen Vocalista" >
        `;

    imagen.addEventListener("click", function () {
      mostrarImagen(i);
    });

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(i) {
  const imagen = document.createElement("picture");

  imagen.innerHTML = `
            <source srcset="/build/img/grande/${i}.avif" type="image/avif">
            <source srcset="/build/img/grande/${i}.webp" type="image/webp">
            <img width="400" height="300" src="/build/img/grande/${i}.jpg" alt="Imagen Vocalista" >
        `;

  // Crea el Overlay con la imagen
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-imagen");
  overlay.appendChild(imagen);

  // Boton para cerrar el modal
  const cerrarModal = document.createElement("p");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");
  overlay.appendChild(cerrarModal);
  cerrarModal.addEventListener("click", function () {
    overlay.remove();
    body.classList.remove("fixed-body");
  });

  // Añadirlo al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fixed-body");
}
