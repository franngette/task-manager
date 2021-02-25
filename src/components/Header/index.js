import style from './style.module.scss'

const Header = () => {
  return (
    <div className={style.container}>
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
