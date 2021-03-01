import style from './style.module.scss'
import Notification from '../Notification/Notification'
import { faBell } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
  const countNotifications = 1
  return (
    <div className={style.container}>
        <Notification icon={faBell} cantNotifications={countNotifications} iconColor={"black"} />
      <div>
        <button
          className={style.button}
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
        >
          <img
            className={style.img}
            src="https://img.favpng.com/12/15/21/computer-icons-avatar-user-profile-recommender-system-png-favpng-HaMDUPFH1etkLCdiFjgTKHzAs.jpg"
            alt=""
          />
        </button>
      </div>
    </div>
  )
}

export default Header
