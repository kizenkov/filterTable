import './App.css';
import data from './data.json';
import {useState} from 'react';
import {Paginate} from './Paginate';

function App() {
    let rowsOnPage = 22 //set number of rows on page
    let pagePortion = 3 //set number of pages in pagination

    const [state, setState] = useState(data)
    const [start, setStart] = useState(0) //first item on page
    const [end, setEnd] = useState(rowsOnPage) //last item on page
    const [currentPage, setCurrentPage] = useState(1)

    const setPage = (page) => {
        setStart(rowsOnPage * (page - 1))
        setEnd(page * rowsOnPage)
        setCurrentPage(page)
    }

    const sort = (e) => {
        e.preventDefault()
        setPage(1)

        if (!e.target[0].value) setState(data.slice())

        if (e.target[0].value === 'title') {
            switch (e.target[1].value) {
                case 'equals':
                    setState(data.slice().filter(el => el['title'].toLowerCase() === e.target[2].value.toLowerCase()).sort((a, b) => {
                            return a['title'] > b['title'] ? 1 : a['title'] < b['title'] ? -1 : 0
                        }
                    ))
                    break;
                case 'contains':
                    setState(data.slice().filter(el => el['title'].toLowerCase().includes(e.target[2].value.toLowerCase())).sort((a, b) => {
                            return a['title'] > b['title'] ? 1 : a['title'] < b['title'] ? -1 : 0
                        }
                    ))
                    break;
                case 'more':
                    setState(data.slice().filter(el => el['title'].toLowerCase() > e.target[2].value.toLowerCase()))
                    break;
                case 'less':
                    setState(data.slice().filter(el => el['title'].toLowerCase() < (e.target[2].value.toLowerCase())))
                    break;
                default:
                    setState(data.slice().sort((a, b) => {
                            return a['title'] > b['title'] ? 1 : a['title'] < b['title'] ? -1 : 0
                        }
                    ))
            }
        }

        const getSortTable = (column) => {
            if (e.target[0].value === column) {
                switch (e.target[1].value) {
                    case 'equals':
                        setState(data.slice().filter(el => el[column] === +e.target[2].value).sort((a, b) => a[column] - b[column]))
                        break;
                    case 'contains':
                        setState(data.slice().filter(el => el[column].toString().includes(e.target[2].value)).sort((a, b) => a[column] - b[column]))
                        break;
                    case 'more':
                        setState(data.slice().filter(el => el[column] > +e.target[2].value))
                        break;
                    case 'less':
                        setState(data.slice().filter(el => el[column] < +e.target[2].value))
                        break;
                    default:
                        setState(data.slice().sort((a, b) => a[column] - b[column]))
                }
            }
        }
        getSortTable('number')
        getSortTable('distance')
    }

    let filteredState = state.filter((el, i) => start <= i && i < end)
    let resultList = filteredState.map(el => {
            return <tr key={el['id']}>
                <td>{el['date']}</td>
                <td>{el['title']}</td>
                <td>{el['number']}</td>
                <td>{el['distance']}</td>
            </tr>
        }
    )
    return (
        <div className='App' onSubmit={sort}>
            <form>
                <div className='noWrap'>
                    <label htmlFor='column' className='elementOfSort'>Column: </label>
                    <select name='column' id='column' className='elementOfSort'>
                        <option></option>
                        <option value='title'>Title</option>
                        <option value='number'>Number</option>
                        <option value='distance'>Distance</option>
                    </select>
                </div>
                <div className='noWrap'>
                    <label htmlFor='condition' className='elementOfSort'>Condition: </label>
                    <select name='condition' id='condition' className='elementOfSort'>
                        <option></option>
                        <option value='equals'>Equals</option>
                        <option value='contains'>Contains</option>
                        <option value='more'>More</option>
                        <option value='less'>Less</option>
                    </select>
                </div>
                <div className='noWrap'>
                    <label htmlFor='value' className='elementOfSort'>Value: </label>
                    <input type='text' name='value' id='value' className='elementOfSort'/>
                </div>
                <div className='noWrap'>
                    <button type='submit'>To sort</button>
                </div>
            </form>
            <br/>
            <table border='1' className='table'>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Number</th>
                    <th>Distance</th>
                </tr>
                </thead>
                <tbody>
                {resultList}
                </tbody>
            </table>
            <Paginate totalCountRows={state.length}
                      rowsOnPage={rowsOnPage}
                      pagePortion={pagePortion}
                      currentPage={currentPage}
                      setPage={setPage}/>
        </div>
    )
}

export default App