export interface Member {
  id: number;
  name: string;
  emojiId: number;
  isOwner: boolean;
  houseHoldId: number;
  userId: number;
  isRequest: boolean;
}
export interface Emoji {
  id: number;
  name: string;
  color: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  houseHoldId: number;
  isArchived: boolean;
  reoccurence: number;
  score: number;
}

export interface Household {
  id: number;
  name: string;
  code: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface CompletedTask {
  id: number;
  memberId: number;
  taskId: number;
  date: Date;
}

export const emojis: Emoji[] = [
  {
    id: 1,
    name: "duck",
    color: "orange",
  },
  {
    id: 2,
    name: "dolphin",
    color: "blue",
  },
  {
    id: 3,
    name: "pig",
    color: "pink",
  },
  {
    id: 4,
    name: "bird",
    color: "gold",
  },
  {
    id: 5,
    name: "snake",
    color: "green",
  },
  {
    id: 6,
    name: "elephant",
    color: "purple",
  },
  {
    id: 7,
    name: "unicorn",
    color: "black",
  },
  {
    id: 8,
    name: "owl",
    color: "brown",
  },
  {
    id: 9,
    name: "",
    color: "",
  },
];

export const mockedUser: User = {
  id: 1,
  username: "john",
  password: "doe",
};

export const mockedHouseholds: Household[] = [
  {
    id: 1,
    name: "Borås YH",
    code: "ABC123",
  },
  {
    id: 2,
    name: "Firestation",
    code: "wedidntstartthefire",
  },
];

export const mockedMembers: Member[] = [
  {
    id: 1,
    name: "John Doe",
    emojiId: 2,
    isOwner: true,
    houseHoldId: 1,
    userId: 1,
    isRequest: false,
  },
  {
    id: 2,
    name: "Magical Raindeer",
    emojiId: 4,
    isOwner: false,
    houseHoldId: 2,
    userId: 1,
    isRequest: false,
  },
];

export const mockedCompletedTasks: CompletedTask[] = [
  {
    id: 1,
    memberId: 2,
    taskId: 2,
    date: new Date(),
  },
  {
    id: 2,
    memberId: 1,
    taskId: 4,
    date: new Date(),
  },
  {
    id: 3,
    memberId: 2,
    taskId: 3,
    date: new Date(),
  },
  {
    id: 3,
    memberId: 1,
    taskId: 1,
    date: new Date(),
  },
  {
    id: 3,
    memberId: 2,
    taskId: 1,
    date: new Date(),
  },
];

export const mockedTasks: Task[] = [
  {
    id: 1,
    title: "Clean the kitchen",
    description: "Do all the dishes and wipe down the counters",
    houseHoldId: 1,
    isArchived: false,
    reoccurence: 2,
    score: 5,
  },
  {
    id: 2,
    title: "Take out the dog",
    description: "take the dog out for a walk, dont forget to bring poopbags!",
    houseHoldId: 1,
    isArchived: false,
    reoccurence: 1,
    score: 2,
  },
  {
    id: 3,
    title: "Buy weekly groceries",
    description: "Go and buy food for the household",
    houseHoldId: 1,
    isArchived: false,
    reoccurence: 4,
    score: 6,
  },
  {
    id: 4,
    title: "Vacuum cleaning",
    description:
      "Get the vaccum cleaner from the städskåp and clean the whole household.",
    houseHoldId: 1,
    isArchived: false,
    reoccurence: 7,
    score: 9,
  },
  {
    id: 5,
    title: "Clean the bathroom",
    description:
      "Scrub the toilet, clean the sink and the mirror, and mop the floor",
    houseHoldId: 1,
    isArchived: false,
    reoccurence: 7,
    score: 9,
  },
];
