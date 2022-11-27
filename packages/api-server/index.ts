import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { YourDetails, MoreComments, FinalComments } from './db';
import {
  yourDetailsSchema,
  moreComentsSchema,
  finalCommentsSchema,
} from './yup-schemas';

const appRouter = trpc
  .router()
  .mutation('saveYourDetails', {
    input: yourDetailsSchema,
    async resolve({ input }) {
      const details = await YourDetails.create({
        firstName: input.firstName,
        surname: input.surname,
        email: input.email,
      });
      console.log(details);
      return details;
    },
  })
  .mutation('moreComments', {
    input: moreComentsSchema,
    async resolve({ input }) {
      const comments = await MoreComments.create({
        telephoneNumber: input.telephoneNumber,
        gender: input.gender,
        dateOfBirth: input.dateOfBirth,
      });
      console.log(comments);
      return comments;
    },
  })
  .mutation('finalComments', {
    input: finalCommentsSchema,
    async resolve({ input }) {
      const finalComments = await FinalComments.create({
        comments: input.comments,
      });
      console.log(finalComments);
      return finalComments;
    },
  });

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
const port = 8080;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.get('/', (req, res) => {
  res.send('Hello from api-server');
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
