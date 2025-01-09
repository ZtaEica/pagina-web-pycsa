const productsData = {
  camera: [
    {
      name: 'Cámara de Seguridad 4K',
      price: 150,
      description: 'Cámara de seguridad con resolución 4K.',
    },
    {
      name: 'Cámara de Seguridad Wi-Fi',
      price: 120,
      description: 'Cámara de seguridad inalámbrica para exteriores.',
    },
    {
      name: 'Cámara de Seguridad Wi-Fi',
      price: 120,
      description: 'Cámara de seguridad inalámbrica para exteriores.',
    },
    {
      name: 'Cámara de Seguridad Wi-Fi',
      price: 120,
      description: 'Cámara de seguridad inalámbrica para exteriores.',
    },
  ],
  alarm: [
    {
      name: 'Sistema de Alarmas Smart',
      price: 200,
      description: 'Sistema de alarmas inteligente con control remoto.',
    },
    {
      name: 'Alarma para Casa',
      price: 90,
      description: 'Alarma tradicional para protección del hogar.',
    },
  ],
  taser: [
    {
      name: 'Taser de Proyección (con dardos)',
      price: 250,
      description:
        'Dispara dardos conectados por cables a un cartucho que emite descargas eléctricas al impacto.',
    },
    {
      name: 'Taser de Contacto Directo',
      price: 100,
      description:
        'Emiten descargas eléctricas al tocar la piel o la ropa del objetivo.',
    },
  ],
};

let cart = [];

// Función para abrir el modal
function openModal(type) {
  const modal = document.getElementById('productModal');
  const productList = document.getElementById('productList');

  // Limpiar la lista de productos anterior
  productList.innerHTML = '';

  // Agregar productos del tipo seleccionado
  const products = productsData[type];
  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Añadir al Carrito</button>
      `;
    productList.appendChild(productDiv);
  });

  modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('productModal');
  modal.style.display = 'none';
}

// Función para añadir productos al carrito
function addToCart(name, price) {
  cart.push({ name, price });
  alert(
    `${name} añadido al carrito. Total: $${cart.reduce(
      (sum, item) => sum + item.price,
      0
    )}`
  );
}
