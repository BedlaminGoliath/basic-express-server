const { DataTypes } = require('sequelize');

function makePedalBoard(sequelize){
    return sequelize.define('Pedal', {
        pedalType: DataTypes.STRING,
        pedalName: DataTypes.STRING,

    });
}

module.exports = { makePedalBoard }; 