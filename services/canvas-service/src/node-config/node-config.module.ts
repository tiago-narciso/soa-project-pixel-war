import { Global, Module } from '@nestjs/common';

export const NODE_ID = 'NODE_ID';

@Global()
@Module({
    providers: [
        {
            provide: NODE_ID,
            useValue: process.env.NODE_ID || "default",
        },
    ],
    exports: [NODE_ID],
})
export class NodeConfigModule {}