// script.js for BizzCalc

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function openCalc(id) {
  document.querySelectorAll('.calc-section').forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(document.querySelectorAll('.tab-button')).find(btn => btn.textContent.toLowerCase().includes(id));
  if (activeBtn) activeBtn.classList.add('active');
}

function addPartner() {
  const partnerInputs = document.getElementById("partnerInputs");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Partner Name" />
    <input type="number" placeholder="Share (%)" />
  `;
  partnerInputs.appendChild(div);
}

function calculateProfitSplit() {
  const total = parseFloat(document.getElementById("totalIncome").value);
  const inputs = document.getElementById("partnerInputs").querySelectorAll("div");
  let html = "<ul>";
  inputs.forEach(div => {
    const name = div.querySelector("input[type='text']").value;
    const percent = parseFloat(div.querySelector("input[type='number']").value);
    const amount = (total * percent) / 100;
    html += `<li><strong>${name}</strong>: ${percent}% = Rs. ${amount.toFixed(2)}</li>`;
  });
  html += "</ul>";
  document.getElementById("profitResult").innerHTML = html;
}

function calculatePercentage() {
  const val = parseFloat(document.getElementById("percentageValue").value);
  const of = parseFloat(document.getElementById("percentageOf").value);
  const result = (val / 100) * of;
  document.getElementById("percentageResult").innerText = `${val}% of ${of} = ${result.toFixed(2)}`;
}

function calculateDiscount() {
  const price = parseFloat(document.getElementById("originalPrice").value);
  const percent = parseFloat(document.getElementById("discountPercent").value);
  const discount = (price * percent) / 100;
  const final = price - discount;
  document.getElementById("discountResult").innerText = `Discount: Rs. ${discount.toFixed(2)}, Final Price: Rs. ${final.toFixed(2)}`;
}

function calculateTax() {
  const amount = parseFloat(document.getElementById("taxAmount").value);
  const rate = parseFloat(document.getElementById("taxRate").value || 17);
  const tax = (amount * rate) / 100;
  document.getElementById("taxResult").innerText = `Tax @ ${rate}% = Rs. ${tax.toFixed(2)}`;
}

function calculateUnitPrice() {
  const cost = parseFloat(document.getElementById("totalCost").value);
  const qty = parseFloat(document.getElementById("quantity").value);
  const price = cost / qty;
  document.getElementById("unitResult").innerText = `Unit Price: Rs. ${price.toFixed(2)}`;
}

let totalExpenses = 0;
function addExpense() {
  const name = document.getElementById("expenseName").value;
  const amt = parseFloat(document.getElementById("expenseAmount").value);
  if (!name || isNaN(amt)) return;
  totalExpenses += amt;
  const list = document.getElementById("expenseList");
  list.innerHTML += `<li>${name}: Rs. ${amt.toFixed(2)}</li>`;
  document.getElementById("totalExpense").innerText = `Total: Rs. ${totalExpenses.toFixed(2)}`;
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amountCurrency").value);
  const type = document.getElementById("convertTo").value;
  const rates = { USD: 277, SAR: 74, AED: 75, EUR: 296 };
  const converted = amount / rates[type];
  document.getElementById("currencyResult").innerText = `${amount} PKR = ${converted.toFixed(2)} ${type}`;
}

function calculateEMI() {
  const amount = parseFloat(document.getElementById("loanAmount").value);
  const rate = parseFloat(document.getElementById("interestRate").value) / 1200;
  const months = parseFloat(document.getElementById("loanTerm").value);
  const emi = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  document.getElementById("loanResult").innerText = `Monthly EMI: Rs. ${emi.toFixed(2)}`;
}

function calculateBillSplit() {
  const total = parseFloat(document.getElementById("billAmount").value);
  const people = parseInt(document.getElementById("peopleCount").value);
  const each = total / people;
  document.getElementById("splitResult").innerText = `Each Pays: Rs. ${each.toFixed(2)}`;
}

const waButtons = [
  'Profit','Percentage','Discount','Tax','Unit','Expense','Currency','Loan','Split'
];
waButtons.forEach(key => {
  const id = `waShare${key}`;
  const resultId = key === 'Profit' ? 'profitResult' : `${key.toLowerCase()}Result`;
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", function () {
      const result = document.getElementById(resultId)?.innerText || '';
      const text = encodeURIComponent(`${key} Result from BizzCalc:\n${result}`);
      this.href = `https://wa.me/?text=${text}`;
    });
  }
});
