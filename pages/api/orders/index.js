import clientPromise from '../../../lib/mongodb';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

// Inicializa el middleware CORS
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS']
  })
);

export default async (req, res) => {
  try {
    await cors(req, res);

    const client = await clientPromise;
    const db = client.db('serrano');

    const limitResponse = req.query.limit;

    switch (req.method) {
      case 'GET':
        const orders = await db
          .collection('orders')
          .find({})
          .limit(parseInt(limitResponse))
          .toArray();

        res.json(orders);

      case 'POST':
        const {
          startDate,
          endDate,
          price,
          quantity,
          materials,
          client,
          status
        } = req.body;

        // Verifica si estan todos los datos
        if (
          !startDate ||
          !price ||
          !quantity ||
          !materials ||
          !client ||
          !status
        ) {
          return res
            .status(400)
            .json({ message: 'Faltan campos obligatorios' });
        }

        const newEntry = {
          startDate,
          endDate: '',
          price,
          quantity,
          materials,
          client,
          status
        };

        // Insertar el nuevo objeto en la colección
        const newItem = await db.collection('orders').insertOne(newEntry);
        const newItemId = newItem.insertedId;

        res.status(201).json({
          _id: newItemId,
          ...newEntry
        });

        break;
      default:
        return res.status(405).send('Method not allowed');
    }
  } catch (e) {
    console.error(e);
  }
};
