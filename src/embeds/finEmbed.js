const { EmbedBuilder } = require("discord.js");

module.exports = (usuario, inicio, fin, tiempo) => {

    return new EmbedBuilder()

        .setColor("#E74C3C")

        .setTitle("🔴 Fin de Turno")

        .setThumbnail(usuario.displayAvatarURL())

        .addFields(

            {

                name: "👤 Empleado",

                value: `${usuario}`

            },

            {

                name: "🕒 Hora de entrada",

                value: inicio.toLocaleTimeString("es-CO"),

                inline: true

            },

            {

                name: "🕒 Hora de salida",

                value: fin.toLocaleTimeString("es-CO"),

                inline: true

            },

            {

                name: "⏱ Tiempo trabajado",

                value: tiempo

            },

            {

                name: "Estado",

                value: "🔴 Fuera de servicio"

            }

        )

        .setTimestamp(fin)

        .setFooter({

            text: "Sistema de Registro de Turnos"

        });

};