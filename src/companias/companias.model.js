import { Schema, model } from "mongoose";

const companiaSchema = Schema({
    nombreCompania: {
        type: String,
        required: [true, 'El nombre de la empresa es requerido'],
        maxLength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    creacion: {
        type: Number,
        required: [true, 'La creacion es requerida'],
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es requerida']
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es requerido'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    aniosDeTrayectoria: {
        type: Number,
    },
    categoria: {
        type: String,
        enum: ["Tecnología", "Medicina", "Educación", "Finanzas", "Construcción"],
        require: true
    },
    impacto: {
        type: String,
        enum: ["Alto", "Medio", "Bajo"],
        required: true
    },
    anioFundacion:{
        type: Number,
        require: true
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

companiaSchema.methods.toJSON = function() {
    const { __v, _id, ...compania } = this.toObject();
    compania.uid = _id;
    return empresa;
}

export default model("Compania", companiaSchema);
