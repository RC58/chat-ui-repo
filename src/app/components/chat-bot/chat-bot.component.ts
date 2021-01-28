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
      time:""
    },
    {
      userType: "reciever",
      userMessage: "I need help regarding online banking",
      time: ""
    },
    {
      userType: "reciever",
      userMessage: "I was trying to login but it's not working",
      time: ""
    },
    {
      userType: "reciever",
      userMessage: "Can you help me with it?",
      time: "10:27 AM"
    },
    {
      userType: "sender",
      userMessage: "Sure! Can you help me with your username?",
      time: "10:27 AM"
    }
  ]

  isChatActive: boolean = false;
  selectedIndex = 1;
  userMessage = '';

  constructor() { }

  ngOnInit() {
  }

  toggleChat() {
    this.isChatActive = !this.isChatActive;
  }

  toggleActiveChat(index) {
    this.selectedIndex = index;
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

  sendMessage() {
    this.userData.push({
      userType: "sender",
      userMessage: this.userMessage,
      time:""
    });
    this.userMessage = '';
  }

}
