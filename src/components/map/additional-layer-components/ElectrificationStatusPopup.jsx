import { useContext, useEffect } from 'react';
import SceneryContext from '../../../contexts/SceneryContext';
import SettingsContext from '../../../contexts/SettingsContext';
import { showDialog } from '../../../services/dialogService';
import { ElectrificationResolutionStatus } from '../../../model/electrification-status';

export default function ElectrificationStatusPopup() {
    const { scenery } = useContext(SceneryContext);
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
