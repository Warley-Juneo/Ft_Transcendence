import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

	catch(exception: any, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse();
		const request = context.getRequest();

		console.log("Enter on AllExceptionsFilter");
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
		else if (exception instanceof BadRequestException) {
			
			let obj: any = exception.getResponse()
			// console.log("\n\n PIPE: ",obj.message, "\n\n");
			response.status(HttpStatus.BAD_REQUEST)
			.json({
				statusCode: HttpStatus.BAD_REQUEST,
				path: request.url,
				msg: obj.message,
			});
		}
	}
}