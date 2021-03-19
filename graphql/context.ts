import { PrismaClient } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { MercuriusContext } from "mercurius";

const prisma = new PrismaClient();

export type Context = ServerContext & MercuriusContext;

type ServerContext = {
  prisma: PrismaClient;
  req: FastifyRequest;
};

export const buildContext = (req: FastifyRequest): ServerContext => {
  return { prisma, req };
};
