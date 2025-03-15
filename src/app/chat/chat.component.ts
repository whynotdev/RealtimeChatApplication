import { Component, OnInit } from '@angular/core';
import { WebsocketServiceService } from './../services/websocket-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports:[FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: string[] = [];
  typing: boolean = false;

  constructor(private websocketService: WebsocketServiceService) {}

  ngOnInit(): void {
    // Listen for incoming messages
    this.websocketService.receiveMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  // Send a message
  sendMessage() {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message);
      this.messages.push(this.message);
      this.message = ''; // Clear input field
    }
  }

  // Typing indicator
  onTyping() {
    this.typing = true;
  }

  stopTyping() {
    this.typing = false;
  }
}
