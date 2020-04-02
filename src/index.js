const { GraphQLServer } = require('graphql-yoga');

//links변수는 실행 시간 중에 각 링크들을 저장하는 데에 사용되는 변수입니다. 현재로서는 모든 것이 데이터베이스가 아니라 메모리 상에 저장됨
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'FullStack tutorial for GraphQL'
}]

let idCount = links.length // 새로 생성되는 Link 항목에 대한 고유한 ID값으로 사용할 새로운 정수 변수를 추가했습니다.
//feed라는 최상위 필드를 위한 새로운 리졸버를 추가함. 리졸버의 이름은 항상 스키마 정의에서 대응하는 필드의 이름과 항상 같아야 한다는 것을 기억하자
const resolvers = {
    Query:{
        info:() => `This is the API of a Young Hoon Choi Clone`,
        feed:() => links,
    },
    Mutation:{
        //post 리졸버는 우선 새로운 link객체를 생성하고, 이것을 기존의 links리스트에 추가한 뒤 최종적으로는 새로 생성된 link를 반환합니다.
        post:(parent, args) =>{
            const link = {
                id:`link-${idCount++}`,
                description:args.description,
                url:args.url,
            }
            links.push(link)
            return link
        },
        deleteLink:(parent, args) =>{
            const link={
                id:`link-${args.id}`
            }
            links.pop(link)
            return link
        },
        updateLink:(parent, args) =>{
            const link={
                id:`link-${args.id}`,
                description:args.description,
                url:args.url
            }
            links[link.id]=link
            return link
        }
    },
    
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(()=> console.log(`http://localhost:4000에서 서버 가동중`))