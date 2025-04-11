function validarFormularioObras(data) {
  try {
    // Ejemplo de validación básica
    const camposObligatorios = ['area', 'rubro', 'tipo', 'categoria', 'fecha', 'periodo', 'presupuesto'];

    for (const campo of camposObligatorios) {
      if (!data[campo] || data[campo].trim() === '') {
        Swal.fire({
          icon: 'warning',
          title: 'Campo obligatorio faltante',
          text: `Por favor, complete el campo: ${campo}`
        });
        return true;
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
    const fechaPedido = new Date(data['fecha'].split('/').reverse().join('-'));
    fechaPedido.setHours(0, 0, 0, 0);
    const fechasPeriodo = data['periodo'].split(' a ');

    if (fechasPeriodo.length === 2) {
      const inicio = new Date(fechasPeriodo[0].split('/').reverse().join('-'));
      inicio.setHours(0, 0, 0, 0);
      const fin = new Date(fechasPeriodo[1].split('/').reverse().join('-'));
      fin.setHours(0, 0, 0, 0);

      // Verificando fechas comparadas en la consola para depuración
      console.log('🧪 Comparando fechas:');
      console.log('Fecha de pedido:', fechaPedido.toDateString(), '->', fechaPedido.getTime());
      console.log('Fecha de inicio del período:', inicio.toDateString(), '->', inicio.getTime());

      if (fechaPedido.getTime() > inicio.getTime()) {
        const fechaInput = document.getElementById('fecha');
        fechaInput.classList.add('is-invalid');
        if (!document.getElementById('fecha-feedback')) {
          const feedback = document.createElement('div');
          feedback.id = 'fecha-feedback';
          feedback.className = 'invalid-feedback';
          feedback.textContent = 'Debe estar dentro del período de ejecución.';
          fechaInput.parentNode.appendChild(feedback);
        }
        const periodoInput = document.getElementById('periodo');
        periodoInput.classList.add('is-invalid');
        if (!document.getElementById('periodo-feedback')) {
          const feedback = document.createElement('div');
          feedback.id = 'periodo-feedback';
          feedback.className = 'invalid-feedback';
          feedback.textContent = 'Debe contener un rango válido que incluya la fecha de pedido.';
          periodoInput.parentNode.appendChild(feedback);
        }
        return false;
      } else {
        document.getElementById('fecha').classList.remove('is-invalid');
        document.getElementById('fecha').classList.add('is-valid');
        const fb2 = document.getElementById('fecha-feedback');
        if (fb2) fb2.remove();
        document.getElementById('periodo').classList.remove('is-invalid');
        document.getElementById('periodo').classList.add('is-valid');
        const fb3 = document.getElementById('periodo-feedback');
        if (fb3) fb3.remove();
      }
    }

    // Resto de validaciones (cronograma, etc.)
    // ...

    return true;
  } catch (error) {
    console.error("Error en la validación:", error);
    return false;
  }
}
