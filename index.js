// Declaration section Global variables
let lead = [];
const inputBtn = document.querySelector("#input-btn");
const inputEL = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const delBtn = document.querySelector("#del-btn");
const tabBtn = document.querySelector("#tab-btn");
//...
// getting saved leads from local storage and saving in savedleads var
let savedLeads = JSON.parse(localStorage.getItem("lead"));
console.log(savedLeads);

//  printing saved leads after refreshing browser
if (savedLeads) {
	lead = savedLeads;
	render(lead);
}

// function which invokes on clicking save input button
inputBtn.addEventListener("click", function () {
	lead.push(inputEL.value);
	console.log(lead);
	// clearInput();
	inputEL.value = "";

	//storing value of lead in local storage
	localStorage.setItem("lead", JSON.stringify(lead)); //coverting array into string
	render(lead);
});

// save TAB button function
tabBtn.addEventListener("click", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		lead.push(tabs[0].url);
		localStorage.setItem("lead", JSON.stringify(lead));
		render(lead);
	});
});

// delete Btn function deletes all leads
delBtn.addEventListener("dblclick", function () {
	localStorage.clear();
	lead = [];
	render(lead);
});

// Renders the list in HTML DOM
function render(arrLeads) {
	let listLi = "";
	for (let i = 0; i < arrLeads.length; i++) {
		// listLi += `<li><a href='#' target='_blank'>${lead[i]}</li></a>`;
		listLi += `<li>
				<a href="${arrLeads[i]}" target="_blank">
					${arrLeads[i]}
				</a>
			</li>`;
	}
	ulEl.innerHTML = listLi;
}

function clearInput() {
	inputEL.value = "";
}
