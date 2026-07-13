const PersistenciaService = require("../services/PersistenciaService");
const TurnoService = require("../services/TurnoService");
const EmpleadosPanelService = require("../services/EmpleadosPanelService");

module.exports = async (client) => {

    console.log(`✅ Bot conectado como ${client.user.tag}`);

    const datos = PersistenciaService.cargar();

    TurnoService.cargarTurnos(datos);

    console.log(`📂 Turnos recuperados: ${Object.keys(datos).length}`);

    // Actualiza el panel al iniciar
    await EmpleadosPanelService.actualizar(client);

    // Actualiza el panel cada segundo
    setInterval(async () => {

        await EmpleadosPanelService.actualizar(client);

    }, 1000);

};