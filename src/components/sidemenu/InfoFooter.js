import { useEffect, useState } from 'react';
import { sceneriesListVersionDate$ } from "../../services/sceneriesListService";
import Constants from '../../helpers/constants';

export default function InfoFooter() {
    const [sceneriesVersionDate, setSceneriesVersionDate] = useState(null);

    useEffect(() => {
        const subscription = sceneriesListVersionDate$.subscribe(date => {
            setSceneriesVersionDate(date);
        });

        return () => subscription.unsubscribe();
    }, []);

    const sceneriesListText = sceneriesVersionDate ?
        `included sceneries as of ${sceneriesVersionDate}` :
        'included sceneries list not available';

    return (
        <div className="info-footer">
            <span>TD2 Visualizer v{Constants.buildVersion}</span>
            <span>masuo 2025.06</span>
            <span>{sceneriesListText}</span>
        </div>
    );
}