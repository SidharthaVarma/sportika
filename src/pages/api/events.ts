import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, date, time, venue, picture } = req.body;

      const event = await prisma.event_Details.create({
        data: {
          title,
          date: new Date(date),
          time,
          venue,
          picture,
        },
      });

      res.status(201).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === 'GET') {
    try {
      const events = await prisma.event_Details.findMany();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
// import { PrismaClient } from '@prisma/client';
// import { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { title, date, time, venue, picture } = req.body;

//       // Convert the date string "26 August 2024" to a Date object
//       const parsedDate = new Date(Date.parse(date));

//       // Check if the date is valid
//       if (isNaN(parsedDate.getTime())) {
//         res.status(400).json({ message: 'Invalid date format' });
//         return;
//       }

//       const event = await prisma.event_Details.create({
//         data: {
//           title,
//           date: parsedDate, // Store the date as a Date object
//           time,
//           venue,
//           picture,
//         },
//       });

//       res.status(201).json(event);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else if (req.method === 'GET') {
//     try {
//       const events = await prisma.event_Details.findMany();
//       res.status(200).json(events);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
