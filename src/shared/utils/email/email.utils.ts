export class EmailUtils {
    static validate(email: string): boolean {
        const regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(email);
    }
}