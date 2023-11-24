import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {

	catch(exception: any, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse();
		const request = context.getRequest();

		if (exception instanceof Prisma.PrismaClientKnownRequestError && exception.code === 'P2002') {
			let target = exception.meta.target;
			response
				.status(HttpStatus.BAD_REQUEST)
				.json({
					statusCode: HttpStatus.BAD_REQUEST,
					path: request.url,
					msg: `${target} already exists`,
				});
		}
	}
}