import './Toolbar.css';
import LoadingIndicator from './LoadingIndicator';
import CustomFileSelect from './CustomFileSelect';
import SideMenuToggle from './SideMenuToggle';
import SceneryList from './SceneryList';
import ElectrificationStepMode from './ElectrificationStepMode';
import ThemeToggle from './ThemeToggle';

export default function Toolbar() {
    return (
        <div className='toolbar-cont'>
            <div className='toolbar'>
                <SceneryList />
                or
                <CustomFileSelect />
                <ElectrificationStepMode />
                <div className='toolbar-spacer'></div>
                <ThemeToggle />
                <SideMenuToggle />
            </div>
            <div className='loading-indicator-cont'>
                <LoadingIndicator />
            </div>
        </div>
    );
}