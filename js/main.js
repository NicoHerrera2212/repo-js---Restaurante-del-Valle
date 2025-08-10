document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("reservaForm");
    const mensajeError = document.getElementById("mensajeError");

    flatpickr("#fecha", {
        minDate: "today",
        dateFormat: "d-m-Y",
        locale: "es",
    });


    try {
        const response = await fetch("./json/data.json");
        if (!response.ok) throw new Error("Error al cargar datos del servidor.");
        const data = await response.json();
        reservas = [...data];
    } catch (error) {
        console.error(error);
        Toastify({
            text: "No se pudieron cargar datos iniciales.",
            backgroundColor: "red",
            duration: 3000
        }).showToast();
    } finally {
        cargarDesdeLocalStorage();
        mostrarReservas();
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        mensajeError.textContent = "";

        const nombre = document.getElementById("nombre").value.trim();
        const personas = parseInt(document.getElementById("personas").value);
        const turno = document.getElementById("turno").value;
        const hora = document.getElementById("hora").value;
        const fecha = document.getElementById("fecha").value;

        if (!fecha) {
            mensajeError.textContent = "Por favor seleccioná una fecha válida.";
            return;
        }

        if (!formatoHoraValido(hora)) {
            mensajeError.textContent = "Formato de hora inválido. Usa HH:MM.";
            return;
        }

        if (!validarHora(turno, hora)) {
            mensajeError.textContent = "Hora fuera del rango permitido para el turno (12:00 - 14:00hs / 21:00 - 23:00 hs).";
            return;
        }

        const reserva = {
            id: Date.now(),
            nombre,
            personas,
            turno,
            hora,
            fecha
        };

        agregarReserva(reserva);

        Toastify({
            text: "Reserva agregada correctamente",
            backgroundColor: "green",
            duration: 3000
        }).showToast();

        form.reset();
    });
});