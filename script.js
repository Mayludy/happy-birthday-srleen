document.addEventListener('DOMContentLoaded', () => {
    feather.replace(); 

    const playPauseButton = document.getElementById('play-pause');
    const audio = document.getElementById('audio');
    const songDuration = document.getElementById('song-duration');
    const lyricsContainer = document.getElementById('lyrics-container');
    let lyricsInterval;

    // Lirik untuk setiap halaman
    const pageLyrics = [
        "Happy Birthdayy Sharleen Agustine, Sumpah demi apa kamu udah kepala 2 leen? i mean, KITA udah kepala 2 HAHHHHH?!!", // Halaman 1
        "Selamat ya leen, sudah menginjak kedewasaan yang mungkin cuma jadi topeng aja sebab jiwa kita masi anak ketcill WGWGWG. Thank you juga kamu selama ini jadi pribadi yang sayang dan GEMES banget sama hewan rasae hewan apapun ituu sebab ngga semua manusia bisa suka begaul sama macem-macem hewan. Ucapan selamat ulang tahun tentunya nggak cuma dari aku aja, tapi dari meng-mengmu, hamster-hamstermu, buwung kakak tuamu, buwung-buwung ayahmu, kura-kuramu, ikan-ikanmu", // Halaman 2
        "Makasii leen sudah berdinamika dengan permasalahan dihidupmu yang warna-warni tapi LIHAT sekarang you bisa bertahan ngerayain juga ulang tahun ke 20 yang katanya orang-orang diumur ini kita sudah akan menghadapi permasalahn ORANG DEWASA yang sangat rumit itu. TETAPI aku yakin kamu juga bakal bisa  ngelewatinnya kayak yang sebelum-sebelumnya karena LO MANTEPPPP ANJAYY GURINJAYY. Gaperlu ovt soal omongan orang lain yang merasa selalu menyayangkan nasibmu disaat kamu berusaha berdamai sendirian mati-matian. Tapi percayalah leen tuhan pasti ngasi rezeki yang paling tepat pada tiap hambanya. So, jangan berkecil hati terus yaa, jalanin dengan yang terbaik apa yang kamu lakukan sekarang.", // Halaman 3
        "Tetep jadi sharleen yang biasanya yaa, sampe kita tua nanti kita harus adain meet gaboleh engga.. bayangin kita dah ada keriput gitu masi mantepp jalan-jalan trus photobox WKWKWKW SUKAKKKK. Tetep jadi sarleen yang pinterr malah sekarang kayak e tambah jago anjayyy sukakkkk i really proud of you, anything what you do. Aku disini di Jogja juga selalu pengen liat aktivitas kamu dan anak PS ngapain ajaaa kokkk jadi jangan sungkan-sungkan kalo kamu mau update APAPUN itu sebabb aku selalu kangen kaliannn HUHUHUHU. Banyakin enjoy dan senengnya yahh ditahun ini dan tahun-tahun berikutnya!!!!. ", // Halaman 4
        "Doa ku buat kamu bisa kamu lihat sendiri di samping, tapi itu dibantu chatGPT si aku kalo yang estetik-estetik gitu mana bisa, bisaku ya jamet gini SHIKKKKK. TAPI intinya sama, kepengenku sama chatGPT juga sama. Kamu banyak senangnya di tempat magangmu dan kamu bisa dapet banyak insight disana yaa keren bgtt di BMKG coyyy gilss, kamu dilancarin urusanmu di kehidupan, kuliah, pertemanan, dan percintaan anjyyy. Awas ae nek ferdud aneh-aneh, anak PS siap nggib3ngg HEHEHE tapi aku percaya dia ga begitu sii, jadi aku doain kamu sama dia juga bisa ngelewatin rintangan di hubungan kalian. Kamu ngerasain cinta dan kasih sayang yang full sebab yhh km pantsss ngedapetin itu semua. Satu lagi, jangan pernah noleh ke belakang ya leen, kamu mesti fokus sama yang sekarang dan sesekali memikirikan masa depan. Kalo di film Sekawan Limo gini 'ojo noleh mburi, ngko ketokan demit' nah nek kmu noleh belakang bukan demit lagi yang diliat tapi ibliss..", // Halaman 5
        "Thank youu sarleen sudah menemaniku sejak bocil SMP walau kala itu kita ga sengaja satu bonmen tiap pagi masi muka bantal aku udah liat mukamu. Sekarang kita sudah segede gombreng gini kalo mau pake baju SMP boncengan pake redy ku ke SMP juga masi cocok kita, yo ta nyoba wkwkw. Inget banget lagi kita pagi-pagi buta juga udah produkif banget ke IFA buat ujian bareng WKWKWK gilsss ya kalo diinget-inget lagi kita nuiat banget pantes yang lain iri EHHHH sukakkk. Plis kita harus tetep bareng-bareng sharing cerita apapu n ituu di grup di pc karena aku yakin sejauh kita juga pas balik gaada bedanya WKWKWK selalu KISRUHH tapi I LIKE ITTT. LOvee youu leeenn, disini aku selalu ikut mengaminkan doamu tentunya juga doa anak PS supaya kita semua sukses biar pas berumur kita jadi mama-mama sosialita trip di seluruh pulau jawa trus ke kalimantan, trus ke sulawesi, banda neira, tau-tu ke luar negeri bareng AAAA SUKAKKK. Amiin, bahagia terus yaaa leeenn <8. With love, meludi.", // Halaman 6
    ];

    playPauseButton.addEventListener('click', () => {
        togglePlay();
    });

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i data-feather="pause"></i>'; 
            feather.replace(); 
            displayDuration(); 
            syncLyrics(); 
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i data-feather="play"></i>';
            feather.replace(); 
            clearInterval(lyricsInterval); 
        }
    }

    function displayDuration() {
        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            songDuration.textContent = duration; 
        });

        audio.addEventListener('timeupdate', () => {
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            songDuration.textContent = currentTime + ' / ' + duration; 
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        return formattedTime;
    }

    function preloadImages(pages) {
        return new Promise((resolve) => {
            let loadedCount = 0;
            const totalImages = pages.length;

            pages.forEach(page => {
                const img = page.querySelector('img');
                if (img.complete) {
                    loadedCount++;
                    if (loadedCount === totalImages) resolve();
                } else {
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === totalImages) resolve();
                    };
                }
            });
        });
    }

    const rightPages = document.querySelectorAll('.right-page');
    let currentPage = 0;

    function showPage(pageIndex) {
        rightPages.forEach((page, index) => {
            if (index === pageIndex) {
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = 2;
                page.style.visibility = 'visible';
            } else if (index < pageIndex) {
                page.style.transform = 'rotateY(-180deg)';
                page.style.zIndex = 1;
                page.style.visibility = 'visible';
            } else {
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = 0;
                page.style.visibility = 'visible';
            }
        });

        if (pageIndex < rightPages.length - 1) {
            rightPages[pageIndex + 1].style.transform = 'rotateY(0deg)';
            rightPages[pageIndex + 1].style.zIndex = 1;
            rightPages[pageIndex + 1].style.visibility = 'visible';
        }
    }

    function nextPage() {
        if (currentPage < rightPages.length - 1) {
            currentPage++;
        } else {
            currentPage = 0; 
        }
        showPage(currentPage);
        updateLyrics(currentPage); // Update lirik setiap kali halaman berganti
    }

    function updateLyrics(pageIndex) {
        lyricsContainer.textContent = pageLyrics[pageIndex];
    }

    // Tambahkan event listener ke setiap halaman untuk mengganti halaman ketika diklik
    rightPages.forEach(page => {
        page.addEventListener('click', () => {
            nextPage();
        });
    });

    function syncLyrics() {
        lyricsInterval = setInterval(() => {
            const currentTime = Math.floor(audio.currentTime);
            const currentPageLyric = lyrics.find(lyric => Math.floor(lyric.time) === currentTime);
            if (currentPageLyric) {
                lyricsContainer.textContent = currentPageLyric.text;
            }
        }, 1000);
    }

    preloadImages(rightPages).then(() => {
        showPage(currentPage);
        updateLyrics(currentPage); // Tampilkan lirik pertama kali
    });
});
