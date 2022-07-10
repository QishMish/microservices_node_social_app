import { PrismaClient } from "@prisma/client";

class PrismaSource {
  private static prismaClient: PrismaClient;
  public static getRepository(): PrismaClient {
    if (!PrismaSource.prismaClient) {
      PrismaSource.prismaClient = new PrismaClient();
    }
    return PrismaSource.prismaClient;
  }
}

export default PrismaSource;
