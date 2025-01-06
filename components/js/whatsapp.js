document.addEventListener('DOMContentLoaded', () => {
  const chatButton = document.getElementById('chat-button');
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const chatContent = document.getElementById('chat-content');
  const closeChatButton = document.getElementById('close-chat');
  const fileInput = document.getElementById('file-input');
  const attachButton = document.getElementById('attach-button');

  let state = null; // Estado actual del chat
  let stateData = {}; // Datos recopilados
  let stateHistory = []; // Historial de estados

  // Funciones auxiliares
  function showTypingIndicator() {
    if (document.querySelector('#typing-indicator')) return;
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.className = 'typing';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatContent.appendChild(typingIndicator);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  function hideTypingIndicator() {
    const typingIndicator = document.querySelector('#typing-indicator');
    if (typingIndicator) typingIndicator.remove();
  }

  function addChatBubble(message, type = 'bot') {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type} animate-bubble`;
    bubble.innerHTML = `<p>${message}</p><span class="time">${getCurrentTime()}</span>`;
    chatContent.appendChild(bubble);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  function sendEmail(templateId, formData) {
    emailjs.send('service_pycsa', templateId, formData).then(
      (response) => {
        console.log('Email enviado', response);
      },
      (error) => {
        console.error('Error al enviar el email', error);
      }
    );
  }

  const commands = {
    regresar: ['regresar', 'back', 'volver', 'no', 'atras', 'no se', 'nose'],
    initial: ['initial', 'inicio', 'start'],
  };

  function handleUserResponse(message) {
    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();
      let response;

      // Detectar si el mensaje es un comando
      const isCommand = (commandKey) =>
        commands[commandKey].some((cmd) => message.toLowerCase().includes(cmd));

      // Manejo del comando "initial"
      if (isCommand('initial')) {
        stateHistory = []; // Limpiar historial
        state = null; // Restablecer estado inicial
        response =
          '¿Que necesitas? Selecciona. 👇<br>1- Solicitud de servicio.<br>2- Cotización.<br>3- Empleo.';
        addChatBubble(response, 'bot');
        return;
      }

      // Manejo del comando "regresar"
      if (isCommand('regresar')) {
        if (stateHistory.length > 0) {
          const previousState = stateHistory.pop(); // Recuperar el último estado del historial
          state = previousState.state; // Restaurar el estado
          response = previousState.message; // Usar el mensaje exacto del historial
        } else {
          response = 'No hay un menú anterior al que regresar.';
        }
        addChatBubble(response, 'bot');
        return;
      }

      switch (state) {
        case null: // Estado inicial
          attachButton.disabled = true;
          stateHistory.push({
            state,
            message:
              '¿Que necesitas? Selecciona. 👇<br>1- Solicitud de servicio.<br>2- Cotización.<br>3- Empleo.',
          });
          if (message === '1') {
            state = 'service-option';
            response =
              'Por favor, elige el tipo de servicio:<br>1- Residencial<br>2- Comercial';
          } else if (message === '2') {
            state = 'collecting-quote';
            response =
              '¡Genial! elige el tipo de servicio:<br>1- Seguridad Fisica.<br>2. Monitoreo de Camaras.<br>3- Equipos de Vigilancia';
          } else if (message === '3') {
            state = null;
            response = 'Envíanos tu CV, adjunta tu archivo pdf.';
            attachButton.disabled = false;

            // Abrir el selector de archivos
            attachButton.addEventListener('click', () => {
              fileInput.click();
            });

            fileInput.addEventListener('change', (event) => {
              const file = event.target.files[0];
              if (file) {
                const allowedExtensions = ['docx', 'pdf'];
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                  addChatBubble(
                    `Has adjuntado el archivo: ${file.name}`,
                    'user'
                  );
                } else {
                  addChatBubble('Archivo no válido.', 'user');
                  showTypingIndicator();
                  setTimeout(() => {
                    hideTypingIndicator();
                    addChatBubble(
                      'Solo se permiten archivos .docx y .pdf.',
                      'bot'
                    );
                  }, 3000);
                }

                fileInput.value = '';
              }
            });
          } else {
            response = 'Por favor, selecciona una opción válida (1, 2 o 3).';
          }
          break;

        case 'menu':
          response =
            '¡Hola! 👋<br>¿Necesitas mejorar tu seguridad? 🫵<br>Escríbenos. 👇<br>1- Solicitud de servicio.<br>2- Cotización.<br>3- Empleo.';
          state = null;
          break;

        case 'service-option': // Elegir tipo de servicio
          stateHistory.push({
            state,
            message:
              'Por favor, escribe la opción del servicio:<br>1- Residencial<br>2- Comercial',
          });
          if (message === '1' || message === '2') {
            stateData.serviceType =
              message === '1' ? 'Residencial' : 'Comercial';
            state = 'collecting-name';
            response = `Has elegido ${stateData.serviceType}.<br>Por favor, escribe tu nombre.`;
          } else {
            response = 'Por favor,<br>selecciona una opción válida (1 o 2)';
          }
          break;

        case 'collecting-name':
          stateData.name = message.trim();
          state = 'collecting-location';
          response = 'Por favor, escribe la ubicación<br>(ciudad o dirección).';
          break;

        case 'collecting-location':
          stateData.location = message.trim();
          state = 'collecting-email';
          response = 'Por favor, escribe tu correo electrónico.';
          break;

        case 'collecting-email':
          stateData.email = message.trim();
          state = 'collecting-phone';
          response = 'Por favor, escribe tu número de teléfono.';
          break;

        case 'collecting-phone':
          stateData.phone = message.trim();
          state = 'menu';

          sendEmail('template_pycsa_service', {
            service: stateData.serviceType,
            name: stateData.name,
            location: stateData.location,
            email: stateData.email,
            phone: stateData.phone,
          });

          response = `Gracias por preferirnos 😊.<br>Aquí está la información que recibimos:<br>
            Tipo de servicio: ${stateData.serviceType}<br>
            Nombre: ${stateData.name}<br>
            Ubicación: ${stateData.location}<br>
            Correo: ${stateData.email}<br>
            Teléfono: ${stateData.phone}<br>
            Un administrador se pondrá en contacto contigo pronto.`;
          break;

        case 'collecting-quote':
          stateHistory.push({
            state,
            message:
              '¡Genial! elige el tipo de servicio:<br>1- Seguridad Fisica.<br>2. Monitoreo de Camaras.<br>3- Equipos de Vigilancia',
          });
          if (message === '1' || message === '2' || message === '3') {
            stateData.serviceType =
              message === '1'
                ? 'Seguridad Fisica'
                : message === '2'
                ? 'Monitoreo de Camaras'
                : 'Equipos de Vigilancia';
            state = 'collecting-namec';
            response = `Has elegido ${stateData.serviceType}.<br>Por favor, escribe tu nombre.`;
          } else {
            response = 'Por favor,<br>selecciona una opción válida (1, 2 o 3)';
          }
          break;
        case 'collecting-namec':
          stateData.name = message.trim();
          state = 'collecting-emailc';
          response = 'Por favor, escribe la ubicación<br>(ciudad o dirección).';
          break;

        case 'collecting-emailc':
          stateData.email = message.trim();
          state = 'collecting-phonec';
          response = 'Por favor, escribe tu número de teléfono.';
          break;

        case 'collecting-phonec':
          stateData.phone = message.trim();
          state = 'menu';

          sendEmail('template_pycsa_cotiza', {
            service: stateData.serviceType,
            name: stateData.name,
            email: stateData.email,
            phone: stateData.phone,
          });

          response = `Gracias por preferirnos 😊.<br>Aquí está la información que recibimos:<br>
            Tipo de servicio: ${stateData.serviceType}<br>
            Nombre: ${stateData.name}<br>
            Correo: ${stateData.email}<br>
            Telefono: ${stateData.phone}<br>
            Un administrador se pondrá en contacto contigo pronto.`;
          break;

        default:
          response = 'Hubo un error, por favor intenta de nuevo.';
          state = 'menu';
      }

      addChatBubble(response, 'bot');
    }, 2000);
  }

  // Mostrar mensaje inicial
  setTimeout(() => {
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      addChatBubble(
        '¡Hola! 👋<br>¿Necesitas mejorar tu seguridad? 🫵<br>Escríbenos. 👇<br>1- Solicitud de servicio.<br>2- Cotización.<br>3- Empleo.',
        'bot'
      );
    }, 3000);
  }, 1000);

  // Manejar eventos del chat
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
      const userMessage = chatInput.value.trim();
      addChatBubble(userMessage, 'user');
      chatInput.value = '';
      handleUserResponse(userMessage);
    }
  });

  // Cerrar el chat
  closeChatButton.addEventListener('click', () => {
    chatWindow.classList.remove('show');
  });

  // Abrir/cerrar chat
  chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('show');
  });
});
