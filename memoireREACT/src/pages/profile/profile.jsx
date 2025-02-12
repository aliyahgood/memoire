import "./profile.scss"
import Posts from "../../components/posts/posts"

const Profile = () => {
    return (
        <div className='profile'>
            <div className='images'>
                <img src='https://i.pinimg.com/736x/98/f9/0f/98f90f72c8a1fb3b1973887e1f9ad9db.jpg' alt='' className='cover'/>
                <img src='https://www.shutterstock.com/shutterstock/photos/66041614/display_1500/stock-photo-cool-guy-in-sunglasses-66041614.jpg' alt='' className='profilePic' />
            </div>
            <div className='profileContainer'>
                <span>@greg2cool</span>
                <p>Tech lover, code slinger, and aspiring innovator 🚀 
                    | Gamer 🎮 | Always up for a challenge 🔥 </p>
            </div>
            <div className='posts'>
                    <Posts/>
                </div>
        </div>
    )
}

export default Profile