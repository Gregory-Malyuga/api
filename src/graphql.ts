
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Filter {
    id?: Nullable<number[]>;
    login?: Nullable<string>;
    password?: Nullable<string>;
}

export interface Pagination {
    offset?: Nullable<number>;
    limit?: Nullable<number>;
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
    user(filter: Filter): Nullable<User> | Promise<Nullable<User>>;
    users(filter?: Nullable<Filter>, pagination?: Nullable<Pagination>): UserIndex | Promise<UserIndex>;
}

export interface User {
    id: number;
    login: string;
}

export interface UserIndex {
    items: User[];
    total: number;
}

export interface IMutation {
    userCreate(dto: UserInputCreate): Nullable<User> | Promise<Nullable<User>>;
    userUpdate(dto: UserInputUpdate, id: number): Nullable<User> | Promise<Nullable<User>>;
    userDelete(id: number): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
