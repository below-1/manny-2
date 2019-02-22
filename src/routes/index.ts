import { Application, Request, Response } from 'express'
import { Repo } from '../types'
import { 
  decodeToken, 
  encodeToken 
} from '../services'

declare module "express" {
  interface Request {
    user: any
    authToken: any
  }
}

interface IAuthInput {
  app: Application;
  repo: Repo;
}

export function auths({ app, repo } : IAuthInput) {

  const encodeTokenWithRepo = encodeToken(repo.user)

  app.use(process.env.GRAPHQL_ENDPOINT, async (req: Request, resp: Response, next: any) => {
    const token = req.query.authorization || req.headers['authorization']
    let user = await decodeToken(token)
    if (user) {
      req.user = user
      req.authToken = token
    }
    next()
  })

  app.get('/token', async (req: Request, resp: Response) => {
    const id = req.query.id
    let token = await encodeTokenWithRepo(id)
    resp.end(token)
  })
}