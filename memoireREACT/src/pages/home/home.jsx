import Posts from "../../components/posts/posts"
import "./home.scss"

const Home = () => {
    return (
        <div className='home'>
            <div className='homecontainer'>
            <Posts/>
            </div>
        </div>
    )
}

export default Home