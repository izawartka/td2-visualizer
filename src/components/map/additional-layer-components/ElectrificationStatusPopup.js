import { useContext, useEffect } from 'react';
import MainContext from '../../../contexts/MainContext';
import SettingsContext from '../../../contexts/SettingsContext';
import { showDialog } from '../../../services/dialogService';
import { ElectrificationResolutionStatus } from '../../../model/electrification-status';

export default function ElectrificationStatusPopup() {
    const { scenery } = useContext(MainContext);
    const { trackColorMode } = useContext(SettingsContext);

    const showElectrificationStatusPopup = () => {
        showDialog(
            'Track electrification entries were not properly resolved for this scenery. The electrification map may contain errors or misleading information. Sorry about that:(',
            null,
            {atBack: true}
        );
    }

    useEffect(() => {
        if (scenery && scenery.electrificationResolved !== ElectrificationResolutionStatus.RESOLVED && trackColorMode === 'electrification') {
            showElectrificationStatusPopup();
        }
    }, [scenery, trackColorMode]);
}
