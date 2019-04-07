import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
	typeDefs: require('../prisma/generated/prisma-client/prisma-schema').typeDefs,
	endpoint: 'http://localhost:4466',
	secret: 'thisismysupersecrettext'
})

export { prisma as default }
