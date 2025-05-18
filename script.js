// DOM Elements - Auth
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authTabs = document.querySelectorAll('.auth-tab');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
const guestLoginButton = document.getElementById('guest-login');
const logoutButton = document.getElementById('logout-button');
const userNameDisplay = document.getElementById('user-name');

// DOM Elements - Main Tabs
const mainTabs = document.querySelectorAll('.main-tab');
const mainSections = document.querySelectorAll('.main-section');

// DOM Elements - Theme
const themeToggle = document.getElementById('theme-toggle');

// DOM Elements - Expenses
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseModal = document.getElementById('expense-modal');
const closeExpenseModal = document.getElementById('close-expense-modal');
const cancelExpense = document.getElementById('cancel-expense');
const expenseForm = document.getElementById('expense-form');
const expenseTableBody = document.getElementById('expense-table-body');
const totalExpenseAmountElement = document.getElementById('total-expense-amount');
const expenseCountElement = document.getElementById('expense-count');
const expenseSearchInput = document.getElementById('expense-search-input');
const expenseTabButtons = document.querySelectorAll('.tab-buttons .tab-button');
const expenseTabContents = document.querySelectorAll('#expenses-section .tab-content');
const expenseChartTabButtons = document.querySelectorAll('#expense-charts-tab .chart-tab-button');
const expenseChartContents = document.querySelectorAll('#expense-charts-tab .chart-content');
const expenseModalTitle = document.getElementById('expense-modal-title');
const saveExpenseBtn = document.getElementById('save-expense');

// DOM Elements - Savings
const addSavingBtn = document.getElementById('add-saving-btn');
const savingModal = document.getElementById('saving-modal');
const closeSavingModal = document.getElementById('close-saving-modal');
const cancelSaving = document.getElementById('cancel-saving');
const savingForm = document.getElementById('saving-form');
const savingTableBody = document.getElementById('saving-table-body');
const totalSavingAmountElement = document.getElementById('total-saving-amount');
const savingCountElement = document.getElementById('saving-count');
const savingSearchInput = document.getElementById('saving-search-input');
const savingTabButtons = document.querySelectorAll('#savings-section .tab-buttons .tab-button');
const savingTabContents = document.querySelectorAll('#savings-section .tab-content');
const savingChartTabButtons = document.querySelectorAll('#saving-charts-tab .chart-tab-button');
const savingChartContents = document.querySelectorAll('#saving-charts-tab .chart-content');
const savingModalTitle = document.getElementById('saving-modal-title');
const saveSavingBtn = document.getElementById('save-saving');

// DOM Elements - Dashboard
const dashboardExpenseAmount = document.getElementById('dashboard-expense-amount');
const dashboardSavingAmount = document.getElementById('dashboard-saving-amount');
const dashboardBalanceAmount = document.getElementById('dashboard-balance-amount');

// DOM Elements - Chatbot
const chatbotButton = document.getElementById('chatbot-button');
const chatbotPanel = document.getElementById('chatbot-panel');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInputField = document.getElementById('chatbot-input-field');
const sendMessageButton = document.getElementById('send-message');

// Form elements - Expense
const expenseIdInput = document.getElementById('expense-id');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseNotesInput = document.getElementById('expense-notes');

// Form elements - Saving
const savingIdInput = document.getElementById('saving-id');
const savingNameInput = document.getElementById('saving-name');
const savingAmountInput = document.getElementById('saving-amount');
const savingDateInput = document.getElementById('saving-date');
const savingCategoryInput = document.getElementById('saving-category');
const savingNotesInput = document.getElementById('saving-notes');

// Error message elements - Expense
const expenseNameError = document.getElementById('expense-name-error');
const expenseAmountError = document.getElementById('expense-amount-error');
const expenseDateError = document.getElementById('expense-date-error');
const expenseCategoryError = document.getElementById('expense-category-error');

// Error message elements - Saving
const savingNameError = document.getElementById('saving-name-error');
const savingAmountError = document.getElementById('saving-amount-error');
const savingDateError = document.getElementById('saving-date-error');
const savingCategoryError = document.getElementById('saving-category-error');

// Chart elements
const expenseCategoryChart = document.getElementById('expense-category-chart');
const expenseTrendChart = document.getElementById('expense-trend-chart');
const savingCategoryChart = document.getElementById('saving-category-chart');
const savingTrendChart = document.getElementById('saving-trend-chart');
const overviewChart = document.getElementById('overview-chart');
const comparisonChart = document.getElementById('comparison-chart');

// Chart containers
const expenseCategoryChartContainer = document.getElementById('expense-category-chart-container');
const expenseTrendChartContainer = document.getElementById('expense-trend-chart-container');
const savingCategoryChartContainer = document.getElementById('saving-category-chart-container');
const savingTrendChartContainer = document.getElementById('saving-trend-chart-container');
const expenseCategoryChartEmpty = document.getElementById('expense-category-chart-empty');
const expenseTrendChartEmpty = document.getElementById('expense-trend-chart-empty');
const savingCategoryChartEmpty = document.getElementById('saving-category-chart-empty');
const savingTrendChartEmpty = document.getElementById('saving-trend-chart-empty');

// State
let expenses = [];
let savings = [];
let activeExpenseFilter = 'all';
let activeExpenseSortBy = 'date-desc';
let activeSavingFilter = 'all';
let activeSavingSortBy = 'date-desc';
let currentUser = null;
let expenseCategoryChartInstance = null;
let expenseTrendChartInstance = null;
let savingCategoryChartInstance = null;
let savingTrendChartInstance = null;
let overviewChartInstance = null;
let comparisonChartInstance = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set default dates to today
    expenseDateInput.valueAsDate = new Date();
    savingDateInput.valueAsDate = new Date();
    
    // Check for logged in user
    checkAuthStatus();
    
    // Check for dark mode preference
    if (localStorage.getItem('theme') === 'dark' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
        document.documentElement.classList.add('dark');
    }
});

// Auth Functions
function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        userNameDisplay.textContent = currentUser.name;
        showApp();
        loadUserData();
    }
}

function showApp() {
    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
    
    // Initialize UI
    updateExpenseTable();
    updateSavingTable();
    updateTotalAmounts();
    updateCharts();
    updateDashboard();
}

function showAuth() {
    appContainer.classList.add('hidden');
    authContainer.classList.remove('hidden');
}

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered. Please use a different email or login.');
        return false;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password // In a real app, this should be hashed
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    loginUser(email, password);
    return true;
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        userNameDisplay.textContent = currentUser.name;
        showApp();
        loadUserData();
        return true;
    } else {
        alert('Invalid email or password');
        return false;
    }
}

function loginAsGuest() {
    currentUser = {
        id: 'guest',
        name: 'Guest User',
        email: 'guest@example.com'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    userNameDisplay.textContent = currentUser.name;
    showApp();
    loadUserData();
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    expenses = [];
    savings = [];
    showAuth();
}

function loadUserData() {
    if (!currentUser) return;
    
    const userExpenses = localStorage.getItem(`expenses_${currentUser.id}`);
    if (userExpenses) {
        expenses = JSON.parse(userExpenses);
    }
    
    const userSavings = localStorage.getItem(`savings_${currentUser.id}`);
    if (userSavings) {
        savings = JSON.parse(userSavings);
    }
    
    updateExpenseTable();
    updateSavingTable();
    updateTotalAmounts();
    updateCharts();
    updateDashboard();
}

// Event Listeners - Auth
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (tabName === 'login') {
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        } else {
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        }
    });
});

switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    authTabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.auth-tab[data-tab="signup"]').classList.add('active');
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    authTabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.auth-tab[data-tab="login"]').classList.add('active');
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
});

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginUser(email, password);
});

signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    registerUser(name, email, password);
});

guestLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    loginAsGuest();
});

logoutButton.addEventListener('click', logout);

// Event Listeners - Main Tabs
mainTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const section = tab.dataset.section;
        mainTabs.forEach(t => t.classList.remove('active'));
        mainSections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`${section}-section`).classList.add('active');
        
        // Update charts when switching to dashboard
        if (section === 'dashboard') {
            updateDashboard();
        }
    });
});

// Event Listeners - Theme
themeToggle.addEventListener('click', toggleTheme);

// Event Listeners - Expenses
addExpenseBtn.addEventListener('click', openAddExpenseModal);
closeExpenseModal.addEventListener('click', closeExpenseModalFunc);
cancelExpense.addEventListener('click', closeExpenseModalFunc);
expenseForm.addEventListener('submit', handleExpenseFormSubmit);
expenseSearchInput.addEventListener('input', updateExpenseTable);

// Event Listeners - Savings
addSavingBtn.addEventListener('click', openAddSavingModal);
closeSavingModal.addEventListener('click', closeSavingModalFunc);
cancelSaving.addEventListener('click', closeSavingModalFunc);
savingForm.addEventListener('submit', handleSavingFormSubmit);
savingSearchInput.addEventListener('input', updateSavingTable);

// Tab navigation - Expenses
expenseTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.dataset.tab;
        expenseTabButtons.forEach(btn => btn.classList.remove('active'));
        expenseTabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(`${tab}-tab`).classList.add('active');
    });
});

// Chart tab navigation - Expenses
expenseChartTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const chart = button.dataset.chart;
        expenseChartTabButtons.forEach(btn => btn.classList.remove('active'));
        expenseChartContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(`${chart}-chart-content`).classList.add('active');
    });
});

// Tab navigation - Savings
savingTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.dataset.tab;
        savingTabButtons.forEach(btn => btn.classList.remove('active'));
        savingTabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(`${tab}-tab`).classList.add('active');
    });
});

// Chart tab navigation - Savings
savingChartTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const chart = button.dataset.chart;
        savingChartTabButtons.forEach(btn => btn.classList.remove('active'));
        savingChartContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(`${chart}-chart-content`).classList.add('active');
    });
});

// Filter dropdown - Expenses
document.querySelectorAll('#expenses-section .dropdown-content a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        activeExpenseFilter = link.dataset.filter;
        document.querySelectorAll('#expenses-section .dropdown-content a[data-filter]').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        updateExpenseTable();
    });
});

// Sort dropdown - Expenses
document.querySelectorAll('#expenses-section .dropdown-content a[data-sort]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        activeExpenseSortBy = link.dataset.sort;
        document.querySelectorAll('#expenses-section .dropdown-content a[data-sort]').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        updateExpenseTable();
    });
});

// Filter dropdown - Savings
document.querySelectorAll('#savings-section .dropdown-content a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        activeSavingFilter = link.dataset.filter;
        document.querySelectorAll('#savings-section .dropdown-content a[data-filter]').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        updateSavingTable();
    });
});

// Sort dropdown - Savings
document.querySelectorAll('#savings-section .dropdown-content a[data-sort]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        activeSavingSortBy = link.dataset.sort;
        document.querySelectorAll('#savings-section .dropdown-content a[data-sort]').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        updateSavingTable();
    });
});

// Chatbot
chatbotButton.addEventListener('click', toggleChatbot);
closeChatbot.addEventListener('click', toggleChatbot);
sendMessageButton.addEventListener('click', sendChatMessage);
chatbotInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Functions
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    
    // Update charts with new theme
    updateCharts();
    updateDashboard();
}

// Expense Functions
function openAddExpenseModal() {
    expenseModalTitle.textContent = 'Add New Expense';
    saveExpenseBtn.textContent = 'Add Expense';
    expenseForm.reset();
    expenseIdInput.value = '';
    expenseDateInput.valueAsDate = new Date();
    clearExpenseFormErrors();
    expenseModal.style.display = 'flex';
}

function openEditExpenseModal(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (!expense) return;
    
    expenseModalTitle.textContent = 'Edit Expense';
    saveExpenseBtn.textContent = 'Update Expense';
    
    expenseIdInput.value = expense.id;
    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    expenseDateInput.value = expense.date;
    expenseCategoryInput.value = expense.category;
    expenseNotesInput.value = expense.notes || '';
    
    clearExpenseFormErrors();
    expenseModal.style.display = 'flex';
}

function closeExpenseModalFunc() {
    expenseModal.style.display = 'none';
}

function handleExpenseFormSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateExpenseForm()) return;
    
    const id = expenseIdInput.value || Date.now().toString();
    const expense = {
        id,
        name: expenseNameInput.value,
        amount: parseFloat(expenseAmountInput.value),
        date: expenseDateInput.value,
        category: expenseCategoryInput.value,
        notes: expenseNotesInput.value
    };
    
    if (expenseIdInput.value) {
        // Update existing expense
        const index = expenses.findIndex(exp => exp.id === id);
        if (index !== -1) {
            expenses[index] = expense;
        }
    } else {
        // Add new expense
        expenses.push(expense);
    }
    
    // Save to local storage
    saveExpenses();
    
    // Update UI
    updateExpenseTable();
    updateTotalAmounts();
    updateCharts();
    updateDashboard();
    
    // Close modal
    closeExpenseModalFunc();
}

function validateExpenseForm() {
    let isValid = true;
    clearExpenseFormErrors();
    
    if (!expenseNameInput.value.trim()) {
        expenseNameError.textContent = 'Name is required';
        isValid = false;
    }
    
    if (!expenseAmountInput.value || parseFloat(expenseAmountInput.value) <= 0) {
        expenseAmountError.textContent = 'Amount must be positive';
        isValid = false;
    }
    
    if (!expenseDateInput.value) {
        expenseDateError.textContent = 'Date is required';
        isValid = false;
    }
    
    if (!expenseCategoryInput.value) {
        expenseCategoryError.textContent = 'Category is required';
        isValid = false;
    }
    
    return isValid;
}

function clearExpenseFormErrors() {
    expenseNameError.textContent = '';
    expenseAmountError.textContent = '';
    expenseDateError.textContent = '';
    expenseCategoryError.textContent = '';
}

function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses();
        updateExpenseTable();
        updateTotalAmounts();
        updateCharts();
        updateDashboard();
    }
}

// Saving Functions
function openAddSavingModal() {
    savingModalTitle.textContent = 'Add New Saving';
    saveSavingBtn.textContent = 'Add Saving';
    savingForm.reset();
    savingIdInput.value = '';
    savingDateInput.valueAsDate = new Date();
    clearSavingFormErrors();
    savingModal.style.display = 'flex';
}

function openEditSavingModal(id) {
    const saving = savings.find(sav => sav.id === id);
    if (!saving) return;
    
    savingModalTitle.textContent = 'Edit Saving';
    saveSavingBtn.textContent = 'Update Saving';
    
    savingIdInput.value = saving.id;
    savingNameInput.value = saving.name;
    savingAmountInput.value = saving.amount;
    savingDateInput.value = saving.date;
    savingCategoryInput.value = saving.category;
    savingNotesInput.value = saving.notes || '';
    
    clearSavingFormErrors();
    savingModal.style.display = 'flex';
}

function closeSavingModalFunc() {
    savingModal.style.display = 'none';
}

function handleSavingFormSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateSavingForm()) return;
    
    const id = savingIdInput.value || Date.now().toString();
    const saving = {
        id,
        name: savingNameInput.value,
        amount: parseFloat(savingAmountInput.value),
        date: savingDateInput.value,
        category: savingCategoryInput.value,
        notes: savingNotesInput.value
    };
    
    if (savingIdInput.value) {
        // Update existing saving
        const index = savings.findIndex(sav => sav.id === id);
        if (index !== -1) {
            savings[index] = saving;
        }
    } else {
        // Add new saving
        savings.push(saving);
    }
    
    // Save to local storage
    saveSavings();
    
    // Update UI
    updateSavingTable();
    updateTotalAmounts();
    updateCharts();
    updateDashboard();
    
    // Close modal
    closeSavingModalFunc();
}

function validateSavingForm() {
    let isValid = true;
    clearSavingFormErrors();
    
    if (!savingNameInput.value.trim()) {
        savingNameError.textContent = 'Name is required';
        isValid = false;
    }
    
    if (!savingAmountInput.value || parseFloat(savingAmountInput.value) <= 0) {
        savingAmountError.textContent = 'Amount must be positive';
        isValid = false;
    }
    
    if (!savingDateInput.value) {
        savingDateError.textContent = 'Date is required';
        isValid = false;
    }
    
    if (!savingCategoryInput.value) {
        savingCategoryError.textContent = 'Category is required';
        isValid = false;
    }
    
    return isValid;
}

function clearSavingFormErrors() {
    savingNameError.textContent = '';
    savingAmountError.textContent = '';
    savingDateError.textContent = '';
    savingCategoryError.textContent = '';
}

function deleteSaving(id) {
    if (confirm('Are you sure you want to delete this saving?')) {
        savings = savings.filter(saving => saving.id !== id);
        saveSavings();
        updateSavingTable();
        updateTotalAmounts();
        updateCharts();
        updateDashboard();
    }
}

// Storage Functions
function saveExpenses() {
    if (!currentUser) return;
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(expenses));
}

function saveSavings() {
    if (!currentUser) return;
    localStorage.setItem(`savings_${currentUser.id}`, JSON.stringify(savings));
}

// UI Update Functions
function updateTotalAmounts() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalSavings = savings.reduce((sum, saving) => sum + saving.amount, 0);
    
    totalExpenseAmountElement.textContent = totalExpenses.toFixed(2);
    totalSavingAmountElement.textContent = totalSavings.toFixed(2);
    expenseCountElement.textContent = expenses.length;
    savingCountElement.textContent = savings.length;
}

function updateExpenseTable() {
    const filteredExpenses = filterExpenses(expenses);
    const sortedExpenses = sortExpenses(filteredExpenses);
    const searchedExpenses = searchExpenses(sortedExpenses);
    
    if (searchedExpenses.length === 0) {
        expenseTableBody.innerHTML = `
            <tr class="empty-state">
                <td colspan="5">No expenses found. Add some expenses to get started!</td>
            </tr>
        `;
        return;
    }
    
    expenseTableBody.innerHTML = '';
    
    searchedExpenses.forEach(expense => {
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(expense.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        row.innerHTML = `
            <td>
                ${expense.name}
                ${expense.notes ? `<div class="expense-notes">${expense.notes}</div>` : ''}
            </td>
            <td>
                <span class="category-badge category-${expense.category}">
                    ${expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                </span>
            </td>
            <td>${formattedDate}</td>
            <td class="amount-column">₹${expense.amount.toFixed(2)}</td>
            <td class="actions-column">
                <div class="action-buttons">
                    <button class="action-button edit-expense-button" data-id="${expense.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
                    </button>
                    <button class="action-button delete-expense-button" data-id="${expense.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                    </button>
                </div>
            </td>
        `;
        
        expenseTableBody.appendChild(row);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-expense-button').forEach(button => {
        button.addEventListener('click', () => {
            openEditExpenseModal(button.dataset.id);
        });
    });
    
    document.querySelectorAll('.delete-expense-button').forEach(button => {
        button.addEventListener('click', () => {
            deleteExpense(button.dataset.id);
        });
    });
}

function updateSavingTable() {
    const filteredSavings = filterSavings(savings);
    const sortedSavings = sortSavings(filteredSavings);
    const searchedSavings = searchSavings(sortedSavings);
    
    if (searchedSavings.length === 0) {
        savingTableBody.innerHTML = `
            <tr class="empty-state">
                <td colspan="5">No savings found. Add some savings to get started!</td>
            </tr>
        `;
        return;
    }
    
    savingTableBody.innerHTML = '';
    
    searchedSavings.forEach(saving => {
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(saving.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        row.innerHTML = `
            <td>
                ${saving.name}
                ${saving.notes ? `<div class="expense-notes">${saving.notes}</div>` : ''}
            </td>
            <td>
                <span class="category-badge category-${saving.category}">
                    ${saving.category.charAt(0).toUpperCase() + saving.category.slice(1)}
                </span>
            </td>
            <td>${formattedDate}</td>
            <td class="amount-column">₹${saving.amount.toFixed(2)}</td>
            <td class="actions-column">
                <div class="action-buttons">
                    <button class="action-button edit-saving-button" data-id="${saving.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
                    </button>
                    <button class="action-button delete-saving-button" data-id="${saving.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                    </button>
                </div>
            </td>
        `;
        
        savingTableBody.appendChild(row);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-saving-button').forEach(button => {
        button.addEventListener('click', () => {
            openEditSavingModal(button.dataset.id);
        });
    });
    
    document.querySelectorAll('.delete-saving-button').forEach(button => {
        button.addEventListener('click', () => {
            deleteSaving(button.dataset.id);
        });
    });
}

// Filter, Sort, and Search Functions
function filterExpenses(expenses) {
    if (activeExpenseFilter === 'all') return expenses;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeekAgo = new Date(today.getTime() - 7 * oneDay);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    if (activeExpenseFilter === 'today') {
        return expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.toDateString() === today.toDateString();
        });
    } else if (activeExpenseFilter === 'week') {
        return expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= oneWeekAgo;
        });
    } else if (activeExpenseFilter === 'month') {
        return expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startOfMonth;
        });
    } else if (activeExpenseFilter.startsWith('category-')) {
        const category = activeExpenseFilter.replace('category-', '');
        return expenses.filter(expense => expense.category === category);
    }
    
    return expenses;
}

function filterSavings(savings) {
    if (activeSavingFilter === 'all') return savings;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeekAgo = new Date(today.getTime() - 7 * oneDay);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    if (activeSavingFilter === 'today') {
        return savings.filter(saving => {
            const savingDate = new Date(saving.date);
            return savingDate.toDateString() === today.toDateString();
        });
    } else if (activeSavingFilter === 'week') {
        return savings.filter(saving => {
            const savingDate = new Date(saving.date);
            return savingDate >= oneWeekAgo;
        });
    } else if (activeSavingFilter === 'month') {
        return savings.filter(saving => {
            const savingDate = new Date(saving.date);
            return savingDate >= startOfMonth;
        });
    } else if (activeSavingFilter.startsWith('category-')) {
        const category = activeSavingFilter.replace('category-', '');
        return savings.filter(saving => saving.category === category);
    }
    
    return savings;
}

function sortExpenses(expenses) {
    return [...expenses].sort((a, b) => {
        if (activeExpenseSortBy === 'date-desc') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (activeExpenseSortBy === 'date-asc') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (activeExpenseSortBy === 'amount-desc') {
            return b.amount - a.amount;
        } else if (activeExpenseSortBy === 'amount-asc') {
            return a.amount - b.amount;
        }
        return 0;
    });
}

function sortSavings(savings) {
    return [...savings].sort((a, b) => {
        if (activeSavingSortBy === 'date-desc') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (activeSavingSortBy === 'date-asc') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (activeSavingSortBy === 'amount-desc') {
            return b.amount - a.amount;
        } else if (activeSavingSortBy === 'amount-asc') {
            return a.amount - b.amount;
        }
        return 0;
    });
}

function searchExpenses(expenses) {
    const searchTerm = expenseSearchInput.value.toLowerCase().trim();
    if (!searchTerm) return expenses;
    
    return expenses.filter(expense => 
        expense.name.toLowerCase().includes(searchTerm) ||
        (expense.notes && expense.notes.toLowerCase().includes(searchTerm))
    );
}

function searchSavings(savings) {
    const searchTerm = savingSearchInput.value.toLowerCase().trim();
    if (!searchTerm) return savings;
    
    return savings.filter(saving => 
        saving.name.toLowerCase().includes(searchTerm) ||
        (saving.notes && saving.notes.toLowerCase().includes(searchTerm))
    );
}

// Chart Functions
function updateCharts() {
    updateExpenseCategoryChart();
    updateExpenseTrendChart();
    updateSavingCategoryChart();
    updateSavingTrendChart();
}

function updateExpenseCategoryChart() {
    // Destroy previous chart instance if it exists
    if (expenseCategoryChartInstance) {
        expenseCategoryChartInstance.destroy();
    }
    
    // Prepare data for category chart
    const categories = {};
    expenses.forEach(expense => {
        if (categories[expense.category]) {
            categories[expense.category] += expense.amount;
        } else {
            categories[expense.category] = expense.amount;
        }
    });
    
    const categoryData = Object.entries(categories).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
    }));
    
    // Show empty state if no data
    if (categoryData.length === 0) {
        expenseCategoryChartContainer.style.display = 'none';
        expenseCategoryChartEmpty.style.display = 'flex';
        return;
    }
    
    expenseCategoryChartContainer.style.display = 'block';
    expenseCategoryChartEmpty.style.display = 'none';
    
    // Colors for chart
    const colors = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
        '#8884D8', '#FF6B6B', '#A0A0A0'
    ];
    
    // Create chart
    const ctx = expenseCategoryChart.getContext('2d');
    expenseCategoryChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categoryData.map(item => item.name),
            datasets: [{
                data: categoryData.map(item => item.value),
                backgroundColor: categoryData.map((_, index) => colors[index % colors.length]),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function updateExpenseTrendChart() {
    // Destroy previous chart instance if it exists
    if (expenseTrendChartInstance) {
        expenseTrendChartInstance.destroy();
    }
    
    // Prepare data for monthly trend chart
    const months = {};
    
    expenses.forEach(expense => {
        const date = new Date(expense.date);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (months[monthYear]) {
            months[monthYear] += expense.amount;
        } else {
            months[monthYear] = expense.amount;
        }
    });
    
    // Sort by date
    const monthlyData = Object.entries(months)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => {
            const [aMonth, aYear] = a.month.split(' ');
            const [bMonth, bYear] = b.month.split(' ');
            
            if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
            
            const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
        });
    
    // Show empty state if no data
    if (monthlyData.length === 0) {
        expenseTrendChartContainer.style.display = 'none';
        expenseTrendChartEmpty.style.display = 'flex';
        return;
    }
    
    expenseTrendChartContainer.style.display = 'block';
    expenseTrendChartEmpty.style.display = 'none';
    
    // Create chart
    const ctx = expenseTrendChart.getContext('2d');
    expenseTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlyData.map(item => item.month),
            datasets: [{
                label: 'Total Expenses',
                data: monthlyData.map(item => item.amount),
                borderColor: 'var(--expense-color)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value;
                        },
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                    }
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Total: ₹${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

function updateSavingCategoryChart() {
    // Destroy previous chart instance if it exists
    if (savingCategoryChartInstance) {
        savingCategoryChartInstance.destroy();
    }
    
    // Prepare data for category chart
    const categories = {};
    savings.forEach(saving => {
        if (categories[saving.category]) {
            categories[saving.category] += saving.amount;
        } else {
            categories[saving.category] = saving.amount;
        }
    });
    
    const categoryData = Object.entries(categories).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
    }));
    
    // Show empty state if no data
    if (categoryData.length === 0) {
        savingCategoryChartContainer.style.display = 'none';
        savingCategoryChartEmpty.style.display = 'flex';
        return;
    }
    
    savingCategoryChartContainer.style.display = 'block';
    savingCategoryChartEmpty.style.display = 'none';
    
    // Colors for chart
    const colors = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
        '#8884D8', '#FF6B6B', '#A0A0A0'
    ];
    
    // Create chart
    const ctx = savingCategoryChart.getContext('2d');
    savingCategoryChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categoryData.map(item => item.name),
            datasets: [{
                data: categoryData.map(item => item.value),
                backgroundColor: categoryData.map((_, index) => colors[index % colors.length]),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function updateSavingTrendChart() {
    // Destroy previous chart instance if it exists
    if (savingTrendChartInstance) {
        savingTrendChartInstance.destroy();
    }
    
    // Prepare data for monthly trend chart
    const months = {};
    
    savings.forEach(saving => {
        const date = new Date(saving.date);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (months[monthYear]) {
            months[monthYear] += saving.amount;
        } else {
            months[monthYear] = saving.amount;
        }
    });
    
    // Sort by date
    const monthlyData = Object.entries(months)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => {
            const [aMonth, aYear] = a.month.split(' ');
            const [bMonth, bYear] = b.month.split(' ');
            
            if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
            
            const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
        });
    
    // Show empty state if no data
    if (monthlyData.length === 0) {
        savingTrendChartContainer.style.display = 'none';
        savingTrendChartEmpty.style.display = 'flex';
        return;
    }
    
    savingTrendChartContainer.style.display = 'block';
    savingTrendChartEmpty.style.display = 'none';
    
    // Create chart
    const ctx = savingTrendChart.getContext('2d');
    savingTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlyData.map(item => item.month),
            datasets: [{
                label: 'Total Savings',
                data: monthlyData.map(item => item.amount),
                borderColor: 'var(--saving-color)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value;
                        },
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                    }
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Total: ₹${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

function updateDashboard() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalSavings = savings.reduce((sum, saving) => sum + saving.amount, 0);
    const netBalance = totalSavings - totalExpenses;
    
    dashboardExpenseAmount.textContent = totalExpenses.toFixed(2);
    dashboardSavingAmount.textContent = totalSavings.toFixed(2);
    dashboardBalanceAmount.textContent = netBalance.toFixed(2);
    
    updateOverviewChart();
    updateComparisonChart();
}

function updateOverviewChart() {
    // Destroy previous chart instance if it exists
    if (overviewChartInstance) {
        overviewChartInstance.destroy();
    }
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalSavings = savings.reduce((sum, saving) => sum + saving.amount, 0);
    
    // Create chart
    const ctx = overviewChart.getContext('2d');
    overviewChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Expenses', 'Savings'],
            datasets: [{
                data: [totalExpenses, totalSavings],
                backgroundColor: [
                    'var(--expense-color)',
                    'var(--saving-color)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function updateComparisonChart() {
    // Destroy previous chart instance if it exists
    if (comparisonChartInstance) {
        comparisonChartInstance.destroy();
    }
    
    // Prepare data for monthly comparison chart
    const expenseMonths = {};
    const savingMonths = {};
    
    expenses.forEach(expense => {
        const date = new Date(expense.date);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (expenseMonths[monthYear]) {
            expenseMonths[monthYear] += expense.amount;
        } else {
            expenseMonths[monthYear] = expense.amount;
        }
    });
    
    savings.forEach(saving => {
        const date = new Date(saving.date);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (savingMonths[monthYear]) {
            savingMonths[monthYear] += saving.amount;
        } else {
            savingMonths[monthYear] = saving.amount;
        }
    });
    
    // Get all unique months
    const allMonths = [...new Set([...Object.keys(expenseMonths), ...Object.keys(savingMonths)])];
    
    // Sort months
    allMonths.sort((a, b) => {
        const [aMonth, aYear] = a.split(' ');
        const [bMonth, bYear] = b.split(' ');
        
        if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
        
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
    });
    
    // Create datasets
    const expenseData = allMonths.map(month => expenseMonths[month] || 0);
    const savingData = allMonths.map(month => savingMonths[month] || 0);
    
    // Create chart
    const ctx = comparisonChart.getContext('2d');
    comparisonChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allMonths,
            datasets: [
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: 'var(--expense-color)',
                    borderWidth: 1
                },
                {
                    label: 'Savings',
                    data: savingData,
                    backgroundColor: 'var(--saving-color)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value;
                        },
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                    }
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    },
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--foreground')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ₹${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

// Chatbot Functions
function toggleChatbot() {
    chatbotPanel.classList.toggle('hidden');
}

function sendChatMessage() {
    const message = chatbotInputField.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addUserMessage(message);
    
    // Clear input field
    chatbotInputField.value = '';
    
    // Process message and get response
    const response = getChatbotResponse(message);
    
    // Add bot response to chat
    setTimeout(() => {
        addBotMessage(response);
    }, 500);
}

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'user-message';
    messageElement.innerHTML = `
        <div class="message-content">${message}</div>
    `;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'bot-message';
    messageElement.innerHTML = `
        <div class="message-content">${message}</div>
    `;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getChatbotResponse(message) {
    message = message.toLowerCase();
    
    // Simple keyword-based responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello! How can I help you with your finances today?';
    } else if (message.includes('help')) {
        return 'I can help you with:<br>- Understanding how to use this app<br>- Providing financial tips<br>- Explaining budgeting concepts<br>- Suggesting savings strategies';
    } else if (message.includes('expense') && message.includes('add')) {
        return 'To add an expense, click the "Add Expense" button in the Expenses section. Fill in the details like name, amount, date, and category, then click "Add Expense" to save it.';
    } else if (message.includes('saving') && message.includes('add')) {
        return 'To add a saving, click the "Add Saving" button in the Savings section. Fill in the details like name, amount, date, and category, then click "Add Saving" to save it.';
    } else if (message.includes('chart') || message.includes('graph')) {
        return 'You can view different charts by going to the Charts tab in either the Expenses or Savings section. The Dashboard section also provides overview charts comparing your expenses and savings.';
    } else if (message.includes('budget') || message.includes('budgeting')) {
        return 'Budgeting is the process of creating a plan for how you will spend your money. It helps you determine in advance whether you will have enough money to do the things you need to do or would like to do. Try tracking your expenses for a month to understand your spending patterns before creating a budget.';
    } else if (message.includes('save') || message.includes('saving money')) {
        return 'Here are some saving tips:<br>1. Set clear savings goals<br>2. Follow the 50/30/20 rule (50% needs, 30% wants, 20% savings)<br>3. Automate your savings<br>4. Cut unnecessary expenses<br>5. Use the 24-hour rule for impulse purchases';
    } else if (message.includes('invest') || message.includes('investment')) {
        return 'Investment is a way to grow your money over time. Consider:<br>1. Start with an emergency fund<br>2. Understand your risk tolerance<br>3. Diversify your investments<br>4. Consider low-cost index funds for beginners<br>5. Consult with a financial advisor for personalized advice';
    } else if (message.includes('debt') || message.includes('loan')) {
        return 'Managing debt effectively:<br>1. List all your debts with interest rates<br>2. Prioritize high-interest debt<br>3. Consider the debt avalanche or debt snowball method<br>4. Make more than minimum payments when possible<br>5. Consider debt consolidation if appropriate';
    } else if (message.includes('thank')) {
        return 'You\'re welcome! Feel free to ask if you have any other questions.';
    } else {
        return 'I\'m not sure I understand. You can ask me about how to use this app, financial tips, budgeting advice, or savings strategies. Try asking something like "How do I add an expense?" or "What are some saving tips?"';
    }
}