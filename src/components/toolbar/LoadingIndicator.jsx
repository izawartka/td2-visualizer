import { useContext } from 'react'
import SceneryContext from '../../contexts/SceneryContext'

export default function LoadingIndicator() {
    const { isLoading } = useContext(SceneryContext);

    const loadingText = isLoading ? 'Loading...' : 'Ready';
    const className = 'loading-indicator ' + (isLoading ? 'loading' : 'ready'); 

    return (
        <div className={className}>
            {loadingText}
        </div>
    );
}