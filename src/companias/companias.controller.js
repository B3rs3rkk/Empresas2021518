import Compania from "../companias/companias.model.js"
import ExcelJS from "exceljs";
import path from "path";

export const registerCompany = async (req, res, next) => {
    try {
        const data = req.body;

        const existingCompany = await Compania.findOne({ correo: data.correo });
        if (existingCompany) {
            return res.status(400).json({ msg: "La compania ya está registrada" });
        }

        const newCompany = new Compania(data);
        await newCompany.save();

        res.status(201).json({ msg: "Compania creada exitosamente" });
    } catch (err) {
        res.status(500).json({ msg: "Error al crear la compania", error: err.message });
    }
}


export const listarCompanias = async (req, res) => {
    try {
        const { categoria, orden, aniosTrayectoria } = req.body;
        let filtro = {};

        if (categoria) filtro.categoria = categoria;
        if (aniosTrayectoria) {
            const anioActual = new Date().getFullYear();
            filtro.anioFundacion = { $lte: anioActual - Number(aniosTrayectoria) };
        }

        let companias = await Compania.find(filtro);

        if (orden === "A-Z") {
            companias.sort((a, b) => a.nombreCompania.localeCompare(b.nombreCompania));
        } else if (orden === "Z-A") {
            companias.sort((a, b) => b.nombreCompania.localeCompare(a.nombreCompania));
        }

        if (companias.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No se encontraron compañías con los filtros proporcionados",
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Compañías Filtradas");

        worksheet.columns = [
            { header: "Nombre Compañía", key: "nombreCompania", width: 30 },
            { header: "Categoría", key: "categoria", width: 20 },
            { header: "Año Fundación", key: "anioFundacion", width: 15 },
            { header: "Años de Trayectoria", key: "aniosDeTrayectoria", width: 20 },
            { header: "Impacto", key: "impacto", width: 15 },
            { header: "Dirección", key: "direccion", width: 30 },
            { header: "Teléfono", key: "telefono", width: 15 },
            { header: "Correo", key: "correo", width: 30 }
        ];

        companias.forEach((compania) => {
            worksheet.addRow({
                nombreCompania: compania.nombreCompania,
                categoria: compania.categoria,
                anioFundacion: compania.anioFundacion,
                aniosDeTrayectoria: compania.aniosDeTrayectoria,
                impacto: compania.impacto,
                direccion: compania.direccion,
                telefono: compania.telefono,
                correo: compania.correo
            });
        });

        const filePath = path.join(__dirname, "../exports/companias_filtradas.xlsx");
        await workbook.xlsx.writeFile(filePath);

        res.status(200).json({
            success: true,
            msg: "Archivo generado exitosamente",
            filePath
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al filtrar y exportar compañías",
            error: err.message,
        });
    }
};


export const updateCompany = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const company = await Compania.findById(uid);

        if (!company) {
            return res.status(400).json({
                success: false,
                msg: "Compania no encontrada",
            });
        }

        const updateCompany = await Compania.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Compania actualizada",
            company: updateCompany,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la compania",
            error: err.message,
        });
    }
};

