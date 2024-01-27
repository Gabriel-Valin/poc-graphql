import { MiddlewareFn } from "type-graphql";
import { Request, Response } from "express";

type RequestContext = {
    req: Request
    res: Response
    userId: number
}
export const isAuth: MiddlewareFn<RequestContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization || authorization !== 'Bearer accessTokenGenerated') {
        throw new Error("Not authenticated");
    }


    // simulando jwt
    const verify = { userId: 2 }
    context.userId = verify.userId
    return next()
};