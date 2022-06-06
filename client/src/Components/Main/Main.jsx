import {Routes,Route} from 'react-router-dom';
import Home from '../Home/Home';
import Fire from '../Fire/Fire';
import Projects from '../Projects/Projects';
import Footer from '../Footer/Footer';


function Main(){
    return(
        <div className="main">
            <Home/>
            <Fire/>
            <Projects/>
            <Footer/>
        </div>
    )
}

export default Main;