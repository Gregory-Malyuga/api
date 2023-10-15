
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
    id: number;
    username?: Nullable<string>;
    password?: Nullable<string>;
}

export interface User {
    id: number;
    username: string;
    password: string;
}

export interface UserIndex {
    items: User[];
    total: number;
}

export interface IQuery {
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
    users(filter?: Nullable<Filter>, pagination?: Nullable<Pagination>): UserIndex | Promise<UserIndex>;
}

export interface IMutation {
    userCreate(dto?: Nullable<UserInputCreate>): Nullable<User> | Promise<Nullable<User>>;
    userUpdate(dto?: Nullable<UserInputUpdate>): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
