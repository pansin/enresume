import { resumeData } from './resume_data.js';

document.addEventListener('DOMContentLoaded', () => {
    populateData();
    setupScrollSpy();
    setupSmoothScroll();
    setupFadeInAnimations();
    lucide.createIcons();
});

function formatText(text) {

    const boldRegex = new RegExp('\\*\\*(.*?)\\*\\*', 'g');
    return text.replace(boldRegex, '<strong class="font-semibold text-slate-200">$1</strong>');
}

function populateData() {

    document.getElementById('header-name').textContent = resumeData.name;
    document.getElementById('header-title').textContent = resumeData.title;
    document.getElementById('header-summary-brief').textContent = resumeData.summaryBrief;


    const summaryContent = document.getElementById('summary-content');
    resumeData.executiveSummary.split('\n\n').forEach(p => {
        const pElement = document.createElement('p');
        pElement.innerHTML = formatText(p);
        pElement.className = 'mb-4';
        summaryContent.appendChild(pElement);
    });
    

    const experienceContent = document.getElementById('experience-content');
    resumeData.professionalExperience.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 mb-12';
        
        const jobHeader = `<div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>`;
        const jobPeriod = `<header class="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label="${job.period}">${job.period}</header>`;
        const jobDetails = `
            <div class="z-10 sm:col-span-6">
                <h3 class="font-medium leading-snug text-slate-200">
                    <div>
                        <span class="inline-block font-semibold">${job.role} · ${job.company}</span>
                    </div>
                </h3>
                <p class="mt-2 text-sm leading-normal">${formatText(job.description)}</p>
                <ul class="mt-2 list-disc list-inside text-sm">
                    ${job.achievements.map(ach => `<li>${formatText(ach)}</li>`).join('')}
                </ul>
                <ul class="mt-2 flex flex-wrap" aria-label="Technologies used">
                    ${job.tags.map(tag => `<li class="mr-1.5 mt-2"><div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">${tag}</div></li>`).join('')}
                </ul>
            </div>`;
        
        jobElement.innerHTML = jobHeader + jobPeriod + jobDetails;
        experienceContent.appendChild(jobElement);
    });


    const projectContent = document.getElementById('project-content');
    const project = resumeData.flagshipProject;
    const projectElement = document.createElement('div');
    projectElement.className = 'group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50';
    projectElement.innerHTML = `
        <div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
        <div class="z-10 sm:col-span-8">
            <h3 class="font-medium leading-snug text-slate-200">
                <span class="inline-block font-semibold">${project.name} · ${project.organization}</span>
            </h3>
            <p class="mt-2 text-sm leading-normal"><strong>Role:</strong> ${project.role}</p>
            <p class="mt-2 text-sm leading-normal"><strong>Challenge:</strong> ${formatText(project.challenge)}</p>
            <p class="mt-2 text-sm leading-normal"><strong>Outcome:</strong> ${formatText(project.outcome)}</p>
            <ul class="mt-2 flex flex-wrap" aria-label="Technologies used">
                ${project.tags.map(tag => `<li class="mr-1.5 mt-2"><div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">${tag}</div></li>`).join('')}
            </ul>
        </div>
    `;
    projectContent.appendChild(projectElement);


    const educationContent = document.getElementById('education-content');
    resumeData.education.forEach(edu => {
        const eduElement = document.createElement('div');
        eduElement.className = 'mb-6';
        eduElement.innerHTML = `
            <div class="flex justify-between items-baseline">
                <h4 class="font-semibold text-slate-200">${edu.degree}</h4>
                <p class="text-xs text-slate-500">${edu.period}</p>
            </div>
            <p class="text-sm text-slate-400">${edu.institution}</p>
        `;
        educationContent.appendChild(eduElement);
    });
}

function setupScrollSpy() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('#nav-menu a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.parentElement.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px" });

    sections.forEach(section => observer.observe(section));
}

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupFadeInAnimations() {
    const sections = document.querySelectorAll('#content > section');
    sections.forEach(section => section.classList.add('scroll-section'));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}
