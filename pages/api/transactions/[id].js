import { log } from "console";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("serrano");

  const id = req.query.id;
  const objectId = new ObjectId(id);

  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "Falta el parámetro 'id' en la consulta" });
    }

    switch (req.method) {
      case "GET":
        const singleEntry = await db
          .collection("accounting")
          .findOne({ _id: objectId });

        if (singleEntry) {
          res.json(singleEntry);
        } else {
          res
            .status(404)
            .json({ message: `No se encontró ningún elemento con ID ${id}` });
        }
        break;
      case "PUT":
        const { title, price, type } = req.body;

        // Verifica si estan todos los datos
        if (!title || !price || !type) {
          return res
            .status(400)
            .json({ message: "Faltan campos obligatorios" });
        }

        const updatedEntry = {
          _id: objectId,
          title,
          price,
          type,
        };

        // Actualiza
        const updateResult = await db
          .collection("accounting")
          .replaceOne({ _id: objectId }, updatedEntry);

        if (updateResult.modifiedCount === 1) {
          res.json({
            message: `Elemento con ID ${id} actualizado correctamente`,
          });
        } else {
          res
            .status(404)
            .json({ message: `No se encontró ningún elemento con ID ${id}` });
        }
        break;
      case "DELETE":
        const deleteResult = await db
          .collection("accounting")
          .deleteOne({ _id: objectId });

        if (deleteResult.deletedCount === 1) {
          res.json({
            message: `Elemento con ID ${id} eliminado correctamente`,
          });
        } else {
          res
            .status(404)
            .json({ message: `No se encontró ningún elemento con ID ${id}` });
        }
        break;

      default:
        return res.status(405).send("Method not allowed");
        break;
    }
  } catch (error) {}
};
