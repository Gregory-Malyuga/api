
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
    userCreate(dto: UserInputCreate): Nullable<User> | Promise<Nullable<User>>;
    userUpdate(dto: UserInputUpdate, filter: Filter): Nullable<User> | Promise<Nullable<User>>;
    userDelete(filter: Filter): Nullable<boolean> | Promise<Nullable<boolean>>;
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
