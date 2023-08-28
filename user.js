const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: true,
            min: 7,
            max: 30,
        },

        email: {
            type : String,
            required: true,
            max: 50,
        },
    },
    {timestamps : true}
);

module.exports = mongoose.model("User" , UserSchema);