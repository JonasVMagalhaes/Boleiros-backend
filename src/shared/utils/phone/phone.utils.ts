import { Country } from "../../enums/country-enum";

export class PhoneUtils {
    static validate(phone: string): boolean {
        const regex: RegExp = /^(?=.*[0-9])[- +()0-9]+$/;
        return regex.test(phone);
    }

    static format(country: Country, phone: string): string {
        let cleanedPhone = phone.replace(/\D/g, '');

        switch (country) {
            case Country.BRAZIL:
                return this.formatBrazil(cleanedPhone);
            case Country.USA:
            case Country.CANADA:
                return this.formatUSorCanada(cleanedPhone);
            case Country.MEXICO:
                return this.formatMexico(cleanedPhone);
            case Country.ARGENTINA:
                return this.formatArgentina(cleanedPhone);
            case Country.CHILE:
                return this.formatChile(cleanedPhone);
            case Country.COLOMBIA:
                return this.formatColombia(cleanedPhone);
            case Country.PERU:
                return this.formatPeru(cleanedPhone);
            case Country.VENEZUELA:
                return this.formatVenezuela(cleanedPhone);
            case Country.BOLIVIA:
                return this.formatBolivia(cleanedPhone);
            case Country.ECUADOR:
                return this.formatEcuador(cleanedPhone);
            case Country.PARAGUAY:
                return this.formatParaguay(cleanedPhone);
            case Country.URUGUAY:
                return this.formatUruguay(cleanedPhone);
            case Country.GUYANA:
                return this.formatGuyana(cleanedPhone);
            case Country.SURINAME:
                return this.formatSuriname(cleanedPhone);
            default:
                return phone;
        }
    }

    private static formatBrazil(phone: string): string {
        if (phone.length === 11) {
            return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
        } else if (phone.length === 10) {
            return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
        }
        return phone;
    }

    private static formatUSorCanada(phone: string): string {
        if (phone.length === 10) {
            return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
        }
        return phone;
    }

    private static formatMexico(phone: string): string {
        if (phone.length === 12 && phone.startsWith('1')) {
            return `+52 ${phone.slice(0, 1)} ${phone.slice(1, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`;
        } else if (phone.length === 10) {
            return `+52 ${phone.slice(0, 2)} ${phone.slice(2, 6)} ${phone.slice(6)}`;
        }
        return phone;
    }

    private static formatArgentina(phone: string): string {
        if (phone.length === 11 && phone.startsWith('9')) {
            return `+54 ${phone.slice(0, 1)} ${phone.slice(1, 3)} ${phone.slice(3, 7)}-${phone.slice(7)}`;
        } else if (phone.length === 10) {
            return `+54 ${phone.slice(0, 2)} ${phone.slice(2, 6)}-${phone.slice(6)}`;
        }
        return phone;
    }

    private static formatChile(phone: string): string {
        if (phone.length === 11 && phone.startsWith('9')) {
            return `+56 ${phone.slice(0, 1)} ${phone.slice(1, 5)} ${phone.slice(5)}`;
        } else if (phone.length === 9) {
            return `+56 ${phone.slice(0, 2)} ${phone.slice(2, 6)} ${phone.slice(6)}`;
        }
        return phone;
    }

    private static formatColombia(phone: string): string {
        if (phone.length === 10 && phone.startsWith('3')) {
            return `+57 ${phone.slice(0, 1)} ${phone.slice(1, 4)} ${phone.slice(4)}`;
        } else if (phone.length === 7) {
            return `+57 ${phone.slice(0, 3)} ${phone.slice(3)}`;
        }
        return phone;
    }

    private static formatPeru(phone: string): string {
        if (phone.length === 9 && phone.startsWith('9')) {
            return `+51 ${phone.slice(0, 1)} ${phone.slice(1, 4)} ${phone.slice(4)}`;
        } else if (phone.length === 7) {
            return `+51 ${phone.slice(0, 3)} ${phone.slice(3)}`;
        }
        return phone;
    }

    private static formatVenezuela(phone: string): string {
        if (phone.length === 10) {
            return `+58 ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
        }
        return phone;
    }

    private static formatBolivia(phone: string): string {
        if (phone.length === 8) {
            return `+591 ${phone.slice(0, 1)} ${phone.slice(1, 4)} ${phone.slice(4)}`;
        }
        return phone;
    }

    private static formatEcuador(phone: string): string {
        if (phone.length === 9 && phone.startsWith('9')) {
            return `+593 ${phone.slice(0, 1)} ${phone.slice(1, 5)} ${phone.slice(5)}`;
        } else if (phone.length === 8) {
            return `+593 ${phone.slice(0, 3)} ${phone.slice(3)}`;
        }
        return phone;
    }

    private static formatParaguay(phone: string): string {
        if (phone.length === 9 && phone.startsWith('9')) {
            return `+595 ${phone.slice(0, 1)} ${phone.slice(1, 4)} ${phone.slice(4)}`;
        } else if (phone.length === 7) {
            return `+595 ${phone.slice(0, 3)} ${phone.slice(3)}`;
        }
        return phone;
    }

    private static formatUruguay(phone: string): string {
        if (phone.length === 9 && phone.startsWith('9')) {
            return `+598 ${phone.slice(0, 1)} ${phone.slice(1, 4)} ${phone.slice(4)}`;
        } else if (phone.length === 7) {
            return `+598 ${phone.slice(0, 3)} ${phone.slice(3)}`;
        }
        return phone;
    }

    private static formatGuyana(phone: string): string {
        if (phone.length === 7) {
            return `+592 ${phone.slice(0, 3)} ${phone.slice(3)}`;
        }
        return phone;
    }

    private static formatSuriname(phone: string): string {
        if (phone.length === 7) {
            return `+597 ${phone.slice(0, 3)} ${phone.slice(3)}`;
        }
        return phone;
    }
}