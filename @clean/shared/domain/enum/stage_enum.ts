export enum STAGE {
    TEST = "TEST",
    DEV = "DEV",
    PROD = "PROD"
}

export function toEnum(stage: string): STAGE {
    switch (stage) {
        case "TEST":
            return STAGE.TEST;
        case "DEV":
            return STAGE.DEV;
        case "PROD":
            return STAGE.PROD;
        default:
            throw new Error("Invalid stage");
    }
}