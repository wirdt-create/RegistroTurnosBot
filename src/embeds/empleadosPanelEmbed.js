const { EmbedBuilder } = require("discord.js");

module.exports = (panel) => {

    return new EmbedBuilder()

        .setColor("#2ECC71")

        .setTitle("🍪 SUSY COOKIES")

        .setDescription(

`━━━━━━━━━━━━━━━━━━━━━━

👷 **PERSONAL EN SERVICIO**

${panel.descripcion}

━━━━━━━━━━━━━━━━━━━━━━

👥 **Empleados activos**
${panel.total}`

        )

        .setTimestamp()

        .setFooter({

            text: "Actualización automática"

        });

};