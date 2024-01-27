import { Resolver, Query } from "type-graphql";

@Resolver()
export class Heathcheck {
    @Query(() => String)
    async health() {
        return "Alive";
    }
}