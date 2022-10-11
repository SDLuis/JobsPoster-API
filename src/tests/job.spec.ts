import { test, expect } from "@playwright/test";

let context: any;

test.beforeAll(async ({ playwright }) => {
  context = await playwright.request.newContext({
    baseURL: "http://localhost:5000",
  });
});

test.afterAll(async ({}) => {
  await context.dispose();
});

test("Api send jobs", async ({}) => {
  const jobs = await context.get("/jobs");

  expect(jobs.ok()).toBeTruthy();
  expect(await jobs.json()).toContainEqual(
    expect.objectContaining({
      work_Title: "Diseñador Gráfico",
      workType: "Remote",
    })
  );
});

test("find jobs by id", async () => {
  const id = 301;
  const jobs = await context.get(`/jobs/${id}`);

  expect(jobs.ok()).toBeTruthy();
  expect(await jobs.json()).toHaveProperty("Job_ID", id);
});

test("find jobs by category", async () => {
  const category = "Remote";
  const jobs = await context.get(`/jobs/${category}/list`);

  expect(jobs.ok()).toBeTruthy();
  expect(await jobs.json()).toContainEqual(
    expect.objectContaining({
      workType: category,
    })
  );
});

test("find jobs by worktitle", async () => {
  const workTitle = "Soporte técnico ";
  const jobs = await context.get(`/jobs/workTitle/${workTitle}`);

  expect(jobs.ok()).toBeTruthy();
  expect(await jobs.json()).toContainEqual(
    expect.objectContaining({
      work_Title: workTitle,
    })
  );
});

test.describe("need auth", () => {
  test.beforeAll(async ({ request }) => {
    await request.post("http://localhost:5000/auth/login", {
      data: {
        email: "luis@gmail.com",
        password: "123",
      },
    });
  });
  test("Delete job", async ({ request }) => {
    const id: number = 364;
    const job = await request.delete(`http://localhost:5000/jobs/delete/${id}`);
    const res = await job.text();
    expect(res).toContain("Job deleted");
  });
  test("Add job", async ({ request }) => {
    await request.post("http://localhost:5000/jobs/add", {
      data: {
        work_Title: "Soporte",
        workType: "Full Time",
        description: "L-V",
        Position: "Asistente",
        apply_Method: "Email",
      },
    });
    const jobs = await context.get("/jobs");
    expect(jobs.ok()).toBeTruthy();
    expect(await jobs.json()).toContainEqual(
      expect.objectContaining({
        work_Title: "Soporte",
        workType: "Full Time",
      })
    );
  });
  test("Edit job", async ({ request }) => {
    const id: number = 372;
    const work_Title: string = "Soporte Tecnico";
    const workType: string = "Remote";
    await request.put(`http://localhost:5000/jobs/edit/${id}`, {
      data: {
        work_Title: work_Title,
        workType: workType,
        description: "L-V",
        Position: "Asistente A",
        apply_Method: "Email",
      },
    });
    const jobs = await context.get(`/jobs/${id}`);
    expect(await jobs.json()).toHaveProperty("Job_ID", id);
    expect(await jobs.json()).toHaveProperty("work_Title", work_Title);
    expect(await jobs.json()).toHaveProperty("workType", workType);
  });
});
