import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { User } from "../../entities/user";
import { Sale } from "../../entities/sale";
import { UserService } from "../../services/user";
import { isAuth } from "../middleware/is-auth";
import { IsEmail, MaxLength, MinLength } from "class-validator";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@InputType()
class RegisterInput {
    @Field({ nullable: false })
    @MinLength(3)
    @MaxLength(30)
    name: string

    @Field({ nullable: false })
    @IsEmail()
    email: string

    @Field({ nullable: false })
    @MinLength(6)
    password: string
}

@Resolver(() => User)
export class UserResolver {
    service: UserService = new UserService()

    @Mutation(() => User)
    async register(
        @Arg("input") input: RegisterInput,
    ) {
        return this.service.register({ name: input.name, email: input.email, password: input.password })
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        return this.service.login({ email, password })
    }

    @Query(() => User)
    @UseMiddleware(isAuth)
    async me(
        @Ctx("userId") userId: number,
    ) {
        return this.service.me(userId)
    }

    @FieldResolver(() => [Sale])
    @UseMiddleware(isAuth)
    async sales(@Root() user: User) {
        return user.sales
    }
}