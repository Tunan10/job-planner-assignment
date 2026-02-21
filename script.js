let interviewList = [];
let rejectedList = [];

let total = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectCount = document.getElementById('rejected-count');
const allcardSection = document.getElementById('All-job-card');
console.log(allcardSection.children.length);

function calculateCOunt() {
  total.innerText = allcardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectedList.length;
}
calculateCOunt();
