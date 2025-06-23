import React from 'react';
import './Toolbar.css';
import LoadingIndicator from './LoadingIndicator';
import CustomFileSelect from './CustomFileSelect';
import SideMenuToggle from './SideMenuToggle';
import SceneriesList from './SceneriesList';

export default function Toolbar() {
    return (
        <div className='toolbar-cont'>
            <div className='toolbar'>
                <SceneriesList />
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