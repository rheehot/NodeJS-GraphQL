function newLinkSubscribe(parent, args, context, info){
    return context.prisma.$subcribe.link({mutation_in:['CREATED']}).node()
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve:payload =>{
        return payload
    },
}

module.exports = {
    newLink,
}