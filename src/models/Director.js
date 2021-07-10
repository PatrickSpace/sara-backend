const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema(
  {
    nombre: { type: String, required: true },
    usuario: { type: String, required: true },
    password: { type: String, required: true },
    activo: { type: Boolean, required: true },
  },
  { timestamps: true }
);

UserSchema.methods.encryptPassword = async (psw) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (psw) {
  return await bcrypt.compare(psw, this.password);
};

module.exports = model("Director", UserSchema);
