export default function SceneryInfoView({ scenery }) {
    const sceneryInfo = scenery?.sceneryInfo;

    if(!sceneryInfo) {
        return <div className="scenery-info-view">No scenery information available.</div>;
    }

    return (
        <div className="scenery-info-view">
            <table>
                <tbody>
                    <SceneryInfoViewItem label="Name" value={sceneryInfo.name} />
                    <SceneryInfoViewItem label="Version" value={sceneryInfo.version} />
                    <SceneryInfoViewItem label="Author" value={sceneryInfo.author} />
                    <SceneryInfoViewItem label="Description" value={sceneryInfo.description} />
                    <SceneryInfoViewItem label="Link" value={sceneryInfo.link} isLink={true} />
                    <SceneryInfoViewItem label="Main signalbox" value={sceneryInfo.main_signalbox} />
                </tbody>
            </table>
        </div>
    );
}

function SceneryInfoViewItem({ label, value, isLink = false }) {
    return (
        <tr>
            <td className="label">{label}</td>
            <td className="value">
                {isLink ? (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                        {value}
                    </a>
                ) : (
                    <span>{value}</span>
                )}
            </td>
        </tr>
    );
}
