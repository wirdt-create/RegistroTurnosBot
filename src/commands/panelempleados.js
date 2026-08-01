const EmpleadosPanelService = require("../services/EmpleadosPanelService");

module.exports = {

    name: "panelempleados",

    async execute(interaction) {

        await EmpleadosPanelService.crear(interaction);

    }

};