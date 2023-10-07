import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { PrismaService } from "src/database/prisma.service";
import { GameRepository } from "./game.repository";

@Module({
	imports: [],
	controllers: [GameController],
	providers: [GameService, PrismaService, GameRepository],
	exports: [GameService],
})
export class GameModule {}