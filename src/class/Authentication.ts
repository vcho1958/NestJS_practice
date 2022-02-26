import { DeepPartial } from "typeorm";

export class Authentication<E>{
    body?: DeepPartial<E>;
    sub: number;
}