import Server from './server.js'

const server = new Server()

export const start = async () => await server.start()