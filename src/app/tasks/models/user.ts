import { User } from "src/app/backend.service";

export interface UserState {
    users: Array<User>;
    loading: boolean
}
