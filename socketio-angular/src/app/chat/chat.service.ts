import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  socket = io(environment.SOCKET_ENDPOINT);
  
  public sendMessage(message: string) {
    
    this.socket.emit('message', message,);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message: string) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

  public sendUser(user: string) {
    
    this.socket.emit('user', user);
  }

}
