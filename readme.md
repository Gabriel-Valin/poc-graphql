## Steps

`npm ci`

`npx prisma init`

`npx prisma migrate dev`

`npx prisma db seed`

## Access Playground

localhost:4001/graphql

### Queries & Mutations

Register

```gql
mutation {
  register(
    input: {
      name: "Gabriel Valin"
      email: "gabrielvalincontato@gmail.com"
      password: "123456"
    }
  ) {
    id
    name
  }
}
```

Login

```gql
mutation {
  login(
    email: "gabrielvalincontato@gmail.com",
    password: "12345"
  ) {
    accessToken
  }
}
```

Me with sales (authenticate)

- Add on HTTP Headers `{ "Authorization": "Bearer accessTokenGenerated" }`

```gql
query {
  me {
    name,
    email,
    
    sales {
      description,
      value
    }
  }
}
```

Me (authenticate)

- Add on HTTP Headers `{ "Authorization": "Bearer accessTokenGenerated" }`

```gql
query {
  me {
    name,
    email
  }
}
```