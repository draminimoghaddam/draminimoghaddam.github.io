// DOM elements
const addMediaBtn = document.getElementById('addMediaBtn');
const mediaModal = document.getElementById('mediaModal');
const closeModal = document.querySelector('.close');
const mediaForm = document.getElementById('mediaForm');
const mediaGrid = document.getElementById('mediaGrid');
const profilePhoto = document.getElementById('profilePhoto');
const langToggle = document.getElementById('langToggle');

// Additional DOM elements for publications
const addPubBtn = document.getElementById('addPubBtn');
const publicationModal = document.getElementById('publicationModal');
const publicationForm = document.getElementById('publicationForm');
const publicationsGrid = document.getElementById('publicationsGrid');

// Language state
let currentLang = 'en';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMediaItems();
    loadPublicationItems();
    checkProfilePhoto();
    setupEventListeners();
    loadLanguagePreference();
});

// Setup event listeners
function setupEventListeners() {
    // Language toggle
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Modal functionality for media
    if (addMediaBtn) {
        addMediaBtn.addEventListener('click', openModal);
    }
    
    // Modal functionality for publications
    if (addPubBtn) {
        addPubBtn.addEventListener('click', openPublicationModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }
    
    // Close modals when clicking outside
    if (mediaModal) {
        window.addEventListener('click', function(event) {
            if (event.target === mediaModal) {
                closeModalHandler();
            }
        });
    }
    
    if (publicationModal) {
        window.addEventListener('click', function(event) {
            if (event.target === publicationModal) {
                closePublicationModal();
            }
        });
        
        const pubCloseBtn = publicationModal.querySelector('.close');
        if (pubCloseBtn) {
            pubCloseBtn.addEventListener('click', closePublicationModal);
        }
    }
    
    // Form submissions
    if (mediaForm) {
        mediaForm.addEventListener('submit', handleFormSubmission);
    }
    
    if (publicationForm) {
        publicationForm.addEventListener('submit', handlePublicationSubmission);
    }
}

// Language toggle functionality
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'fa' : 'en';
    updateLanguage();
    saveLanguagePreference();
}

function updateLanguage() {
    const html = document.documentElement;
    const languageToggle = document.querySelector('.language-toggle');
    const nav = document.querySelector('nav');
    
    if (currentLang === 'fa') {
        // Set all pages to RTL for proper navigation order
        html.setAttribute('dir', 'rtl');
        
        // Always set navigation to RTL for proper button order in Farsi
        if (nav) nav.style.direction = 'rtl';
        
        html.setAttribute('lang', 'fa');
        langToggle.textContent = 'English';
        
        // Position language toggle on left in RTL mode
        if (languageToggle) {
            languageToggle.style.order = '-1';
        }
        
        // Show Farsi biography, hide English
        const bioEn = document.querySelector('.bio-en');
        const bioFa = document.querySelector('.bio-fa');
        if (bioEn) bioEn.style.display = 'none';
        if (bioFa) bioFa.style.display = 'block';
        
        // Show Farsi education, hide English
        const educationEn = document.querySelector('.education-en');
        const educationFa = document.querySelector('.education-fa');
        if (educationEn) educationEn.style.display = 'none';
        if (educationFa) educationFa.style.display = 'block';
        
        // Show Farsi contact message, hide English
        const messageEn = document.querySelector('.message-en');
        const messageFa = document.querySelector('.message-fa');
        if (messageEn) messageEn.style.display = 'none';
        if (messageFa) messageFa.style.display = 'block';
        
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        langToggle.textContent = 'فارسی';
        
        // Reset navigation direction
        if (nav) nav.style.direction = 'ltr';
        
        // Reset language toggle position
        if (languageToggle) {
            languageToggle.style.order = 'initial';
        }
        
        // Show English biography, hide Farsi
        const bioEn = document.querySelector('.bio-en');
        const bioFa = document.querySelector('.bio-fa');
        if (bioEn) bioEn.style.display = 'block';
        if (bioFa) bioFa.style.display = 'none';
        
        // Show English education, hide Farsi
        const educationEn = document.querySelector('.education-en');
        const educationFa = document.querySelector('.education-fa');
        if (educationEn) educationEn.style.display = 'block';
        if (educationFa) educationFa.style.display = 'none';
        
        // Show English contact message, hide Farsi
        const messageEn = document.querySelector('.message-en');
        const messageFa = document.querySelector('.message-fa');
        if (messageEn) messageEn.style.display = 'block';
        if (messageFa) messageFa.style.display = 'none';
    }
    
    // Update all translatable elements
    updateTranslatableElements();
}

function updateTranslatableElements() {
    // Update navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const enText = link.getAttribute('data-en');
        const faText = link.getAttribute('data-fa');
        if (enText && faText) {
            link.textContent = currentLang === 'en' ? enText : faText;
        }
    });
    
    // Update all elements with data-en and data-fa attributes
    const translatableElements = document.querySelectorAll('[data-en][data-fa]');
    translatableElements.forEach(element => {
        const enText = element.getAttribute('data-en');
        const faText = element.getAttribute('data-fa');
        if (enText && faText) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = currentLang === 'en' ? enText : faText;
            } else if (element.tagName === 'BUTTON') {
                element.textContent = currentLang === 'en' ? enText : faText;
            } else {
                let text = currentLang === 'en' ? enText : faText;
                // Handle bold formatting in text
                text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                element.innerHTML = text;
            }
        }
    });
}

function saveLanguagePreference() {
    localStorage.setItem('preferredLanguage', currentLang);
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        updateLanguage();
    }
}

// Modal functions
function openModal() {
    if (mediaModal) {
        mediaModal.style.display = 'block';
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('mediaDate').value = today;
    }
}

function closeModalHandler() {
    if (mediaModal) {
        mediaModal.style.display = 'none';
        mediaForm.reset();
    }
}

// Publications modal functions
function openPublicationModal() {
    if (publicationModal) {
        publicationModal.style.display = 'block';
        // Set current year as default
        const currentYear = new Date().getFullYear();
        document.getElementById('pubYear').value = currentYear;
    }
}

function closePublicationModal() {
    if (publicationModal) {
        publicationModal.style.display = 'none';
        publicationForm.reset();
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('mediaTitle').value,
        link: document.getElementById('mediaLink').value,
        date: document.getElementById('mediaDate').value,
        description: document.getElementById('mediaDescription').value || ''
    };
    
    addMediaItem(formData);
    saveMediaItems();
    closeModalHandler();
}

// Handle publication form submission
function handlePublicationSubmission(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('pubTitleInput').value,
        authors: document.getElementById('pubAuthors').value,
        journal: document.getElementById('pubJournal').value,
        year: document.getElementById('pubYear').value,
        link: document.getElementById('pubLink').value || '',
        description: document.getElementById('pubDescription').value || ''
    };
    
    addPublicationItem(formData);
    savePublicationItems();
    closePublicationModal();
}

// Add new media item to the grid (timeline format)
function addMediaItem(data) {
    const mediaItem = document.createElement('div');
    mediaItem.className = 'media-item';
    
    const formattedDate = formatDateToMonthYear(data.date);
    
    mediaItem.innerHTML = `
        <div class="media-date-badge">${formattedDate}</div>
        <div class="media-content">
            <p class="media-description"><strong>${escapeHtml(data.title)}</strong> - ${escapeHtml(data.description)}</p>
            <a href="${escapeHtml(data.link)}" class="media-link" target="_blank" rel="noopener noreferrer">View Media</a>
            <button class="delete-btn" onclick="deleteMediaItem(this)">Delete</button>
        </div>
    `;
    
    // Remove sample items if they exist
    const sampleItems = document.querySelectorAll('.sample-item');
    sampleItems.forEach(item => item.remove());
    
    if (mediaGrid) {
        mediaGrid.appendChild(mediaItem);
    }
}

// Format date to MM/YYYY format
function formatDateToMonthYear(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
}

// Add new publication item to the grid (simplified format)
function addPublicationItem(data) {
    const publicationItem = document.createElement('div');
    publicationItem.className = 'publication-item';
    
    // Make author names bold if they contain "Aminimoghaddam"
    const formattedAuthors = data.authors.replace(/(S\.\s*Aminimoghaddam|Soheila\s*Aminimoghaddam|Aminimoghaddam)/gi, '<strong>$1</strong>');
    
    // Create title link if URL provided, otherwise just bold title
    const titleHTML = data.link ? 
        `<a href="${escapeHtml(data.link)}" target="_blank" class="pub-title-link"><strong>${escapeHtml(data.title)}</strong></a>` :
        `<strong>${escapeHtml(data.title)}</strong>`;
    
    publicationItem.innerHTML = `
        <div class="pub-image">
            <img src="pictures/Medical reports.jpg" alt="Publication thumbnail" class="pub-thumbnail" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDEwMCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTMwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjIiIGZpbGw9IiM5Q0EzQUYiLz4KPHJlY3QgeD0iMTAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iMiIgZmlsbD0iIzlDQTNBRiIvPgo8cmVjdCB4PSIxMCIgeT0iMzAiIHdpZHRoPSI3MCIgaGVpZ2h0PSIyIiBmaWxsPSIjOUNBM0FGIi8+CjxyZWN0IHg9IjEwIiB5PSI0MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjIiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'">
        </div>
        <div class="pub-details">
            <p class="pub-citation">${formattedAuthors}, ${titleHTML}, <em>${escapeHtml(data.journal)}</em> ${escapeHtml(data.year)}</p>
            <button class="delete-btn" onclick="deletePublicationItem(this)" style="position: absolute; bottom: 0.5rem; right: 0.5rem; font-size: 0.8rem; padding: 0.2rem 0.5rem;">Delete</button>
        </div>
    `;
    
    // Remove sample items if they exist
    const sampleItems = publicationsGrid?.querySelectorAll('.sample-item');
    sampleItems?.forEach(item => item.remove());
    
    if (publicationsGrid) {
        publicationsGrid.appendChild(publicationItem);
    }
}

// Delete media item
function deleteMediaItem(button) {
    if (confirm('Are you sure you want to delete this media item?')) {
        button.parentElement.remove();
        saveMediaItems();
        
        // Add sample item back if no items exist
        if (mediaGrid && mediaGrid.children.length === 0) {
            addSampleItem();
        }
    }
}

// Delete publication item
function deletePublicationItem(button) {
    if (confirm('Are you sure you want to delete this publication?')) {
        button.parentElement.remove();
        savePublicationItems();
        
        // Add sample item back if no items exist
        if (publicationsGrid && publicationsGrid.children.length === 0) {
            addSamplePublicationItem();
        }
    }
}

// Add sample item
function addSampleItem() {
    const sampleItem = document.createElement('div');
    sampleItem.className = 'media-item sample-item';
    sampleItem.innerHTML = `
        <h3>Sample Media Title</h3>
        <p class="media-date">June 24, 2025</p>
        <a href="#" class="media-link">View Media</a>
        <p class="media-description">This is a sample media item. Click "Add New Media" to add your own.</p>
    `;
    mediaGrid.appendChild(sampleItem);
}

// Add sample publication item
function addSamplePublicationItem() {
    const sampleItem = document.createElement('div');
    sampleItem.className = 'publication-item sample-item';
    sampleItem.innerHTML = `
        <h3>Sample Publication Title</h3>
        <p class="pub-authors">Author Name, Co-Author Name</p>
        <p class="pub-journal">Journal Name, Volume(Issue), Pages</p>
        <p class="pub-date">2025</p>
        <a href="#" class="pub-link">View Publication</a>
        <p class="pub-description">This is a sample publication. Click "Add New Publication" to add your own.</p>
    `;
    publicationsGrid.appendChild(sampleItem);
}

// Save media items to localStorage
function saveMediaItems() {
    const mediaItems = [];
    const items = document.querySelectorAll('.media-item:not(.sample-item)');
    
    items.forEach(item => {
        const title = item.querySelector('h3').textContent;
        const date = item.querySelector('.media-date').textContent;
        const link = item.querySelector('.media-link').href;
        const descriptionEl = item.querySelector('.media-description');
        const description = descriptionEl ? descriptionEl.textContent : '';
        
        mediaItems.push({
            title,
            date: reverseFormatDate(date),
            link,
            description
        });
    });
    
    localStorage.setItem('mediaItems', JSON.stringify(mediaItems));
}

// Save publication items to localStorage
function savePublicationItems() {
    const publicationItems = [];
    const items = publicationsGrid?.querySelectorAll('.publication-item:not(.sample-item)');
    
    items?.forEach(item => {
        const title = item.querySelector('h3').textContent;
        const authors = item.querySelector('.pub-authors').textContent;
        const journal = item.querySelector('.pub-journal').textContent;
        const year = item.querySelector('.pub-date').textContent;
        const linkEl = item.querySelector('.pub-link');
        const link = linkEl ? linkEl.href : '';
        const descriptionEl = item.querySelector('.pub-description');
        const description = descriptionEl ? descriptionEl.textContent : '';
        
        publicationItems.push({
            title,
            authors,
            journal,
            year,
            link,
            description
        });
    });
    
    localStorage.setItem('publicationItems', JSON.stringify(publicationItems));
}

// Load media items from localStorage
function loadMediaItems() {
    const savedItems = localStorage.getItem('mediaItems');
    if (savedItems && mediaGrid) {
        const items = JSON.parse(savedItems);
        
        // Remove sample item
        const sampleItem = document.querySelector('.sample-item');
        if (sampleItem) {
            sampleItem.remove();
        }
        
        items.forEach(item => {
            addMediaItem(item);
        });
        
        // Add sample item back if no saved items
        if (items.length === 0) {
            addSampleItem();
        }
    }
}

// Load publication items from localStorage
function loadPublicationItems() {
    const savedItems = localStorage.getItem('publicationItems');
    if (savedItems && publicationsGrid) {
        const items = JSON.parse(savedItems);
        
        // Remove sample item
        const sampleItem = publicationsGrid.querySelector('.sample-item');
        if (sampleItem) {
            sampleItem.remove();
        }
        
        items.forEach(item => {
            addPublicationItem(item);
        });
        
        // Add sample item back if no saved items
        if (items.length === 0) {
            addSamplePublicationItem();
        }
    }
}

// Check if profile photo exists
function checkProfilePhoto() {
    if (profilePhoto) {
        profilePhoto.addEventListener('error', function() {
            this.classList.add('missing');
            this.alt = 'Profile photo not found. Please upload your photo to pictures/profile.jpg';
        });
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function reverseFormatDate(formattedDate) {
    // Convert "June 24, 2025" back to "2025-06-24" format
    const date = new Date(formattedDate);
    return date.toISOString().split('T')[0];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add CSS for delete button dynamically
const style = document.createElement('style');
style.textContent = `
    .delete-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        margin-top: 1rem;
        transition: background-color 0.3s ease;
    }
    
    .delete-btn:hover {
        background: #c0392b;
    }
`;
document.head.appendChild(style);
