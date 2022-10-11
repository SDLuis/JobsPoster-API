import { test, expect } from "@playwright/test";
import bcrypt from "bcrypt";

let context: any;

test.beforeAll(async ({ playwright }) => {
  context = await playwright.request.newContext({
    baseURL: "http://localhost:5000",
  });
});

test.afterAll(async ({}) => {
  await context.dispose();
});

test.describe("need auth", () => {
  test.beforeEach(async ({ request }) => {
    await request.post("http://localhost:5000/auth/login", {
      data: {
        email: "poster@gmail.com",
        password: "123",
      },
    });
  });

  test("Delete user", async ({ request }) => {
    const id: number = 3;
    const job = await request.delete(
      `http://localhost:5000/users/delete/${id}`
    );
    const res = await job.text();
    expect(res).toContain("User deleted");
  });

  test("Edit user", async ({ request }) => {
    const id: number = 18;
    const First_Name: string = "Hansel";
    const Last_Name: string = "Tejeda";
    const email: string = "HHHHH@gmail.com";
    const res = await request.put(`http://localhost:5000/users/edit/${id}`, {
      data: {
        First_Name: First_Name,
        Last_Name: Last_Name,
        email: email,
        password: await bcrypt.hash("123", 8),
      },
    });
    expect(await res.text()).toContain('User Edit')
  });
});

test("All user", async ({}) => {
  const users = await context.get("/users");
  expect(users.ok()).toBeTruthy();
  expect(await users.json()).toContainEqual(
    expect.objectContaining({
      First_Name: "Luis",
      Last_Name: "Tejeda",
    })
  );
});
test("find user by id", async () => {
  const id = 18;
  const user = await context.get(`/users/${id}`);

  expect(user.ok()).toBeTruthy();
  expect(await user.json()).toHaveProperty("User_ID", id);
});
