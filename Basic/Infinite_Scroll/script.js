// https://www.javascripttutorial.net/javascript-dom/javascript-infinite-scroll/
// https://www.javascripttutorial.net/es6/javascript-promises/
// https://www.javascripttutorial.net/es-next/javascript-async-await/


( function () {

    const quotesEL = document.querySelector('.quotes');
    const loader = document.querySelector('.loader');

    const getQuotes = async (page, limit) => {
        const API_URL = 'https://api.javascripttutorial.net/v1/quotes/?page=1&limit=10'
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }

        return await response.json();
    }


    /*
    showQuotes() working

    <blockquote class="quote">
    <span>1)</span>
        Talk is cheap. Show me the code.
        <footer>Linus Torvalds</footer>
    </blockquote>

    */

    const showQuotes = ( (quotes) => {
        quotes.forEach(quote => {
            const quoteEl = document.createElement('blockquote');
            quoteEl.classList.add('quote');

            quoteEl.innerHTML = `
                <span>${quote.id}</span>
                ${quote.quote}
                <footer>${quote.author}</footer>
                `;

            quotesEl.appendChild(quoteEl);
        });
    });


    let currentPage = 1;
    const limit = 10;
    let total = 0;

    const hideLoader = ( () => {
        loader.classList.remove('show');
    });

    const showLoader = ( () => {
        loader.classList.add('show');
    });

    const hasMoreQuotes = ( (page, limit, total) => {
        const startIndex = (page - 1) * limit + 1;
        return (total === 0 || startIndex < total);
    });

    const loadQuotes = async (page, limit) => {
        showLoader();

        setTimeout ( async () => {

            try {
                if (hasMoreQuotes(page, limit, total)) {
                    // call API to get quotes
                    const response = await getQuotes(page, limit);
                    showQuotes(response.data);
                    total = response.total;
                }
            }
            catch (error) {
                console.log(error.message);
            }
            finally {
                hideLoader();
            }
        }, 750);
    }


    window.addEventListener('scroll', () => {
        const {
            scrollTop, scrollHeight, clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5 &&
            hasMoreQuotes(currentPage, limit, total)) {
                currentPage++;
                loadQuotes(currentPage, limit);
            }
    }, {
        passive: true
    });

    loadQuotes(currentPage, limit);

})();

