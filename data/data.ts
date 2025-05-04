export interface Member {
  id: string;
  name: string;
  emojiId: string;
  isOwner: boolean;
  householdId: string;
  userId: string;
  isRequest: boolean;
}
export type MemberCreate = Omit<Member, "id">;

export interface Emoji {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  householdId: string;
  isArchived: boolean;
  reoccurence: number;
  score: number;
}
export type TaskCreate = Omit<Task, "id" | "householdId">;

export interface Household {
  id: string;
  name: string;
  code: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface CompletedTask {
  id: string;
  memberId: string;
  taskId: string;
  date: Date;
}

export const mockedUser: User = {
  id: "1",
  email: "john",
  password: "doe",
};

export const mockedHouseholds: Household[] = [
  {
    id: "1",
    name: "Borås YH",
    code: "ABC123",
  },
  {
    id: "2",
    name: "Firestation",
    code: "wedidntstartthefire",
  },
];

export const mockedMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    emojiId: "2",
    isOwner: true,
    householdId: "1",
    userId: "1",
    isRequest: false,
  },
  {
    id: "2",
    name: "Magical Raindeer",
    emojiId: "4",
    isOwner: false,
    householdId: "2",
    userId: "1",
    isRequest: false,
  },
];

export const mockedCompletedTasks: CompletedTask[] = [
  {
    id: "1",
    memberId: "2",
    taskId: "2",
    date: new Date(),
  },
  {
    id: "2",
    memberId: "1",
    taskId: "4",
    date: new Date(),
  },
  {
    id: "3",
    memberId: "2",
    taskId: "3",
    date: new Date(),
  },
  {
    id: "3",
    memberId: "1",
    taskId: "1",
    date: new Date(),
  },
  {
    id: "3",
    memberId: "2",
    taskId: "1",
    date: new Date(),
  },
];

export const mockedTasks: Task[] = [
  {
    id: "1",
    title: "Clean the kitchen",
    description: "Do all the dishes and wipe down the counters",
    householdId: "1",
    isArchived: false,
    reoccurence: 2,
    score: 5,
  },
  {
    id: "2",
    title: "Take out the dog",
    description: "take the dog out for a walk, dont forget to bring poopbags!",
    householdId: "1",
    isArchived: false,
    reoccurence: 1,
    score: 2,
  },
  {
    id: "3",
    title: "Buy weekly groceries",
    description: "Go and buy food for the household",
    householdId: "1",
    isArchived: false,
    reoccurence: 4,
    score: 6,
  },
  {
    id: "4",
    title: "Vacuum cleaning",
    description:
      "Get the vaccum cleaner from the städskåp and clean the whole household.",
    householdId: "1",
    isArchived: false,
    reoccurence: 7,
    score: 9,
  },
  {
    id: "5",
    title: "Clean the bathroom",
    description:
      "Scrub the toilet, clean the sink and the mirror, and mop the floor",
    householdId: "1",
    isArchived: false,
    reoccurence: 7,
    score: 9,
  },
];
