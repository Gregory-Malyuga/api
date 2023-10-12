
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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

export interface IQuery {
    userFindOne(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    userCreate(dto?: Nullable<UserInputCreate>): Nullable<User> | Promise<Nullable<User>>;
    userUpdate(dto?: Nullable<UserInputUpdate>): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
