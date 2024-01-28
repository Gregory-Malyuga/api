
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Filter {
    id?: Nullable<number[]>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    userId: number;
    chatId: number;
    roleId: number;
    login?: Nullable<string>;
    password?: Nullable<string>;
}

export interface Pagination {
    offset?: Nullable<number>;
    limit?: Nullable<number>;
}

export interface ChatInputCreate {
    name: string;
    description: string;
}

export interface ChatInputUpdate {
    name?: Nullable<string>;
    description?: Nullable<string>;
    userId?: Nullable<number>;
    chatId?: Nullable<number>;
    roleId?: Nullable<number>;
}

export interface ChatUserInputCreate {
    userId: number;
    chatId: number;
    roleId: number;
}

export interface UserInputCreate {
    login: string;
    password: string;
}

export interface UserInputUpdate {
    login?: Nullable<string>;
    password?: Nullable<string>;
}

export interface Token {
    access_token: string;
}

export interface IQuery {
    singIn(login: string, password: string): Nullable<Token> | Promise<Nullable<Token>>;
    chat(filter: Filter): Nullable<Chat> | Promise<Nullable<Chat>>;
    chats(filter?: Nullable<Filter>, pagination?: Nullable<Pagination>): ChatIndex | Promise<ChatIndex>;
    chatUser(filter: Filter): Nullable<ChatUser> | Promise<Nullable<ChatUser>>;
    chatUsers(filter?: Nullable<Filter>, pagination?: Nullable<Pagination>): ChatUserIndex | Promise<ChatUserIndex>;
    user(filter: Filter): Nullable<User> | Promise<Nullable<User>>;
    users(filter?: Nullable<Filter>, pagination?: Nullable<Pagination>): UserIndex | Promise<UserIndex>;
}

export interface Chat {
    id: number;
    name: string;
    description: string;
}

export interface ChatIndex {
    items: Chat[];
    total: number;
}

export interface IMutation {
    chatCreate(dto: ChatInputCreate): Nullable<Chat> | Promise<Nullable<Chat>>;
    chatUpdate(dto: ChatInputUpdate, filter: Filter): Nullable<Chat> | Promise<Nullable<Chat>>;
    chatDelete(filter: Filter): Nullable<boolean> | Promise<Nullable<boolean>>;
    chatUserCreate(dto: ChatInputCreate): Nullable<ChatUser> | Promise<Nullable<ChatUser>>;
    chatUserUpdate(dto: ChatInputUpdate, filter: Filter): Nullable<ChatUser> | Promise<Nullable<ChatUser>>;
    chaUserDelete(filter: Filter): Nullable<boolean> | Promise<Nullable<boolean>>;
    userCreate(dto: UserInputCreate): Nullable<User> | Promise<Nullable<User>>;
    userUpdate(dto: UserInputUpdate, filter: Filter): Nullable<User> | Promise<Nullable<User>>;
    userDelete(filter: Filter): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface ChatUser {
    userId: number;
    chatId: number;
    roleId: number;
}

export interface ChatUserIndex {
    items: ChatUser[];
    total: number;
}

export interface User {
    id: number;
    login: string;
}

export interface UserIndex {
    items: User[];
    total: number;
}

type Nullable<T> = T | null;
