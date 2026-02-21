let interviewList = [];
let rejectedList = [];

let total = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectCount = document.getElementById('rejected-count');
const allcardSection = document.getElementById('All-job-card');
const mainContainer = document.querySelector('main');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

function calculateCOunt() {
  total.innerText = allcardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectedList.length;
}
calculateCOunt();
function togglestyle(id) {
  allFilterBtn.classList.remove('bg-blue-500', 'text-white');
  interviewFilterBtn.classList.remove('bg-blue', 'text-white');
  rejectedFilterBtn.classList.remove('bg-black', 'text-white');

  allFilterBtn.classList.add(
    'bg-white',
    'text-gray-500',
    'shadow-slate-200',
    'border',
    'border-gray-300',
  );
  interviewFilterBtn.classList.add('bg-white', 'text-gray-500');
  rejectedFilterBtn.classList.add('bg-white', 'text-gray-500');

  const selected = document.getElementById(id);
  console.log(selected);
  selected.classList.remove('bg-white', 'text-gray-500');
  selected.classList.add('bg-blue-500', 'text-white');
}
