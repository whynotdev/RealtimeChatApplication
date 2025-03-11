import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  constructor(private socket: Socket) {}

  // Send a message
  sendMessage(message: string) {
    this.socket.emit('sendMessage', message);
  }

  // Listen for received messages
  receiveMessage() {
    return this.socket.fromEvent('receiveMessage');
  }
}
