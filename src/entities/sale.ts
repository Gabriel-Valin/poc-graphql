import { ObjectType, ID, Field } from "type-graphql"

@ObjectType()
export class Sale {
    @Field(_type => ID)
    id: number

    @Field()
    userId: number

    @Field()
    value: number

    @Field()
    description: string
}
