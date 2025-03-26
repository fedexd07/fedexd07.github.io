
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
}

export const currentUser: User = {
  id: 'user1',
  name: 'You',
  avatar: '/placeholder.svg',
  status: 'online'
};

export const contacts: User[] = [
  {
    id: 'user2',
    name: 'Alice Chen',
    avatar: '/placeholder.svg',
    status: 'online'
  },
  {
    id: 'user3',
    name: 'Bob Johnson',
    avatar: '/placeholder.svg',
    status: 'away',
    lastSeen: '10 minutes ago'
  },
  {
    id: 'user4',
    name: 'Carol Williams',
    avatar: '/placeholder.svg',
    status: 'offline',
    lastSeen: '2 hours ago'
  },
  {
    id: 'user5',
    name: 'David Smith',
    avatar: '/placeholder.svg',
    status: 'online'
  },
  {
    id: 'user6',
    name: 'Emma Brown',
    avatar: '/placeholder.svg',
    status: 'offline',
    lastSeen: 'Yesterday'
  }
];

export const chats: Chat[] = [
  {
    id: 'chat1',
    participants: [currentUser, contacts[0]],
    messages: [
      {
        id: 'msg1',
        senderId: 'user2',
        text: 'Hey there! How are you doing today?',
        timestamp: '09:42',
        status: 'read'
      },
      {
        id: 'msg2',
        senderId: 'user1',
        text: 'I\'m good, thanks! Just working on this new project. How about you?',
        timestamp: '09:45',
        status: 'read'
      },
      {
        id: 'msg3',
        senderId: 'user2',
        text: 'I\'m great! Just finished my morning coffee and about to start working.',
        timestamp: '09:48',
        status: 'read'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      id: 'msg3',
      senderId: 'user2',
      text: 'I\'m great! Just finished my morning coffee and about to start working.',
      timestamp: '09:48',
      status: 'read'
    }
  },
  {
    id: 'chat2',
    participants: [currentUser, contacts[1]],
    messages: [
      {
        id: 'msg4',
        senderId: 'user3',
        text: 'Did you see the game last night?',
        timestamp: 'Yesterday',
        status: 'read'
      },
      {
        id: 'msg5',
        senderId: 'user1',
        text: 'Yes! It was amazing!',
        timestamp: 'Yesterday',
        status: 'read'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      id: 'msg5',
      senderId: 'user1',
      text: 'Yes! It was amazing!',
      timestamp: 'Yesterday',
      status: 'read'
    }
  },
  {
    id: 'chat3',
    participants: [currentUser, contacts[2]],
    messages: [
      {
        id: 'msg6',
        senderId: 'user4',
        text: 'Can we meet for lunch tomorrow?',
        timestamp: 'Monday',
        status: 'read'
      },
      {
        id: 'msg7',
        senderId: 'user1',
        text: 'Sure! How about 1pm at the usual place?',
        timestamp: 'Monday',
        status: 'read'
      },
      {
        id: 'msg8',
        senderId: 'user4',
        text: 'Perfect! See you then.',
        timestamp: 'Monday',
        status: 'read'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      id: 'msg8',
      senderId: 'user4',
      text: 'Perfect! See you then.',
      timestamp: 'Monday',
      status: 'read'
    }
  },
  {
    id: 'chat4',
    participants: [currentUser, contacts[3]],
    messages: [
      {
        id: 'msg9',
        senderId: 'user5',
        text: 'Hey, do you have the presentation file?',
        timestamp: '11:30',
        status: 'delivered'
      }
    ],
    unreadCount: 1,
    lastMessage: {
      id: 'msg9',
      senderId: 'user5',
      text: 'Hey, do you have the presentation file?',
      timestamp: '11:30',
      status: 'delivered'
    }
  },
  {
    id: 'chat5',
    participants: [currentUser, contacts[4]],
    messages: [
      {
        id: 'msg10',
        senderId: 'user6',
        text: 'Happy birthday! 🎉',
        timestamp: 'Last week',
        status: 'read'
      },
      {
        id: 'msg11',
        senderId: 'user1',
        text: 'Thank you so much!',
        timestamp: 'Last week',
        status: 'read'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      id: 'msg11',
      senderId: 'user1',
      text: 'Thank you so much!',
      timestamp: 'Last week',
      status: 'read'
    }
  }
];
