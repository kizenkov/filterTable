import {useState} from 'react'

export const Paginate = ({totalCountRows, rowsOnPage, pagePortion, setPage, currentPage}) => {

    let [numberOfPagePortion, setNumberOfPagePortion] = useState(1)

    let totalPage = Math.ceil(totalCountRows / rowsOnPage)

    let leftBorderOfPortion = numberOfPagePortion * pagePortion - (pagePortion - 1)
    let rightBorderOfPortion = numberOfPagePortion * pagePortion
    if (numberOfPagePortion >= Math.ceil(totalPage / pagePortion)) {
        rightBorderOfPortion = totalPage
    }

    let pages = []
    for (let i = leftBorderOfPortion; i <= rightBorderOfPortion; i++) {
        pages.push(i)
    }
    let pageList = pages.map(page => <span
        key={page}
        onClick={() => setPage(page)}
        className={page === currentPage ? 'page currentPage' : 'page'}>{page}</span>)

    return <div>
        <div>
            <button onClick={() => setNumberOfPagePortion(numberOfPagePortion - 1)}
                    disabled={numberOfPagePortion === 1}>‹
            </button>
            {pageList}
            {totalPage > pagePortion && rightBorderOfPortion !== totalPage &&
            <>
                <span>...</span>
                <span onClick={() => setPage(totalPage)}
                      className={totalPage === currentPage ? 'page currentPage' : 'page'}>{totalPage}</span>
            </>}
            <button onClick={() => setNumberOfPagePortion(numberOfPagePortion + 1)}
                    disabled={numberOfPagePortion >= Math.ceil(totalPage / pagePortion)}>›
            </button>
        </div>
    </div>
}