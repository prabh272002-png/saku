// ==================== CRITICAL: CHECK SUPABASE LOADED ====================
// Wait for page to fully load before checking
window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.supabase === 'undefined') {
        alert('Failed to load cloud storage. Please refresh the page or check your internet connection.');
        console.error('CRITICAL: Supabase SDK failed to load from CDN');
    }
});

// ==================== SUPABASE CONFIG ====================
const SUPABASE_URL = 'https://ybkvwyjqxkrgyjdrggul.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rB1fH5rwpBRahXQK24A2-w_NjiV0Wfx';

const supabase = window.supabase?.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BUCKET_NAME = 'photos';
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

// ==================== AUTH SYSTEM ====================
const authQuestions = [
    { question: "Who is the prettiest boy ever?", answer: "prabh" },
    { question: "Who came on his tits?", answer: "prabh" },
    { question: "Who is your baby?", answer: "prabh" }
];

// Get a random question
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * authQuestions.length);
    return authQuestions[randomIndex];
}

// Set up auth page
const currentQuestion = getRandomQuestion();
document.querySelector('.auth-question').textContent = currentQuestion.question;

// Login functionality
document.getElementById('loginBtn').addEventListener('click', handleLogin);
document.getElementById('passwordInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleLogin();
    }
});

function handleLogin() {
    const input = document.getElementById('passwordInput').value.trim().toLowerCase();
    const errorElement = document.getElementById('authError');
    
    if (input === currentQuestion.answer.toLowerCase()) {
        // Correct password
        document.getElementById('authContainer').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('authContainer').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
            setTimeout(() => {
                document.getElementById('mainContent').style.opacity = '1';
            }, 50);
        }, 500);
    } else {
        // Wrong password
        errorElement.textContent = 'Wrong answer! Try again 😏';
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
        
        // Clear error after 3 seconds
        setTimeout(() => {
            errorElement.textContent = '';
        }, 3000);
    }
}

// ==================== BACKGROUND ANIMATION ====================
let spawnInterval;
const THEMES = ['panipuri', 'memes', 'hearts'];
let currentThemeIndex = 0;
const THEME_DURATIONS = {
    'panipuri': 8000,
    'memes': 20000,
    'hearts': 8000
};

const memeImages = [
    'assets/backgrounds/shampi.jpg',
    'assets/backgrounds/tiger.jpg',
    'assets/backgrounds/sparrow.jpg',
    'assets/backgrounds/singh.jpg',
    'assets/backgrounds/ghee.jpg',
    'assets/backgrounds/underworld.jpg',
    'assets/backgrounds/salu.jpg',
    'assets/backgrounds/hakla.jpg',
    'assets/backgrounds/alakh.jpg'
];

const backgroundContainer = document.getElementById('backgroundContainer');

function clearBackground() {
    backgroundContainer.innerHTML = '';
    if (spawnInterval) {
        clearInterval(spawnInterval);
    }
}

function createElement(type) {
    const element = document.createElement('div');
    element.className = `floating-element ${type}`;
    element.style.position = 'absolute';
    element.style.bottom = '-100px';
    
    const screenWidth = window.innerWidth;
    const centerStart = screenWidth * 0.25;
    const centerEnd = screenWidth * 0.75;
    
    let randomX;
    if (Math.random() > 0.5) {
        randomX = Math.random() * centerStart;
    } else {
        randomX = centerEnd + Math.random() * (screenWidth - centerEnd);
    }
    
    element.style.left = randomX + 'px';
    
    const duration = 7 + Math.random() * 3;
    element.style.animation = `floatUpSway ${duration}s ease-in-out forwards`;
    
    switch(type) {
        case 'heart':
            const chaddhiImages = [
                'assets/backgrounds/chaddhi.jpg',
                'assets/backgrounds/baigan.jpg',
                'assets/backgrounds/peach.jpg',
                'assets/backgrounds/wet.jpg'
            ];
            
            const randomChaddhi = chaddhiImages[Math.floor(Math.random() * chaddhiImages.length)];
            
            const chaddhiImg = document.createElement('img');
            chaddhiImg.src = randomChaddhi;
            chaddhiImg.alt = 'Chaddhi';
            // Handle image load errors
            chaddhiImg.onerror = function() {
                console.warn(`Failed to load image: ${this.src}`);
                this.style.display = 'none';
            };
            element.appendChild(chaddhiImg);
            element.style.width = (90 + Math.random() * 50) + 'px';
            break;
            
        case 'panipuri':
            const veggies = [
                'assets/backgrounds/broccoli.jpg',
                'assets/backgrounds/tomato.jpg',
                'assets/backgrounds/okra.jpg',
                'assets/backgrounds/lemon.jpg',
                'assets/backgrounds/tofu.jpg',
                'assets/backgrounds/carrot.jpg',
                'assets/backgrounds/cucumber.jpg'
            ];
            
            const randomVeggie = veggies[Math.floor(Math.random() * veggies.length)];
            
            const veggieImg = document.createElement('img');
            veggieImg.src = randomVeggie;
            veggieImg.alt = 'Veggie';
            // Handle image load errors
            veggieImg.onerror = function() {
                console.warn(`Failed to load image: ${this.src}`);
                this.style.display = 'none';
            };
            element.appendChild(veggieImg);
            element.style.width = (90 + Math.random() * 50) + 'px';
            break;
            
        case 'meme':
            const memeImg = document.createElement('img');
            const randomMeme = memeImages[Math.floor(Math.random() * memeImages.length)];
            memeImg.src = randomMeme;
            memeImg.alt = 'Meme';
            // Handle image load errors
            memeImg.onerror = function() {
                console.warn(`Failed to load image: ${this.src}`);
                this.style.display = 'none';
            };
            element.appendChild(memeImg);
            element.style.width = (100 + Math.random() * 40) + 'px';
            break;
    }
    
    return element;
}

function spawnElement(type) {
    const element = createElement(type);
    backgroundContainer.appendChild(element);
    
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, 11000);
}

function startSpawning(type) {
    clearBackground();
    spawnElement(type);
    
    spawnInterval = setInterval(() => {
        spawnElement(type);
    }, 400);
}

function cycleTheme() {
    const nextTheme = THEMES[currentThemeIndex];
    
    backgroundContainer.style.opacity = '0';
    
    setTimeout(() => {
        const titleElement = document.querySelector('.timer-card h1');
        
        if (nextTheme === 'panipuri') {
            startSpawning('panipuri');
            titleElement.textContent = 'Days Until I Eat Sabzi Again 🥦';
        } else if (nextTheme === 'memes') {
            startSpawning('meme');
            titleElement.innerHTML = 'Days Until You Watch Reels On My Phone Again <img src="assets/backgrounds/hakla.jpg" class="title-emoji" alt="hakla">';
        } else if (nextTheme === 'hearts') {
            startSpawning('heart');
            titleElement.innerHTML = 'Days Until Kacchi Geeli Again <img src="assets/backgrounds/chaddhi.jpg" class="title-emoji" alt="chaddhi">';
        }
        
        backgroundContainer.style.opacity = '1';
    }, 1000);
}

backgroundContainer.style.transition = 'opacity 1s ease-in-out';
backgroundContainer.style.opacity = '1';

document.querySelector('.timer-card h1').textContent = 'Days Until I Eat Sabzi Again 🥦';

startSpawning('panipuri');

function scheduleNextTheme() {
    const currentTheme = THEMES[currentThemeIndex];
    const duration = THEME_DURATIONS[currentTheme];
    
    setTimeout(() => {
        currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
        cycleTheme();
        scheduleNextTheme();
    }, duration);
}

scheduleNextTheme();

// ==================== COUNTDOWN TIMER ====================
const targetDate = new Date('January 29, 2026 02:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ==================== SUPABASE PHOTO SLIDER ====================
let photos = [];
let currentPhotoIndex = 0;

// Load photos from Supabase on page load
async function loadPhotosFromSupabase() {
    // Safety check
    if (!supabase) {
        console.error('Supabase client not initialized');
        return;
    }

    try {
        const { data, error } = await supabase
            .storage
            .from(BUCKET_NAME)
            .list('', {
                limit: 1000,
                sortBy: { column: 'created_at', order: 'desc' }
            });
        
        if (error) {
            console.error('Error loading photos:', error);
            // Don't show alert for empty bucket - that's expected initially
            if (error.message && !error.message.includes('not found')) {
                console.warn('Photo loading issue:', error.message);
            }
            return;
        }
        
        photos = data
            .filter(file => file.name !== '.emptyFolderPlaceholder')
            .map(file => {
                const { data: urlData } = supabase.storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(file.name);
                
                return {
                    name: file.name,
                    url: urlData.publicUrl,
                    createdAt: file.created_at
                };
            });
        
        currentPhotoIndex = 0;
        updateSlider();
    } catch (error) {
        console.error('Unexpected error loading photos:', error);
    }
}

function updateSlider() {
    const sliderImage = document.getElementById('sliderImage');
    const imageCounter = document.getElementById('imageCounter');
    const deleteBtn = document.getElementById('deleteBtn');
    const emptyState = document.getElementById('emptyState');
    
    if (photos.length > 0) {
        sliderImage.src = photos[currentPhotoIndex].url;
        sliderImage.style.display = 'block';
        imageCounter.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
        deleteBtn.style.display = 'flex';
        emptyState.classList.remove('visible');
        
        // Handle image load errors
        sliderImage.onerror = function() {
            console.error(`Failed to load photo: ${this.src}`);
            this.alt = 'Failed to load image';
        };
    } else {
        sliderImage.src = '';
        sliderImage.style.display = 'none';
        imageCounter.textContent = 'No photos yet';
        deleteBtn.style.display = 'none';
        emptyState.classList.add('visible');
    }
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (photos.length > 0) {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updateSlider();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (photos.length > 0) {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateSlider();
    }
});

document.getElementById('uploadBtn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const uploadBtn = document.getElementById('uploadBtn');
    const imageCounter = document.getElementById('imageCounter');
    
    uploadBtn.classList.add('uploading');
    
    if (file) {
        // CRITICAL: File size validation
        if (file.size > MAX_FILE_SIZE) {
            alert('File too large! Please choose an image under 50MB.');
            uploadBtn.classList.remove('uploading');
            e.target.value = '';
            return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPEG, PNG, GIF, etc.)');
            uploadBtn.classList.remove('uploading');
            e.target.value = '';
            return;
        }
        
        // Safety check
        if (!supabase) {
            alert('Cloud storage unavailable. Please refresh the page.');
            uploadBtn.classList.remove('uploading');
            e.target.value = '';
            return;
        }
        
        try {
            imageCounter.textContent = 'Uploading...';
            
            // Create unique filename
            const timestamp = Date.now();
            const fileExt = file.name.split('.').pop();
            const fileName = `photo_${timestamp}.${fileExt}`;
            
            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (error) {
                throw error;
            }
            
            // Get public URL
            const { data: urlData } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(fileName);
            
            // Add to local array
            photos.unshift({
                name: fileName,
                url: urlData.publicUrl,
                createdAt: new Date()
            });
            
            currentPhotoIndex = 0;
            updateSlider();
            
            setTimeout(() => {
                uploadBtn.classList.remove('uploading');
            }, 300);
            
        } catch (error) {
            console.error('Error uploading photo:', error);
            
            // Better error messages
            let errorMessage = 'Failed to upload photo. ';
            if (error.message) {
                if (error.message.includes('exceeded')) {
                    errorMessage += 'Storage limit reached.';
                } else if (error.message.includes('network')) {
                    errorMessage += 'Check your internet connection.';
                } else {
                    errorMessage += 'Please try again.';
                }
            } else {
                errorMessage += 'Please try again.';
            }
            
            alert(errorMessage);
            uploadBtn.classList.remove('uploading');
            updateSlider();
        }
    } else {
        setTimeout(() => {
            uploadBtn.classList.remove('uploading');
        }, 300);
    }
    
    e.target.value = '';
});

// Delete photo functionality
document.getElementById('deleteBtn').addEventListener('click', async () => {
    if (photos.length > 0) {
        if (confirm('Delete this photo?')) {
            // Safety check
            if (!supabase) {
                alert('Cloud storage unavailable. Please refresh the page.');
                return;
            }
            
            try {
                const photoToDelete = photos[currentPhotoIndex];
                
                // Delete from Supabase Storage
                const { error } = await supabase.storage
                    .from(BUCKET_NAME)
                    .remove([photoToDelete.name]);
                
                if (error) {
                    throw error;
                }
                
                // Remove from local array
                photos.splice(currentPhotoIndex, 1);
                
                // Adjust current index
                if (currentPhotoIndex >= photos.length && photos.length > 0) {
                    currentPhotoIndex = photos.length - 1;
                } else if (photos.length === 0) {
                    currentPhotoIndex = 0;
                }
                
                updateSlider();
                
            } catch (error) {
                console.error('Error deleting photo:', error);
                alert('Failed to delete photo. Please try again.');
            }
        }
    }
});

// Load photos when page loads
loadPhotosFromSupabase();

// ==================== QUOTES ROTATION ====================
const quotes = [
    "You are really beautiful",
    "Can't wait to see you laugh when I come on my tits again",
    "I am probably thinking about you rn",
    "I adore you a lot",
    "To tell me that you like me",
    "You are my golu"
];

let currentQuoteIndex = 0;

function updateQuote() {
    const quoteElement = document.getElementById('currentQuote');
    if (quoteElement) {
        quoteElement.textContent = quotes[currentQuoteIndex];
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }
}

updateQuote();
setInterval(updateQuote, 5000);