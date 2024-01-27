import { ObjectType, ID, Field } from "type-graphql"
import { Sale } from "./sale"

@ObjectType()
export class User {
    @Field(_type => ID)
    id: number

    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

    @Field(_type => [Sale])
    sales?: Sale[]
}
