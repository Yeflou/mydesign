

document.addEventListener('DOMContentLoaded', () => {

    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;

        scrollProgress.style.width = scrolled + '%';

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollTop > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';

                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'var(--transition)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const photoFrame = document.getElementById('photoFrame');
    const photoInput = document.getElementById('photoInput');

    if (photoFrame && photoInput) {
        photoFrame.addEventListener('click', () => {

            if (photoFrame.classList.contains('photo-placeholder')) {
                photoInput.click();
            }
        });

        photoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {

                    photoFrame.classList.remove('photo-placeholder');
                    photoFrame.innerHTML = '';

                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Uploaded Profile Photo';
                    img.classList.add('profile-photo');

                    const editOverlay = document.createElement('div');
                    editOverlay.style.position = 'absolute';
                    editOverlay.style.top = '0';
                    editOverlay.style.left = '0';
                    editOverlay.style.width = '100%';
                    editOverlay.style.height = '100%';
                    editOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                    editOverlay.style.display = 'flex';
                    editOverlay.style.flexDirection = 'column';
                    editOverlay.style.justifyContent = 'center';
                    editOverlay.style.alignItems = 'center';
                    editOverlay.style.opacity = '0';
                    editOverlay.style.transition = 'var(--transition)';
                    editOverlay.style.borderRadius = 'var(--border-radius-lg)';
                    editOverlay.style.color = '#fff';
                    editOverlay.style.cursor = 'pointer';
                    editOverlay.innerHTML = '<i class="fa-solid fa-pen" style="font-size: 2rem; margin-bottom: 10px;"></i><span>Ganti Foto</span>';

                    photoFrame.appendChild(img);
                    photoFrame.appendChild(editOverlay);

                    photoFrame.addEventListener('mouseenter', () => {
                        editOverlay.style.opacity = '1';
                    });
                    photoFrame.addEventListener('mouseleave', () => {
                        editOverlay.style.opacity = '0';
                    });
                    editOverlay.addEventListener('click', (ev) => {
                        ev.stopPropagation();
                        photoInput.click();
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            submitBtn.disabled = true;
            btnText.textContent = 'Mengirim...';
            btnIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {

                formStatus.style.display = 'block';
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fa-regular fa-circle-check"></i> Pesan terkirim! Terima kasih telah menghubungi saya.';

                submitBtn.disabled = false;
                btnText.textContent = 'Kirim Pesan';
                btnIcon.innerHTML = '<i class="fa-regular fa-paper-plane"></i>';

                contactForm.reset();

                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1800);
        });
    }

    // --- PROJECT MODAL FUNCTIONALITY ---
    const projectsData = {
        posyandu: {
            title: "Sistem Informasi Posyandu 13",
            badge: "WEB APPLICATION",
            tech: "HTML • CSS • JavaScript • MySQL",
            about: "Aplikasi web yang dirancang untuk menyelesaikan masalah pencatatan manual berulang, mempercepat alur pelayanan balita, dan mempermudah rekapitulasi laporan bulanan di Posyandu Kemuning 13, Surakarta.",
            roles: [
                "Analisis Sistem Metode Agile",
                "Database Design",
                "Wireframe Design",
                "Web Developer",
                "Testing"
            ],
            features: [
                "Akses login khusus kader.",
                "Manajemen Data (CRUD): Pengelolaan data profil balita dan rekam medis secara dinamis.",
                "Akses spesifik pencarian riwayat balita via nama/nomor registrasi.",
                "Unduh otomatis rekapitulasi bulanan posyandu."
            ],
            github: "https://github.com/ameliaflora/posyandu-kemuning",
            gallery: [
                { src: "assets/posyandu/loginkader.png", label: "Login Kader" },
                { src: "assets/posyandu/pendaftaran.png", label: "Pendaftaran Balita" },
                { src: "assets/posyandu/manajemendatabalita.png", label: "Manajemen Data Balita" },
                { src: "assets/posyandu/inputpemeriksaan.png", label: "Pemeriksaan Balita" }
            ],
            type: "browser"
        },
        perpustakaan: {
            title: "Sistem Informasi Perpustakaan",
            badge: "BACKEND APPLICATION",
            tech: "Golang • Gin • PostgreSQL",
            about: "Aplikasi manajemen perpustakaan berbasis REST API untuk otomasi manajemen peminjaman dan pengelolaan data buku.",
            roles: [
                "Web Developer (Frontend & Backend)",
            ],
            features: [
                "Manajemen Katalog Buku",
                "Pencatatan Transaksi Peminjaman & Pengembalian",
                "Kalkulasi Denda Keterlambatan Otomatis",
                "Autentikasi JWT (JSON Web Token)"
            ],
            github: "https://github.com/ameliaflora/library-api",
            gallery: [
                { src: "assets/perpus/login.png", label: "Halaman Login" },
                { src: "assets/perpus/dashboardadmin.png", label: "Dashboard Admin" },
                { src: "assets/perpus/berandamahasiswa.png", label: "Beranda Mahasiswa" },
                { src: "assets/perpus/peminjaman.png", label: "Transaksi Peminjaman" }
            ],
            type: "browser"
        },
        gsheets: {
            title: "Google Sheets Data Filtering & Integration",
            badge: "API INTEGRATION",
            tech: "PHP • Google Sheets API",
            about: "Sistem integrasi data otomatis untuk penarikan database dari Google Sheets API, penyaringan, dan pemrosesan data ke server lokal.",
            roles: [
                "Frontend Developer",
                "API Integration"
            ],
            features: [
                "Koneksi Google Sheets API (Service Account)",
                "Penyaringan Baris Data secara Real-Time",
                "Sinkronisasi Data Dua Arah",
                "Visualisasi Dashboard Hasil Filter"
            ],
            github: "https://github.com/ameliaflora/gsheets-integration",
            gallery: [
                { src: "assets/gsheet/googlesheets.png", label: "Sumber Google Sheets" },
                { src: "assets/gsheet/dashboard.png", label: "Dashboard Utama" },
                { src: "assets/gsheet/dashboarddata.png", label: "Dashboard Filter Data" }
            ],
            type: "browser"
        },
        inventoryhp: {
            title: "Sistem Inventaris Handphone",
            badge: "INFORMATION SYSTEM",
            tech: "CodeIgniter • MySQL • HTML • CSS",
            about: "Sistem inventaris berbasis web untuk membantu pengelolaan stok handphone, transaksi masuk-keluar barang, dan pelaporan inventaris.",
            roles: [
                "Analisis Sistem",
                "Database Design",
                "Web Developer (Frontend & Backend)",
                "Testing"
            ],
            features: [
                "Manajemen Data Handphone",
                "Pencatatan Stok Masuk & Keluar",
                "Pengelolaan Supplier",
                "Laporan Inventaris",
                "Monitoring Stok"
            ],
            github: "https://github.com/ameliaflora/inventory-ci",
            gallery: [
                { src: "assets/hp/login.png", label: "Halaman Login" },
                { src: "assets/hp/dashboard.png", label: "Dashboard Utama" },
                { src: "assets/hp/databarang.png", label: "Data Barang & Stok" },
                { src: "assets/hp/suplier.png", label: "Manajemen Supplier" },
                { src: "assets/hp/barangmasuk.png", label: "Transaksi Barang Masuk" },
                { src: "assets/hp/barangkeluar.png", label: "Transaksi Barang Keluar" }
            ],
            type: "browser"
        },
        sumtime: {
            title: "SumTime - Aplikasi Pemesanan Dimsum",
            badge: "MOBILE APPLICATION",
            tech: "Flutter • Supabase",
            about: "Aplikasi SumTime menghadirkan platform digital untuk menyederhanakan proses pemesanan makanan, mulai dari mengakses informasi produk hingga pembayaran. Aplikasi ini juga bertujuan mendukung pemilik usaha dalam mengelola operasional secara terstruktur, seperti pengaturan data menu, pesanan, dan informasi penjualan",
            roles: [
                "Sketsa wireframe",
                "Autentikasi dan mengintegrasikan basis data real-time menggunakan Supabase",
                "Deploy antarmuka Beranda, Checkout, Rincian Pesanan, Menu, Admin Dashboard",
                "Testing"
            ],
            features: [
                "Katalog Menu Dimsum Interaktif",
                "Keranjang Belanja & Checkout Instan",
                "Autentikasi Pengguna (Supabase Auth)",
                "Pelacakan pesanan pengguna & manajemen pesanan admin."
            ],
            github: "https://github.com/IsnaAinur/sumtime",
            gallery: [
                { src: "assets/sumtime/login.png", label: "Halaman Login" },
                { src: "assets/sumtime/menu.png", label: "Katalog Menu Dimsum" },
                { src: "assets/sumtime/cekout.png", label: "Keranjang & Checkout" },
                { src: "assets/sumtime/detailmenu.png", label: "Detail Menu" }
            ],
            type: "mobile"
        },
        desacerme: {
            title: "Laporan Desa Cerme",
            badge: "WEB APPLICATION",
            tech: "HTML • CSS • JavaScript • EmailJS",
            about: "Sistem Layanan Aspirasi dan Pengaduan Online Masyarakat Desa Cerme. Warga dapat dengan mudah menyampaikan keluhan dan masukan yang langsung dikirimkan secara instan ke email resmi pemerintah desa melalui integrasi client-side EmailJS.",
            roles: [
                "Web Developer",
                "EmailJS API Integration",
                "Form Validation & Error Handling",
                "Client-side Testing"
            ],
            features: [
                "Formulir laporan aspirasi/keluhan yang interaktif.",
                "Integrasi EmailJS untuk pengiriman laporan real-time tanpa database backend.",
                "Halaman sukses pengiriman laporan (thank-you page)."
            ],
            github: "https://github.com/Yeflou/laporan-desa-cerme",
            gallery: [
                { src: "assets/desacerme/preview.png", label: "Halaman Layanan & Form" },
                { src: "assets/desacerme/preview2.png", label: "Pengaduan Sukses" }
            ],
            type: "browser"
        }
    };

    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalAbout = document.getElementById('modalAbout');
    const modalTechText = document.getElementById('modalTechText');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const modalRolesList = document.getElementById('modalRolesList');
    const modalFeaturesList = document.getElementById('modalFeaturesList');
    const previewsGrid = document.getElementById('previewsGrid');

    // Open Modal
    const openProjectModal = (projectKey) => {
        const project = projectsData[projectKey];
        if (!project) return;

        // Populate text content
        modalBadge.textContent = project.badge;
        modalTitle.textContent = project.title;
        modalAbout.textContent = project.about;
        modalTechText.textContent = project.tech;

        // Populate Roles List
        modalRolesList.innerHTML = '';
        project.roles.forEach(role => {
            const li = document.createElement('li');
            li.textContent = role;
            modalRolesList.appendChild(li);
        });

        // Populate Features List
        modalFeaturesList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeaturesList.appendChild(li);
        });

        // Set GitHub link
        modalGithubLink.href = project.github;

        // Populate Previews Grid (2x2)
        previewsGrid.innerHTML = '';
        project.gallery.forEach(screen => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';

            const previewLabel = document.createElement('div');
            previewLabel.className = 'preview-item-label';
            previewLabel.textContent = screen.label;
            previewItem.appendChild(previewLabel);

            const img = document.createElement('img');
            img.src = screen.src;
            img.alt = screen.label;
            img.style.width = '100%';
            img.style.borderRadius = '8px';
            img.style.border = '1px solid var(--border-color)';
            img.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
            img.style.display = 'block';
            img.style.marginTop = '10px';
            previewItem.appendChild(img);

            previewsGrid.appendChild(previewItem);
        });

        // Show modal & disable scroll
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close Modal
    const closeProjectModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        previewsGrid.innerHTML = '';
    };

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', closeProjectModal);
        modalOverlay.addEventListener('click', closeProjectModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }

    // Attach click triggers
    const attachDetailTriggers = () => {
        document.querySelectorAll('.btn-detail').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectKey = button.getAttribute('data-project');
                openProjectModal(projectKey);
            });
        });
    };

    attachDetailTriggers();

    // Creative/Design Section Tabs
    const creativeTabBtns = document.querySelectorAll('.creative-tab-btn');
    const creativeTabContents = document.querySelectorAll('.creative-tab-content');

    creativeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            creativeTabBtns.forEach(b => b.classList.remove('active'));
            creativeTabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = document.getElementById(`tab-${btn.getAttribute('data-tab')}`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
});
