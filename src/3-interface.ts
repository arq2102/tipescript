interface Task {
  id: number;
  title: string;
  done: boolean;
  deadline?: string; // optional field
}

const tasks: Task[] = [
  { id: 1, title: "Сделать ДЗ по Git", done: true },
  { id: 2, title: "Повторить типы", done: false, deadline: "11.11" },
];

function addTask(list: Task[], title: string): Task {
  const task: Task = { id: list.length + 1, title, done: false };
  list.push(task);
  return task;
}

function completeTask(list: Task[], id: number): void {
  const task = list.find((t) => t.id === id);
  if (task) {
    task.done = true;
  }
}

function pending(list: Task[]): Task[] {
  return list.filter((t) => !t.done);
}

addTask(tasks, "Посмотреть запись урока");
completeTask(tasks, 2);
console.log(pending(tasks)); // only "Посмотреть запись урока" is left
