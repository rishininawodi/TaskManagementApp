import jsPDF from "jspdf";

export const generatePDF = (tasks) => {
  const doc = new jsPDF();
  doc.text("Task Report", 10, 10);
  tasks.forEach((task, index) => {
    doc.text(`${index + 1}. ${task.title} - ${task.status}`, 10, 20 + index * 10);
  });
  doc.save("tasks_report.pdf");
};
