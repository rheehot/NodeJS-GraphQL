const { GraphQLServer } = require('../node_modules/graphql-yoga/dist');
const { prisma } = require('./generated/prisma-client');
//links변수는 실행 시간 중에 각 링크들을 저장하는 데에 사용되는 변수입니다. 현재로서는 모든 것이 데이터베이스가 아니라 메모리 상에 저장됨


//feed라는 최상위 필드를 위한 새로운 리졸버를 추가함. 리졸버의 이름은 항상 스키마 정의에서 대응하는 필드의 이름과 항상 같아야 한다는 것을 기억하자
const resolvers = {
    Query:{
        info:() => `This is the API of a Young Hoon Choi Clone`,
        feed:(root, args, context ,info)=>{ //Context인자는 리졸버 체인상의 모든 리졸버가 읽기/쓰기를 할 수있는 자바스크립트 객체이다.
            return context.prisma.links()
        },
    },
    Mutation:{
        //post 리졸버는 우선 새로운 link객체를 생성하고, 이것을 기존의 links리스트에 추가한 뒤 최종적으로는 새로 생성된 link를 반환합니다.
        post:(root, args, context) =>{
            return context.prisma.createLink({
                url: args.url,
                description:args.description,
            })
        },
    },
    
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context:{prisma} // 이 시점에서 초기화됨
})
server.start(()=> console.log(`http://localhost:4000에서 서버 가동중`))

/*
const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {
  // Create a new user called `Alice`
  const newUser = await prisma.createUser({ name: 'Alice' })
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)

  // Read all users from the database and print them to the console
  const allUsers = await prisma.users()
  console.log(allUsers)
}

main().catch(e => console.error(e))
*/