let reservas = [];

function validarHora(turno, hora) {
    const [h, m] = hora.split(":").map(Number);
    if (turno === "almuerzo") return h >= 12 && h < 14;
    if (turno === "cena") return h >= 21 && h < 23;
    return false;
}

function formatoHoraValido(hora) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(hora);
}

function mostrarReservas() {
    const container = document.getElementById("reservasContainer");
    container.innerHTML = "";
    reservas.forEach(reserva => {
        const div = document.createElement("div");
        div.classList.add("reserva");
        div.innerHTML = `
            <strong>${reserva.nombre}</strong> - ${reserva.personas} personas - ${reserva.fecha} - ${reserva.turno} - ${reserva.hora} 
            <button onclick="editarReserva(${reserva.id})">Editar</button>
            <button onclick="eliminarReserva(${reserva.id})">Eliminar</button>
        `;
        container.appendChild(div);
    });
}

function agregarReserva(reserva) {
    reservas.push(reserva);
    guardarEnLocalStorage();
    mostrarReservas();
}

function editarReserva(id) {
    const reserva = reservas.find(r => r.id === id);
    if (reserva) {
        document.getElementById("nombre").value = reserva.nombre;
        document.getElementById("personas").value = reserva.personas;
        document.getElementById("turno").value = reserva.turno;
        document.getElementById("hora").value = reserva.hora;
        document.getElementById("fecha").value = reserva.fecha;
        eliminarReserva(id);
    }
}

function eliminarReserva(id) {
    reservas = reservas.filter(r => r.id !== id);
    guardarEnLocalStorage();
    mostrarReservas();
}

function guardarEnLocalStorage() {
    localStorage.setItem("reservas", JSON.stringify(reservas));
}

function cargarDesdeLocalStorage() {
    const data = localStorage.getItem("reservas");
    if (data) reservas = JSON.parse(data);
}