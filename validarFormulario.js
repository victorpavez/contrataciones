function validarFormularioObras(data) {
    // Ejemplo de validación básica
    const camposObligatorios = ['area', 'rubro', 'tipo', 'categoria', 'fecha', 'periodo', 'presupuesto'];
  
    for (const campo of camposObligatorios) {
      if (!data[campo] || data[campo].trim() === '') {
        Swal.fire({
          icon: 'warning',
          title: 'Campo obligatorio faltante',
          text: `Por favor, complete el campo: ${campo}`
        });
        return false;
      }
    }
  
    // Validar si seleccionaron "otros" y no completaron los detalles
    if (data['tipo'] === 'otros' && (!data['detalle-tipo'] || data['detalle-tipo'].trim() === '')) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta detallar el Tipo',
        text: 'Seleccionaste "otros" como tipo. Por favor, especificá el detalle.'
      });
      return false;
    }
  
    if (data['categoria'] === 'otros' && (!data['detalle-categoria'] || data['detalle-categoria'].trim() === '')) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta detallar la Categoría',
        text: 'Seleccionaste "otros" como categoría. Por favor, especificá el detalle.'
      });
      return false;
    }
  
      // Validar que presupuesto sea mayor a cero
    if (parseFloat(data['presupuesto']) <= 0) {
      const presupuestoInput = document.getElementById('presupuesto');
      presupuestoInput.classList.add('is-invalid');
      if (!document.getElementById('presupuesto-feedback')) {
        const feedback = document.createElement('div');
        feedback.id = 'presupuesto-feedback';
        feedback.className = 'invalid-feedback';
        feedback.textContent = 'El presupuesto debe ser mayor a cero.';
        presupuestoInput.parentNode.appendChild(feedback);
      }
      Swal.fire({
        icon: 'warning',
        title: 'Presupuesto inválido',
        text: 'El presupuesto estimado debe ser mayor a cero.'
      });
      return false;
    }
  
    // Validar que la fecha de pedido sea menor a las fechas del periodo
    const fechaPedido = new Date(data['fecha'].split('-').reverse().join('-'));
    const fechasPeriodo = data['periodo'].split(' a ');
  
    if (fechasPeriodo.length === 2) {
      const inicio = new Date(fechasPeriodo[0].split('/').reverse().join('-'));
      const fin = new Date(fechasPeriodo[1].split('/').reverse().join('-'));
  
      if (fechaPedido > inicio || fechaPedido > fin) {
        const fechaInput = document.getElementById('fecha');
        fechaInput.classList.add('is-invalid');
        if (!document.getElementById('fecha-feedback')) {
          const feedback = document.createElement('div');
          feedback.id = 'fecha-feedback';
          feedback.className = 'invalid-feedback';
          feedback.textContent = 'Debe ser anterior al período de ejecución.';
          fechaInput.parentNode.appendChild(feedback);
        }
      const periodoInput = document.getElementById('periodo');
        periodoInput.classList.add('is-invalid');
        if (!document.getElementById('periodo-feedback')) {
          const feedback = document.createElement('div');
          feedback.id = 'periodo-feedback';
          feedback.className = 'invalid-feedback';
          feedback.textContent = 'Debe contener un rango válido posterior a la fecha de pedido.';
          periodoInput.parentNode.appendChild(feedback);
        }
      Swal.fire({
        icon: 'warning',
        title: 'Fecha fuera de rango',
          text: 'La fecha de pedido debe ser anterior al período de ejecución.'
        });
        return false;
      }
    }
  
    const presupuestoInputReset = document.getElementById('presupuesto');
    presupuestoInputReset.classList.remove('is-invalid');
    const fb1 = document.getElementById('presupuesto-feedback');
    if (fb1) fb1.remove();
    const fechaInputReset = document.getElementById('fecha');
    fechaInputReset.classList.remove('is-invalid');
    const fb2 = document.getElementById('fecha-feedback');
    if (fb2) fb2.remove();
    const periodoInputReset = document.getElementById('periodo');
    periodoInputReset.classList.remove('is-invalid');
    const fb3 = document.getElementById('periodo-feedback');
    if (fb3) fb3.remove();
    // Validar cronograma si el contenedor está visible
    const cronograma = document.getElementById('cronograma-container');
    if (!cronograma.classList.contains('d-none')) {
      const seleccionados = Array.from(document.querySelectorAll('.dia-checkbox'))
        .filter(checkbox => checkbox.checked);
  
      if (seleccionados.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Cronograma incompleto',
          text: 'Debe seleccionar al menos un día en el cronograma y asignarle horas.'
        });
        return false;
      }
  
      for (const checkbox of seleccionados) {
        const input = checkbox.parentElement.querySelector('.hora-dia');
        const horas = parseInt(input.value);
        if (isNaN(horas) || horas < 1 || horas > 24) {
          Swal.fire({
            icon: 'warning',
            title: 'Horas inválidas',
            text: `Ingrese entre 1 y 24 horas para ${checkbox.id.charAt(0).toUpperCase() + checkbox.id.slice(1)}.`
          });
          input.classList.add('is-invalid');
          return false;
        } else {
          input.classList.remove('is-invalid');
        }
      }
    }
  
    return true;
  }
  