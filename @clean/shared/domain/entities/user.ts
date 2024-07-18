export class User {
    constructor(
        public readonly user_id: string | null,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string | null,
        public readonly phone: string | null,
        public readonly accepted_terms: boolean,
        public readonly accepted_notifications_email: boolean
    ) {}
}