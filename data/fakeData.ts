export interface FakeMember {
  id: number;
  name: string;
  emojiId: number;
  isOwner: boolean;
  houseHoldId: number;
  userId: number;
  isRequest: boolean;
}
export interface FakeTask {
  id: number;
  title: string;
  description: string;
  houseHoldId: number;
  isArchived: boolean;
  reoccurence: number;
  score: number;
}
export interface FakeHousehold {
  id: number;
  name: string;
  code: string;
}
export interface FakeUser {
  id: number;
  username: string;
  password: string;
}
export interface FakeCompletedTask {
  id: number;
  memberId: number;
  taskId: number;
  date: Date;
}
export const myFakeHousehold: FakeHousehold = {
  id: 1,
  name: "Borås YH",
  code: "ABC123",
};
export const myFakeUser: FakeUser = {
  id: 1,
  username: "john",
  password: "doe",
};
export const myFakeMember: FakeMember = {
  id: 1,
  name: "John Doe",
  emojiId: 2,
  isOwner: true,
  houseHoldId: 1,
  userId: 1,
  isRequest: false,
};
export const myFakeCompletedTask: FakeCompletedTask = {
  id: 1,
  memberId: 1,
  taskId: 1,
  date: new Date(),
};

export const myFakeTask: FakeTask = {
  id: 1,
  title: "Clean the kitchen",
  description: "Do all the dishes and wipe down the counters",
  houseHoldId: 1,
  isArchived: false,
  reoccurence: 4,
  score: 5,
};
