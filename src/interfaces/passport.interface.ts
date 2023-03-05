import { Strategy } from "passport";

export interface passportStrategy {
    name: string;
    strategy: Strategy;

}