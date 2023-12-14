import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('serrano');

    const limitResponse = req.query.limit;

    switch (req.method) {
      case 'GET':
        const accounting = await db
          .collection('accounting')
          .find({})
          .limit(parseInt(limitResponse))
          .toArray();

        res.json(accounting);

      case 'POST':
        const { title, price, type, date, client, additionalInfo } = req.body;

        // Validar que los campos necesarios estén presentes
        if (!title || !price || !type || !date || !client || !additionalInfo) {
          return res
            .status(400)
            .json({ message: 'Faltan campos obligatorios' });
        }

        const newEntry = {
          title,
          price,
          type,
          date,
          client,
          additionalInfo
        };

        // Insertar el nuevo objeto en la colección
        await db.collection('accounting').insertOne(newEntry);

        res.status(201).json(newEntry); // 201 significa creado con éxito
        break;
      // case "PATCH":
      //   return res.json({ message: "Todavia no hay PATCH" });
      default:
        return res.status(405).send('Method not allowed');
    }
  } catch (e) {
    console.error(e);
  }
};
