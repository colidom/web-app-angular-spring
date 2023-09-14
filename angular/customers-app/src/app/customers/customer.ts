import { Region } from "./region";

export class Customer {
    id: number | undefined;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    createdAt: string | undefined;
    picture: string | undefined;
    region: Region;
}
