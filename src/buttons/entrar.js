const TurnoService = require("../services/TurnoService");
const inicioEmbed = require("../embeds/inicioEmbed");
const EmpleadosPanelService = require("../services/EmpleadosPanelService");

module.exports = async (interaction) => {

    const resultado = TurnoService.iniciar(interaction);

    if (!resultado.ok) {
        return interaction.reply({
            content: resultado.mensaje,
            ephemeral: true
        });
    }

    const canal = interaction.guild.channels.cache.get(
        process.env.REGISTRO_CHANNEL_ID
    );

    if (canal) {
        await canal.send({
            embeds: [
                inicioEmbed(interaction.user, resultado.inicio)
            ]
        });
    }
    await EmpleadosPanelService.actualizar(interaction.client);
    await interaction.reply({
        embeds: [
            {
                color: 0x2ECC71,
                title: "✅ Has iniciado tu turno correctamente",
                fields: [
                    {
                        name: "👤 Empleado",
                        value: interaction.user.toString()
                    },
                    {
                        name: "🕒 Hora",
                        value: resultado.inicio.toLocaleTimeString("es-CO")
                    }
                ],
                timestamp: resultado.inicio
            }
        ],
        ephemeral: true
    });
    

};
