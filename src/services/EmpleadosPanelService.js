const empleadosPanelEmbed = require("../embeds/empleadosPanelEmbed");
const PanelBuilder = require("../builders/PanelBuilder");
const EmpleadosPanelRepository = require("./EmpleadosPanelRepository");
const TurnoService = require("./TurnoService");

class EmpleadosPanelService {

    static async crear(interaction) {

        if (EmpleadosPanelRepository.existe()) {
            return interaction.reply({
                content: "❌ Ya existe un panel de empleados.",
                ephemeral: true
            });
        }

        const mensaje = await interaction.channel.send({
            embeds: [
                empleadosPanelEmbed(
                    PanelBuilder.generar(
                        TurnoService.obtenerTurnosActivos()
                    )
                )
            ]
        });

        EmpleadosPanelRepository.registrar(
            interaction.channel.id,
            mensaje.id
        );

        console.log("✅ Panel creado");
        console.log({
            channelId: interaction.channel.id,
            messageId: mensaje.id
        });

        await interaction.reply({
            content: "✅ Panel creado correctamente.",
            ephemeral: true
        });

    }

    static async actualizar(client) {

        try {

            if (!EmpleadosPanelRepository.existe()) {
                console.log("ℹ No existe un panel registrado.");
                return;
            }

            const datos = EmpleadosPanelRepository.obtener();

            console.log("Actualizando panel...");
            console.log(datos);

            // Buscar canal
            let canal;

            try {
                canal = await client.channels.fetch(datos.channelId);
            } catch (err) {
                console.log("❌ El canal ya no existe.");

                EmpleadosPanelRepository.guardar({
                    channelId: null,
                    messageId: null
                });

                return;
            }

            // Buscar mensaje
            let mensaje;

            try {

                mensaje = await canal.messages.fetch(datos.messageId);

            } catch (err) {

                if (err.code === 10008) {

                    console.log("⚠ El panel fue eliminado. Creando uno nuevo...");

                    const nuevoMensaje = await canal.send({
                        embeds: [
                            empleadosPanelEmbed(
                                PanelBuilder.generar(
                                    TurnoService.obtenerTurnosActivos()
                                )
                            )
                        ]
                    });

                    EmpleadosPanelRepository.registrar(
                        canal.id,
                        nuevoMensaje.id
                    );

                    console.log("✅ Nuevo panel creado.");
                    console.log({
                        channelId: canal.id,
                        messageId: nuevoMensaje.id
                    });

                    return;
                }

                throw err;
            }

            // Actualizar panel
            await mensaje.edit({
                embeds: [
                    empleadosPanelEmbed(
                        PanelBuilder.generar(
                            TurnoService.obtenerTurnosActivos()
                        )
                    )
                ]
            });

            console.log("✅ Panel actualizado.");

        } catch (err) {

            console.error("❌ Error al actualizar el panel:");
            console.error(err);

        }

    }

}

module.exports = EmpleadosPanelService;