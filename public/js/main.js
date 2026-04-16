document.addEventListener('DOMContentLoaded', () => {
    const listingsContainer = document.getElementById('listingsContainer');
    const categoryBtns = document.querySelectorAll('.category');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');

    // Toggle User Dropdown
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', () => {
        if (userDropdown) userDropdown.classList.remove('show');
    });

    // Fetch Listings
    const fetchListings = async (query = '') => {
        try {
            listingsContainer.innerHTML = '<div class="loader">Searching for places...</div>';
            let url = `/api/v1/listings${query}`;

            const res = await fetch(url);
            const data = await res.json();

            if (data.status === 'success') {
                renderListings(data.data.listings);
            }
        } catch (err) {
            console.error(err);
            listingsContainer.innerHTML = '<div class="error">Failed to load listings. Please try again.</div>';
        }
    };

    const toggleWishlist = async (e, id) => {
        e.stopPropagation();
        const icon = e.currentTarget.querySelector('i');
        const isWished = icon.classList.contains('fas');
        
        const res = await fetch(`/api/v1/users/wishlist/${id}`, {
            method: isWished ? 'DELETE' : 'POST'
        });
        
        if (res.ok) {
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            icon.style.color = isWished ? 'white' : 'var(--primary-color)';
        } else {
            alert('Please login to save favorites!');
        }
    };

    const renderListings = (listings) => {
        if (listings.length === 0) {
            listingsContainer.innerHTML = '<div class="no-results">No properties found. Try searching for something else.</div>';
            return;
        }

        listingsContainer.innerHTML = listings.map(listing => `
            <div class="card" onclick="window.location.href='property.html?id=${listing._id}'">
                <div class="card-image">
                    <img src="${listing.images[0]}" alt="${listing.title}">
                    <div class="wishlist-btn" onclick="toggleWishlist(event, '${listing._id}')">
                        <i class="far fa-heart"></i>
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-title">
                        <span>${listing.location}</span>
                        <span><i class="fas fa-star"></i> ${listing.ratingsAverage}</span>
                    </div>
                    <p class="card-location">${listing.category}</p>
                    <p class="card-price"><span>$${listing.price}</span> night</p>
                </div>
            </div>
        `).join('');
    };

    // Search Bar logic
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.innerHTML = `
            <input type="text" id="searchInput" placeholder="Search destinations">
            <div class="search-icon" id="searchBtn">
                <i class="fas fa-search"></i>
            </div>
        `;
        
        const searchInput = document.getElementById('searchInput');
        document.getElementById('searchBtn').addEventListener('click', () => {
            const val = searchInput.value;
            fetchListings(val ? `?location[regex]=${val}&location[options]=i` : '');
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const val = searchInput.value;
                fetchListings(val ? `?location[regex]=${val}&location[options]=i` : '');
            }
        });
    }

    // Category Filter Click
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.category;
            fetchListings(cat && cat !== 'All' ? `?category=${cat}` : '');
        });
    });

    window.toggleWishlist = toggleWishlist; // Make it global for onclick

    // Initial Load
    fetchListings();
});
