
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Filter {
    id?: Nullable<number[]>;
    username?: Nullable<string>;
    password?: Nullable<string>;
}

export interface Pagination {
    offset?: Nullable<number>;
    limit?: Nullable<number>;
}

export interface UserInputCreate {
    username: string;
    password: string;
}

export interface UserInputUpdate {
    username?: Nullable<string>;
    password?: Nullable<string>;
}

export interface Token {
    access_token: string;
}

export interface IQuery {
    singIn(username: string, password: string): Nullable<Token> | Promise<Nullable<Token>>;
    user(filter: Filter): Nullable<User> | Promise<Nullable<User>>;
    users(filter?: Nullable<Filter>, pagination?: Nullable<Pagination>): UserIndex | Promise<UserIndex>;
}

export interface User {
    id: number;
    username: string;
}

export interface UserIndex {
    items: User[];
    total: number;
}

export interface IMutation {
    userCreate(dto: UserInputCreate): Nullable<User> | Promise<Nullable<User>>;
    userUpdate(dto: UserInputUpdate, filter: Filter): Nullable<User> | Promise<Nullable<User>>;
    userDelete(filter: Filter): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
