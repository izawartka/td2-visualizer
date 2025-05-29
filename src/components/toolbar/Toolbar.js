import React from 'react';
import './Toolbar.css';
import LoadingIndicator from './LoadingIndicator';
import FileSelect from './FileSelect';
import SideMenuToggle from './SideMenuToggle';

export default function Toolbar() {
    return (
        <div className='toolbar-cont'>
            <div className='toolbar'>
                <FileSelect />
                <div className='toolbar-spacer'></div>
                <SideMenuToggle />
            </div>
            <div className='loading-indicator-cont'>
                <LoadingIndicator />
            </div>
        </div>
    );
}