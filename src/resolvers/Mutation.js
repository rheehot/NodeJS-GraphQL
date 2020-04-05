const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {APP_SECRET, getUserId} = require('../utils');

async function signup(parent, args, context, info){
    //1
    const password = await bcrypt.hash(args.password,10)
    //2
    const user = await context.prisma.createUser({...args,password})
    
    //APP_SECRET 값으로 서명된 JWT 생성
    const token = jwt.sign({uerId:user.id}, APP_SECRET)

    //4
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info){
    //1
    const user = await context.prisma.user({ email: args.email})
    if(!user){
        throw new Error('No Such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET)

    //3 
    return{
        token,
        user,
    }
}

function post(parent, args, context, info){
    const userId = getUserId(context)
    return context.prisma.createLink({
        url:args.url,
        description: args.description,
        postedBy: {connect: { id:userId}},
    })
}

module.exports = {
    signup,
    login,
    post,
}

