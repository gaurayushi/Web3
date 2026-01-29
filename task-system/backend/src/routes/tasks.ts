import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";
import { createTaskSchema, updateTaskSchema } from "../validators/task";

const router = Router();
router.use(requireAuth);

router.get("/", async (req: any, res) => {
  const userId = req.user!.userId;

  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(50, Math.max(1, Number(req.query.limit || 10)));
  const status = (req.query.status as string) || "";
  const search = (req.query.search as string) || "";

  const where: any = {
    userId,
    ...(status ? { status } : {}),
    ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
  };

  const [total, items] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    items,
  });
});

router.post("/", async (req: any, res) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const task = await prisma.task.create({
    data: { ...parsed.data, userId: req.user!.userId },
  });

  return res.status(201).json(task);
});

router.get("/:id", async (req: any, res) => {
  const task = await prisma.task.findFirst({
    where: { id: String(req.params.id), userId: req.user!.userId },
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.json(task);
});

router.patch("/:id", async (req: any, res) => {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const exists = await prisma.task.findFirst({
    where: { id: String(req.params.id), userId: req.user!.userId },
  });
  if (!exists) return res.status(404).json({ message: "Task not found" });

  const updated = await prisma.task.update({
    where: { id: String(req.params.id) },
    data: parsed.data,
  });

  return res.json(updated);
});

router.delete("/:id", async (req: any, res) => {
  const exists = await prisma.task.findFirst({
    where: { id: String(req.params.id), userId: req.user!.userId },
  });
  if (!exists) return res.status(404).json({ message: "Task not found" });

  await prisma.task.delete({ where: { id: String(req.params.id) } });
  return res.status(204).send();
});

router.post("/:id/toggle", async (req: any, res) => {
  const task = await prisma.task.findFirst({
    where: { id: String(req.params.id), userId: req.user!.userId },
  });
  if (!task) return res.status(404).json({ message: "Task not found" });

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: { status: task.status === "PENDING" ? "COMPLETED" : "PENDING" },
  });

  return res.json(updated);
});

export default router;
