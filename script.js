document.addEventListener('DOMContentLoaded', () => {
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseCategoryInput = document.getElementById('expense-category');
    const addExpenseButton = document.getElementById('add-expense');
    const expensesList = document.getElementById('expenses');
    const totalElement = document.getElementById('total');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const updateTotal = () => {
        const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        totalElement.textContent = total.toFixed(2);
    };

    const addExpenseToDOM = (expense) => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.name} - $${parseFloat(expense.amount).toFixed(2)} - ${expense.category} <button class="delete-expense">X</button>`;
        li.querySelector('.delete-expense').addEventListener('click', () => {
            expenses = expenses.filter(e => e !== expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            expensesList.removeChild(li);
            updateTotal();
        });
        expensesList.appendChild(li);
    };

    const renderExpenses = () => {
        expensesList.innerHTML = '';
        expenses.forEach(addExpenseToDOM);
        updateTotal();
    };

    addExpenseButton.addEventListener('click', () => {
        const name = expenseNameInput.value.trim();
        const amount = expenseAmountInput.value.trim();
        const category = expenseCategoryInput.value.trim();

        if (!name || !amount || !category) {
            alert('Please fill out all fields.');
            return;
        }

        if (isNaN(amount)) {
            alert('Please enter a valid number for the amount.');
            return;
        }

        const expense = { name, amount: parseFloat(amount).toFixed(2), category };
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        addExpenseToDOM(expense);
        updateTotal();

        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        expenseCategoryInput.value = '';
    });

    renderExpenses();
});
