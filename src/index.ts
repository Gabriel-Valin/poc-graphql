import "reflect-metadata"
import { ApolloServer } from "apollo-server-express";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { Heathcheck } from "./graphql/resolvers/healthcheck";
import path from 'path'
import { UserResolver } from "./graphql/resolvers/user";

class Server {
    static async bootstrap(): Promise<void> {
        const app: Express = express()

        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [Heathcheck, UserResolver],
                validate: true,
                emitSchemaFile: path.resolve(__dirname, `schema.gql`)
            }),
            context: ({ req, res }) => ({ req, res })
        });

        apolloServer.applyMiddleware({ app });

        app.get('/healthcheck', (_, res) => res.status(200).json({ status: 'live' }))
        app.listen(4001, () => {
            console.log("Express server started at localhost:4001");
        });
    }
}

Server.bootstrap()