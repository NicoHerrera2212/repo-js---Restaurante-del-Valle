let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

function confirmarReserva(tipo, cantidad, horario) {
  const nuevaReserva = { tipo, cantidad, horario };
  reservas.push(nuevaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  mostrarResumen(nuevaReserva);
  mostrarReservas();
}

function mostrarResumen(reserva) {
  const div = document.getElementById("resumenReserva");
  div.textContent = `Reserva confirmada: ${reserva.cantidad} personas para ${reserva.tipo} a las ${reserva.horario}`;
  div.className = "mensaje-ok";
  console.log("Reserva confirmada:", reserva);
}

function mostrarError(mensaje) {
  const div = document.getElementById("resumenReserva");
  div.textContent = mensaje;
  div.className = "mensaje-error";
}

function mostrarReservas(lista = reservas) {
  const ul = document.getElementById("listaReservas");
  ul.innerHTML = "";
  lista.forEach((reserva, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${reserva.tipo} - ${reserva.cantidad} personas - ${reserva.horario}`;
    ul.appendChild(li);
  });
  document.getElementById("contadorReservas").textContent = `Total de reservas: ${lista.length}`;
}

function validarHorarioPorTipo(tipo, horario) {
  const [hora, minutos] = horario.split(":").map(Number);
  const horaDecimal = hora + minutos / 60;

  if (tipo === "almorzar") {
    return horaDecimal >= 12 && horaDecimal <= 14;
  } else if (tipo === "cenar") {
    return horaDecimal >= 21 && horaDecimal <= 23;
  } else {
    return false;
  }
}

document.getElementById("formReserva").addEventListener("submit", function (e) {
  e.preventDefault();
  const tipo = document.getElementById("tipoComida").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const horario = document.getElementById("horario").value.trim();

  if (horario === "" || isNaN(cantidad) || cantidad <= 0) {
    mostrarError("Por favor ingresá un horario válido y una cantidad de personas mayor a 0.");
    return;
  }

  if (!validarHorarioPorTipo(tipo, horario)) {
    mostrarError(`Horario inválido para ${tipo}. Almuerzo: 12:00 a 14:00 hs. Cena: 21:00 a 23:00 hs.`);
    return;
  }

  confirmarReserva(tipo, cantidad, horario);
});

document.getElementById("vaciarReservas").addEventListener("click", () => {
  reservas = [];
  localStorage.removeItem("reservas");
  mostrarReservas();
  const div = document.getElementById("resumenReserva");
  div.textContent = "";
  div.className = "";
});

document.getElementById("mostrarAlmuerzos").addEventListener("click", () => {
  const almuerzos = reservas.filter(r => r.tipo === "almorzar");
  mostrarReservas(almuerzos);
});

document.getElementById("mostrarCenas").addEventListener("click", () => {
  const cenas = reservas.filter(r => r.tipo === "cenar");
  mostrarReservas(cenas);
});

document.getElementById("buscarPorHorario").addEventListener("click", () => {
  const horarioBuscado = document.getElementById("buscarHorario").value.trim();
  const resultado = reservas.find(r => r.horario === horarioBuscado);

  if (resultado) {
    mostrarResumen(resultado);
  } else {
    mostrarError("No se encontró ninguna reserva para ese horario.");
  }
});

document.getElementById("eliminarPorHorario").addEventListener("click", () => {
  const horarioEliminar = document.getElementById("eliminarHorario").value.trim();
  const index = reservas.findIndex(r => r.horario === horarioEliminar);

  if (index !== -1) {
    reservas.splice(index, 1);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    mostrarReservas();
    const div = document.getElementById("resumenReserva");
    div.textContent = `Reserva de las ${horarioEliminar} eliminada.`;
    div.className = "mensaje-ok";
  } else {
    mostrarError(`No se encontró reserva para ${horarioEliminar}.`);
  }
});

mostrarReservas();


