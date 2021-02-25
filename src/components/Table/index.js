import Card from '../Card/index'
import style from './style.module.scss'

const Table = ({ columns, data, columnsLarge, sendData }) => {
  let list = columns.map((val, i) => {
    if (i === 0) {
      return '50px'
    }
    if (columnsLarge.indexOf(val) > -1) {
      return '2fr'
    }
    return '1fr'
  })

  let styleColumns = {
    display: 'grid',
    gridTemplateColumns: list.join(' '),
    background: '#2A4365',
    color: '#EBF8FF',
    textAlign: 'center' as 'center',
  }
  let styleRows = {
    display: 'grid',
    gridTemplateColumns: list.join(' '),
    textAlign: 'center' as 'center',
  }

  const createColumns = (columns) => {
    let ListColumns = columns.map((column, index) => {
      let title = column.replace('_', ' ').toUpperCase()
      if (index === 0) {
        return (
          <span className={style.columns} key={index}>
            #
          </span>
        )
      }
      return (
        <span className={style.columns} key={index}>
          {title}
        </span>
      )
    })
    return <li style={styleColumns}>{ListColumns}</li>
  }

  const createRowows = (data) => {
    let ListRows = data.map((obj, i) => {
      let Row = columns.map((key) => {
        if (Array.isArray(obj[key])) {
          let test = obj[key].map((el, j) => {
            return (
              <div>
                <img src={`${el.photo_src}`} alt={`${el.name}`} width="60" height="60"/>
              </div>
            )
          })
          return <span className={style.rows}>{test}</span>
        } else {
          return <span className={style.rows}>{obj[key]}</span>
        }
      })
      return (
        <div style={{ margin: '0.5rem 0rem' }} key={i}>
          <Card>
            <li
              style={styleRows}
              onClick={() => {
                sendData(obj)
              }}
            >
              {Row}
            </li>
          </Card>
        </div>
      )
    })

    return ListRows
  }

  return (
    <div>
      <ul>
        {createColumns(columns)}
        {createRowows(data)}
      </ul>
    </div>
  )
}

export default Table
