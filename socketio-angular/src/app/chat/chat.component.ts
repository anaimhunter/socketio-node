import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  newMessage!: string;
  messageList: string[] = [];
  secretCode!: string;

  userName!: string;

  constructor(private chatService: ChatService){
    this.secretCode = 'DONT TELL';
  }

  ngOnInit(){
    this.chatService
      .getNewMessage()
      .subscribe((message: string) => {
        const currentTime = moment().format('hh:mm:ss a');
        if(message!='')
        {
          const messageWithTimestamp = `${currentTime}: ${message}`;
          this.messageList.push(messageWithTimestamp);
        }
      });
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  sendUser() {
    this.chatService.sendUser(this.userName);
  }

}
