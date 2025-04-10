import { useLocation } from 'react-router-dom';

function Home (){
    const location = useLocation();
    return (
        <div>
            <p>Welcome {location.state.user}, to Property Management Portal</p>
        </div>
    )
}

export default Home;
