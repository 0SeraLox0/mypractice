/**
 * MusikZone — Основное интерактивное веб-приложение
 * Каталог музыкальных альбомов, рейтинги, рецензии и подборки «Лучшее за год»
 */

document.addEventListener('DOMContentLoaded', () => {
    // Текущее состояние приложения
    const state = {
        currentScreen: 'home',
        selectedAlbumId: 'ram-daftpunk',
        selectedBestYear: '2026',
        searchQuery: '',
        activeGenre: 'all',
        minRating: 0,
        sortOption: 'rating-desc',
        catalogViewMode: 'grid', // 'grid' | 'list'
        isPlaying: false,
        currentTrack: {
            title: 'Instant Crush (feat. Julian Casablancas)',
            artist: 'Daft Punk',
            albumId: 'ram-daftpunk',
            duration: '5:37'
        },
        newReviewRating: 10,
        prosTags: ['Идеальный аналоговый мастеринг', 'Звездный состав'],
        consTags: ['Требует внимательного прослушивания']
    };

    // Кэш элементов DOM
    const elements = {
        screens: document.querySelectorAll('.screen-view'),
        navLinks: document.querySelectorAll('[data-screen]'),
        mobileNavLinks: document.querySelectorAll('.mobile-nav-item'),
        
        // Элементы каталога
        catalogSearchInput: document.getElementById('catalogSearchInput'),
        genreChipsContainer: document.getElementById('genreChipsContainer'),
        sortSelect: document.getElementById('catalogSortSelect'),
        ratingFilterSelect: document.getElementById('ratingFilterSelect'),
        albumsGrid: document.getElementById('albumsGridContainer'),
        resultsCounter: document.getElementById('catalogResultsCount'),
        viewGridBtn: document.getElementById('viewGridBtn'),
        viewListBtn: document.getElementById('viewListBtn'),
        
        // Элементы главной страницы
        homeFeaturedGrid: document.getElementById('homeFeaturedGrid'),
        homeGenresScroll: document.getElementById('homeGenresScroll'),
        homeRecentReviewsGrid: document.getElementById('homeRecentReviewsGrid'),
        
        // Элементы детальной страницы альбома
        detailContainer: document.getElementById('albumDetailContent'),
        
        // Элементы формы добавления рецензии
        reviewForm: document.getElementById('albumReviewForm'),
        formAlbumSelect: document.getElementById('formAlbumSelect'),
        formRatingSelector: document.getElementById('formRatingSelector'),
        formRatingBadge: document.getElementById('formRatingBadge'),
        formRatingVerdict: document.getElementById('formRatingVerdict'),
        prosTagsBox: document.getElementById('prosTagsContainer'),
        consTagsBox: document.getElementById('consTagsContainer'),
        toastNotification: document.getElementById('toastNotification'),
        
        // Элементы подборки года
        yearTabsContainer: document.getElementById('yearTabsContainer'),
        bestOfYearPodium: document.getElementById('bestOfYearPodium'),
        
        // Элементы аудиоплеера
        playerTrackTitle: document.getElementById('playerTrackTitle'),
        playerTrackArtist: document.getElementById('playerTrackArtist'),
        playerThumb: document.getElementById('playerThumb'),
        playerPlayBtn: document.getElementById('playerPlayBtn'),
        playerProgressBar: document.getElementById('playerProgressBar')
    };

    // =========================================================================
    // 1. НАВИГАЦИЯ МЕЖДУ ЭКРАНАМИ (Screen Routing)
    // =========================================================================
    function navigateToScreen(screenId, albumId = null) {
        if (albumId) {
            state.selectedAlbumId = albumId;
        }

        state.currentScreen = screenId;

        // Переключение экранов
        elements.screens.forEach(screen => {
            if (screen.id === `screen-${screenId}`) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });

        // Обновление состояния ссылок и кнопок
        elements.navLinks.forEach(link => {
            if (link.dataset.screen === screenId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        elements.mobileNavLinks.forEach(link => {
            if (link.dataset.screen === screenId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Специфический рендер экрана
        if (screenId === 'home') {
            renderHomeScreen();
        } else if (screenId === 'catalog') {
            renderCatalog();
        } else if (screenId === 'album-detail') {
            renderAlbumDetail(state.selectedAlbumId);
        } else if (screenId === 'review-form') {
            prepareReviewForm(state.selectedAlbumId);
        } else if (screenId === 'best-of-year') {
            renderBestOfYear(state.selectedBestYear);
        }

        // Плавный скролл страницы наверх
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Экспорт в глобальную область видимости
    window.navigateToScreen = navigateToScreen;

    // Навешивание кликов по навигационным элементам
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreen = link.dataset.screen;
            if (targetScreen) navigateToScreen(targetScreen);
        });
    });

    elements.mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreen = link.dataset.screen;
            if (targetScreen) navigateToScreen(targetScreen);
        });
    });

    // =========================================================================
    // 2. ГЕНЕРАЦИЯ КАРТОЧЕК АЛЬБОМА (Semantic HTML Article)
    // =========================================================================
    function createAlbumCardHTML(album, isListView = false) {
        if (isListView) {
            return `
                <article class="album-card-list-view" data-album-id="${album.id}">
                    <img src="${album.coverImage}" alt="Обложка альбома ${album.title} — ${album.artist}" class="album-list-thumb" loading="lazy">
                    <div class="album-list-details">
                        <h3 class="album-title">${album.title}</h3>
                        <div class="album-artist">${album.artist} • ${album.year}</div>
                        <span class="badge badge-primary" style="margin-top: 6px;">${album.genre}</span>
                    </div>
                    <div class="album-list-stats">
                        <div class="album-rating-badge" style="position: static;">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <span>${album.rating.toFixed(1)}</span>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline quick-open-btn" data-album-id="${album.id}">Обзор</button>
                    </div>
                </article>
            `;
        }

        return `
            <article class="album-card" data-album-id="${album.id}">
                <div class="album-cover-wrapper">
                    <div class="vinyl-disc" aria-hidden="true">
                        <div class="vinyl-disc-grooves">
                            <div class="vinyl-disc-center"></div>
                        </div>
                    </div>
                    <img src="${album.coverImage}" alt="Обложка альбома ${album.title} — ${album.artist}" class="album-cover-img" loading="lazy">
                    <div class="album-rating-badge">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        <span>${album.rating.toFixed(1)}</span>
                    </div>
                    <button type="button" class="album-quick-play-btn" data-play-album="${album.id}" title="Слушать превью трека" aria-label="Слушать превью альбома ${album.title}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                </div>
                <div class="album-info">
                    <h3 class="album-title" title="${album.title}">${album.title}</h3>
                    <div class="album-artist">${album.artist}</div>
                    <div class="album-meta-row">
                        <span class="album-meta-genre">${album.genre}</span>
                        <span>${album.year} г.</span>
                    </div>
                </div>
            </article>
        `;
    }

    // =========================================================================
    // 3. ЭКРАН 1: ГЛАВНАЯ (Home Page)
    // =========================================================================
    function renderHomeScreen() {
        if (!elements.homeFeaturedGrid) return;

        // Жанры для быстрого перехода
        if (elements.homeGenresScroll) {
            elements.homeGenresScroll.innerHTML = MUSIC_DATA.genres.filter(g => g.id !== 'all').map(g => `
                <div class="genre-pill-card" data-genre-filter="${g.id}" role="button" tabindex="0">
                    <div class="genre-pill-icon" style="background: ${g.color};">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </div>
                    <div>
                        <div style="font-weight: 700; font-size: 14px;">${g.name}</div>
                        <div style="font-size: 11px; color: var(--color-text-tertiary);">${g.count} альбома</div>
                    </div>
                </div>
            `).join('');

            // Клик по жанру
            elements.homeGenresScroll.querySelectorAll('[data-genre-filter]').forEach(chip => {
                chip.addEventListener('click', () => {
                    state.activeGenre = chip.dataset.genreFilter;
                    navigateToScreen('catalog');
                });
            });
        }

        // Популярные альбомы (топ 6)
        const topAlbums = [...MUSIC_DATA.albums].sort((a, b) => b.rating - a.rating).slice(0, 6);
        elements.homeFeaturedGrid.innerHTML = topAlbums.map(album => createAlbumCardHTML(album)).join('');

        // Свежие рецензии сообщества
        if (elements.homeRecentReviewsGrid) {
            const allReviews = [];
            MUSIC_DATA.albums.forEach(album => {
                album.reviews.forEach(rev => {
                    allReviews.push({ ...rev, albumTitle: album.title, albumArtist: album.artist, albumId: album.id });
                });
            });

            elements.homeRecentReviewsGrid.innerHTML = allReviews.slice(0, 3).map(rev => `
                <article class="review-card" data-album-id="${rev.albumId}">
                    <header class="review-header">
                        <div class="reviewer-meta">
                            <img src="${rev.avatar}" alt="Аватар автора ${rev.author}" class="reviewer-avatar">
                            <div>
                                <div class="reviewer-name">${rev.author}</div>
                                <div class="reviewer-role">${rev.role}</div>
                            </div>
                        </div>
                        <div class="review-score-badge">
                            ★ ${rev.rating}/10
                        </div>
                    </header>
                    <div style="font-size: 12px; color: #a5b4fc; font-weight: 600;">
                        Альбом: ${rev.albumArtist} — «${rev.albumTitle}»
                    </div>
                    <h3 class="review-title">«${rev.title}»</h3>
                    <p class="review-text">${rev.text}</p>
                    <footer class="review-footer">
                        <time datetime="2026-03-01">${rev.date}</time>
                        <button type="button" class="review-like-btn" onclick="event.stopPropagation();">
                            ❤️ <span>${rev.likes}</span>
                        </button>
                    </footer>
                </article>
            `).join('');
        }

        bindCardClickEvents(elements.homeFeaturedGrid);
        bindCardClickEvents(elements.homeRecentReviewsGrid);

        // Обработка клика по промо-карточке в Hero
        const spotCard = document.querySelector('.hero-spotlight-card');
        if (spotCard) {
            spotCard.onclick = () => {
                const id = spotCard.dataset.albumId;
                if (id) navigateToScreen('album-detail', id);
            };
        }
    }

    // =========================================================================
    // 4. ЭКРАН 2: КАТАЛОГ И ФИЛЬТРЫ (Catalog Page)
    // =========================================================================
    function renderGenreFilterChips() {
        if (!elements.genreChipsContainer) return;
        elements.genreChipsContainer.innerHTML = MUSIC_DATA.genres.map(genre => `
            <button type="button" class="filter-chip ${state.activeGenre === genre.id ? 'active' : ''}" data-genre-id="${genre.id}">
                ${genre.name}
            </button>
        `).join('');

        elements.genreChipsContainer.querySelectorAll('.filter-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                state.activeGenre = btn.dataset.genreId;
                renderGenreFilterChips();
                filterAndRenderAlbums();
            });
        });
    }

    function filterAndRenderAlbums() {
        let filtered = [...MUSIC_DATA.albums];

        // 1. Поиск по строке (название, артист, стиль)
        if (state.searchQuery.trim() !== '') {
            const q = state.searchQuery.toLowerCase();
            filtered = filtered.filter(a =>
                a.title.toLowerCase().includes(q) ||
                a.artist.toLowerCase().includes(q) ||
                a.genre.toLowerCase().includes(q)
            );
        }

        // 2. Жанровый фильтр
        if (state.activeGenre !== 'all') {
            const targetGenreName = MUSIC_DATA.genres.find(g => g.id === state.activeGenre)?.name;
            if (targetGenreName) {
                filtered = filtered.filter(a => a.genre === targetGenreName);
            }
        }

        // 3. Минимальный рейтинг
        if (state.minRating > 0) {
            filtered = filtered.filter(a => a.rating >= state.minRating);
        }

        // 4. Сортировка
        if (state.sortOption === 'rating-desc') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (state.sortOption === 'rating-asc') {
            filtered.sort((a, b) => a.rating - b.rating);
        } else if (state.sortOption === 'year-desc') {
            filtered.sort((a, b) => b.year - a.year);
        } else if (state.sortOption === 'reviews-count') {
            filtered.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));
        }

        // Обновление счетчика
        if (elements.resultsCounter) {
            elements.resultsCounter.textContent = `Найдено альбомов: ${filtered.length}`;
        }

        // Рендер
        if (filtered.length === 0) {
            elements.albumsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--color-text-tertiary);">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; opacity: 0.5;" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <h3>Альбомы не найдены</h3>
                    <p style="font-size: 14px; margin-top: 6px;">Попробуйте смягчить условия поиска или изменить фильтры.</p>
                </div>
            `;
            return;
        }

        const isListView = state.catalogViewMode === 'list';
        elements.albumsGrid.className = isListView ? 'album-list-container' : 'album-grid';
        elements.albumsGrid.style.display = isListView ? 'flex' : 'grid';
        elements.albumsGrid.style.flexDirection = isListView ? 'column' : '';
        elements.albumsGrid.style.gap = isListView ? '12px' : '24px';

        elements.albumsGrid.innerHTML = filtered.map(album => createAlbumCardHTML(album, isListView)).join('');
        bindCardClickEvents(elements.albumsGrid);
    }

    function renderCatalog() {
        renderGenreFilterChips();
        filterAndRenderAlbums();
    }

    // Слушатели фильтров каталога
    if (elements.catalogSearchInput) {
        elements.catalogSearchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            filterAndRenderAlbums();
        });
    }

    if (elements.sortSelect) {
        elements.sortSelect.addEventListener('change', (e) => {
            state.sortOption = e.target.value;
            filterAndRenderAlbums();
        });
    }

    if (elements.ratingFilterSelect) {
        elements.ratingFilterSelect.addEventListener('change', (e) => {
            state.minRating = parseFloat(e.target.value) || 0;
            filterAndRenderAlbums();
        });
    }

    if (elements.viewGridBtn && elements.viewListBtn) {
        elements.viewGridBtn.addEventListener('click', () => {
            state.catalogViewMode = 'grid';
            elements.viewGridBtn.classList.add('active');
            elements.viewListBtn.classList.remove('active');
            filterAndRenderAlbums();
        });

        elements.viewListBtn.addEventListener('click', () => {
            state.catalogViewMode = 'list';
            elements.viewListBtn.classList.add('active');
            elements.viewGridBtn.classList.remove('active');
            filterAndRenderAlbums();
        });
    }

    // =========================================================================
    // 5. ЭКРАН 3: ДЕТАЛЬНАЯ СТРАНИЦА АЛЬБОМА (Album Details)
    // =========================================================================
    function renderAlbumDetail(albumId) {
        const album = MUSIC_DATA.albums.find(a => a.id === albumId) || MUSIC_DATA.albums[0];
        if (!elements.detailContainer) return;

        elements.detailContainer.innerHTML = `
            <div class="album-detail-hero">
                <div class="album-detail-cover-container">
                    <img src="${album.coverImage}" alt="Обложка альбома ${album.title} — ${album.artist}" class="album-detail-cover">
                    <div class="vinyl-disc" style="top: 10px; right: 10px; z-index: 1;" aria-hidden="true">
                        <div class="vinyl-disc-grooves">
                            <div class="vinyl-disc-center"></div>
                        </div>
                    </div>
                </div>

                <div class="album-detail-meta">
                    <nav class="album-detail-breadcrumbs" aria-label="Хлебные крошки">
                        <span class="breadcrumb-link" data-go-screen="home" style="cursor: pointer; text-decoration: underline;">Главная</span>
                        <span>/</span>
                        <span class="breadcrumb-link" data-go-screen="catalog" style="cursor: pointer; text-decoration: underline;">Каталог</span>
                        <span>/</span>
                        <span style="color: var(--color-primary);">${album.genre}</span>
                    </nav>

                    <h1 class="album-detail-title">${album.title}</h1>
                    <div class="album-detail-artist">Исполнитель: <span style="color: var(--color-text-primary);">${album.artist}</span></div>

                    <div class="album-meta-specs-grid">
                        <div class="spec-item">
                            <span class="spec-label">Год релиза</span>
                            <span class="spec-val">${album.year}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Жанр</span>
                            <span class="spec-val">${album.genre}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Длительность</span>
                            <span class="spec-val">${album.duration}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Лейбл</span>
                            <span class="spec-val">${album.label}</span>
                        </div>
                    </div>

                    <div class="rating-scores-summary">
                        <div class="main-score-box">
                            <div class="main-score-number">${album.rating.toFixed(1)}</div>
                            <div>
                                <div style="font-weight: 700; font-size: 13px; color: var(--color-rating-gold);">Общий рейтинг</div>
                                <div style="font-size: 11px; color: var(--color-text-tertiary);">${album.ratingsCount} голосов</div>
                            </div>
                        </div>

                        <div class="score-breakdown-mini">
                            <div>
                                <div style="color: var(--color-text-tertiary);">Критики</div>
                                <strong>${album.criticsScore}/100</strong>
                            </div>
                            <div>
                                <div style="color: var(--color-text-tertiary);">Слушатели</div>
                                <strong>${album.userScore}/10</strong>
                            </div>
                            <div>
                                <div style="color: var(--color-text-tertiary);">Рецензий</div>
                                <strong>${album.reviews.length}</strong>
                            </div>
                        </div>
                    </div>

                    <div class="hero-actions-row">
                        <button type="button" class="btn btn-primary" id="detailAddReviewBtn" data-album-id="${album.id}">
                            ✍️ Написать рецензию
                        </button>
                        <button type="button" class="btn btn-secondary" id="detailPlayFirstTrackBtn">
                            ▶ Слушать альбом
                        </button>
                        <button type="button" class="btn btn-outline btn-icon-only" title="В закладки" aria-label="Добавить в закладки" onclick="this.style.color='#ec4899';">
                            ♥
                        </button>
                    </div>
                </div>
            </div>

            <!-- Описание релиза -->
            <article style="background: var(--color-bg-card); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 28px; margin-bottom: 32px;">
                <h2 style="font-size: 18px; margin-bottom: 12px; font-weight: 700;">Об альбоме</h2>
                <p style="color: var(--color-text-secondary); line-height: 1.7; font-size: 15px;">${album.description}</p>
                <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
                    ${album.subgenres.map(s => `<span class="badge badge-secondary">#${s}</span>`).join('')}
                </div>
            </article>

            <!-- Треклист -->
            <section class="tracklist-card" aria-label="Треклист альбома">
                <div class="section-header-row" style="margin-bottom: 16px;">
                    <div>
                        <h2 class="section-title">Список композиций</h2>
                        <div class="section-subtitle">${album.tracks.length} треков • Общее время: ${album.duration}</div>
                    </div>
                </div>

                <div class="tracks-container" role="list">
                    ${album.tracks.map(track => `
                        <div class="track-row" data-track-title="${track.title}" data-track-duration="${track.duration}" role="listitem" tabindex="0">
                            <div class="track-number">${track.number}</div>
                            <div class="track-play-icon" aria-hidden="true">▶</div>
                            <div class="track-title">
                                <span>${track.title}</span>
                                ${track.isHit ? '<span class="badge badge-gold" style="font-size: 10px; padding: 2px 6px;">ХИТ</span>' : ''}
                            </div>
                            <div class="track-plays">${track.plays}</div>
                            <div class="track-duration">${track.duration}</div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Рецензии и отзывы сообщества -->
            <section style="margin-bottom: 40px;" aria-label="Рецензии слушателей">
                <div class="section-header-row">
                    <div>
                        <h2 class="section-title">Рецензии сообщества (${album.reviews.length})</h2>
                        <div class="section-subtitle">Мнения критиков и подробные отзывы слушателей</div>
                    </div>
                    <button type="button" class="btn btn-sm btn-primary" onclick="document.getElementById('detailAddReviewBtn').click();">
                        + Добавить отзыв
                    </button>
                </div>

                <div class="review-grid">
                    ${album.reviews.map(rev => `
                        <article class="review-card">
                            <header class="review-header">
                                <div class="reviewer-meta">
                                    <img src="${rev.avatar}" alt="Аватар автора ${rev.author}" class="reviewer-avatar">
                                    <div>
                                        <div class="reviewer-name">${rev.author}</div>
                                        <div class="reviewer-role">${rev.role}</div>
                                    </div>
                                </div>
                                <div class="review-score-badge">
                                    ★ ${rev.rating}/10
                                </div>
                            </header>
                            <h3 class="review-title">«${rev.title}»</h3>
                            <p class="review-text">${rev.text}</p>
                            
                            ${(rev.pros?.length || rev.cons?.length) ? `
                                <div class="review-pros-cons">
                                    ${rev.pros?.map(p => `<div style="font-size: 12px; color: #6ee7b7;">✔ <strong>Плюс:</strong> ${p}</div>`).join('') || ''}
                                    ${rev.cons?.map(c => `<div style="font-size: 12px; color: #fca5a5;">✖ <strong>Минус:</strong> ${c}</div>`).join('') || ''}
                                </div>
                            ` : ''}

                            <footer class="review-footer">
                                <time datetime="2026-03-01">${rev.date}</time>
                                <button type="button" class="review-like-btn" onclick="this.querySelector('span').textContent = parseInt(this.querySelector('span').textContent) + 1;">
                                    ❤️ <span>${rev.likes}</span>
                                </button>
                            </footer>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;

        // Обработчики хлебных крошек
        elements.detailContainer.querySelectorAll('.breadcrumb-link').forEach(link => {
            link.addEventListener('click', () => {
                const target = link.dataset.goScreen;
                if (target) navigateToScreen(target);
            });
        });

        // Обработчик кнопки "Написать рецензию"
        const addRevBtn = elements.detailContainer.querySelector('#detailAddReviewBtn');
        if (addRevBtn) {
            addRevBtn.addEventListener('click', () => {
                navigateToScreen('review-form', album.id);
            });
        }

        // Клик по треку в треклисте для воспроизведения
        elements.detailContainer.querySelectorAll('.track-row').forEach(row => {
            row.addEventListener('click', () => {
                const title = row.dataset.trackTitle;
                const dur = row.dataset.trackDuration;
                playTrack(title, album.artist, album.coverImage, dur);
            });
        });

        // Кнопка слушать первый трек
        const playFirstBtn = elements.detailContainer.querySelector('#detailPlayFirstTrackBtn');
        if (playFirstBtn && album.tracks.length > 0) {
            playFirstBtn.addEventListener('click', () => {
                playTrack(album.tracks[0].title, album.artist, album.coverImage, album.tracks[0].duration);
            });
        }
    }

    // =========================================================================
    // 6. ЭКРАН 4: ФОРМА ДОБАВЛЕНИЯ РЕЦЕНЗИИ (Review Form)
    // =========================================================================
    function prepareReviewForm(preselectedAlbumId) {
        if (!elements.formAlbumSelect) return;

        // Заполнение выпадающего списка альбомов
        elements.formAlbumSelect.innerHTML = MUSIC_DATA.albums.map(a => `
            <option value="${a.id}" ${a.id === preselectedAlbumId ? 'selected' : ''}>
                ${a.artist} — ${a.title} (${a.year})
            </option>
        `).join('');

        renderStarRatingSelector(state.newReviewRating);
        renderTagsUI();
    }

    // Рендер 10-звёздочного селектора оценки
    function renderStarRatingSelector(currentScore) {
        if (!elements.formRatingSelector) return;

        const verdicts = {
            10: 'Безусловный шедевр (10/10)',
            9: 'Превосходный альбом (9/10)',
            8: 'Отличная пластинка (8/10)',
            7: 'Хороший релиз (7/10)',
            6: 'Выше среднего (6/10)',
            5: 'Средний уровень (5/10)',
            4: 'Слабовато (4/10)',
            3: 'Разочарование (3/10)',
            2: 'Плохо (2/10)',
            1: 'Невозможно слушать (1/10)'
        };

        let starsHTML = '';
        for (let i = 1; i <= 10; i++) {
            starsHTML += `
                <button type="button" class="score-star-btn ${i <= currentScore ? 'active' : ''}" data-score="${i}" aria-label="Оценка ${i} из 10">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </button>
            `;
        }

        elements.formRatingSelector.innerHTML = starsHTML;
        if (elements.formRatingBadge) elements.formRatingBadge.textContent = `${currentScore}.0`;
        if (elements.formRatingVerdict) elements.formRatingVerdict.textContent = verdicts[currentScore] || '';

        // Обработка клика и ховера
        elements.formRatingSelector.querySelectorAll('.score-star-btn').forEach(star => {
            star.addEventListener('click', () => {
                state.newReviewRating = parseInt(star.dataset.score);
                renderStarRatingSelector(state.newReviewRating);
            });

            star.addEventListener('mouseenter', () => {
                const hoverScore = parseInt(star.dataset.score);
                elements.formRatingSelector.querySelectorAll('.score-star-btn').forEach(s => {
                    if (parseInt(s.dataset.score) <= hoverScore) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });

            star.addEventListener('mouseleave', () => {
                elements.formRatingSelector.querySelectorAll('.score-star-btn').forEach(s => s.classList.remove('hover'));
            });
        });
    }

    // Теги достоинств и недостатков
    function renderTagsUI() {
        if (elements.prosTagsBox) {
            elements.prosTagsBox.innerHTML = state.prosTags.map((tag, idx) => `
                <span class="tag-pill pro">
                    ${tag}
                    <button type="button" class="tag-remove" data-remove-pro="${idx}" aria-label="Удалить плюс">×</button>
                </span>
            `).join('') + `
                <input type="text" id="newProTagInput" class="tag-quick-input" placeholder="+ Введите достоинство и нажмите Enter">
            `;

            elements.prosTagsBox.querySelectorAll('[data-remove-pro]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.removePro);
                    state.prosTags.splice(idx, 1);
                    renderTagsUI();
                });
            });

            const proInput = document.getElementById('newProTagInput');
            if (proInput) {
                proInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && proInput.value.trim() !== '') {
                        e.preventDefault();
                        state.prosTags.push(proInput.value.trim());
                        renderTagsUI();
                    }
                });
            }
        }

        if (elements.consTagsBox) {
            elements.consTagsBox.innerHTML = state.consTags.map((tag, idx) => `
                <span class="tag-pill con">
                    ${tag}
                    <button type="button" class="tag-remove" data-remove-con="${idx}" aria-label="Удалить минус">×</button>
                </span>
            `).join('') + `
                <input type="text" id="newConTagInput" class="tag-quick-input" placeholder="+ Введите минус и нажмите Enter">
            `;

            elements.consTagsBox.querySelectorAll('[data-remove-con]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.removeCon);
                    state.consTags.splice(idx, 1);
                    renderTagsUI();
                });
            });

            const conInput = document.getElementById('newConTagInput');
            if (conInput) {
                conInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && conInput.value.trim() !== '') {
                        e.preventDefault();
                        state.consTags.push(conInput.value.trim());
                        renderTagsUI();
                    }
                });
            }
        }
    }

    // Отправка формы рецензии
    if (elements.reviewForm) {
        elements.reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const albumId = elements.formAlbumSelect.value;
            const author = document.getElementById('reviewAuthorName').value.trim() || 'Анонимный слушатель';
            const title = document.getElementById('reviewHeadline').value.trim() || 'Впечатления от альбома';
            const text = document.getElementById('reviewContent').value.trim();

            if (!text) {
                alert('Пожалуйста, напишите текст вашей рецензии!');
                return;
            }

            const targetAlbum = MUSIC_DATA.albums.find(a => a.id === albumId);
            if (!targetAlbum) return;

            // Создаем новую рецензию
            const newReviewObj = {
                id: 'rev-' + Date.now(),
                author: author,
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
                role: 'Слушатель (MusikZone)',
                rating: state.newReviewRating,
                date: 'Только что',
                title: title,
                text: text,
                pros: [...state.prosTags],
                cons: [...state.consTags],
                likes: 1
            };

            // Добавляем в начало списка отзывов альбома
            targetAlbum.reviews.unshift(newReviewObj);
            targetAlbum.ratingsCount += 1;

            showToast(`Рецензия успешно опубликована к альбому «${targetAlbum.title}»!`);

            setTimeout(() => {
                navigateToScreen('album-detail', albumId);
            }, 600);
        });
    }

    function showToast(message) {
        if (!elements.toastNotification) return;
        elements.toastNotification.querySelector('.toast-message').textContent = message;
        elements.toastNotification.classList.add('show');
        setTimeout(() => {
            elements.toastNotification.classList.remove('show');
        }, 4000);
    }

    // =========================================================================
    // 7. ЭКРАН 5: ПОДБОРКИ «ЛУЧШЕЕ ЗА ГОД» (Best of Year)
    // =========================================================================
    function renderBestOfYear(yearKey) {
        state.selectedBestYear = yearKey;
        const rankingData = MUSIC_DATA.bestOfYearRankings[yearKey] || MUSIC_DATA.bestOfYearRankings['2026'];

        const titleEl = document.getElementById('bestYearTitle');
        const subEl = document.getElementById('bestYearSubtitle');
        if (titleEl) titleEl.textContent = rankingData.headline;
        if (subEl) subEl.textContent = rankingData.subhead;

        // Переключение табов
        document.querySelectorAll('.year-tab-btn').forEach(btn => {
            if (btn.dataset.year === yearKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Пьедестал топ релизов
        if (elements.bestOfYearPodium) {
            const podiumAlbums = rankingData.albums.map(item => {
                const album = MUSIC_DATA.albums.find(a => a.id === item.albumId);
                return { ...item, album };
            });

            elements.bestOfYearPodium.innerHTML = podiumAlbums.map(item => `
                <article class="podium-card rank-${item.rank}" data-album-id="${item.album.id}">
                    <div class="podium-rank-badge">#${item.rank}</div>
                    <img src="${item.album.coverImage}" alt="Обложка ${item.album.title}" class="podium-cover">
                    <span class="badge ${item.rank === 1 ? 'badge-gold' : 'badge-primary'}" style="margin-bottom: 8px;">
                        ${item.badge}
                    </span>
                    <h3 style="font-size: 18px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
                        ${item.album.title}
                    </h3>
                    <div style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 12px;">
                        ${item.album.artist} • ${item.album.genre}
                    </div>
                    <div class="album-rating-badge" style="position: static; margin-bottom: 12px;">
                        ★ ${item.album.rating.toFixed(1)} / 10
                    </div>
                    <p style="font-size: 13px; color: var(--color-text-tertiary); line-height: 1.5; margin-bottom: 16px;">
                        ${item.reason}
                    </p>
                    <button type="button" class="btn btn-sm btn-outline quick-open-btn" data-album-id="${item.album.id}">
                        Смотреть рецензии
                    </button>
                </article>
            `).join('');

            bindCardClickEvents(elements.bestOfYearPodium);
        }
    }

    // Слушатели переключения годов
    document.querySelectorAll('.year-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            renderBestOfYear(btn.dataset.year);
        });
    });

    // =========================================================================
    // 8. АУДИОПЛЕЕР (Мини-плеер внизу)
    // =========================================================================
    function playTrack(title, artist, cover, duration) {
        state.currentTrack = { title, artist, cover, duration };
        state.isPlaying = true;

        if (elements.playerTrackTitle) elements.playerTrackTitle.textContent = title;
        if (elements.playerTrackArtist) elements.playerTrackArtist.textContent = artist;
        if (elements.playerThumb && cover) elements.playerThumb.src = cover;

        updatePlayButtonState();
        showToast(`Сейчас играет: ${artist} — ${title}`);
    }

    function togglePlay() {
        state.isPlaying = !state.isPlaying;
        updatePlayButtonState();
    }

    function updatePlayButtonState() {
        if (!elements.playerPlayBtn) return;
        if (state.isPlaying) {
            elements.playerPlayBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            `;
        } else {
            elements.playerPlayBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z"></path>
                </svg>
            `;
        }
    }

    if (elements.playerPlayBtn) {
        elements.playerPlayBtn.addEventListener('click', togglePlay);
    }

    if (elements.playerProgressBar) {
        elements.playerProgressBar.addEventListener('click', (e) => {
            const rect = elements.playerProgressBar.getBoundingClientRect();
            const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            const fill = elements.playerProgressBar.querySelector('.progress-bar-fill');
            if (fill) fill.style.width = percent + '%';
        });
    }

    // Симуляция воспроизведения прогресс-бара
    setInterval(() => {
        if (state.isPlaying && elements.playerProgressBar) {
            const fill = elements.playerProgressBar.querySelector('.progress-bar-fill');
            if (fill) {
                let currentW = parseFloat(fill.style.width) || 32;
                currentW = (currentW + 0.3) % 100;
                fill.style.width = currentW + '%';
            }
        }
    }, 500);

    // =========================================================================
    // 9. КЛИКИ ПО КАРТОЧКАМ АЛЬБОМОВ
    // =========================================================================
    function bindCardClickEvents(container) {
        if (!container) return;

        container.querySelectorAll('[data-album-id]').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('[data-play-album]')) {
                    const albumId = e.target.closest('[data-play-album]').dataset.playAlbum;
                    const alb = MUSIC_DATA.albums.find(a => a.id === albumId);
                    if (alb && alb.tracks[0]) {
                        playTrack(alb.tracks[0].title, alb.artist, alb.coverImage, alb.tracks[0].duration);
                    }
                    return;
                }

                const albumId = card.dataset.albumId;
                if (albumId) {
                    navigateToScreen('album-detail', albumId);
                }
            });
        });
    }

    // =========================================================================
    // 10. СТАРТОВАЯ ИНИЦИАЛИЗАЦИЯ
    // =========================================================================
    navigateToScreen('home');
});
