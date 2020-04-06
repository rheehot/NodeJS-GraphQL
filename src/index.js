const { GraphQLServer } = require('../node_modules/graphql-yoga/dist');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

//links변수는 실행 시간 중에 각 링크들을 저장하는 데에 사용되는 변수입니다. 현재로서는 모든 것이 데이터베이스가 아니라 메모리 상에 저장됨


//feed라는 최상위 필드를 위한 새로운 리졸버를 추가함. 리졸버의 이름은 항상 스키마 정의에서 대응하는 필드의 이름과 항상 같아야 한다는 것을 기억하자
const resolvers = {
    Query,
    Mutation,
    User,
    Link    
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request =>{
        return{
            ...request,
            prisma,
        }
    },
})
server.start(()=> console.log(`http://localhost:4000에서 서버 가동중`))