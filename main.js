// ===============================
// Data Store
// ===============================
let interviewList = [];
let rejectedList = [];

// ===============================
// DOM Elements
// ===============================
const totalCount = document.getElementById('total-count');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');

const mainContainer = document.querySelector('main');
const allCardSection = document.getElementById('All-job-card');
const filterSection = document.getElementById('filtered-section');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

// ===============================
// Initial Count
// ===============================
calculateCount();

// ===============================
// Count Function
// ===============================
function calculateCount() {
  totalCount.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

// ===============================
// Event Delegation (Main Click Handler)
// ===============================
mainContainer.addEventListener('click', function (event) {
  const card = event.target.closest('.card');
  if (!card) return;

  const jobName = card.querySelector('.JobName').innerText;
  const jobInfo = card.querySelector('.jobInfo').innerText;
  const jobDetails = card.querySelector('.jobDetails').innerText;
  const jobBio = card.querySelector('.jobBio').innerText;

  const jobData = { jobName, jobInfo, jobDetails, jobBio };

  // ===============================
  // Interview Button Click
  // ===============================
  if (event.target.classList.contains('interviewBtn')) {
    const exists = interviewList.find(item => item.jobName === jobName);

    if (!exists) {
      interviewList.push(jobData);
      card.querySelector('.JobStatus').innerText = 'Interview';
    }

    calculateCount();
  }

  // ===============================
  // Rejected Button Click
  // ===============================
  if (event.target.classList.contains('rejectedBtn')) {
    const exists = rejectedList.find(item => item.jobName === jobName);

    if (!exists) {
      rejectedList.push(jobData);
      card.querySelector('.JobStatus').innerText = 'Rejected';
    }

    calculateCount();
  }
});

// ===============================
// Filter Button Style Toggle
// ===============================
function toggleStyle(id) {
  // Reset All Buttons
  allFilterBtn.classList.remove('bg-blue-500', 'text-white');
  interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
  rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

  allFilterBtn.classList.add('bg-white', 'text-gray-500');
  interviewFilterBtn.classList.add('bg-white', 'text-gray-500');
  rejectedFilterBtn.classList.add('bg-white', 'text-gray-500');

  // Activate Selected Button
  const selected = document.getElementById(id);
  selected.classList.remove('bg-white', 'text-gray-500');
  selected.classList.add('bg-blue-500', 'text-white');

  // ===============================
  // Section Toggle
  // ===============================
  if (id === 'all-filter-btn') {
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  }

  if (id === 'interview-filter-btn') {
    renderFiltered(interviewList, 'Interview', 'text-green-500');
  }

  if (id === 'rejected-filter-btn') {
    renderFiltered(rejectedList, 'Rejected', 'text-red-500');
  }
}

// ===============================
// Render Filtered Cards
// ===============================
function renderFiltered(list, statusText, colorClass) {
  allCardSection.classList.add('hidden');
  filterSection.classList.remove('hidden');

  filterSection.innerHTML = '';

  if (list.length === 0) {
    filterSection.innerHTML = `
      <div class="text-center mt-20 text-gray-400">
        <h2>No jobs available</h2>
      </div>
    `;
    return;
  }

  list.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card mb-[16px] mt-6';

    div.innerHTML = `
      <div class="shadow-sm p-6">
        <p class="font-bold">${item.jobName}</p>
        <p class="${colorClass} font-semibold mt-3">${statusText}</p>
      </div>
    `;

    filterSection.appendChild(div);
  });
}
