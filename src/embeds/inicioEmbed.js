const { EmbedBuilder } = require("discord.js");

module.exports = (usuario, fecha) => {

    return new EmbedBuilder()

        .setColor("#2ECC71")

        .setTitle("🟢 Inicio de Turno")

        .setThumbnail(usuario.displayAvatarURL())

        .addFields(

            {
                name: "👤 Empleado",
                value: `${usuario}`,
                inline: false
            },

            {
                name: "🆔 Usuario",
                value: usuario.tag,
                inline: true
            },

            {
                name: "🕒 Hora de entrada",
                value: fecha.toLocaleTimeString("es-CO"),
                inline: true
            },

            {
                name: "📅 Fecha",
                value: fecha.toLocaleDateString("es-CO"),
                inline: false
            },

            {
                name: "Estado",
                value: "🟢 En servicio",
                inline: false
            }

        )

        .setTimestamp(fecha)

        .setFooter({
            text: "Sistema de Registro de Turnos"
        });

};