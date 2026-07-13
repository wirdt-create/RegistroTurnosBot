const { EmbedBuilder } = require("discord.js");

function formatearTiempo(inicio) {

    const ahora = new Date();

    const segundos = Math.floor((ahora - inicio) / 1000);

    const horas = Math.floor(segundos / 3600);

    const minutos = Math.floor((segundos % 3600) / 60);

    const seg = segundos % 60;

    return `${String(horas).padStart(2,"0")}:${String(minutos).padStart(2,"0")}:${String(seg).padStart(2,"0")}`;

}

module.exports = (empleados) => {

    const embed = new EmbedBuilder()

        .setColor("#2ECC71")

        .setTitle("📊 Empleados en Servicio")

        .setTimestamp();

    if (empleados.length === 0) {

        embed.setDescription("No hay empleados en servicio.");

    } else {

        let descripcion = "";

        empleados.forEach(emp => {

            descripcion +=
`🟢 **${emp.displayName}**
⏱ ${formatearTiempo(new Date(emp.inicio))}

`;

        });

        embed.setDescription(descripcion);

    }

    embed.addFields({

        name: "👥 Total",

        value: `${empleados.length}`,

        inline: true

    });

    return embed;

}