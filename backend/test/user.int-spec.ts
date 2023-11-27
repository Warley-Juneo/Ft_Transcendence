import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/database/prisma.service";
import { GameModule } from "src/game/game.module";
// import { UsersController } from "src/users/users.controller";


describe('USerTest Int', () => {

	let prisma: PrismaService;
	let moduleRef;
	beforeAll(async () => {
		moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		prisma = moduleRef.get(PrismaService);
		await prisma.cleanDatabase();
	});


	it.todo('should pass');



	
});