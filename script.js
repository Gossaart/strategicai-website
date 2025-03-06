document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const leadershipAwarenessSlider = document.getElementById('leadershipAwareness');
    const leadershipAwarenessValue = document.getElementById('leadershipAwarenessValue');
    const adoptionLevelSlider = document.getElementById('adoptionLevel');
    const adoptionLevelValue = document.getElementById('adoptionLevelValue');
    
    // Update slider values in real-time
    leadershipAwarenessSlider.addEventListener('input', function() {
        leadershipAwarenessValue.textContent = this.value;
    });
    
    adoptionLevelSlider.addEventListener('input', function() {
        adoptionLevelValue.textContent = this.value;
    });
    
    // Form submission
    const form = document.getElementById('questionnaireForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Collect form data
        const formData = new FormData(form);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            // Handle checkbox groups
            if (key === 'currentTools' || key === 'priorities' || key === 'challenges') {
                if (!formDataObj[key]) {
                    formDataObj[key] = [];
                }
                formDataObj[key].push(value);
            } else {
                formDataObj[key] = value;
            }
        });
        
        // Add slider values
        formDataObj.leadershipAwareness = leadershipAwarenessSlider.value;
        formDataObj.adoptionLevel = adoptionLevelSlider.value;
        
        // Here you would typically send the data to your server
        console.log('Form data:', formDataObj);
        
        // In a real implementation, you would use fetch or XMLHttpRequest to send data:
        /*
        fetch('https://strategicai.nl/api/submit-assessment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            showThankYouMessage();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again.');
        });
        */
        
        // For now, just show the thank you message
        showThankYouMessage();
    });
    
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const company = document.getElementById('company').value.trim();
        const title = document.getElementById('title').value.trim();
        
        if (name === '') {
            alert('Please enter your name');
            return false;
        }
        
        if (title === '') {
            alert('Please enter your job title');
            return false;
        }
        
        if (company === '') {
            alert('Please enter your company name');
            return false;
        }
        
        if (email === '') {
            alert('Please enter your email');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function showThankYouMessage() {
        form.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
    }
    
    // Restart button
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', function() {
        form.reset();
        leadershipAwarenessValue.textContent = '5';
        adoptionLevelValue.textContent = '10';
        thankYouMessage.classList.add('hidden');
        form.classList.remove('hidden');
    });
});