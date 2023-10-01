import {
	CallHandler,
	ConsoleLogger,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestUser } from 'src/authentication/authentication.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
	constructor(private logger: ConsoleLogger) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const contextHttp = context.switchToHttp();
		const request = contextHttp.getRequest<Request | RequestUser>();
		const response = contextHttp.getResponse<Response>();
		const { path, method } = request;
		const { statusCode } = response;

		this.logger.log(`${method} ${path}`);

		const timePreExecutionRouter = Date.now();

		return next.handle().pipe(
			tap(() => {
				if ('user' in request) {
					this.logger.log(`Router access by user ${request.user.sub}`);
				}
				const executionTimeRouter = Date.now() - timePreExecutionRouter;
				this.logger.log(
					`Response: status ${statusCode} - ${executionTimeRouter}ms`,
				);
			}),
		);
	}
}
