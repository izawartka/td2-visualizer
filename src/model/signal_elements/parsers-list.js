import SignalElementsParserEhaEriDwarf from "./parsers/eha-eri-dwarf";
import SignalElementsParserEhaEriStandard from "./parsers/eha-eri-standard";

const SignalElementsParsersList = {
    'eha-eri': {
        name: 'EHA/ERI',
        regex: /^(eha_|eri_)/,
        subtypes: [
            SignalElementsParserEhaEriStandard,
            SignalElementsParserEhaEriDwarf
        ]
    }
};

export default SignalElementsParsersList;
