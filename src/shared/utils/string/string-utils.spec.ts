import {StringUtils} from "./string-utils";

describe(StringUtils.name, () => {
    let stringUtils: StringUtils;

    beforeEach(() => {
        stringUtils = new StringUtils();
    });

    describe("isEmpty", () => {
        it("returns true for empty string", () => {
            expect(stringUtils.isEmpty('')).toBe(true);
        });

        it("returns false for not empty string", () => {
            expect(stringUtils.isEmpty('filled')).toBe(false);
        });
    });

    describe("isLessThen", () => {
        it("returns true for string size minor with caracteres declared in parameter", () => {
            expect(stringUtils.isLessThen('minor', 6)).toBe(true);
        });

        it("returns false for string size equal caracteres declared in parameter", () => {
            expect(stringUtils.isLessThen('equal', 5)).toBe(false);
        });

        it("returns false for string size more caracteres declared in parameter", () => {
            expect(stringUtils.isLessThen('more', 3)).toBe(false);
        });
    });

    describe("isLessOrEqualThen", () => {
        it("returns true for string size minor with caracteres declared in parameter", () => {
            expect(stringUtils.isLessOrEqualThen('minor', 6)).toBe(true);
        });

        it("returns true for string size equal with caracteres declared in parameter", () => {
            expect(stringUtils.isLessOrEqualThen('equal', 5)).toBe(true);
        });

        it("returns false for string size more caracteres declared in parameter", () => {
            expect(stringUtils.isLessOrEqualThen('more', 3)).toBe(false);
        });
    });

    describe("isMoreThen", () => {
        it("returns true for string size greater with caracteres declared in parameter", () => {
            expect(stringUtils.isMoreThen('minor', 4)).toBe(true);
        });

        it("returns false for string size equal caracteres declared in parameter", () => {
            expect(stringUtils.isMoreThen('equal', 5)).toBe(false);
        });

        it("returns false for string size minor caracteres declared in parameter", () => {
            expect(stringUtils.isMoreThen('more', 5)).toBe(false);
        });
    });

    describe("isMoreOrEqualThen", () => {
        it("returns true for string size greater with caracteres declared in parameter", () => {
            expect(stringUtils.isMoreOrEqualThen('greater', 6)).toBe(true);
        });

        it("returns true for string size equal with caracteres declared in parameter", () => {
            expect(stringUtils.isMoreOrEqualThen('equal', 5)).toBe(true);
        });

        it("returns false for string size minor caracteres declared in parameter", () => {
            expect(stringUtils.isMoreOrEqualThen('minor', 6)).toBe(false);
        });
    });

    describe("hasNumber", () => {
        it("returns true when string has Number", () => {
            expect(stringUtils.hasNumber('Has1Number')).toBe(true);
        });

        it("returns false when string has not Number", () => {
            expect(stringUtils.hasNumber('NotNumber')).toBe(false);
        });
    });

    describe("hasLowercase", () => {
        it("returns true when string has Lowercase", () => {
            expect(stringUtils.hasLowercase('HasLowercase')).toBe(true);
        });

        it("returns false when string has not Lowercase", () => {
           expect(stringUtils.hasLowercase('HASUPPERCASE')).toBe(false);
        });
    });

    describe("hasUppercase", () => {
        it("returns true when string has Uppercase", () => {
            expect(stringUtils.hasUppercase('HasLowercase')).toBe(true);
        });

        it("returns false when string has not Uppercase", () => {
            expect(stringUtils.hasUppercase('haslowercase')).toBe(false);
        });
    });

    describe("hasSpecialCharacter", () => {
        it("returns true when string has special character", () => {
            expect(stringUtils.hasSpecialCharacter('Has&SpecialCharacter')).toBe(true);
        });

        it("returns false when string has not Uppercase", () => {
            expect(stringUtils.hasSpecialCharacter('HasNotSpecialCharacter')).toBe(false);
        });
    });

    describe("hasWhiteSpace", () => {
        it("returns true when string has white space", () => {
            expect(stringUtils.hasWhiteSpace('Has White Space')).toBe(true);
        });

        it("returns false when string has not white space", () => {
            expect(stringUtils.hasWhiteSpace('HasNotWhiteSpace')).toBe(false);
        });
    });

    describe("isEqual", () => {
        it("returns true when strings match", () => {
            expect(stringUtils.isEqual('Has Match', 'Has Match')).toBe(true);
        });

        it("returns false when strings not match", () => {
            expect(stringUtils.isEqual('Has Match', 'Has Match ')).toBe(false);
        });
    });
});