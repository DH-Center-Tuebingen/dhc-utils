export type User = {
    id: number;
    name: string;
    nickname: string;
    permissions: {
        [permission: string]: boolean;
    };
};
