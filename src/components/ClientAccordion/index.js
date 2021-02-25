import { useState } from 'react'
import Card from '../Card/index'

const ClientAccordion = ({ client }) => {
  const [hovered, setHovered] = useState(false)

  const toggleHover = () => setHovered(!hovered)

  let styledDiv = 'hidden'

  if (hovered) {
    styledDiv = 'client_card_child'
  }

  return (
    <div
      className={'client_card'}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <Card>
        <div className={'client_content'}>
          <div className={'id'}>
            <p># {client.id_account}</p>
          </div>
          <div className={'child'}>
            <h4>{client.account_name}</h4>
          </div>
          <div className={'child'}>
            <p>DNI/CUIT: {client.doc_number}</p>
          </div>
          <div className={'child'}>
            <p>{client.location}</p>
          </div>
        </div>
      </Card>

      <div className={styledDiv}>
        {client.sub_accounts &&
          client.sub_accounts.map((item, index) => {
            return (
              <div key={index}>
                <Link
                  href={`/client/${client.id_account}/${item.sub_account_id}`}
                >
                  <div className={'client_content'}>
                    <div className={'id'}>
                      <p>{item.sub_account_id}</p>
                    </div>
                    <div className={'child'}>
                      <p>Servicio: {item.service_name}</p>
                    </div>
                    <div className={'child'}>
                      <p>Dirrecion: {item.address}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ClientAccordion
