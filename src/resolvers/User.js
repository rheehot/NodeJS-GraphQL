function links(parent, args, context){
    return context.prisma.user({id: parent}).links()
}

module.exports = {
    links,
}