import SignalElementsParserEhaEriDwarf from "./parsers/eha-eri-dwarf";
import SignalElementsParserEhaEriDwarfPs from "./parsers/eha-eri-dwarf-ps";
import SignalElementsParserEhaEriStandard from "./parsers/eha-eri-standard";
import SignalElementsParserEhaEriStandardV2 from "./parsers/eha-eri-standard-v2";
import SignalElementsParserEhaTop from "./parsers/eha-top";

const SignalElementsParsersList = {
    'eha-eri': {
        name: 'EHA/ERI',
        regex: /^(eha_|eri_)/,
        subtypes: [
            SignalElementsParserEhaEriStandard,
            SignalElementsParserEhaEriStandardV2,
            SignalElementsParserEhaEriDwarf,
            SignalElementsParserEhaEriDwarfPs,
            SignalElementsParserEhaTop
        ]
    }
};

export default SignalElementsParsersList;
