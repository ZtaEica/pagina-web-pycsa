//Navegacion-header
document.addEventListener('DOMContentLoaded', function () {
  const servicesLink = document.getElementById('services-link'); // Enlace que activa el menú
  const servicesItem = document.getElementById('nav-services');
  const dropdownMenu = servicesItem.querySelector('.dropdown-menu');
  const navItems = document.querySelectorAll('.nav-list .nav-link');
  const navList = document.querySelector('.nav-list');
  const currentPage = document.body.dataset.page;

  // Activar enlace de la página actual
  function activateLink(link) {
    navItems.forEach((nav) => nav.classList.remove('active'));
    link.classList.add('active');
  }

  // Establecer el enlace activo según la página actual al cargar
  navItems.forEach((item) => {
    if (item.dataset.page === currentPage) {
      activateLink(item);
    }
  });

  // Activar enlace al pasar el mouse
  navItems.forEach((item) => {
    item.addEventListener('mouseover', function () {
      // Solo activar si no está activo (para evitar sobrescribir)
      if (!this.classList.contains('active')) {
        activateLink(this);
      }
    });
  });

  // Restaurar el enlace activo al salir del área de navegación
  navList.addEventListener('mouseleave', function () {
    const currentActive = Array.from(navItems).find(
      (item) => item.dataset.page === currentPage
    );
    if (currentActive) {
      activateLink(currentActive);
    }
  });

  // Estilos iniciales del menú desplegable
  dropdownMenu.style.display = 'none';
  dropdownMenu.style.opacity = '0';
  dropdownMenu.style.visibility = 'hidden';
  dropdownMenu.style.transform = 'translateY(0)';
  dropdownMenu.style.transition =
    'transform 0.3s ease, opacity 0.3s ease-in-out, visibility 0.3s';

  // Mostrar menú al pasar el mouse (solo en escritorio)
  servicesItem.addEventListener('mouseenter', function () {
    if (window.innerWidth > 815) {
      // Solo aplica hover en pantallas grandes
      dropdownMenu.style.display = 'block';
      setTimeout(() => {
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.visibility = 'visible';
        dropdownMenu.style.transform = 'translateY(0)';
      }, 5);
    }
  });

  // Ocultar menú al quitar el mouse (solo en escritorio)
  servicesItem.addEventListener('mouseleave', function () {
    if (window.innerWidth > 815) {
      dropdownMenu.style.opacity = '0';
      dropdownMenu.style.visibility = 'hidden';
      dropdownMenu.style.transform = 'translateY(0)';
      setTimeout(() => {
        dropdownMenu.style.display = 'none';
      }, 300);
    }
  });

  let isMenuVisible = false;
  servicesLink.addEventListener('click', function (e) {
    e.preventDefault();

    if (isMenuVisible) {
      // Ocultar el menú
      dropdownMenu.style.opacity = '0';
      dropdownMenu.style.visibility = 'hidden';
      dropdownMenu.style.transform = 'translateY(0)';
      setTimeout(() => {
        dropdownMenu.style.display = 'none';
      }, 400);
    } else {
      // Mostrar el menú
      dropdownMenu.style.display = 'block';
      setTimeout(() => {
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.visibility = 'visible';
        dropdownMenu.style.transform = 'translateY(0)';
      }, 10);
    }
    isMenuVisible = !isMenuVisible;
  });
});

window.onscroll = function () {
  stickNavHeader();
};

var navHeader = document.querySelector('.navegacion-header');
var topHeader = document.querySelector('.top-header');
var topHeaderHeight = topHeader.offsetHeight;
var navHeaderHeight = navHeader.offsetHeight;

function stickNavHeader() {
  var scrollY = window.pageYOffset;

  if (scrollY >= topHeaderHeight) {
    navHeader.style.position = 'fixed';
    navHeader.style.top = '0';
    navHeader.style.transition = 'top 0.3s ease';
    document.body.style.paddingTop = navHeaderHeight + 'px';
  } else {
    navHeader.style.position = 'relative';
    navHeader.style.top = '0';
    navHeader.style.transition = 'top 0.3s ease';
    document.body.style.paddingTop = 0;
  }
}

const menuIcon = document.getElementById('menu-icon');
const menu = document.querySelector('.main-nav');

menuIcon.addEventListener('click', () => {
  menu.classList.toggle('activo');
  menuIcon.classList.toggle('activo');
  menu.style.transition =
    'transform 0.3s ease, opacity 0.3s ease-in-out, visibility 0.3s';
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 815) {
    menu.style.transition = 'none';
    menu.classList.remove('activo');
    menuIcon.classList.remove('activo');
  }
});
