import { useContext } from "react";
import Constants from "../../helpers/constants";
import SceneryContext from "../../contexts/SceneryContext";

export default function ElectrificationStepMode() {
    const { electrificationStepModeStep } = useContext(SceneryContext);

    const onStepClick = () => {
        electrificationStepModeStep();
    }

    if(!Constants.parser.resolveElectrificationStepMode) {
        return null;
    }

    return (
        <button onClick={onStepClick}>
            STEP
        </button>
    );
}