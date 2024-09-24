import { Routes, Route } from 'react-router-dom';
import TopTracks from './TopTracks';
import SwitchAccount from './SwitchAccount';
import Vibe from './Vibe';
import NavBar from './NavBar';

const HomeRouting = () => {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<TopTracks/>}/>
                <Route path="/switchAccount" element={<SwitchAccount/>}/>
                <Route path="/vibe" element={<Vibe/>}/>
                <Route path="*" element={<SwitchAccount />} />
            </Routes>
        </>
    );
};

  
export default HomeRouting;