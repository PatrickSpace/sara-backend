const User = require("../models/User");
const Rol = require("../models/Rol");
const Proyecto = require("../models/Proyecto");
const jwt = require("jsonwebtoken");

const errors = async (nombre, usuario, password, roles) => {
    const errorsarray = [];
    if (!nombre || nombre === "") errorsarray.push("Ingrese un nombre");
    if (!usuario || usuario === "") errorsarray.push("Ingrese un usuario");
    if (!password || password === "") errorsarray.push("Ingrese una contraseña");
    if (!roles || roles.length === 0) errorsarray.push("Ingrese almenos un rol");
    if (usuario) {
        const userFound = await User.findOne({ usuario: usuario });
        if (userFound) {
            errorsarray.push("Este nombre de usuario ya está en uso");
        }
    }
    if (roles) {
        const foundRoles = await Rol.find({ nombre: { $in: roles } });
        if (foundRoles.length === 0) {
            errorsarray.push("Los roles no son validos");
        }
    }
    return errorsarray;
};

const lookForRole = async (rol) => {
    switch (rol) {
        case "profesor":
            val = '60eb439908800d0318b9aa70';
            break;
        case "director":
            val = '60eb439908800d0318b9aa71';
            break;
        case "coordinador":
            val = '60eb439908800d0318b9aa72';
            break;
    }
    const usuarios = await User.find({ "roles": { $elemMatch: { "$eq": (val) } } }).populate("roles");
    return usuarios;
}

module.exports = {
    getAll: async function (req, res) {
        try {
            const lista = await User.find({},
                "proyectos _id nombre usuario"
            ).populate("roles");
            res.status(200).json({ items: lista });
        } catch (err) {
            console.log(err);
        }
    },
    getProfesores: async function (req, res) {
        try {
            usuarios = await lookForRole("profesor");
            let profes = [];
            if (usuarios.length > 0) {
                usuarios.forEach((user) => {
                    if (!(user.roles.some(function (rol) { return rol.nombre === "director" || rol.nombre === "coordinador"; }))) {
                        profes.push(user)
                    };
                });
            } else {
                res.status(406).json({ msg: "No existen usuarios con este rol" });
            }
            res.status(200).json({ items: profes });
        } catch (err) {
            console.log(err);
        }
    },
    getCoordinadores: async function (req, res) {
        try {
            usuarios = await lookForRole("coordinador");
            let profes = [];
            if (usuarios.length > 0) {
                usuarios.forEach((user) => {
                    if (!(user.roles.some(function (rol) { return rol.nombre === "director" }))) {
                        profes.push(user)
                    };
                });
            } else {
                res.status(406).json({ msg: "No existen usuarios con este rol" });
            }
            res.status(200).json({ items: profes });
        } catch (err) {
            console.log(err);
        }
    },
    getDirectores: async function (req, res) {
        try {
            usuarios = await lookForRole("director");
            let profes = [];
            if (usuarios.length > 0) {
                usuarios.forEach((user) => {
                    profes.push(user)
                });
            } else {
                res.status(406).json({ msg: "No existen usuarios con este rol" });
            }
            res.status(200).json({ items: profes });
        } catch (err) {
            console.log(err);
        }
    },
    //Complies with:
    //HU-D06: CA1  
    userbyID: async function (req, res) {
        try {
            const userfound = await User.findById(req.params.id).populate("roles");
            if (!userfound) {
                res.status(400).json({ msg: ["Este usuario no existe"] });
            }
            userfound["password"] = ""
            console.log(userfound);
            res.status(200).json({ items: userfound });
        } catch (err) {
            console.log(err);
            res.status(400).json({ msg: ["Ocurrio un error"] });
        }
    },
    UNSAFE_userbyID: async function (req, res) {
        try {
            const userfound = await User.findById(req.params.id);
            if (!userfound) {
                res.status(400).json({ msg: ["Este usuario no existe"] });
            }
            console.log(userfound);
            res.status(200).json({ items: userfound });
        } catch (err) {
            console.log(err);
            res.status(400).json({ msg: ["Ocurrio un error"] });
        }
    },
    createuser: async function (req, res) {
        try {
            const { nombre, usuario, password, roles } = req.body;
            const errores = await errors(nombre, usuario, password, roles);
            if (errores.length === 0) {
                const newUser = new User({
                    nombre,
                    usuario,
                    password: await User.encryptPassword(password),
                });
                const foundRoles = await Rol.find({ nombre: { $in: roles } });
                newUser.roles = foundRoles.map((rol) => rol._id);
                const savedUser = await newUser.save();

                res.status(200).json({ msg: "Usuario creado exitosamente" });
            } else {
                res.status(400).json({ msg: errores });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ msg: ["usuario no creado"] });
        }
    },
    delete: async function (req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Usuario borrado exitosamente" });
        } catch (err) {
            console.log(err);
            res.status(400).json({ msg: ["Ocurrió un error"] });
        }
    },
    update: async function (req, res) {
        try {
            const { nombre, usuario, roles } = req.body;
            const foundRoles = await Rol.find({ nombre: { $in: roles } });
            let finalroles = foundRoles.map((rol) => rol._id);
            await User.findByIdAndUpdate(req.params.id, {
                nombre,
                usuario,
                finalroles,
            });
            res.status(200).json({ msg: "Usuario actualizado exitosamente" });
        } catch (err) {
            console.log(err);
            res.status(400).json({ msg: ["Ocurrió un error"] });
        }
    },
    asignProyect: async function (req, res) {
        try {
            console.log(req.params.id)
            const user = await User.findById(req.params.id);
            console.log(user);
            res.status(200).json({ profe: user });
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: ["Internal Error"] })

        }
    }
};