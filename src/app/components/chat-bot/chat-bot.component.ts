import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  @ViewChild('tabGroup', { static: false }) tabGroup;

  userData: any = [
    {
      userType: "reciever",
      userMessage: "Hello there!",
      time:"",
      channelId: 1,
      profileId: 1
    },
    {
      userType: "reciever",
      userMessage: "I need help regarding online banking",
      time: "",
      channelId: 1,
      profileId: 1
    },
    {
      userType: "reciever",
      userMessage: "I was trying to login but it's not working",
      time: "",
      channelId: 1,
      profileId: 1
    },
    {
      userType: "reciever",
      userMessage: "Can you help me with it?",
      time: "10:27 AM",
      channelId: 1,
      profileId: 1
    },
    {
      userType: "sender",
      userMessage: "Sure! Can you help me with your username?",
      time: "10:27 AM",
      channelId: 1,
      profileId: 1
    }
  ]

  userProfile: any;
  isChatActive: boolean = false;
  selectedIndex = 1;
  userMessage = '';
  activeChannel = 2;
  activeChat = 1;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUserProfile();
    this.getUserChat();
  }

  getUserProfile() {
    this.http.get('assets/profile-data.json').subscribe(
      (data) => {
        this.userProfile = data;
      });
  }

  getUserChat() {
    this.http.get('assets/user-data.json').subscribe(
      (data) => {
        for(let i=0; i< data['length']; i++) {
          if(data[i]['channelId'] === this.activeChannel && data[i]['profileId'] === this.activeChat) {
            this.userData = data[i]['chats'];
          }
        }
    });
  }

  toggleChat() {
    this.isChatActive = !this.isChatActive;
  }

  toggleActiveChat(index) {
    this.selectedIndex = index;
    this.activeChannel = index + 1;
    this.getUserChat();

  }

  scrollTabs(event) {
    const children = this.tabGroup._tabHeader._elementRef.nativeElement.children;

    // get the tabGroup pagination buttons
    const back = children[0];
    const forward = children[2];

    // depending on scroll direction click forward or back
    if (event.deltaY > 0) {
      forward.click();
    } else {
      back.click();
    }
  }

  getProfileChat(index){
    this.activeChat = index;
    this.getUserChat();
  }

  sendMessage() {
    this.userData.push({
      userType: "sender",
      userMessage: this.userMessage,
      time:""
    });

    this.userMessage = '';
  }

}
