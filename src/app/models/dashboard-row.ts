import { DashboardRowAddress } from "./dashboard-row-address";
import { DashboardRowName } from "./dashboard-row-name";

export class DashboardRow {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    name?: DashboardRowName;
    address?: DashboardRowAddress;
    phone?: string
}
