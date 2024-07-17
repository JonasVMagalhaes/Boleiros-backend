import {Country} from "../../enums/country-enum";

export class PhoneUtils {
    static validate(phone: string): boolean {
        const regex: RegExp = /^(?=.*[0-9])[- +()0-9]+$/;
        return regex.test(phone);
    }

    static format(country: Country, phone: string): string {
        return '';
    }
}