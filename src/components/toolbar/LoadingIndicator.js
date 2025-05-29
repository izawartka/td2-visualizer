import { useContext } from 'react'
import MainContext from '../../contexts/MainContext'

export default function LoadingIndicator() {
    const { isLoading } = useContext(MainContext);

    const loadingText = isLoading ? 'Loading...' : 'Ready';
    const className = 'loading-indicator ' + (isLoading ? 'loading' : 'ready'); 

    return (
        <div className={className}>
            {loadingText}
        </div>
    );
}