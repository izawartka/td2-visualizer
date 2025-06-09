import './SceneryParserLogView.css';

export default function SceneryParserLogView({ log, additionalErr }) {
    const extendedLog = additionalErr ? [...log, { logType: 'error', message: additionalErr }] : log;

    return (
        <div className="scenery-parser-log-view">
            {extendedLog.length === 0 ? (
                <div className="no-log">No log entries.</div>
            ) : (
                <ul className="log-list">
                    {extendedLog.map((entry, index) => <LogEntry entry={entry} key={index} />)}
                </ul>
            )}
        </div>
    );
}

function LogEntry({ entry }) {
    const { logType, message } = entry;

    return (
        <li className={`log-entry ${logType}`}>
            {message}
        </li>
    );
}