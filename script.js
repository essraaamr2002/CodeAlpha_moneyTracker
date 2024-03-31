let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = localStorage.getItem("totalAmount")
  ? parseFloat(localStorage.getItem("totalAmount"))
  : 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

function saveDataToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("totalAmount", totalAmount.toString());
}

function renderExpenses() {
  expenses.forEach((expense) => {
    totalAmount += expense.amount;
    renderExpenseRow(expense);
  });
  totalAmountCell.textContent = totalAmount;
}

function renderExpenseRow(expense) {
  const newRow = expenseTableBody.insertRow();

  const categoryCell = newRow.insertCell();
  const AmountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    const index = expenses.indexOf(expense);
    if (index !== -1) {
      totalAmount -= expense.amount;
      totalAmountCell.textContent = totalAmount;

      expenses.splice(index, 1);
      saveDataToLocalStorage(); // Save data after modification
      expenseTableBody.removeChild(newRow);
    }
  });

  categoryCell.textContent = expense.category;
  AmountCell.textContent = expense.amount;
  dateCell.textContent = expense.date;
  deleteCell.appendChild(deleteBtn);
}

addBtn.addEventListener("click", function () {
  const category = categorySelect.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === "") {
    alert("please select a category");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("please enter a valid amount");
    return;
  }
  if (date === "") {
    alert("please select a date");
    return;
  }
  const expense = { category, amount, date };
  expenses.push(expense);

  totalAmount += amount;
  totalAmountCell.textContent = totalAmount;

  renderExpenseRow(expense);
  saveDataToLocalStorage(); // Save data after modification
});

window.onload = function () {
  renderExpenses(); // Render expenses when page loads
};
