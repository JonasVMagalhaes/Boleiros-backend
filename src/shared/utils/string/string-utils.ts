export class StringUtils {
    isEmpty(value: string): boolean {
        return !Boolean(value);
    }

    isLessThen(value: string, size: number): boolean {
        return value.length < size;
    }

    isLessOrEqualThen(value: string, size: number): boolean {
        return value.length <= size;
    }

    isMoreThen(value: string, size: number): boolean {
        return value.length > size;
    }

    isMoreOrEqualThen(value: string, size: number): boolean {
        return value.length >= size;
    }

    hasNumber(value: string): boolean {
        return /\d/.test(value);
    }

    hasLowercase(value: string): boolean {
        return /[a-z]/.test(value);
    }

    hasUppercase(value: string): boolean {
        return /[A-Z]/.test(value);
    }

    hasSpecialCharacter(value: string): boolean {
        return /\W/.test(value);
    }

    hasWhiteSpace(value: string): boolean {
        return value.includes(" ");
    }

    isEqual(value1: string, value2: string): boolean {
        return value1 === value2;
    }
};
