document.getElementById('control').addEventListener('click', function () {
  window.location.href = '#';
});

const form = document.getElementById('myForm');
const submitButton = document.querySelector('.cotiza-form button');
const inputs = form.querySelectorAll('input');

function checkFormCompletion() {
  const isValid = [...inputs].every((input) => input.checkValidity());

  if (isValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

inputs.forEach((input) => {
  input.addEventListener('input', checkFormCompletion);
});

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;

  const updateCarousel = () => {
    const offset = -index * 100; // Move the carousel to show the current item
    carousel.style.transform = `translateX(${offset}%)`;
  };

  prevBtn.addEventListener('click', () => {
    index = index > 0 ? index - 1 : items.length - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    index = index < items.length - 1 ? index + 1 : 0;
    updateCarousel();
  });
});
