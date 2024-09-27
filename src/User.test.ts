import { expect } from "@std/expect";
import { User } from "./types/User.ts"
import { can } from "./User.ts"

const Luke: User = {
    id: 1,
    name: "Lukas Himmelläufer",
    nickname: "Luke",
    permissions: { "read_article": true, "write_article": true, "delete_article": false }
}

Deno.test("can", () => {
    expect(can(Luke, "read_article")).toBeTruthy();
    expect(can(Luke, "eat_pizza")).toBeFalsy();
});
