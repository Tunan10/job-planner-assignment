// take blank array to store value
let interviewList = [];
let rejecteList = [];

// Header count change
let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectCount = document.getElementById('rejected-count');
let totoalJobCount = document.getElementById('total-job-count');

const mainContainer = document.querySelector('main');
const allCardSection = document.getElementById('All-job-card');
const filterSection = document.getElementById('filtered-section');

function calculateCount() {
  totalCount.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejecteList.length;
  totoalJobCount.innerText = allCardSection.children.length + 'jobs';
}
calculateCount();

// for Button behaviour
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

mainContainer.addEventListener('click', function (event) {
  const parentNode = event.target.closest('.card');
  if (!parentNode) return;

  const JobName = parentNode.querySelector('.JobName').innerText;
  const jobInfo = parentNode.querySelector('.jobInfo').innerText;
  const jobDetails = parentNode.querySelector('.jobDetails').innerText;
  const jobBio = parentNode.querySelector('.jobBio').innerText;

  if (event.target.classList.contains('interviewBtn')) {
    // remove from rejected if exists
    rejecteList = rejecteList.filter(item => item.JobName !== JobName);

    const exists = interviewList.find(item => item.JobName === JobName);

    if (!exists) {
      interviewList.push({
        JobName,
        jobInfo,
        jobDetails,
        jobBio,
        JobStatus: 'Interview',
      });
    }

    parentNode.querySelector('.JobStatus').innerText = 'Interview';
    parentNode.querySelector('.JobStatus').className =
      'JobStatus bg-green-100 text-green-600 w-28 h-10 p-2 rounded-[4px] font-semibold';

    renderInterview();
    calculateCount();
  } else if (event.target.classList.contains('rejectedBtn')) {
    // remove from interview if exists
    interviewList = interviewList.filter(item => item.JobName !== JobName);

    const exists = rejecteList.find(item => item.JobName === JobName);

    if (!exists) {
      rejecteList.push({
        JobName,
        jobInfo,
        jobDetails,
        jobBio,
        JobStatus: 'Rejected',
      });
    }

    parentNode.querySelector('.JobStatus').innerText = 'Rejected';
    parentNode.querySelector('.JobStatus').className =
      'JobStatus bg-red-100 text-red-600 w-28 h-10 p-2 rounded-[4px] font-semibold';

    renderRejected();
    calculateCount();
  }
});

function toggleStyle(id) {
  allFilterBtn.classList.remove('bg-blue-500', 'text-white');
  interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
  rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

  allFilterBtn.classList.add('bg-white', 'text-gray-500');
  interviewFilterBtn.classList.add('bg-white', 'text-gray-500');
  rejectedFilterBtn.classList.add('bg-white', 'text-gray-500');

  const selected = document.getElementById(id);

  selected.classList.remove('bg-white', 'text-gray-500');
  selected.classList.add('bg-blue-500', 'text-white');

  if (id === 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  } else if (id === 'rejected-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
  } else {
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  }
}
function deleteInterview(index) {
  interviewList.splice(index, 1);
  renderInterview();
  calculateCount();
}

function deleteRejected(index) {
  rejecteList.splice(index, 1);
  renderRejected();
  calculateCount();
}

function deleteRejected(index) {
  rejecteList.splice(index, 1);
  renderRejected();
  calculateCount();
}

function renderInterview() {
  filterSection.innerHTML = '';

  if (interviewList.length === 0) {
    filterSection.innerHTML = `
     <div class="h-[400px]  ">
      <div class="flex flex-col items-center justify-center pt-20"><img src="./jobs.png" alt="" class="w-32 ">
        <h2>No jobs available</h2>
        <p>Check back soon for new job opportunities</p>
      </div>
    </div>`;
    return;
  }

  interviewList.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'card mb-[16px] mt-8';

    div.innerHTML = `
      <div class="shadow-sm p-6">
        <div class="grid grid-cols-2 place-content-between">
          <p class="JobName font-bold">${item.JobName}</p>
          <button onclick="deleteInterview(${index})">
            <i class="fa-regular fa-trash-can text-red-500"></i>
          </button>
        </div>

        <p class="jobInfo text-gray-400">${item.jobInfo}</p>
        <p class="jobDetails text-gray-400 mt-5">${item.jobDetails}</p>

        <div class="mt-5">
          <p class="bg-green-100 text-green-600 w-28 h-10 p-2 rounded font-semibold">
            Interview
          </p>
          <p class="jobBio mt-2 text-gray-400">${item.jobBio}</p>
        </div>
      </div>
    `;

    filterSection.appendChild(div);
  });
}

function renderRejected() {
  filterSection.innerHTML = '';

  if (rejecteList.length === 0) {
    filterSection.innerHTML = `<div class="h-[400px]  ">
      <div class="flex flex-col items-center justify-center pt-20"><img src="./jobs.png" alt="" class="w-32 ">
        <h2>No jobs available</h2>
        <p>Check back soon for new job opportunities</p>
      </div>
    </div>`;
    return;
  }

  rejecteList.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'card mb-[16px] mt-8';

    div.innerHTML = `
      <div class="shadow-sm p-6">
        <div class="grid grid-cols-2 place-content-between">
          <p class="JobName font-bold">${item.JobName}</p>
          <button onclick="deleteRejected(${index})">
            <i class="fa-regular fa-trash-can text-red-500"></i>
          </button>
        </div>

        <p class="jobInfo text-gray-400">${item.jobInfo}</p>
        <p class="jobDetails text-gray-400 mt-5">${item.jobDetails}</p>

        <div class="mt-5">
          <p class="bg-red-100 text-red-600 w-28 h-10 p-2 rounded font-semibold">
            Rejected
          </p>
          <p class="jobBio mt-2 text-gray-400">${item.jobBio}</p>
        </div>
      </div>
    `;

    filterSection.appendChild(div);
  });
}
