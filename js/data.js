window.AppData = {
  students: [
    { id: 1, name: "Анна Коваленко", group: "ІО-31", status: "Активний" },
    { id: 2, name: "Максим Петренко", group: "ІО-32", status: "У відпустці" },
    { id: 3, name: "Олена Шевченко", group: "ІО-31", status: "Активний" },
    { id: 4, name: "Дмитро Бондар", group: "ІО-33", status: "Відрахований" },
    { id: 5, name: "Ірина Мельник", group: "ІО-32", status: "Активний" },
    { id: 6, name: "Андрій Ткаченко", group: "ІО-33", status: "У відпустці" }
  ],
  statusClassNames: {
    "Активний": "status-active",
    "Відрахований": "status-expelled",
    "У відпустці": "status-leave"
  }
};

window.AppData.groups = [...new Set(window.AppData.students.map((student) => student.group))];
