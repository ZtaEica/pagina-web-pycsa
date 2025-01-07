/*const pages = document.querySelectorAll('.page');

const checkVisibility = () => {
  const scrollPosition = window.scrollY + window.innerHeight;

  pages.forEach(page => {
    const pageTop = page.offsetTop;
    const pageHeight = page.offsetHeight;

    if (scrollPosition > pageTop + pageHeight / 4) {
      page.classList.add('visible');
    } else {
      page.classList.remove('visible');
    }
  });
};

window.addEventListener('load', () => {
  checkVisibility();
});

window.addEventListener('scroll', checkVisibility);*/

document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0.25,
    }
  );

  pages.forEach((page) => observer.observe(page));
});

document.addEventListener('DOMContentLoaded', () => {
  const animatableElements = document.querySelectorAll(
    '.efect, #empresa, .service-title, .nosotros-title, .contactanos-title, .contact-title, #valores, .insta-efect, .carousel-section'
  );

  // Función para verificar si un elemento está en el viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  // Función para aplicar la animación a los elementos visibles
  const applyAnimation = () => {
    animatableElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add('animate');
      } else {
        element.classList.remove('animate');
      }
    });
  };

  // Llama a la función inicialmente y en cada evento de scroll
  applyAnimation();
  window.addEventListener('scroll', applyAnimation);
});
