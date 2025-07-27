import './Toolbar.css';
import LoadingIndicator from './LoadingIndicator';
import CustomFileSelect from './CustomFileSelect';
import SideMenuToggle from './SideMenuToggle';
import SceneryList from './SceneryList';

export default function Toolbar() {
    return (
        <div className='toolbar-cont'>
            <div className='toolbar'>
                <SceneryList />
                or
                <CustomFileSelect />
                <div className='toolbar-spacer'></div>
                <SideMenuToggle />
            </div>
            <div className='loading-indicator-cont'>
                <LoadingIndicator />
            </div>
        </div>
    );
}