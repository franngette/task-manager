import Layout from '../../../components/Layout'
import Card from '../../../components/Card'
import styles from '../styles.module.scss'

export default function Index({ id }) {
  return (
    <Layout title="Client">
      <div className={styles.wrapper}>
        <h3 style={{ margin: '1rem' }}>
          <b>Cliente # {id}</b>
        </h3>

        <div className={styles.containerSmall}>
          <div className={styles.contentWrapper}>
            <Card>
              <h4>Cuenta</h4>
            </Card>
            <Card>
              <h4>Servicios</h4>
            </Card>
          </div>
          <div className={styles.contentWrapper}>
            <Card>
              <h4>Equipamiento</h4>
            </Card>
          </div>
        </div>

        <div className={styles.container}>
          <Card>
            <h4>Conexiones</h4>
          </Card>
          <Card>
            <h4>Datos Tecnicos</h4>
          </Card>
        </div>

        <div className={styles.container}>
          <Card>
            <h4>Reclamos</h4>
          </Card>
          <Card>
            <h4>Reclamo N*</h4>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  return {
    props: {
      id,
    },
  }
}
