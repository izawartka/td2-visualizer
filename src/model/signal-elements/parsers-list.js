import SignalElementsParserEhaEriDwarf from "./parsers/eha-eri-dwarf";
import SignalElementsParserEhaEriDwarfPs from "./parsers/eha-eri-dwarf-ps";
import SignalElementsParserEhaEriStandard from "./parsers/eha-eri-standard";

const SignalElementsParsersList = {
    'eha-eri': {
        name: 'EHA/ERI',
        regex: /^(eha_|eri_)/,
        subtypes: [
            SignalElementsParserEhaEriStandard,
            SignalElementsParserEhaEriDwarf,
            SignalElementsParserEhaEriDwarfPs
        ]
    }
};

export default SignalElementsParsersList;
