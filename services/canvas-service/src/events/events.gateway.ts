import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger, OnModuleInit} from "@nestjs/common";
import {PixelDto} from "../pixel/dto/pixel.dto";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(EventsGateway.name);

    onModuleInit() {

    }

    handleDisconnect(client: Socket) {

    }

    handleConnection(client: Socket) {
        const userId = client.handshake.auth?.userId
        if (!userId) {
            this.logger.warn(`[Todo Events] gRPC Auth rejected token for socket: ${client.id}`);
            client.disconnect()
            return
        }
        client.join(`user_${userId}`)
    }

    newPixel(userId: string, pixel: PixelDto) {
        this.server.except(`user_${userId}`).emit("pixel", pixel)
    }

}
