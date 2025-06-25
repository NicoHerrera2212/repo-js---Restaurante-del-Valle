let validar = true
if (validar) {
    console.log("Bienvenidos al Restaurante del Valle")
}

const horariosAlmuerzo = ["12:00", "13:00", "14:00"]
const horariosCena = ["20:00", "21:00", "22:00"]

function horariosDisponibles (comida) {
    if (comida === "almorzar") {
        return horariosAlmuerzo
    } else if (comida === "cenar") {
        return horariosCena
    } else {
        return []
    }
}

function confirmarReserva (comida, cantidad, horario) {
    alert ("Reserva Confirmada: \n" + "Tipo: " + comida + "\n" + "Personas: " + cantidad + "\n" + "Horario: " + horario)
}

let comida = prompt ("¿Querés reservar para almorzar o cenar?")
let horarios = horariosDisponibles (comida)

if (horarios.length === 0) {
    alert ("Opción inválida. Solo se puede almorzar o cenar.")
} else {
    let cantidadPersonas = parseInt(prompt("¿Cuántas personas? (máx.10)"))

    if (cantidadPersonas > 0 && cantidadPersonas <= 10) {
        let mensajeHorarios = "Horarios disponibles:\n"
        for (let i = 0; i < horarios.length; i++) {
            mensajeHorarios += (i + 1) + ". " + horarios[i] + "\n"
        }

        let opcion = parseInt(prompt(mensajeHorarios + "\nElija una opción escribiendo el número correspondiente:"))
        let horarioElegido = horarios[opcion - 1]

        if (horarioElegido) {
            confirmarReserva (comida, cantidadPersonas, horarioElegido)
            console.log ("Reserva Realizada:", comida, cantidadPersonas, horarioElegido)
        } else {
            alert ("Opción de horario no válida.")
        }
    } else {
        alert ("Reserva no válida. Solo se permiten de 1 a 10 personas.")
    }
}
