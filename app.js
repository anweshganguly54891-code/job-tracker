document.getElementById('job-form').addEventListener('submit', addJob);

function addJob(e) {
    e.preventDefault();

    const jobTitle = document.getElementById('job-title').value;
    const company = document.getElementById('company').value;
    const dateApplied = document.getElementById('date-applied').value;
    const status = document.getElementById('status').value;

    const job = {
        title: jobTitle,
        company: company,
        date: dateApplied,
        status: status
    };

    // Save job to local storage
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    document.getElementById('job-form').reset();
    displayJobs();
}

function displayJobs() {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';

    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    // Sort jobs by date applied in ascending order
    jobs.sort((a, b) => new Date(a.date) - new Date(b.date));

    jobs.forEach((job, index) => {
        jobList.innerHTML += `
            <div class="job">
                <h3>${job.title} at ${job.company}</h3>
                <p>Date Applied: ${job.date}</p>
                <p>Status: ${job.status}</p>
                <button onclick="editJob(${index})">Edit</button>
                <button onclick="deleteJob(${index})">Delete</button>
            </div>
        `;
    });
}

function editJob(index) {
    const jobs = JSON.parse(localStorage.getItem('jobs'));
    const job = jobs[index];

    document.getElementById('job-title').value = job.title;
    document.getElementById('company').value = job.company;
    document.getElementById('date-applied').value = job.date;
    document.getElementById('status').value = job.status;

    // Remove the job from local storage for editing
    jobs.splice(index, 1);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    displayJobs();
}

function deleteJob(index) {
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs.splice(index, 1);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    displayJobs();
}

// Display jobs on page load
document.addEventListener('DOMContentLoaded', displayJobs);
