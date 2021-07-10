const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  nombre: { type: String, unique: true, required: true },
  usuario: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [
    {
      ref: "Rol",
      type: Schema.Types.ObjectId,
    },
  ],
});

userSchema.statics.encryptPassword = async (psw) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(psw, salt);
};

userSchema.statics.matchPassword = async function (psw) {
  return await bcrypt.compare(psw, this.password);
};

module.exports = model("User", userSchema);
