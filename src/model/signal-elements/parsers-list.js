import SignalElementsParserEhaEriDwarf from "./parsers/eha-eri-dwarf";
import SignalElementsParserEhaEriDwarfPs from "./parsers/eha-eri-dwarf-ps";
import SignalElementsParserEhaEriStandard from "./parsers/eha-eri-standard";
import SignalElementsParserEhaEriStandardV2 from "./parsers/eha-eri-standard-v2";
import SignalElementsParserEhaTop from "./parsers/eha-top";
import SignalElementsParserMech from "./parsers/mech";
import SignalElementsParserSkDwarf from "./parsers/sk-dwarf";
import SignalElementsParserSkStandard from "./parsers/sk-standard";
import SignalElementsParserSkTop from "./parsers/sk-top";

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
    },
    'sk': {
        name: 'SK',
        regex: /^sk_/,
        subtypes: [
            SignalElementsParserSkStandard,
            SignalElementsParserSkDwarf,
            SignalElementsParserSkTop
        ]
    },
    'mech': {
        name: 'Mechanical',
        regex: /^(?:sk\d+.*|t[ozm]k.*)$/,
        subtypes: [
            SignalElementsParserMech
        ]
    }
};

export default SignalElementsParsersList;
